<?php

namespace Database\Seeders;

use App\Models\Journal;
use Illuminate\Database\Seeder;

class JournalSeeder extends Seeder
{
    public function run()
    {
        collect([
            [
                'name' => 'Customer Invoices',
                'type' => Journal::SALES,
                'dedicated_credit_note_sequence' => true,
                'short_code' => 'INV',
                'currency_id' => 1,
                'incoming_payment_method_manual' => false,
                'incoming_payment_method_electronic' => false,
                'outgoing_payment_method_manual' => false,
            ],
            [
                'name' => 'Vendor Bills',
                'type' => Journal::PURCHASE,
                'dedicated_credit_note_sequence' => true,
                'short_code' => 'BILL',
                'currency_id' => 1,
                'incoming_payment_method_manual' => false,
                'incoming_payment_method_electronic' => false,
                'outgoing_payment_method_manual' => false,
            ],
            [
                'name' => 'Miscellaneous Operations',
                'type' => Journal::MISCELLANEOUS,
                'dedicated_credit_note_sequence' => false,
                'short_code' => 'MISC',
                'currency_id' => 1,
                'incoming_payment_method_manual' => false,
                'incoming_payment_method_electronic' => false,
                'outgoing_payment_method_manual' => false,
            ],
            [
                'name' => 'Exchange Difference',
                'type' => Journal::MISCELLANEOUS,
                'dedicated_credit_note_sequence' => false,
                'short_code' => 'EXCH',
                'currency_id' => 1,
                'incoming_payment_method_manual' => false,
                'incoming_payment_method_electronic' => false,
                'outgoing_payment_method_manual' => false,
            ],
            [
                'name' => 'Cash',
                'type' => Journal::CASH,
                'dedicated_credit_note_sequence' => false,
                'short_code' => 'CSH1',
                'currency_id' => 1,
                'incoming_payment_method_manual' => true,
                'incoming_payment_method_electronic' => false,
                'outgoing_payment_method_manual' => true,
            ],
            [
                'name' => 'Cash Basis Taxes',
                'type' => Journal::MISCELLANEOUS,
                'dedicated_credit_note_sequence' => false,
                'short_code' => 'CABA',
                'currency_id' => 1,
                'incoming_payment_method_manual' => false,
                'incoming_payment_method_electronic' => false,
                'outgoing_payment_method_manual' => false,
            ],
            [
                'name' => 'Inventory Valuation',
                'type' => Journal::MISCELLANEOUS,
                'dedicated_credit_note_sequence' => false,
                'short_code' => 'STJ',
                'currency_id' => 1,
                'incoming_payment_method_manual' => false,
                'incoming_payment_method_electronic' => false,
                'outgoing_payment_method_manual' => false,
            ]
        ])->each(function ($data) {
            Journal::create($data);
        });
    }
}
