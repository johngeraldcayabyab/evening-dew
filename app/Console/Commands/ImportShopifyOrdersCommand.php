<?php

namespace App\Console\Commands;

use App\Jobs\ImportShopifyOrdersJob;
use DateInterval;
use DatePeriod;
use DateTime;
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
    {
//        $begin = new DateTime('2020-09-00');
//        $end = new DateTime('2022-06-24');
//        $interval = DateInterval::createFromDateString('1 day');
//        $period = new DatePeriod($begin, $interval, $end);
//        $minutes = 1;
//        foreach ($period as $dt) {
//            ImportShopifyOrdersJob::dispatch($dt->format("Y-m-d"));
//            $minutes++;
//        }
        ImportShopifyOrdersJob::dispatch($this->option('date'));
        return 0;
    }
}
