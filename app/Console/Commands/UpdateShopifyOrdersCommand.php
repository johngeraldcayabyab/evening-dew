<?php

namespace App\Console\Commands;

use App\Models\SalesOrder;
use Exception;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class UpdateShopifyOrdersCommand extends Command
{
    protected $signature = 'shopify:update:pickup {--date=}';

    protected $description = 'Command description';

    public function __construct()
    {
        parent::__construct();
    }

    public function handle()
    {
        $date = $this->option('date');
        $shopifyUrl = config('shopify.url');
        $shopifyAccessToken = config('shopify.access_token');
        if (!$this->isCredentialsSet($shopifyUrl, $shopifyAccessToken)) {
            exit;
        }
        try {
            $http = Http::withHeaders([
                'Content-Type' => 'application/json',
                'X-Shopify-Access-Token' => $shopifyAccessToken
            ]);
            $jsonRequest = [
                'status' => 'any',
            ];
            if ($date) {
                $jsonRequest['created_at_max'] = $date;
            }
            $response = $http->get("{$shopifyUrl}/admin/api/2022-04/orders.json", $jsonRequest);
            $responseJson = $response->json();
            $orders = array_reverse($responseJson['orders']);
            foreach ($orders as $order) {
                $shopifyOrderNumber = 'SP/' . $order['order_number'];
                $salesOrder = SalesOrder::where('number', $shopifyOrderNumber)->first();
                if ($salesOrder && $salesOrder->pickup_location === null) {
                    if (isset($order['shipping_lines']) && isset($order['shipping_lines'][0])) {
                        $shippingLineCode = $order['shipping_lines'][0]['code'];
                        $shippingLineDiscountedPrice = $order['shipping_lines'][0]['discounted_price'];
                        if (in_array($shippingLineCode, ['Taste&Tell Mnl', 'Taste & Tell SM North EDSA']) && !(int)$shippingLineDiscountedPrice) {
                            $salesOrder->pickup_location = $shippingLineCode;
                            $salesOrder->save();
                            $this->log("Shopify sales order updated {$shopifyOrderNumber} $shippingLineCode");
                        }
                    }
                }
            }
        } catch (Exception $exception) {
            $this->log("ERROR : " . $exception->getMessage() . " " . $exception->getLine());
        }
        return 0;
    }

    private function isCredentialsSet($shopifyUrl, $shopifyAccessToken)
    {
        if (!$shopifyUrl || !$shopifyAccessToken) {
            $this->log('Check your shopify credentials');
            return false;
        }
        return true;
    }

    private function log($message)
    {
        Log::channel('shopify')->info($message);
    }
}
