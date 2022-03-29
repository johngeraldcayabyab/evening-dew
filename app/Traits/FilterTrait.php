<?php

namespace App\Traits;

use App\Data\SystemSetting;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;
use ReflectionClass;

/**
 * There should be multiple type of filter for
 * string, numbers, id, relationships
 */
trait FilterTrait
{
    public function filterAndOrder($request)
    {
        $model = $this;
        $modelClone = $this;
        $fields = $model->getFields();
        foreach ($fields as $field) {
            if ($request->$field) {
                if (method_exists($modelClone, Str::camel($field))) {
                    $has = Str::camel($field);

                    $model = $model->filterHas([$has, $modelClone->$has()->getRelated()->slug(), $request->$field]);
                } else {
                    $model = $model->filter([$field, $request->$field]);
                }
            }
        }
        if ($request->orderByColumn && $request->orderByDirection) {
            if (method_exists($modelClone, Str::camel($request->orderByColumn))) {
                $field = $request->orderByColumn;
                $field = Str::camel($field);
                $related = $modelClone->$field()->getRelated();
                $relatedField = $related->slug();
                if (Str::contains($relatedField, 'parent')) {
                    $relatedField = explode('.', $relatedField)[1];
                }
                $shing = $related->getTable() . '.id';
                $parentTable = $this->getTable();
                $foreignKey = $modelClone->$field()->getForeignKeyName();
                $model = $model->orderBy($related::select($relatedField)->whereColumn($shing, "$parentTable.$foreignKey"), $request->orderByDirection);
            } else {
                $model = $model->order([$request->orderByColumn, $request->orderByDirection]);
            }
        } else {
            $model = $model->order(['created_at', 'desc']);
        }
        $pageSize = SystemSetting::PAGE_SIZE;
        if ($request->page_size) {
            $pageSize = $request->page_size;
        }
        return $model->paginate($pageSize);
    }

    public function scopeFilter($query, $filter)
    {
        return $query->where($filter[0], 'like', "%$filter[1]%");
    }

    public function scopeFilterHas($query, $filter)
    {
        return $query->whereHas($filter[0], function ($query) use ($filter) {
            return $query->where($filter[1], 'like', "%$filter[2]%");
        });
    }

    public function scopeOrder($query, $filter)
    {
        return $query->orderBy($filter[0], "$filter[1]");
    }

    public function scopeOrderHas($query, $filter)
    {
//        $column = $request->orderByColumn;
//        $related = $modelClone->$column()->getRelated();
//        $relatedField = $related->slug();
//        $shing = $related->getTable() . '.id';
//        $parentTable = $this->getTable();
//        $foreignKey = $modelClone->$column()->getForeignKeyName();
//        $model = $query->orderBy($related::select($relatedField)->whereColumn($shing, "$parentTable.$foreignKey"), $request->orderByDirection);
    }

    public function getFields()
    {
        $fields = Schema::getColumnListing($this->getTable());
        foreach ($fields as $field) {
            $id = substr($field, -3);
            if ($id === '_id') {
                $fields[] = str_replace($id, '', $field);
            }
        }
        return $fields;
    }
}
