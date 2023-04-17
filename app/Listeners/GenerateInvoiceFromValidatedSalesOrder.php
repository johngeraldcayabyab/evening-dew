<?php

namespace App\Listeners;

use App\Data\SystemSetting;
use App\Events\SalesOrderValidated;
use App\Models\Currency;
use App\Models\Invoice;
use App\Models\InvoiceLine;
use App\Models\Journal;

class GenerateInvoiceFromValidatedSalesOrder
{
    public function handle(SalesOrderValidated $event): void
    {
        $salesOrder = $event->salesOrder;
        if (!$salesOrder->invoice_type) {
            return;
        }
        $this->createInvoiceAndLines($salesOrder);
    }

    private function createInvoiceAndLines($salesOrder)
    {
        $defaultJournal = Journal::where('type', Journal::SALES)->first();
        $invoice = Invoice::create([
            'customer_id' => $salesOrder->customer_id,
            'invoice_date' => now()->format(SystemSetting::DATE_TIME_FORMAT),
            'payment_term_id' => $salesOrder->payment_term_id,
            'journal_id' => $defaultJournal->id,
            'currency_id' => Currency::default()->id,
            'salesperson_id' => $salesOrder->salesperson_id,
            'customer_reference' => $salesOrder->customer_reference,
            'status' => Invoice::DRAFT,
            'amount_due' => $salesOrder->subtotal,
        ]);

        $invoiceLines = $salesOrder->salesOrderLines->map(function ($salesOrderLine) use ($defaultJournal) {
            return [
                'product_id' => $salesOrderLine->product_id,
                'description' => $salesOrderLine->description,
                'quantity' => $salesOrderLine->quantity,
                'unit_price' => $salesOrderLine->unit_price,
                'subtotal' => $salesOrderLine->subtotal,
                'chart_of_account_id' => $defaultJournal->id,
            ];
        });
        if (count($invoiceLines)) {
            InvoiceLine::massUpsert($invoiceLines, $invoice);
        }
    }
}