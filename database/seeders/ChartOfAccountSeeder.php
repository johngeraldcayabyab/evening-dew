<?php

namespace Database\Seeders;

use App\Models\ChartOfAccount;
use Illuminate\Database\Seeder;

class ChartOfAccountSeeder extends Seeder
{
    public function run()
    {
        collect([
            ['code' => '101000', 'name' => 'Current Assets', 'type' => ChartOfAccount::CURRENT_ASSETS, 'allow_reconciliation' => false],
            ['code' => '101300', 'name' => 'Account Receivable', 'type' => ChartOfAccount::RECEIVABLE, 'allow_reconciliation' => true],
            ['code' => '101401', 'name' => 'Bank Suspense Account', 'type' => ChartOfAccount::CURRENT_LIABILITIES, 'allow_reconciliation' => false],
            ['code' => '101402', 'name' => 'Bank', 'type' => ChartOfAccount::BANK_AND_CASH, 'allow_reconciliation' => false],
            ['code' => '101403', 'name' => 'Outstanding Receipts', 'type' => ChartOfAccount::CURRENT_ASSETS, 'allow_reconciliation' => true],
            ['code' => '101404', 'name' => 'Outstanding Payments', 'type' => ChartOfAccount::CURRENT_ASSETS, 'allow_reconciliation' => true],
            ['code' => '101501', 'name' => 'Cash', 'type' => ChartOfAccount::BANK_AND_CASH, 'allow_reconciliation' => false],
            ['code' => '101502', 'name' => 'Outstanding Receipts', 'type' => ChartOfAccount::CURRENT_ASSETS, 'allow_reconciliation' => true],
            ['code' => '101503', 'name' => 'Outstanding Payments', 'type' => ChartOfAccount::CURRENT_ASSETS, 'allow_reconciliation' => true],
            ['code' => '101701', 'name' => 'Liquidity Transfer', 'type' => ChartOfAccount::CURRENT_ASSETS, 'allow_reconciliation' => true],
            ['code' => '110100', 'name' => 'Stock Valuation', 'type' => ChartOfAccount::CURRENT_ASSETS, 'allow_reconciliation' => false],
            ['code' => '110200', 'name' => 'Stock Interim (Received)', 'type' => ChartOfAccount::CURRENT_ASSETS, 'allow_reconciliation' => true],
            ['code' => '110300', 'name' => 'Stock Interim (Delivered)', 'type' => ChartOfAccount::CURRENT_ASSETS, 'allow_reconciliation' => true],
            ['code' => '121000', 'name' => 'Account Receivable', 'type' => ChartOfAccount::RECEIVABLE, 'allow_reconciliation' => true],
            ['code' => '121100', 'name' => 'Products to receive', 'type' => ChartOfAccount::CURRENT_ASSETS, 'allow_reconciliation' => true],
            ['code' => '131000', 'name' => 'Tax Paid', 'type' => ChartOfAccount::CURRENT_ASSETS, 'allow_reconciliation' => false],
            ['code' => '132000', 'name' => 'Tax Receivable', 'type' => ChartOfAccount::CURRENT_ASSETS, 'allow_reconciliation' => false],
            ['code' => '141000', 'name' => 'Prepayments', 'type' => ChartOfAccount::PREPAYMENTS, 'allow_reconciliation' => false],
            ['code' => '151000', 'name' => 'Fixed Asset', 'type' => ChartOfAccount::FIXED_ASSETS, 'allow_reconciliation' => false],
            ['code' => '191000', 'name' => 'Non-current assets', 'type' => ChartOfAccount::NON_CURRENT_ASSETS, 'allow_reconciliation' => false],
            ['code' => '201000', 'name' => 'Current Liabilities', 'type' => ChartOfAccount::CURRENT_LIABILITIES, 'allow_reconciliation' => false],
            ['code' => '211000', 'name' => 'Account Payable', 'type' => ChartOfAccount::PAYABLE, 'allow_reconciliation' => true],
            ['code' => '211100', 'name' => 'Bills to receive', 'type' => ChartOfAccount::CURRENT_LIABILITIES, 'allow_reconciliation' => true],
            ['code' => '251000', 'name' => 'Tax Received', 'type' => ChartOfAccount::CURRENT_LIABILITIES, 'allow_reconciliation' => false],
            ['code' => '252000', 'name' => 'Tax Payable', 'type' => ChartOfAccount::CURRENT_LIABILITIES, 'allow_reconciliation' => false],
            ['code' => '291000', 'name' => 'Non-current Liabilities', 'type' => ChartOfAccount::NON_CURRENT_LIABILITIES, 'allow_reconciliation' => false],
            ['code' => '301000', 'name' => 'Capital', 'type' => ChartOfAccount::EQUITY, 'allow_reconciliation' => false],
            ['code' => '302000', 'name' => 'Dividends', 'type' => ChartOfAccount::EQUITY, 'allow_reconciliation' => false],
            ['code' => '400000', 'name' => 'Product Sales', 'type' => ChartOfAccount::INCOME, 'allow_reconciliation' => false],
            ['code' => '441000', 'name' => 'Foreign Exchange Gain', 'type' => ChartOfAccount::INCOME, 'allow_reconciliation' => false],
            ['code' => '442000', 'name' => 'Cash Difference Gain', 'type' => ChartOfAccount::INCOME, 'allow_reconciliation' => false],
            ['code' => '450000', 'name' => 'Other Income', 'type' => ChartOfAccount::OTHER_INCOME, 'allow_reconciliation' => false],
            ['code' => '500000', 'name' => 'Cost of Goods Sold', 'type' => ChartOfAccount::COST_OF_REVENUE, 'allow_reconciliation' => false],
            ['code' => '600000', 'name' => 'Expenses', 'type' => ChartOfAccount::EXPENSES, 'allow_reconciliation' => false],
            ['code' => '611000', 'name' => 'Purchase of Equipments', 'type' => ChartOfAccount::EXPENSES, 'allow_reconciliation' => false],
            ['code' => '612000', 'name' => 'Rent', 'type' => ChartOfAccount::EXPENSES, 'allow_reconciliation' => false],
            ['code' => '620000', 'name' => 'Bank Fees', 'type' => ChartOfAccount::EXPENSES, 'allow_reconciliation' => false],
            ['code' => '630000', 'name' => 'Salary Expenses', 'type' => ChartOfAccount::EXPENSES, 'allow_reconciliation' => false],
            ['code' => '641000', 'name' => 'Foreign Exchange Loss', 'type' => ChartOfAccount::EXPENSES, 'allow_reconciliation' => false],
            ['code' => '642000', 'name' => 'Cash Difference Loss', 'type' => ChartOfAccount::EXPENSES, 'allow_reconciliation' => false],
            ['code' => '961000', 'name' => 'RD Expenses', 'type' => ChartOfAccount::EXPENSES, 'allow_reconciliation' => false],
            ['code' => '962000', 'name' => 'Sales Expenses', 'type' => ChartOfAccount::EXPENSES, 'allow_reconciliation' => false],
            ['code' => '999999', 'name' => 'Undistributed Profits/Losses', 'type' => ChartOfAccount::CURRENT_YEAR_EARNINGS, 'allow_reconciliation' => false],
        ])->each(fn($datum) => ChartOfAccount::create($datum));
    }
}
