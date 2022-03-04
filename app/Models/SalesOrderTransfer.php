<?php

namespace App\Models;

use App\Traits\ModelHelperTrait;
use Illuminate\Database\Eloquent\BroadcastsEvents;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class SalesOrderTransfer extends Model
{
    use HasFactory;
    use SoftDeletes;
    use BroadcastsEvents;
    use ModelHelperTrait;

    protected $table = 'sales_order_transfers';
    protected $guarded = [];

    public function salesOrder()
    {
        return $this->belongsTo(SalesOrder::class);
    }

    public function transfer()
    {
        return $this->belongsTo(Transfer::class);
    }

    public function scopeWhereSalesOrderId($query, $where)
    {
        return $this->whereSingle($query, __FUNCTION__, $where);
    }

    public function scopeWhereTransferId($query, $where)
    {
        return $this->whereSingle($query, __FUNCTION__, $where);
    }

    public function scopeOrderBySalesOrderId($query, $order)
    {
        return $this->order($query, __FUNCTION__, $order);
    }

    public function scopeOrderByTransferId($query, $order)
    {
        return $this->order($query, __FUNCTION__, $order);
    }
}
