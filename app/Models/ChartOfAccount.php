<?php

namespace App\Models;

use App\Contracts\Sluggable;
use App\Traits\AutoLogTrait;
use App\Traits\FilterTrait;
use App\Traits\ModelHelperTrait;
use App\Traits\NextAndPreviousRecordTrait;
use Illuminate\Database\Eloquent\BroadcastsEvents;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ChartOfAccount extends Model implements Sluggable
{
    use AutoLogTrait;
    use HasFactory;
    use SoftDeletes;
    use BroadcastsEvents;
    use FilterTrait;
    use ModelHelperTrait;
    use NextAndPreviousRecordTrait;

    protected $table = 'chart_of_accounts';
    protected $guarded = [];
    protected static $logAttributes = ['*'];

    const RECEIVABLE = "receivable";
    const BANK_AND_CASH = "bank_and_cash";
    const CURRENT_ASSETS = "current_assets";
    const NON_CURRENT_ASSETS = "non_current_assets";
    const PREPAYMENTS = "prepayments";
    const FIXED_ASSETS = "fixed_assets";
    const PAYABLE = "payable";
    const CREDIT_CARD = "credit_card";
    const CURRENT_LIABILITIES = "current_liabilities";
    const NON_CURRENT_LIABILITIES = "non_current_liabilities";
    const EQUITY = "equity";
    const CURRENT_YEAR_EARNINGS = "current_year_earnings";
    const INCOME = "income";
    const OTHER_INCOME = "other_income";
    const EXPENSES = "expenses";
    const DEPRECIATION = "depreciation";
    const COST_OF_REVENUE = "cost_of_revenue";
    const OFF_BALANCE_SHEET = "off_balance_sheet";

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
        return 'code';
    }
}
