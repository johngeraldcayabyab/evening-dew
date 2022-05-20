<?php

namespace App\Jobs;

use App\Models\Address;
use App\Models\City;
use App\Models\Contact;
use App\Models\Product;
use App\Models\SalesOrder;
use App\Models\SalesOrderLine;
use App\Models\Transfer;
use Carbon\Carbon;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Http;

class ImportShopifyOrdersJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct()
    {
        //
    }

    public function handle()
    {
        $shopifyLink = env('SHOPIFY_URL');
        $shopifyAccessToken = env('SHOPIFY_ACCESS_TOKEN');
        $response = Http::withHeaders([
            'Content-Type' => 'application/json',
            'X-Shopify-Access-Token' => $shopifyAccessToken
        ])->get("{$shopifyLink}/admin/api/2022-04/orders.json?status=any");

        $responseJson = $response->json();
        $orders = $responseJson['orders'];

        foreach ($orders as $order) {
            $shopifyOrderNumber = $order['order_number'];
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

            $salesOrder = SalesOrder::create([
                'number' => $shopifyOrderNumber,
                'customer_id' => $contact->id,
                'invoice_address_id' => $salesOrderInvoiceAddress->id,
                'delivery_address_id' => $salesOrderDeliveryAddress->id,
                'phone' => $contact->phone,
                'quotation_date' => now(),
                'salesperson_id' => 1,
                'shipping_policy' => Transfer::AS_SOON_AS_POSSIBLE,
                'source_document' => "Shopify {$shopifyOrderNumber}",
                'status' => SalesOrder::DRAFT,
                'shipping_method' => Transfer::DELIVERY,
                'created_at' => $shopifyCreatedAt,
                'updated_at' => $shopifyCreatedAt,
            ]);

            foreach ($shopifyLineItems as $shopifyLineItem) {
                $product = Product::firstOrCreate([
                    'name' => $shopifyLineItem['name'],
                    'internal_reference' => $shopifyLineItem['sku'],
                ]);
                SalesOrderLine::create([
                    'product_id' => $product->id,
                    'quantity' => $shopifyLineItem['fulfillable_quantity'],
                    'measurement_id' => 1,
                    'unit_price' => $shopifyLineItem['price'],
                    'subtotal' => $shopifyLineItem['price'] * $shopifyLineItem['fulfillable_quantity'],
                    'sales_order_id' => $salesOrder->id,
                    'created_at' => $salesOrder->created_at,
                    'updated_at' => $salesOrder->updated_at,
                ]);
            }
        }
    }
}
