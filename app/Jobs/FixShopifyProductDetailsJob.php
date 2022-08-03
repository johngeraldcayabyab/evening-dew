<?php

namespace App\Jobs;

use App\Models\Product;
use Exception;
use Illuminate\Bus\Queueable;
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
            $variants = $product['variants'];
            foreach ($variants as $variant) {
                $savedProduct = Product::where('internal_reference', trim($variant['sku']))->first();
                if ($savedProduct) {
                    if ((int)$savedProduct->sales_price !== (int)$variant['price']) {
                        $savedProduct->sales_price = (int)$variant['price'];
                        $savedProduct->save();
                        info($variant['sku'] . " {$savedProduct->sales_price} --- {$variant['price']}]");
                    }
                }
            }
        }
    }
}
