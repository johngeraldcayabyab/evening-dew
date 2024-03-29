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

class SalesOrder extends Model implements Sluggable
{
    use AutoLogTrait;
    use HasFactory;
    use SoftDeletes;
    use BroadcastsEvents;
    use FilterTrait;
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

    const PERCENTAGE = 'percentage';
    const FIXED = 'fixed';

    public static function getStatuses()
    {
        return [self::DRAFT, self::DONE, self::CANCELLED];
    }

    public static function getDiscountTypes()
    {
        return [self::PERCENTAGE, self::FIXED];
    }

    public function customer()
    {
        return $this->belongsTo(Contact::class, 'customer_id', 'id');
    }

    public function pricelist()
    {
        return $this->belongsTo(Pricelist::class, 'pricelist_id', 'id');
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

    public function transfers()
    {
        return $this->hasMany(Transfer::class, 'source_document', 'number');
    }

    public function invoices()
    {
        return $this->hasMany(Invoice::class, 'source_document', 'number');
    }

    public function slug()
    {
        return 'number';
    }
}
