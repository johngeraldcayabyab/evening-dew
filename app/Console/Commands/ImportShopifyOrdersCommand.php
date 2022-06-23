<?php

namespace App\Console\Commands;

use App\Jobs\ImportShopifyOrdersJob;
use Illuminate\Console\Command;

class ImportShopifyOrdersCommand extends Command
{
    protected $signature = 'shopify:import:orders {--date=}';

    protected $description = 'Command description';

    public function __construct()
    {
        parent::__construct();
    }

    public function handle()
    {//keep
        ImportShopifyOrdersJob::dispatch($this->option('date'));
        return 0;
    }
}
