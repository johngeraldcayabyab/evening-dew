<?php

namespace App\Models;

use App\Contracts\Sluggable;
use App\Traits\FilterTrait;
use App\Traits\HierarchyTrait;
use App\Traits\ModelHelperTrait;
use App\Traits\NextAndPreviousRecordTrait;
use Illuminate\Database\Eloquent\BroadcastsEvents;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Journal extends Model implements Sluggable
{
    use HasFactory;
    use SoftDeletes;
    use BroadcastsEvents;
    use FilterTrait;
    use HierarchyTrait;
    use ModelHelperTrait;
    use NextAndPreviousRecordTrait;

    const SALES = 'sales';
    const PURCHASE = 'purchase';
    const CASH = 'cash';
    const BANK = 'bank';
    const MISCELLANEOUS = 'miscellaneous';

    protected $table = 'journals';
    protected $guarded = [];
    protected static $logAttributes = ['*'];

    public static function getTypes()
    {
        return [self::SALES, self::PURCHASE, self::CASH, self::BANK, self::MISCELLANEOUS];
    }

    public function currency()
    {
        return $this->belongsTo(Currency::class);
    }

    public function incomeChartOfAccount()
    {
        return $this->belongsTo(ChartOfAccount::class, 'income_chart_of_account_id', 'id');
    }

    public function expenseChartOfAccount()
    {
        return $this->belongsTo(ChartOfAccount::class, 'expense_chart_of_account_id', 'id');
    }

    public function bankChartOfAccount()
    {
        return $this->belongsTo(ChartOfAccount::class, 'bank_chart_of_account_id', 'id');
    }

    public function suspenseChartOfAccount()
    {
        return $this->belongsTo(ChartOfAccount::class, 'suspense_chart_of_account_id', 'id');
    }

    public function cashChartOfAccount()
    {
        return $this->belongsTo(ChartOfAccount::class, 'cash_chart_of_account_id', 'id');
    }

    public function profitChartOfAccount()
    {
        return $this->belongsTo(ChartOfAccount::class, 'profit_chart_of_account_id', 'id');
    }

    public function lossChartOfAccount()
    {
        return $this->belongsTo(ChartOfAccount::class, 'loss_chart_of_account_id', 'id');
    }

    public function outstandingReceiptAccount()
    {
        return $this->belongsTo(ChartOfAccount::class, 'outstanding_receipt_account_id', 'id');
    }

    public function outstandingPaymentAccount()
    {
        return $this->belongsTo(ChartOfAccount::class, 'outstanding_payment_account_id', 'id');
    }

    public function slug()
    {
        return 'name';
    }
}

