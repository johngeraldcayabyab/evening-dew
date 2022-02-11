<?php

namespace App\Models;

use App\Traits\ModelHelperTrait;
use Illuminate\Database\Eloquent\BroadcastsEvents;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PaymentTerm extends Model
{
    use HasFactory;
    use SoftDeletes;
    use BroadcastsEvents;
    use ModelHelperTrait;

    protected $table = 'payment_terms';
    protected $guarded = [];

    public function getSearchableAndSortableFields()
    {
        return [
            'name',
        ];
    }

    public function scopeWhereName($query, $name)
    {
        return $query->where('name', 'like', "%$name%");
    }

    public function scopeOrderByName($query, $order)
    {
        return $query->orderBy('name', $order);
    }
}
