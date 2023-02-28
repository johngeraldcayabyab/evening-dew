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

class SalesOrder extends Model implements Sluggable
{
    use HasFactory;
    use SoftDeletes;
    use BroadcastsEvents;
    use FilterTrait;
    use LogsActivity;
    use ModelHelperTrait;
    use NextAndPreviousRecordTrait;

    protected $table = 'sales_orders';
    protected $guarded = [];
    protected static $logAttributes = ['*'];
    protected $casts = [
        'subtotal' => 'double',
    ];

    const DRAFT = 'draft';
    const DONE = 'done';
    const CANCELLED = 'cancelled';

    public static function getStatuses()
    {
        return [self::DRAFT, self::DONE, self::CANCELLED];
    }

    public function customer()
    {
        return $this->belongsTo(Contact::class, 'customer_id', 'id');
    }

    public function invoiceCity()
    {
        return $this->belongsTo(City::class, 'invoice_city_id', 'id');
    }

    public function deliveryCity()
    {
        return $this->belongsTo(City::class, 'delivery_city_id', 'id');
    }

    public function paymentTerm()
    {
        return $this->belongsTo(PaymentTerm::class, 'payment_term_id', 'id');
    }

    public function salesperson()
    {
        return $this->belongsTo(User::class, 'salesperson_id', 'id');
    }

    public function source()
    {
        return $this->belongsTo(Source::class, 'source_id', 'id');
    }

    public function courier()
    {
        return $this->belongsTo(Courier::class, 'courier_id', 'id');
    }

    public function salesOrderLines()
    {
        return $this->hasMany(SalesOrderLine::class);
    }

    public function salesOrderTransfer()
    {
        return $this->hasOne(SalesOrderTransfer::class);
    }

    public function slug()
    {
        return 'number';
    }
}
