<?php

namespace App\Models;

use App\Contracts\Sluggable;
use App\Traits\FilterTrait;
use App\Traits\ModelHelperTrait;
use App\Traits\NextAndPreviousRecordTrait;
use Illuminate\Database\Eloquent\BroadcastsEvents;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Activitylog\Traits\LogsActivity;

class ChartOfAccount extends Model implements Sluggable
{
    use HasFactory;
    use SoftDeletes;
    use BroadcastsEvents;
    use FilterTrait;
    use LogsActivity;
    use ModelHelperTrait;
    use NextAndPreviousRecordTrait;

    protected $table = 'chart_of_accounts';
    protected $guarded = [];
    protected static $logAttributes = ['*'];

    const RECEIVABLE = "Receivable";
    const BANK_AND_CASH = "Bank and Cash";
    const CURRENT_ASSETS = "Current Assets";
    const NON_CURRENT_ASSETS = "Non-current Assets";
    const PREPAYMENTS = "Prepayments";
    const FIXED_ASSETS = "Fixed Assets";
    const PAYABLE = "Payable";
    const CREDIT_CARD = "Credit Card";
    const CURRENT_LIABILITIES = "Current Liabilities";
    const NON_CURRENT_LIABILITIES = "Non-current Liabilities";
    const EQUITY = "Equity";
    const CURRENT_YEAR_EARNINGS = "Current Year Earnings";
    const INCOME = "Income";
    const OTHER_INCOME = "Other Income";
    const EXPENSES = "Expenses";
    const DEPRECIATION = "Depreciation";
    const COST_OF_REVENUE = "Cost of Revenue";
    const OFF_BALANCE_SHEET = "Off-Balance Sheet";

    public static function getTypes()
    {
        return [
            self::RECEIVABLE,
            self::BANK_AND_CASH,
            self::CURRENT_ASSETS,
            self::NON_CURRENT_ASSETS,
            self::PREPAYMENTS,
            self::FIXED_ASSETS,
            self::PAYABLE,
            self::CREDIT_CARD,
            self::CURRENT_LIABILITIES,
            self::NON_CURRENT_LIABILITIES,
            self::EQUITY,
            self::CURRENT_YEAR_EARNINGS,
            self::INCOME,
            self::OTHER_INCOME,
            self::EXPENSES,
            self::DEPRECIATION,
            self::COST_OF_REVENUE,
            self::OFF_BALANCE_SHEET,
        ];
    }

    public function currency()
    {
        return $this->belongsTo(Currency::class);
    }

    public function slug()
    {
        return 'account_number';
    }
}
