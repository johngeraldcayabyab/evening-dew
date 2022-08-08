<?php

namespace App\Jobs;

use App\Models\Address;
use App\Models\City;
use App\Models\Contact;
use App\Models\DeliveryFee;
use App\Models\DeliveryFeeLine;
use App\Models\GlobalSetting;
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
use Illuminate\Support\Str;

class ImportShopifyOrdersJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $date;
    private $orderId;

    public function __construct($date = null, $orderId = null)
    {
        $this->date = $date;
        $this->orderId = $orderId;
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
        if ($this->orderId) {
            $response = $http->get("{$shopifyUrl}/admin/api/2022-04/orders/{$this->orderId}.json", $jsonRequest);
            $this->log($response->json());
            return 0;
        }


        $response = $http->get("{$shopifyUrl}/admin/api/2022-04/orders.json", $jsonRequest);

        $responseJson = $response->json();
        $orders = array_reverse($responseJson['orders']);

        $globalSetting = GlobalSetting::latestFirst();
        $inventoryDefaultMeasurement = $globalSetting->inventoryDefaultMeasurement;

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
            $selectTime = null;
            $notes = null;
            foreach ($shippingProperties as $shippingProperty) {
                $shippingPropertyName = trim($shippingProperty['name']);
                $shippingPropertyValue = trim($shippingProperty['value']);
                $shippingDate = $this->getShippingDate($shippingPropertyName, $shippingPropertyValue);
                $selectTime = $this->getSelectTime($shippingPropertyName, $shippingPropertyValue);
                $notes = $this->getNotes($shippingPropertyName, $shippingPropertyValue);
            }

            if (!$shippingDate) {
                $shippingDate = $shopifyCreatedAt;
            }

            $shippingMethod = Transfer::DELIVERY;
            $vehicleType = SalesOrder::MOTORCYCLE;

            if (isset($order['shipping_lines']) && isset($order['shipping_lines'][0])) {
                $shippingLineCode = $order['shipping_lines'][0]['code'];
                $shippingLineDiscountedPrice = $order['shipping_lines'][0]['discounted_price'];
                if ($shippingLineCode == 'Taste&Tell Mnl' && !(int)$shippingLineDiscountedPrice) {
                    $shippingMethod = Transfer::PICKUP;
                    $vehicleType = null;
                }
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
                'vehicle_type' => $vehicleType,
                'status' => SalesOrder::DRAFT,
                'shipping_method' => $shippingMethod,
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
                    $deliveryFee = DeliveryFee::first();
                    if ($shippingCity->wasRecentlyCreated === true) {

                        DeliveryFeeLine::create([
                            'city_id' => $shippingCity->id,
                            'fee' => $shippingPrice,
                            'delivery_fee_id' => $deliveryFee->id,
                        ]);
                    }
                    $deliveryFeeProduct = $deliveryFee->product;
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

            foreach ($shopifyLineItems as $shopifyLineItem) {
                $productData = [
                    'name' => $shopifyLineItem['name'],
                    'sales_price' => $shopifyLineItem['price'],
                ];
                if (Str::contains($shopifyLineItem['name'], 'Deliver')) {
                    $productData['product_type'] = Product::SERVICE;
                }
                if ($shopifyLineItem['name'] == 'Tip') {
                    $productData['product_type'] = Product::CONSUMABLE;
                }

                $product = Product::where('internal_reference', trim($shopifyLineItem['sku']))->first();

                if (!$product) {
                    $product = Product::firstOrCreate([
                        'internal_reference' => trim($shopifyLineItem['sku']),
                    ], $productData);
                }


                $quantity = $shopifyLineItem['fulfillable_quantity'] ? $shopifyLineItem['fulfillable_quantity'] : 1;
                $salesOrderLineSubtotal = $shopifyLineItem['price'] * $quantity;
                SalesOrderLine::create([
                    'product_id' => $product->id,
                    'quantity' => $quantity,
                    'measurement_id' => $inventoryDefaultMeasurement->id,
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

    private function getShippingDate($shippingPropertyName, $shippingPropertyValue)
    {
        $shippingDate = null;
        if ($shippingPropertyName === 'Delivery Date') {
            $shippingDate = explode('-', $shippingPropertyValue);
            $shippingDate = Carbon::parse($shippingDate[2] . '-' . $shippingDate[0] . '-' . $shippingDate[1]);
        }
        return $shippingDate;
    }

    private function getSelectTime($shippingPropertyName, $shippingPropertyValue)
    {
        $selectTime = null;
        if ($shippingPropertyName === 'Delivery Time') {
            if ($shippingPropertyValue === '11:00 AM - 01:00 PM') {
                $selectTime = '11_00_AM_01_00_PM';
            } elseif ($shippingPropertyValue === '01:00 PM - 03:00 PM') {
                $selectTime = '01_00_PM_03_00_PM';
            } elseif ($shippingPropertyValue === '03:00 PM - 04:00 PM') {
                $selectTime = '03_00_PM_04_00_PM';
            } elseif ($shippingPropertyValue === '04:00 PM - 05:30 PM') {
                $selectTime = '04_00_PM_05_30_PM';
            } elseif ($shippingPropertyValue === '04:00 PM - 06:00 PM') {
                $selectTime = '04_00_PM_06_00_PM';
            } elseif ($shippingPropertyValue === '05:30 PM - 06:30 PM') {
                $selectTime = '05_30_PM_06_30_PM';
            } elseif ($shippingPropertyValue === '06:00 PM - 07:00 PM') {
                $selectTime = '06_00_PM_07_00_PM';
            }
        }
        return $selectTime;
    }

    private function getNotes($shippingPropertyName, $shippingPropertyValue)
    {
        $notes = null;
        if ($shippingPropertyName === 'Additional Comments') {
            $notes = $shippingPropertyValue;
        }
        return $notes;
    }

    private function log($message)
    {
        Log::channel('shopify')->info($message);
    }
}
