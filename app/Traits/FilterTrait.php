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
                    $related = $modelClone->$has()->getRelated();
                    $relatedField = $related->slug();
                    if (Str::contains($relatedField, 'parent')) {
                        $relatedField = explode('.', $relatedField)[1];
                    }
                    $model = $model->filterHas([$has, $relatedField, $request->$field]);
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
        $field = $filter[0];
        $value = $filter[1];
        if ($field === 'id') {
            return $query->where($field, $value);
        }
        if ($field === 'created_at' || $field === 'updated_at' || $field === 'deleted_at') {
            return $query->whereBetween($field, explode(',', $value));
        }
        return $query->where($field, 'like', "%$value%");
    }

    public function scopeFilterHas($query, $filter)
    {
        $relationship = $filter[0];
        $field = $filter[1];
        $value = $filter[2];
        return $query->whereHas($relationship, function ($query) use ($field, $value) {
            return $query->where($field, 'like', "%$value%");
        });
    }

    public function scopeOrder($query, $filter)
    {
        return $query->orderBy($filter[0], "$filter[1]");
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
