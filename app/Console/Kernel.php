<?php

namespace App\Console;

use App\Jobs\ComputeAllProductQuantityJob;
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
            $globalSetting = GlobalSetting::latestFirst();

            if ($globalSetting->inventory_auto_validate_draft) {
                ValidateAllDraftTransfersJob::dispatch();
            }
            if ($globalSetting->inventory_compute_product_quantity) {
                ComputeAllProductQuantityJob::dispatch();
            }
        })->everyMinute();
    }

    protected function commands()
    {
        $this->load(__DIR__ . '/Commands');

        require base_path('routes/console.php');
    }
}
