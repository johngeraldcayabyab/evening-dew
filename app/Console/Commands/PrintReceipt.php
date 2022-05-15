<?php

namespace App\Console\Commands;

use App\Services\PrintTest;
use Illuminate\Console\Command;

class PrintReceipt extends Command
{
    protected $signature = 'print:receipt';


    public function handle()
    {
        $printTest = new PrintTest();
        $printTest->print();

        return 0;
    }
}
