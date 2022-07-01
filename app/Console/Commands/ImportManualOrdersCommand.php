<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class ImportManualOrdersCommand extends Command
{
    protected $signature = 'manual:orders:import';
    protected $description = 'Import manual orders';

    public function __construct()
    {
        parent::__construct();
    }

    public function handle()
    {
        return 0;
    }
}
