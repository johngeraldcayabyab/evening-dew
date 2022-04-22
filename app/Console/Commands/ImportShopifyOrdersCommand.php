<?php

namespace App\Console\Commands;

use App\Jobs\ImportShopifyOrdersJob;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;

class ImportShopifyOrdersCommand extends Command
{
    protected $signature = 'shopify:import:orders';

    protected $description = 'Command description';

    public function __construct()
    {
        parent::__construct();
    }

    public function handle()
    {
        ImportShopifyOrdersJob::dispatch();


        return 0;
    }
}
