<?php

namespace App\Console;

use App\Jobs\ComputeProductQuantityJob;
use App\Jobs\ImportShopifyOrdersJob;
use App\Jobs\ValidateAllDraftTransfersJob;
use App\Models\GlobalSetting;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    protected $commands = [];

    protected function schedule(Schedule $schedule)
    {
        $schedule->call(function () {
            if (GlobalSetting::latestFirst()->inventory_auto_validate_draft) {
                ValidateAllDraftTransfersJob::dispatch();
            }
//            ComputeProductQuantityJob::dispatch();
            ImportShopifyOrdersJob::dispatch();
        })->everyMinute();
    }

    protected function commands()
    {
        $this->load(__DIR__ . '/Commands');

        require base_path('routes/console.php');
    }
}
