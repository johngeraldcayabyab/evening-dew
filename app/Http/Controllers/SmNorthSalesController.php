<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use App\Models\GlobalSetting;
use App\Models\Product;
use App\Models\SalesOrder;
use App\Models\SalesOrderLine;
use App\Models\Source;
use App\Models\Transfer;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class SmNorthSalesController
{
    public function index()
    {
        return response()->json([], 202)->header('Access-Control-Allow-Origin', '*');
    }

    public function import(Request $request)
    {
        $orders = [];
        $array = $request->all();

        // the last item is in the key and the rest of the item is in the value

        $journals = null;

        foreach ($array as $key => $ray) {
            $journals = str_getcsv($ray, ',');
        }


        foreach ($journals as $journal) {
            preg_match("/OFFICIAL RECEIPT (.*)/", $journal, $isOfficial);
            if (!count($isOfficial)) {
                continue;
            }
            $cashier = $this->getCashier($journal);
            if (!$cashier) {
                continue;
            }
            $orNo = $this->getORNO($journal);
            $transDate = $this->getTransDate($journal);
            $items = $this->getItems($journal);
            $orders[] = [
                'sequence' => $orNo,
                'date' => $transDate,
                'cashier' => $cashier,
                'items' => $items
            ];
        }
        $this->importer($orders);
        return response()->json([], 202)->header('Access-Control-Allow-Origin', '*');
    }

    public function getCashier($journal)
    {
        preg_match("/Cashier: (.*)/", $journal, $matches);
        $cashier = null;
        if (count($matches) === 2) {
            $cashier = str_replace('\\', '', preg_replace('/\s+/', '', $matches[1]));
        }
        if (strlen($cashier)) {
            $cashier = explode(",", Str::title($cashier));
            $cashier = array_reverse($cashier);
            $cashier = implode(" ", $cashier);
        }
        return $cashier;
    }

    public function getORNO($journal)
    {
        preg_match("/O\.R\. No\.: (.*)/", $journal, $matches);
        $orNo = null;
        if (count($matches) === 2) {
            $orNo = str_replace('\\', '', preg_replace('/\s+/', '', $matches[1]));
        }
        return $orNo;
    }

    public function getTransDate($journal)
    {
        $transDate = null;
        preg_match("/Trans. Date:(.*)/", $journal, $matches);
        if (count($matches) === 2) {
            $transDate = trim(str_replace("\\", "", trim($matches[1])));
            $transDate = Carbon::createFromFormat('m/d/y H:i', $transDate);
        }
        return $transDate;
    }

    public function getItems($journal)
    {
        $finalItems = [];
        preg_match("/OFFICIAL\sRECEIPT(?s:.*)TOTAL/", $journal, $matches);
        if (count($matches) == 1) {
            $replace = [
                '\\',
                'TAKE-OUT',
                'DINE-IN'
            ];
            $items = Str::replace($replace, '', $matches[0]);
            $items = explode(PHP_EOL, trim($items));
            $parsingItems = [];
            foreach ($items as $item) {
                if (strlen(trim($item))) {
                    $parsingItems[] = $item;
                }
            }
            $parsingItems = array_slice($parsingItems, 2);
            $hyphenKey = array_search('---------------------------------', $parsingItems);
            $parsingItems = array_slice($parsingItems, 0, $hyphenKey);
            $finalParsing = [];
            foreach ($parsingItems as $parsingItem) {
                $parsingItem = trim($parsingItem);
                if (strlen($parsingItem) === 30) {
                    $itemName = trim(substr($parsingItem, 0, 16));
                    $itemQuantity = Str::replace(',', '', trim($parsingItem[19]));
                    $itemTotal = Str::replace(['V', ',', 'Z'], '', trim(substr($parsingItem, 20)));
                    $itemUnitPrice = (float)$itemTotal / (int)$itemQuantity;
                    $itemYes = [
                        $itemName,
                        $itemQuantity,
                        $itemUnitPrice,
                        $itemTotal,
                    ];
                    $finalParsing[] = $itemYes;
                } else {
                    $index = count($finalParsing) - 1;
                    $finalParsing[$index][0] = $finalParsing[$index][0] . $parsingItem;
                }
            }
            $finalItems = $finalParsing;
        }
        return $finalItems;
    }


    public function importer($orders)
    {
        $customer = Contact::firstOrCreate(['name' => 'Sm North Customer']);
        $source = Source::where('name', 'SM North')->first();
        $globalSetting = GlobalSetting::latestFirst();
        $inventoryDefaultMeasurement = $globalSetting->inventoryDefaultMeasurement;
        foreach ($orders as $order) {
            $email = Str::snake($order['cashier']) . "@email.com";
            $salesPerson = User::firstOrCreate([
                'name' => $order['cashier'],
                'email' => $email,
            ], [
                'password' => Hash::make('cashier'),
                'app_menu_id' => 1,
            ]);
            $posSequence = 'POS/' . $order['sequence'];
            if (SalesOrder::where('number', $posSequence)->first()) {
                continue;
            }
            $date = $order['date'];
            $salesOrder = SalesOrder::create([
                'number' => $posSequence,
                'customer_name' => $customer->name,
                'customer_id' => $customer->id,
                'quotation_date' => $date,
                'shipping_date' => $date,
                'source_document' => "POS {$order['sequence']}",
                'select_time' => '11_00_AM_01_00_PM',
                'salesperson_id' => $salesPerson->id,
                'shipping_policy' => Transfer::AS_SOON_AS_POSSIBLE,
                'customer_reference' => "POS {$order['sequence']}",
                'status' => SalesOrder::DRAFT,
                'shipping_method' => Transfer::PICKUP,
                'steps' => 'draft,paid,kitchen,sticker,delivered',
                'source_id' => $source->id,
                'created_at' => $date,
                'updated_at' => $date,
            ]);
            $subtotal = 0;
            foreach ($order['items'] as $item) {
                $productData = [
                    'name' => $item[0],
                    'sales_price' => $item[2],
                    'product_category_id' => 5
                ];
                $quantity = $item[1];
                $product = Product::where('name', trim($item[0]))->first();
                if (!$product) {
                    $product = Product::firstOrCreate($productData);
                }
                $salesOrderLineSubtotal = $item[3];
                SalesOrderLine::create([
                    'product_id' => $product->id,
                    'quantity' => $quantity,
                    'measurement_id' => $inventoryDefaultMeasurement->id,
                    'unit_price' => $productData['sales_price'],
                    'subtotal' => $salesOrderLineSubtotal,
                    'shipping_date' => $date,
                    'sales_order_id' => $salesOrder->id,
                    'created_at' => $salesOrder->created_at,
                    'updated_at' => $salesOrder->updated_at,
                ]);
                $subtotal += $salesOrderLineSubtotal;
            }
            $salesOrder->subtotal = $subtotal;
            $salesOrder->save();
            info("New pos sales order created {$posSequence}");
        }
    }

    public function import_lines(Request $request)
    {
        return response()->json([], 202)->header('Access-Control-Allow-Origin', '*');
    }

    public function import_per_hour(Request $request)
    {
        return response()->json([], 202)->header('Access-Control-Allow-Origin', '*');
    }
}
