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
            $this->log('Check your shopify credentials!!');
            return false;
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

        $this->log($jsonRequest);

        $response = $http->get("{$shopifyUrl}/admin/api/2022-04/orders.json", $jsonRequest);


        $responseJson = $response->json();
        $orders = $responseJson['orders'];

        foreach ($orders as $order) {
            $shopifyOrderNumber = 'SP/' . $order['order_number'];
            if (SalesOrder::where('number', $shopifyOrderNumber)->first()) {
                continue;
            }
            $shopifyCustomer = $order['customer'];
            $shopifyCreatedAt = Carbon::parse($order['created_at']);
            $shopifyDefaultAddress = $shopifyCustomer['default_address'] ?? false;
            $shopifyShippingAddress = $order['shipping_address'] ?? false;
            $shopifyBillingAddress = $order['billing_address'] ?? false;
            $shopifyLineItems = $order['line_items'];

            $contact = Contact::firstOrCreate([
                'name' => $shopifyCustomer['first_name'] . " " . $shopifyCustomer['last_name'],
                'phone' => $shopifyDefaultAddress ? $shopifyDefaultAddress['phone'] : null,
                'email' => $shopifyCustomer['email'],
            ]);

            $defaultAddress = false;
            $deliveryAddress = false;
            $invoiceAddress = false;

            if ($shopifyDefaultAddress) {
                $defaultCity = City::firstOrCreate([
                    'name' => $shopifyDefaultAddress['city']
                ]);
                $defaultAddressName = $contact->name . " " . Address::DEFAULT . " address";
                $defaultAddress = Address::firstOrCreate([
                    'address_name' => $defaultAddressName,
                    'address' => $shopifyDefaultAddress['address1'],
                    'contact_id' => $contact->id,
                    'city_id' => $defaultCity->id,
                    'type' => Address::DEFAULT,
                ]);
            }

            $deliveryCity = null;
            if ($shopifyShippingAddress) {
                $deliveryCity = City::firstOrCreate([
                    'name' => $shopifyShippingAddress['city']
                ]);
                $deliveryAddressName = $contact->name . " " . Address::DELIVERY . " address";
                $deliveryAddress = Address::firstOrCreate([
                    'address_name' => $deliveryAddressName,
                    'address' => $shopifyShippingAddress['address1'],
                    'contact_id' => $contact->id,
                    'city_id' => $deliveryCity->id,
                    'type' => Address::DELIVERY,
                ]);
            }

            $invoiceCity = null;
            if ($shopifyBillingAddress) {
                $invoiceCity = City::firstOrCreate([
                    'name' => $shopifyBillingAddress['city']
                ]);
                $invoiceAddressName = $contact->name . " " . Address::INVOICE . " address";
                $invoiceAddress = Address::firstOrCreate([
                    'address_name' => $invoiceAddressName,
                    'address' => $shopifyBillingAddress['address1'],
                    'contact_id' => $contact->id,
                    'city_id' => $invoiceCity->id,
                    'type' => Address::INVOICE,
                ]);
            }

            $salesOrderInvoiceAddress = $invoiceAddress ? $invoiceAddress : $defaultAddress;
            $salesOrderDeliveryAddress = $deliveryAddress ? $deliveryAddress : $defaultAddress;

            $salesOrderInvoiceCity = $invoiceCity ? $invoiceCity : $defaultCity;
            $salesOrderDeliveryCity = $deliveryCity ? $deliveryCity : $defaultCity;

            $source = Source::where('name', 'Shopify')->first();


            $shippingProperties = end($shopifyLineItems)['properties'];

            $shippingDate = now();
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

            $salesOrder = SalesOrder::create([
                'number' => $shopifyOrderNumber,
                'customer_id' => $contact->id,
                'invoice_address' => $salesOrderInvoiceAddress->address,
                'delivery_address' => $salesOrderDeliveryAddress->address,
                'invoice_city_id' => $salesOrderInvoiceCity->id,
                'delivery_city_id' => $salesOrderDeliveryCity->id,
                'phone' => $contact->phone,
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

            if (isset($order['shipping_lines'])) {
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
                        $subtotal = $shippingPrice;
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
                $salesOrderLineSubtotal = $shopifyLineItem['price'] * ($shopifyLineItem['fulfillable_quantity'] ? $shopifyLineItem['fulfillable_quantity'] : 1);
                SalesOrderLine::create([
                    'product_id' => $product->id,
                    'quantity' => $shopifyLineItem['fulfillable_quantity'] ? $shopifyLineItem['fulfillable_quantity'] : 1,
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
