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
        $transactionLines = [];
        $date = now();
        foreach ($data as $datum) {
            $transactionLine = [
                'product_id' => $datum['product_id'],
                'description' => isset($datum['description']) ? $datum['description'] : null,
                'demand' => $datum['demand'],
                'measurement_id' => $datum['measurement_id'],
                'transfer_id' => $transferId,
                'created_at' => $date,
                'updated_at' => $date,
            ];
            $transactionLines[] = $transactionLine;
        }
        $query->insert($transactionLines);
        return $query;
    }

    public function scopeUpdateOrCreateMany($query, $data, $transferId)
    {
        $transactionLines = [];
        $date = now();
        foreach ($data as $datum) {
            $transactionLine = [
                'id' => isset($datum['id']) ? $datum['id'] : null,
                'product_id' => $datum['product_id'],
                'description' => isset($datum['description']) ? $datum['description'] : null,
                'demand' => $datum['demand'],
                'measurement_id' => $datum['measurement_id'],
                'transfer_id' => $transferId,
                'updated_at' => $date,
            ];
            if (isset($datum['id'])) {
                $transactionLine['created_at'] = $date;
            }
            $transactionLines[] = $transactionLine;
        }
        $query->upsert($transactionLines, ['id']);
        return $query;
    }
}
