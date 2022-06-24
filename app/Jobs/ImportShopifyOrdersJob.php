<?php

namespace App\Jobs;

use App\Models\Address;
use App\Models\City;
use App\Models\Contact;
use App\Models\DeliveryFee;
use App\Models\DeliveryFeeLine;
use App\Models\Product;
use App\Models\SalesOrder;
use App\Models\SalesOrderLine;
use App\Models\Source;
use App\Models\Transfer;
use Carbon\Carbon;
use Exception;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class ImportShopifyOrdersJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $date;

    public function __construct($date = null)
    {
        $this->date = $date;
    }

    public function handle()
    {
        $shopifyUrl = config('shopify.url');
        $shopifyAccessToken = config('shopify.access_token');
        if (!$shopifyUrl || !$shopifyAccessToken) {
            throw new Exception('Check your shopify credentials!!');
        }
        $http = Http::withHeaders([
            'Content-Type' => 'application/json',
            'X-Shopify-Access-Token' => $shopifyAccessToken
        ]);
        $jsonRequest = [
            'status' => 'any',
        ];
        if ($this->date) {
            $jsonRequest['created_at_max'] = $this->date;
        }
        $response = $http->get("{$shopifyUrl}/admin/api/2022-04/orders.json", $jsonRequest);


        $responseJson = $response->json();
        $orders = array_reverse($responseJson['orders']);

        foreach ($orders as $order) {
            $shopifyOrderNumber = 'SP/' . $order['order_number'];
            if (SalesOrder::where('number', $shopifyOrderNumber)->first()) {
                continue;
            }

            if (!isset($order['customer'])) {
                continue;
            }
            $shopifyCustomer = $order['customer'];
            $shopifyCreatedAt = Carbon::parse($order['created_at']);
            $shopifyDefaultAddress = $shopifyCustomer['default_address'] ?? false;
            $shopifyBillingAddress = $order['billing_address'] ?? false;
            $shopifyShippingAddress = $order['shipping_address'] ?? false;
            $shopifyLineItems = $order['line_items'];

            $invoiceContact = Contact::firstOrCreate([
                'name' => $shopifyBillingAddress ? $shopifyBillingAddress['name'] : $shopifyDefaultAddress['name'],
                'phone' => $shopifyBillingAddress ? $shopifyBillingAddress['phone'] : $shopifyDefaultAddress['phone'],
                'email' => $shopifyCustomer['email'],
            ]);
            $invoiceCity = City::firstOrCreate([
                'name' => $shopifyBillingAddress ? $shopifyBillingAddress['city'] : $shopifyDefaultAddress['city']
            ]);
            $invoiceAddress = Address::firstOrCreate([
                'address_name' => $invoiceContact->name . " " . Address::DEFAULT . " address",
                'address' => $shopifyBillingAddress ? $shopifyBillingAddress['address1'] : $shopifyDefaultAddress['address1'],
                'contact_id' => $invoiceContact->id,
                'city_id' => $invoiceCity->id,
                'type' => Address::DEFAULT,
            ]);

            $deliveryContact = $invoiceContact;
            $deliveryCity = $invoiceCity;
            $deliveryAddress = $invoiceAddress;
            if ($shopifyShippingAddress) {
                $deliveryContact = Contact::firstOrCreate([
                    'name' => $shopifyShippingAddress['name'],
                    'phone' => $shopifyShippingAddress['phone'] ?? null,
                ]);
                $deliveryCity = City::firstOrCreate([
                    'name' => $shopifyShippingAddress['city']
                ]);
                $deliveryAddress = Address::firstOrCreate([
                    'address_name' => $deliveryContact->name . " " . Address::DEFAULT . " address",
                    'address' => $shopifyShippingAddress['address1'],
                    'contact_id' => $deliveryContact->id,
                    'city_id' => $deliveryCity->id,
                    'type' => Address::DEFAULT,
                ]);
            }


            $source = Source::where('name', 'Shopify')->first();


            $shippingProperties = end($shopifyLineItems)['properties'];
            $shippingDate = null;
            $notes = null;
            $selectTime = null;
            foreach ($shippingProperties as $shippingProperty) {
                if ($shippingProperty['name'] === 'Delivery Date') {
                    $shippingProperty['value'] = explode('-', $shippingProperty['value']);
                    $shippingDate = Carbon::parse($shippingProperty['value'][2] . '-' . $shippingProperty['value'][0] . '-' . $shippingProperty['value'][1]);
                }
                if ($shippingProperty['name'] === 'Delivery Time') {
                    if ($shippingProperty['value'] === '11:00 AM - 01:00 PM') {
                        $selectTime = '11_00_AM_01_00_PM';
                    } elseif ($shippingProperty['value'] === '01:00 PM - 03:00 PM') {
                        $selectTime = '01_00_PM_03_00_PM';
                    } elseif ($shippingProperty['value'] === '03:00 PM - 04:00 PM') {
                        $selectTime = '03_00_PM_04_00_PM';
                    } elseif ($shippingProperty['value'] === '04:00 PM - 05:30 PM') {
                        $selectTime = '04_00_PM_05_30_PM';
                    } elseif ($shippingProperty['value'] === '04:00 PM - 06:00 PM') {
                        $selectTime = '04_00_PM_06_00_PM';
                    } elseif ($shippingProperty['value'] === '05:30 PM - 06:30 PM') {
                        $selectTime = '05_30_PM_06_30_PM';
                    } elseif ($shippingProperty['value'] === '06:00 PM - 07:00 PM') {
                        $selectTime = '06_00_PM_07_00_PM';
                    }
                }
                if ($shippingProperty['name'] === 'Additional Comments') {
                    $notes = $shippingProperty['value'];
                }
            }

            if (!$shippingDate) {
                $shippingDate = $shopifyCreatedAt;
            }

            $salesOrder = SalesOrder::create([
                'number' => $shopifyOrderNumber,
                'customer_id' => $invoiceContact->id,
                'invoice_address' => $invoiceAddress->address,
                'delivery_address' => $deliveryAddress->address,
                'invoice_city_id' => $invoiceCity->id,
                'delivery_city_id' => $deliveryCity->id,
                'invoice_phone' => $invoiceContact->phone,
                'delivery_phone' => $deliveryContact->phone,
                'quotation_date' => $shopifyCreatedAt,
                'shipping_date' => $shippingDate,
                'notes' => $notes,
                'salesperson_id' => 1,
                'shipping_policy' => Transfer::AS_SOON_AS_POSSIBLE,
                'customer_reference' => "Shopify {$shopifyOrderNumber}",
                'vehicle_type' => SalesOrder::MOTORCYCLE,
                'status' => SalesOrder::DRAFT,
                'shipping_method' => Transfer::DELIVERY,
                'source_id' => $source->id,
                'select_time' => $selectTime,
                'created_at' => $shopifyCreatedAt,
                'updated_at' => $shopifyCreatedAt,
            ]);

            $subtotal = 0;

            if (isset($order['shipping_lines']) && isset($order['shipping_lines'][0])) {
                $shippingLines = $order['shipping_lines'][0];
                $shippingPrice = (int)$shippingLines['discounted_price'];
                $shippingCityName = $shippingLines['code'];
                if ($shippingPrice) {
                    $shippingCity = City::firstOrCreate([
                        'name' => $shippingCityName,
                    ]);
                    if ($shippingCity->wasRecentlyCreated === true) {
                        $deliveryFee = DeliveryFee::first();
                        DeliveryFeeLine::create([
                            'city_id' => $shippingCity->id,
                            'fee' => $shippingPrice,
                            'delivery_fee_id' => $deliveryFee->id,
                        ]);
                    }
                    if ($shippingCity->deliveryFeeLines()->exists()) {
                        $deliveryFeeProduct = $shippingCity->deliveryFeeLines[0]->deliveryFee->product;
                        SalesOrderLine::create([
                            'product_id' => $deliveryFeeProduct->id,
                            'quantity' => 1,
                            'measurement_id' => $deliveryFeeProduct->sales_measurement_id,
                            'unit_price' => $shippingPrice,
                            'subtotal' => $shippingPrice,
                            'sales_order_id' => $salesOrder->id,
                            'created_at' => $salesOrder->created_at,
                            'updated_at' => $salesOrder->updated_at,
                        ]);
                        $subtotal += $shippingPrice;
                    }
                }
            }

            foreach ($shopifyLineItems as $shopifyLineItem) {
                $product = Product::firstOrCreate([
                    'name' => $shopifyLineItem['name'],
                    'internal_reference' => $shopifyLineItem['sku'],
                ], [
                    'sales_price' => $shopifyLineItem['price'],
                ]);
                $quantity = $shopifyLineItem['fulfillable_quantity'] ? $shopifyLineItem['fulfillable_quantity'] : 1;
                $salesOrderLineSubtotal = $shopifyLineItem['price'] * $quantity;
                SalesOrderLine::create([
                    'product_id' => $product->id,
                    'quantity' => $quantity,
                    'measurement_id' => 1,
                    'unit_price' => $shopifyLineItem['price'],
                    'subtotal' => $salesOrderLineSubtotal,
                    'sales_order_id' => $salesOrder->id,
                    'created_at' => $salesOrder->created_at,
                    'updated_at' => $salesOrder->updated_at,
                ]);
                $subtotal += $salesOrderLineSubtotal;
            }
            $salesOrder->subtotal = $subtotal;
            $salesOrder->save();
            $this->log("New shopify sales order created {$shopifyOrderNumber}");
        }
    }

    private function log($message)
    {
        Log::channel('shopify')->info($message);
    }
}
