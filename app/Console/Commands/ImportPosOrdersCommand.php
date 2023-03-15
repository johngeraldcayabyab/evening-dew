<?php

namespace App\Console\Commands;

use App\Models\Contact;
use App\Models\GlobalSetting;
use App\Models\Product;
use App\Models\SalesOrder;
use App\Models\SalesOrderLine;
use App\Models\Source;
use App\Models\Transfer;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class ImportPosOrdersCommand extends Command
{
    protected $signature = 'pos:import:orders';
    protected $description = 'Command description';


    public function __construct()
    {
        parent::__construct();
    }

    public function handle()
    {
        $path = storage_path('data.json');
        $orders = json_decode(file_get_contents($path), true);
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
            $date = Carbon::parse($order['date']);
            $salesOrder = SalesOrder::create([
                'number' => $posSequence,
                'customer_name' => $customer->name,
                'customer_id' => $customer->id,
                'quotation_date' => $date,
                'shipping_date' => $date,
                'salesperson_id' => $salesPerson->id,
                'shipping_policy' => Transfer::AS_SOON_AS_POSSIBLE,
                'source_document' => $order['sequence'],
                'select_time' => '11_00_AM_01_00_PM',
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
            $this->log("New pos sales order created {$posSequence}");
        }
        return 0;
    }

    private function log($message)
    {
        info($message);
    }
}
