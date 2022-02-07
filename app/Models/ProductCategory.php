<?php

namespace App\Models;

use App\Traits\TimeStampOrderTrait;
use Illuminate\Database\Eloquent\BroadcastsEvents;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ProductCategory extends Model
{
    use HasFactory;
    use SoftDeletes;
    use BroadcastsEvents;
    use TimeStampOrderTrait;

    protected $table = 'product_category';
    protected $guarded = [];

    public function scopeWhereCategory($query, $category)
    {
        return $query->where('category', 'like', "%$category");
    }
}
