<?php

namespace App\Console\Commands;

use App\Jobs\PrintReceiptJob;
use App\Models\SalesOrder;
use App\Services\PrintTest;
use Illuminate\Console\Command;
use Mike42\Escpos\PrintConnectors\WindowsPrintConnector;
use Mike42\Escpos\Printer;

class PrintReceiptCommand extends Command
{
    protected $signature = 'print:receipt {sales}';


    public function handle()
    {
        PrintReceiptJob::dispatch($this->argument('sales'));
        return 0;
    }
}
