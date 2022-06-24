<?php

namespace App\Console\Commands;

use App\Models\SalesOrder;
use App\Services\PrintTest;
use Illuminate\Console\Command;
use Mike42\Escpos\PrintConnectors\WindowsPrintConnector;
use Mike42\Escpos\Printer;

class PrintReceipt extends Command
{
    protected $signature = 'print:receipt {sales}';


    public function handle()
    {
        try {
            $connector = new WindowsPrintConnector("58Printer"); //name of shared printer
            $printer = new Printer($connector);


            $printer->text("--------------------------------" . "\n");

            $salesOrder = SalesOrder::find($this->argument('sales'));
            $customerName = $salesOrder->customer->name;

            /* Name of shop */
            $printer->selectPrintMode(Printer::MODE_DOUBLE_WIDTH);
            $printer->text("$salesOrder->number.\n");
            $printer->selectPrintMode();
            $printer->text("$customerName\n");
            $printer->feed();

            /**
             * Minimum of 3 prudcts, ghost products
             *
             * font larger for items
             *
             * and add headers
             */

            /* Items */
            $items = [];

            $salesOrderLines = $salesOrder->salesOrderLines;

            foreach ($salesOrderLines as $salesOrderLine) {
                $quantity = $salesOrderLine->quantity;
                $internalReference = $salesOrderLine->product->internal_reference;
                $productName = $salesOrderLine->product->name;
                $items[] = "$quantity $internalReference $productName \n\n";
            }


            $printer->setJustification(Printer::JUSTIFY_LEFT);
            $printer->setEmphasis(true);
            foreach ($items as $item) {
                $printer->text($item);
            }

            /* Footer */
            $printer->feed(2);
            $printer->setJustification(Printer::JUSTIFY_CENTER);
            $printer->feed(2);
            $printer->text("Ready By: {$salesOrder->ready_by}" . "\n");
            $printer->feed(2);
            $printer->text("--------------------------------" . "\n");
            $printer->feed(3);


            /* Cut the receipt and open the cash drawer */
            $printer->cut();
            $printer->close();

        } catch (\Exception $exception) {
            info($exception->getMessage());
        }

        return 0;
    }
}
