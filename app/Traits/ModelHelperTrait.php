<?php

namespace App\Traits;

trait ModelHelperTrait
{
    public function scopeMassDelete($query, $ids)
    {
        return $query->whereIn('id', $ids)->delete();
    }

    public function scopeSqlRaw($query)
    {
        $raw = str_replace(array('?'), array('\'%s\''), $query->toSql());
        $raw = vsprintf($raw, $query->getBindings());
        $raw = str_replace("'", '', $raw);
        return str_replace("`", '', $raw);
    }
}
