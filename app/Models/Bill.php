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

class Bill extends Model implements Sluggable
{
    use HasFactory;
    use SoftDeletes;
    use BroadcastsEvents;
    use FilterTrait;
    use LogsActivity;
    use ModelHelperTrait;
    use NextAndPreviousRecordTrait;

    protected $table = 'bills';
    protected $guarded = [];
    protected static $logAttributes = ['*'];
    protected $casts = [
        'amount_due' => 'total',
    ];

    const DRAFT = 'draft';
    const DONE = 'done';
    const CANCELLED = 'cancelled';

    public static function getStatuses()
    {
        return [self::DRAFT, self::DONE, self::CANCELLED];
    }

    public function vendor()
    {
        return $this->belongsTo(Contact::class, 'vendor_id', 'id');
    }

    public function bank()
    {
        return $this->belongsTo(Bank::class);
    }

    public function paymentTerm()
    {
        return $this->belongsTo(PaymentTerm::class);
    }

    public function journal()
    {
        return $this->belongsTo(Journal::class);
    }

    public function currency()
    {
        return $this->belongsTo(Currency::class);
    }

//    public function invoiceLines()
//    {
//        return $this->hasMany(InvoiceLine::class);
//    }

    public function slug()
    {
        return 'number';
    }
}
