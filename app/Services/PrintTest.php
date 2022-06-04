<?php

namespace App\Services;

use App\Models\SalesOrder;
use Mike42\Escpos\CapabilityProfile;
use Mike42\Escpos\EscposImage;
use Mike42\Escpos\PrintConnectors\WindowsPrintConnector;
use Mike42\Escpos\Printer;

class PrintTest
{
    public function print()
    {
        try {
            $connector = new WindowsPrintConnector("58Printer"); //name of shared printer
            $printer = new Printer($connector);


            $printer->text("--------------------------------" . "\n");

            $salesOrder = SalesOrder::find(10);
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
            $items = [
//                "3  ZMD - Dragon Maki (6pcs) \n\n",
//                "1  KLS - Kani Aburi - Large 8x12' (6-8 pax) / Spicy \n\n",
//                "2  ZMF - Fantasy Roll (6pcs) \n\n",
            ];


            $salesOrderLines = $salesOrder->salesOrderLines;

            foreach ($salesOrderLines as $salesOrderLine){
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
            $printer->text("Ready By: 02:30 PM" . "\n");
            $printer->feed(2);
            $printer->text("--------------------------------" . "\n");
            $printer->feed(3);


            /* Cut the receipt and open the cash drawer */
            $printer->cut();
            $printer->close();

        } catch (\Exception $exception) {
            info($exception->getMessage());
        }
    }
}
