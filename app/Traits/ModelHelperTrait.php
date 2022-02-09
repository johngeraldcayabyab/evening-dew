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
}
