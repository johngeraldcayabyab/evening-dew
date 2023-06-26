<?php

namespace Database\Seeders;

use App\Models\ChartOfAccount;
use App\Models\Tax;
use Illuminate\Database\Seeder;

class TaxSeeder extends Seeder
{
    public function run(): void
    {
        $salesAccount = ChartOfAccount::where('code', '251000')->first();
        $purchaseAccount = ChartOfAccount::where('code', '131000')->first();
        collect([
            [
                'name' => 'Tax 12.00%',
                'type' => Tax::SALES,
                'scope' => Tax::NONE,
                'computation' => Tax::PERCENTAGE_OF_PRICE,
                'amount' => 12,
                'label_on_invoices' => '12.00%',
                'included_in_price' => true,
                'chart_of_account_id' => $salesAccount->id,
            ],
            [
                'name' => 'Tax 12.00%',
                'type' => Tax::PURCHASES,
                'scope' => Tax::NONE,
                'computation' => Tax::PERCENTAGE_OF_PRICE,
                'amount' => 12,
                'label_on_invoices' => '12.00%',
                'included_in_price' => true,
                'chart_of_account_id' => $purchaseAccount->id,
            ],
            [
                'name' => 'None Vat',
                'type' => Tax::SALES,
                'scope' => Tax::NONE,
                'computation' => Tax::PERCENTAGE_OF_PRICE,
                'amount' => 0,
                'label_on_invoices' => '00.00%',
                'included_in_price' => false,
                'chart_of_account_id' => $salesAccount->id,
            ],
            [
                'name' => 'None Vat',
                'type' => Tax::PURCHASES,
                'scope' => Tax::NONE,
                'computation' => Tax::PERCENTAGE_OF_PRICE,
                'amount' => 0,
                'label_on_invoices' => '00.00%',
                'included_in_price' => false,
                'chart_of_account_id' => $purchaseAccount->id,
            ]
        ])->each(fn($datum) => Tax::create($datum));
    }
}
