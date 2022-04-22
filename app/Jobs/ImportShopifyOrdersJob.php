<?php

namespace App\Jobs;

use App\Events\ContactUpsertEvent;
use App\Models\Address;
use App\Models\Contact;
use App\Models\SalesOrder;
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
            $orderNumber = $order['order_number'];
            $email = $order['email'];
            $createdAt = Carbon::parse($order['created_at']);

            $address = [];

            if (isset($order['shipping_address'])) {
                $address = $order['shipping_address'];
            } else if (isset($order['billing_address'])) {
                $address = $order['billing_address'];
            }

            $contact = Contact::where('name', $address['name'])->where('mobile', $address['phone'])->where('email', $email)->first();
            if (!$contact) {
                Contact::updateOrCreate([
                    'name' => $address['name'],
                    'mobile' => $address['phone'],
                    'email' => $email,
                ]);
                $contact = Contact::where('name', $address['name'])->where('mobile', $address['phone'])->where('email', $email)->first();
            }

            $address = Address::where('address_name', $contact->name . " " . Address::DEFAULT . " address")
                ->where('street_one', $address['address1'])
                ->where('zip', $address['zip'])
                ->where('city', $address['city'])
                ->where('type', Address::DEFAULT)
                ->where('country_id', 1)
                ->where('contact_id', $contact->id)
                ->first();
            if (!$address) {
                Address::updateOrCreate([
                    'address_name' => $contact->name . " " . Address::DEFAULT . " address",
                    'street_one' => $address['address1'],
                    'zip' => $address['zip'],
                    'city' => $address['city'],
                    'type' => Address::DEFAULT,
                    'country_id' => 1,
                    'contact_id' => $contact->id,
                ]);
                $address = Address::where('address_name', $contact->name . " " . Address::DEFAULT . " address")
                    ->where('street_one', $address['address1'])
                    ->where('zip', $address['zip'])
                    ->where('city', $address['city'])
                    ->where('type', Address::DEFAULT)
                    ->where('country_id', 1)
                    ->where('contact_id', $contact->id)
                    ->first();
            }

            if (!SalesOrder::where('number', $orderNumber)->first()) {
                SalesOrder::updateOrCreate([
                    'number' => $orderNumber,
                    'customer_id' => $contact->id,
                    'invoice_address_id' => $address->id,
                    'delivery_address_id' => $address->id,
                    'phone' => $address['phone'],
                    'quotation_date' => now(),
                    'salesperson_id' => 1,
                    'shipping_policy' => Transfer::AS_SOON_AS_POSSIBLE,
                    'source_document' => "Shopify {$orderNumber}",
                    'status' => SalesOrder::DRAFT,
                    'created_at' => $createdAt,
                    'updated_at' => $createdAt,
                ]);
            }
        }


//        info($orders[0]);
    }
}
