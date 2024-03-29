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

class Invoice extends Model implements Sluggable
{
    use AutoLogTrait;
    use HasFactory;
    use SoftDeletes;
    use BroadcastsEvents;
    use FilterTrait;
    use ModelHelperTrait;
    use NextAndPreviousRecordTrait;

    protected $table = 'invoices';
    protected $guarded = [];
    protected static $logAttributes = ['*'];
    protected $casts = [
        'amount_due' => 'double',
    ];

    const DRAFT = 'draft';
    const DONE = 'done';
    const CANCELLED = 'cancelled';

    const REGULAR_INVOICE = 'regular_invoice';
    const DOWN_PAYMENT_PERCENTAGE = 'down_payment_percentage';
    const DOWN_PAYMENT_FIXED = 'down_payment_fixed';

    public static function getTypes()
    {
        return [self::REGULAR_INVOICE, self::DOWN_PAYMENT_PERCENTAGE, self::DOWN_PAYMENT_FIXED];
    }

    public static function getStatuses()
    {
        return [self::DRAFT, self::DONE, self::CANCELLED];
    }

    public function customer()
    {
        return $this->belongsTo(Contact::class, 'customer_id', 'id');
    }

    public function currency()
    {
        return $this->belongsTo(Currency::class);
    }

    public function salesperson()
    {
        return $this->belongsTo(User::class, 'salesperson_id', 'id');
    }

    public function bank()
    {
        return $this->belongsTo(Bank::class);
    }

    public function journal()
    {
        return $this->belongsTo(Journal::class);
    }

    public function invoiceLines()
    {
        return $this->hasMany(InvoiceLine::class);
    }

    public function slug()
    {
        return 'number';
    }
}
