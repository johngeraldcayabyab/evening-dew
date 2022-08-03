<?php

namespace App\Console\Commands;

use App\Jobs\FixShopifyProductDetailsJob;
use Illuminate\Console\Command;

class FixShopifyProductDetailsCommand extends Command
{
    protected $signature = 'shopify:products:fix';

    protected $description = 'Command description';

    public function __construct()
    {
        parent::__construct();
    }

    public function handle()
    {
        FixShopifyProductDetailsJob::dispatch();
        return 0;
    }
}
