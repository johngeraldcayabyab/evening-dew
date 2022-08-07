<?php

namespace App\Console\Commands;

use App\Jobs\FixSalesOrderStepsJob;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class FixSalesOrderStepsCommand extends Command
{
    protected $signature = 'sales:orders:fix_steps';

    protected $description = 'Command description';

    public function __construct()
    {
        parent::__construct();
    }

    public function handle()
    {
        DB::table('sales_orders')->orderBy('id')->chunk(300, function ($salesOrders) {
//            info(gettype($salesOrders));
            FixSalesOrderStepsJob::dispatch($salesOrders);
        });
        return 0;
    }
}
