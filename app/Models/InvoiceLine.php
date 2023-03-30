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

class InvoiceLine extends Model
{
    use AutoLogTrait;
    use HasFactory;
    use SoftDeletes;
    use BroadcastsEvents;
    use FilterTrait;
    use ModelHelperTrait;
    use NextAndPreviousRecordTrait;

    protected $table = 'invoice_lines';
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

    public function invoice()
    {
        return $this->belongsTo(Invoice::class);
    }

    public function scopeMassUpsert($query, $data, $invoice)
    {
        $incomeAccount = $invoice->journal->incomeChartOfAccount;
        $lines = collect($data)->map(function ($datum) use ($invoice, $incomeAccount) {
            $unitPrice = (float)str_replace(',', '', $datum['unit_price']);
            return [
                'id' => $datum['id'] ?? null,
                'product_id' => $datum['product_id'],
                'description' => $datum['description'] ?? null,
                'quantity' => $datum['quantity'],
                'unit_price' => $unitPrice,
                'subtotal' => $unitPrice * $datum['quantity'],
                'chart_of_account_id' => $datum['chart_of_account_id'] ?? $incomeAccount->id,
                'invoice_id' => $invoice->id,
            ];
        })->toArray();
        $query->upsert($lines, ['id']);
        return $query;
    }
}
