<?php

namespace App\Jobs;

use Exception;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Http;

class FixShopifyProductDetailsJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

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

        $response = $http->get("{$shopifyUrl}/admin/api/2022-07/products.json");

        $responseJson = $response->json();

        $products = $responseJson['products'];

        foreach ($products as $product) {
            info($product['title'] . " " . $product['price']);
        }
    }
}
