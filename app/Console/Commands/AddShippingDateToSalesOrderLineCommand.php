<?php

namespace App\Console\Commands;

use App\Jobs\AddShippingDateToSalesOrderLineJob;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class AddShippingDateToSalesOrderLineCommand extends Command
{
    protected $signature = 'sales:order_lines:add_shipping';

    protected $description = 'Command description';

    public function __construct()
    {
        parent::__construct();
    }

    public function handle()
    {
        DB::table('sales_order_lines')->orderBy('id')->chunk(300, function ($salesOrderLines) {
            AddShippingDateToSalesOrderLineJob::dispatch($salesOrderLines);
        });
        return 0;
    }
}
