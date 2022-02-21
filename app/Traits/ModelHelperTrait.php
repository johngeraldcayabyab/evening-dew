<?php

namespace App\Traits;

use Illuminate\Support\Str;

trait ModelHelperTrait
{
    public function scopeMassDelete($query, $ids)
    {
        return $query->whereIn('id', $ids)->delete();
    }

    public function scopeOrderByCreatedAt($query, $order)
    {
        return $query->orderBy('created_at', $order);
    }

    public function like($query, $methodName, $where)
    {
        $methodName = Str::snake(Str::replace('scopeWhere', $methodName, 'scopeWhereName'));
        return $query->where($methodName, 'like', "%$where%");
    }

    public function likeHas($query, $has, $field, $where)
    {
        return $query->whereHas($has, function ($query) use ($field, $where) {
            return $query->where($field, 'like', "%$where%");
        });
    }
}
