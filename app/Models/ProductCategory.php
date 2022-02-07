<?php

namespace App\Models;

use Illuminate\Database\Eloquent\BroadcastsEvents;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ProductCategory extends Model
{
    use HasFactory;
    use SoftDeletes;
    use BroadcastsEvents;

    protected $table = 'product_category';
    protected $guarded = [];

    public function scopeWhereCategory($query, $category)
    {
        return $query->where('category', 'like', "%$category");
    }

    public function scopeOrderByCreatedAt($query, $order)
    {
        return $query->orderBy('created_at', $order);
    }
}
