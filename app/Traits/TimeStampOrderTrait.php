<?php

namespace App\Traits;

trait TimeStampOrderTrait
{
    public function scopeOrderByCreatedAt($query, $order)
    {
        return $query->orderBy('created_at', $order);
    }
}
