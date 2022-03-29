<?php

namespace App\Models;

use App\Traits\ModelHelperTrait;
use Illuminate\Database\Eloquent\BroadcastsEvents;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Activitylog\Traits\LogsActivity;

class AdjustmentLine extends Model
{
    use HasFactory;
    use SoftDeletes;
    use BroadcastsEvents;
    use ModelHelperTrait;
    use LogsActivity;

    protected $table = 'adjustment_lines';
    protected $guarded = [];
    protected static $logAttributes = ['*'];

    public function adjustment()
    {
        return $this->belongsTo(Adjustment::class);
    }

    public function location()
    {
        return $this->belongsTo(Location::class);
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function measurement()
    {
        return $this->belongsTo(Measurement::class);
    }

    public function scopeWhereAdjustmentId($query, $where)
    {
        return $this->whereSingle($query, __FUNCTION__, $where);
    }

    public function scopeWhereLocationId($query, $where)
    {
        return $this->whereSingle($query, __FUNCTION__, $where);
    }

    public function scopeWhereProductId($query, $where)
    {
        return $this->whereSingle($query, __FUNCTION__, $where);
    }

    public function scopeWhereMeasurementId($query, $where)
    {
        return $this->whereSingle($query, __FUNCTION__, $where);
    }

    public function scopeWhereQuantityOnHand($query, $where)
    {
        return $this->like($query, __FUNCTION__, $where);
    }

    public function scopeWhereQuantityCounted($query, $where)
    {
        return $this->like($query, __FUNCTION__, $where);
    }

    public function scopeOrderByAdjustmentId($query, $order)
    {
        return $this->order($query, __FUNCTION__, $order);
    }

    public function scopeOrderByLocationId($query, $order)
    {
        return $this->order($query, __FUNCTION__, $order);
    }

    public function scopeOrderByProductId($query, $order)
    {
        return $this->order($query, __FUNCTION__, $order);
    }

    public function scopeOrderByMeasurementId($query, $order)
    {
        return $this->order($query, __FUNCTION__, $order);
    }

    public function scopeOrderByQuantityOnHand($query, $order)
    {
        return $this->order($query, __FUNCTION__, $order);
    }

    public function scopeOrderByQuantityCounted($query, $order)
    {
        return $this->order($query, __FUNCTION__, $order);
    }

    public function scopeWhereAdjustment($query, $where)
    {
        return $this->likeHas($query, __FUNCTION__, 'number', $where);
    }

    public function scopeWhereLocation($query, $where)
    {
        return $this->likeHas($query, __FUNCTION__, 'number', $where);
    }

    public function scopeWhereProduct($query, $where)
    {
        return $this->likeHas($query, __FUNCTION__, 'name', $where);
    }

    public function scopeWhereMeasurement($query, $where)
    {
        return $this->likeHas($query, __FUNCTION__, 'name', $where);
    }

    public function scopeOrderByAdjustment($query, $order)
    {
        return $this->orderHas($query, new Adjustment(), 'number', __FUNCTION__, $order);
    }

    public function scopeOrderByLocation($query, $order)
    {
        return $this->orderHas($query, new Location(), 'name', __FUNCTION__, $order);
    }

    public function scopeOrderByProduct($query, $order)
    {
        return $this->orderHas($query, new Product(), 'name', __FUNCTION__, $order);
    }


    public function scopeOrderByMeasurement($query, $order)
    {
        return $this->orderHas($query, new Measurement(), 'name', __FUNCTION__, $order);
    }

    public function scopeInsertMany($query, $data, $materialId)
    {
        $materialLines = [];
        $date = now();
        foreach ($data as $datum) {
            $transactionLine = [
                'product_id' => $datum['product_id'],
                'quantity' => $datum['quantity'],
                'measurement_id' => $datum['measurement_id'],
                'material_id' => $materialId,
                'created_at' => $date,
                'updated_at' => $date,
            ];
            $materialLines[] = $transactionLine;
        }
        $query->insert($materialLines);
        return $query;
    }

    public function scopeUpdateOrCreateMany($query, $data, $materialId)
    {
        $materialLines = [];
        $date = now();
        foreach ($data as $datum) {
            $transactionLine = [
                'id' => isset($datum['id']) ? $datum['id'] : null,
                'product_id' => $datum['product_id'],
                'quantity' => $datum['quantity'],
                'measurement_id' => $datum['measurement_id'],
                'material_id' => $materialId,
                'updated_at' => $date,
            ];
            if (isset($datum['id'])) {
                $transactionLine['created_at'] = $date;
            }
            $materialLines[] = $transactionLine;
        }
        $query->upsert($materialLines, ['id']);
        return $query;
    }
}
