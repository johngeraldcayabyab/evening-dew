<?php

namespace App\Console\Commands;

use App\Jobs\ShortenShopifyProductsJob;
use Illuminate\Console\Command;

class ShortenShopifyProductsCommand extends Command
{
    protected $signature = 'shopify:products:shorten';

    protected $description = 'Command description';

    public function __construct()
    {
        parent::__construct();
    }

    public function handle()
    {
        ShortenShopifyProductsJob::dispatch();
        return 0;
    }
}
