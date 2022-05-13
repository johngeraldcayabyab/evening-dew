<?php

namespace App\Models;

use App\Contracts\Sluggable;
use App\Traits\FilterTrait;
use App\Traits\ModelHelperTrait;
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

    protected $table = 'sales_orders';
    protected $guarded = [];
    protected static $logAttributes = ['*'];

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

    public function invoiceAddress()
    {
        return $this->belongsTo(Address::class, 'invoice_address_id', 'id');
    }

    public function deliveryAddress()
    {
        return $this->belongsTo(Address::class, 'delivery_address_id', 'id');
    }

    public function paymentTerm()
    {
        return $this->belongsTo(PaymentTerm::class, 'payment_term_id', 'id');
    }

    public function salesperson()
    {
        return $this->belongsTo(User::class, 'salesperson_id', 'id');
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
