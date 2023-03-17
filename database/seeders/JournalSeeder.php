<?php

namespace Database\Seeders;

use App\Models\ChartOfAccount;
use App\Models\Journal;
use App\Models\Sequence;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class JournalSeeder extends Seeder
{
    public function run()
    {
        collect([
            [
                'name' => 'Invoices',
                'type' => Journal::SALES,
                'dedicated_credit_note_sequence' => true,
                'short_code' => 'INV',
                'currency_id' => 1,
                'incoming_payment_method_manual' => false,
                'incoming_payment_method_electronic' => false,
                'outgoing_payment_method_manual' => false,
                'income_chart_of_account_id' => ChartOfAccount::where('code', '400000')->first()->id,
            ],
            [
                'name' => 'Bills',
                'type' => Journal::PURCHASE,
                'dedicated_credit_note_sequence' => true,
                'short_code' => 'BILL',
                'currency_id' => 1,
                'incoming_payment_method_manual' => false,
                'incoming_payment_method_electronic' => false,
                'outgoing_payment_method_manual' => false,
                'expense_chart_of_account_id' => ChartOfAccount::where('code', '600000')->first()->id,
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
                'name' => 'Bank',
                'type' => Journal::BANK,
                'dedicated_credit_note_sequence' => false,
                'short_code' => 'BNK1',
                'currency_id' => 1,
                'incoming_payment_method_manual' => true,
                'incoming_payment_method_electronic' => false,
                'outgoing_payment_method_manual' => true,
                'bank_chart_of_account_id' => ChartOfAccount::where('code', '101402')->first()->id,
                'suspense_chart_of_account_id' => ChartOfAccount::where('code', '101401')->first()->id,
                'outstanding_receipt_account_id' => ChartOfAccount::where('code', '101403')->first()->id,
                'outstanding_payment_account_id' => ChartOfAccount::where('code', '101404')->first()->id,
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
                'cash_chart_of_account_id' => ChartOfAccount::where('code', '101501')->first()->id,
                'suspense_chart_of_account_id' => ChartOfAccount::where('code', '101401')->first()->id,
                'profit_chart_of_account_id' => ChartOfAccount::where('code', '442000')->first()->id,
                'loss_chart_of_account_id' => ChartOfAccount::where('code', '642000')->first()->id,
                'outstanding_receipt_account_id' => ChartOfAccount::where('code', '101502')->first()->id,
                'outstanding_payment_account_id' => ChartOfAccount::where('code', '101503')->first()->id,
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
            $journal = Journal::create($data);
            $sequenceCode = Str::snake($journal->name . " sequence", '.');
            Sequence::create([
                'name' => $journal->name . " sequence",
                'sequence_code' => $sequenceCode,
                'implementation' => Sequence::STANDARD,
                'prefix' => "{$journal->short_code}/",
                'sequence_size' => Sequence::SEQUENCE_SIZE,
                'step' => Sequence::STEP,
                'next_number' => Sequence::NEXT_NUMBER,
            ]);
        });
    }
}
