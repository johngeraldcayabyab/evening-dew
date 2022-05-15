<?php

namespace App\Services;

use Mike42\Escpos\CapabilityProfile;
use Mike42\Escpos\EscposImage;
use Mike42\Escpos\PrintConnectors\WindowsPrintConnector;
use Mike42\Escpos\Printer;

class PrintTest
{
    public function print()
    {
        try {
            $connector = new WindowsPrintConnector("XprinterHello"); //name of shared printer
            $printer = new Printer($connector);


            $printer->text("--------------------------------" . "\n");

            /* Name of shop */
            $printer->selectPrintMode(Printer::MODE_DOUBLE_WIDTH);
            $printer->text("Order#18090.\n");
            $printer->selectPrintMode();
            $printer->text("Maybel de Leon\n");
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
                "3  ZMD - Dragon Maki (6pcs) \n\n",
                "1  KLS - Kani Aburi - Large 8x12' (6-8 pax) / Spicy \n\n",
                "2  ZMF - Fantasy Roll (6pcs) \n\n",
            ];
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
