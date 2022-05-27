<?php

namespace App\Traits;

trait ModelHelperTrait
{
    public function scopeMassDelete($query, $ids)
    {
        return $query->whereIn('id', $ids)->delete();
    }

    public function scopeNextRecord($query, $id)
    {
        $nextRecord = $query->select('id')->where('id', '>', $id)->orderBy('id', 'asc')->first();
        return $nextRecord ? $nextRecord->id : null;
    }

    public function scopePreviousRecord($query, $id)
    {
        $previousRecord = $query->select('id')->where('id', '<', $id)->orderBy('id', 'desc')->first();
        return $previousRecord ? $previousRecord->id : null;
    }
}
