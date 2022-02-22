<?php

namespace App\Traits;

use App\Models\Country;
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

    public function whereId($query, $methodName, $where)
    {
        return $query->where($this->getField($methodName, 'scopeWhere'), $where);
    }

    public function like($query, $methodName, $where)
    {
        return $query->where($this->getField($methodName, 'scopeWhere'), 'like', "%$where%");
    }

    public function likeHas($query, $has, $field, $where)
    {
        return $query->whereHas($has, function ($query) use ($field, $where) {
            return $query->where($field, 'like', "%$where%");
        });
    }

    public function order($query, $methodName, $order)
    {
        return $query->orderBy($this->getField($methodName, 'scopeOrderBy'), $order);
    }

    public function orderHas($query, $has, $field, $foreignKey, $order)
    {
        $table = $has->getTable();
        $parentTable = get_class($this);
        $parentTable = new $parentTable;
        $parentTable = $parentTable->getTable();
        return $query->orderBy($has::select($field)->whereColumn("$table.id", "$parentTable.$foreignKey"), $order);
    }

    private function getField($scopeName, $functionName)
    {
        return Str::snake(Str::replace($functionName, '', $scopeName));
    }
}
