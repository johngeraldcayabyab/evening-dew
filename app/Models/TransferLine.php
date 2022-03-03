<?php

namespace App\Models;

use App\Traits\ModelHelperTrait;
use Illuminate\Database\Eloquent\BroadcastsEvents;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class TransferLine extends Model
{
    use HasFactory;
    use SoftDeletes;
    use BroadcastsEvents;
    use ModelHelperTrait;

    protected $table = 'transfer_lines';
    protected $guarded = [];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function measurement()
    {
        return $this->belongsTo(Measurement::class);
    }

    public function transfer()
    {
        return $this->belongsTo(Transfer::class);
    }

    public function scopeWhereProductId($query, $where)
    {
        return $this->whereSingle($query, __FUNCTION__, $where);
    }

    public function scopeWhereDescription($query, $where)
    {
        return $this->like($query, __FUNCTION__, $where);
    }

    public function scopeWhereDemand($query, $where)
    {
        return $this->like($query, __FUNCTION__, $where);
    }

    public function scopeWhereMeasurementId($query, $where)
    {
        return $this->whereSingle($query, __FUNCTION__, $where);
    }

    public function scopeWhereTransferId($query, $where)
    {
        return $this->whereSingle($query, __FUNCTION__, $where);
    }

    public function scopeOrderByProductId($query, $order)
    {
        return $this->order($query, __FUNCTION__, $order);
    }

    public function scopeOrderByDescription($query, $order)
    {
        return $this->order($query, __FUNCTION__, $order);
    }

    public function scopeOrderByDemand($query, $order)
    {
        return $this->order($query, __FUNCTION__, $order);
    }

    public function scopeOrderByMeasurementId($query, $order)
    {
        return $this->order($query, __FUNCTION__, $order);
    }

    public function scopeOrderByTransferId($query, $order)
    {
        return $this->order($query, __FUNCTION__, $order);
    }

    public function scopeWhereProduct($query, $where)
    {
        return $this->likeHas($query, __FUNCTION__, 'name', $where);
    }

    public function scopeWhereMeasurement($query, $where)
    {
        return $this->likeHas($query, __FUNCTION__, 'name', $where);
    }

    public function scopeWhereTransfer($query, $where)
    {
        return $this->likeHas($query, __FUNCTION__, 'reference', $where);
    }

    public function scopeInsertMany($query, $data, $transferId)
    {
        $transferLines = [];
        foreach ($data as $datum) {
            $transferLine = new TransferLine();
            $transferLine->product_id = $datum['product_id'];
            $transferLine->description = isset($datum['description']) ? $datum['description'] : null;
            $transferLine->demand = $datum['demand'];
            $transferLine->measurement_id = $datum['measurement_id'];
            $transferLine->transfer_id = $transferId;
            $transferLines[] = $transferLine->attributesToArray();
        }
        $query->insert($transferLines);
    }

    public function scopeUpdateOrCreateMany($query, $data, $transferId)
    {
        $transferLines = [];
        foreach ($data as $datum) {
            $transferLine = new SalesOrderLine();
            $transferLine->id = isset($datum['id']) ? $datum['id'] : null;
            $transferLine->product_id = $datum['product_id'];
            $transferLine->description = isset($datum['description']) ? $datum['description'] : null;
            $transferLine->demand = $datum['demand'];
            $transferLine->measurement_id = $datum['measurement_id'];
            $transferLine->transfer_id = $transferId;
            $transferLines[] = $transferLine->attributesToArray();
        }
        $query->upsert($transferLines, ['id']);
    }
}
