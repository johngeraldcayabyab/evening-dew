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

class Payment extends Model implements Sluggable
{
    use HasFactory;
    use SoftDeletes;
    use BroadcastsEvents;
    use FilterTrait;
    use LogsActivity;
    use ModelHelperTrait;
    use NextAndPreviousRecordTrait;

    const SEND_MONEY = 'send_money';
    const RECEIVE_MONEY = 'receive_money';

    const VENDOR = 'vendor';
    const CUSTOMER = 'customer';

    protected $table = 'payments';
    protected $guarded = [];
    protected static $logAttributes = ['*'];

    public static function getPaymentTypes()
    {
        return [self::SEND_MONEY, self::RECEIVE_MONEY];
    }

    public static function getPartnerTypes()
    {
        return [self::VENDOR, self::CUSTOMER];
    }

    public function destinationAccount()
    {
        return $this->belongsTo(ChartOfAccount::class, 'destination_account_id');
    }

    public function currency()
    {
        return $this->belongsTo(Currency::class,);
    }

    public function journal()
    {
        return $this->belongsTo(Journal::class);
    }

    public function bankAccount()
    {
        return $this->belongsTo(BankAccount::class);
    }

    public function slug()
    {
        return 'number';
    }
}
