<?php

namespace App\Models;

use App\Traits\AutoLogTrait;
use App\Traits\FilterTrait;
use App\Traits\ModelHelperTrait;
use App\Traits\NextAndPreviousRecordTrait;
use Illuminate\Database\Eloquent\BroadcastsEvents;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class BillLine extends Model
{
    use AutoLogTrait;
    use HasFactory;
    use SoftDeletes;
    use BroadcastsEvents;
    use FilterTrait;
    use ModelHelperTrait;
    use NextAndPreviousRecordTrait;

    protected $table = 'bill_lines';
    protected $guarded = [];
    protected static $logAttributes = ['*'];
    protected $casts = [
        'quantity' => 'double',
        'unit_price' => 'double',
        'subtotal' => 'double',
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function chartOfAccount()
    {
        return $this->belongsTo(ChartOfAccount::class);
    }

    public function bill()
    {
        return $this->belongsTo(Bill::class);
    }

    public function tax()
    {
        return $this->belongsTo(Tax::class);
    }

    public function scopeMassUpsert($query, $data, $bill)
    {
        $expenseAccount = $bill->journal->expenseChartOfAccount;
        $lines = collect($data)->map(function ($datum) use ($bill, $expenseAccount) {
            $unitPrice = (float)str_replace(',', '', $datum['unit_price']);
            return [
                'id' => $datum['id'] ?? null,
                'product_id' => $datum['product_id'],
                'description' => $datum['description'] ?? null,
                'quantity' => $datum['quantity'],
                'unit_price' => $unitPrice,
                'subtotal' => $unitPrice * $datum['quantity'],
                'chart_of_account_id' => $datum['chart_of_account_id'] ?? $expenseAccount->id,
                'tax_id' => $datum['tax_id'] ?? null,
                'bill_id' => $bill->id,
            ];
        })->toArray();
        $query->upsert($lines, ['id']);
        return $query;
    }
}
