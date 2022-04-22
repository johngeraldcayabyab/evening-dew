<?php

namespace App\Jobs;

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
        $response = Http::withHeaders([
            'Content-Type' => 'application/json',
            'X-Shopify-Access-Token' => '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'
        ])->get('https://tasteandtell.myshopify.com/admin/api/2022-04/orders.json?status=any');

        $responseJson = $response->json();
        $orders = $responseJson['orders'];


        foreach ($orders as $order) {
            $orderNumber = $responseJson['order_number'];
            $email = $responseJson['email'];
        }


        info($orders[0]);
    }
}
