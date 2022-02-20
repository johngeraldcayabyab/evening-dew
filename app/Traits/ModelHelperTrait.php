<?php

namespace App\Traits;

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

    public function like($query, $field, $where)
    {
        return $query->where($field, 'like', "%$where%");
    }

    public function likeHas($query, $has, $field, $where)
    {
        return $query->whereHas($has, function ($query) use ($field, $where) {
            return $query->where($field, 'like', "%$where%");
        });
    }
}
