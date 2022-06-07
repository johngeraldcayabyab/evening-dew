<?php

namespace App\Traits;

use App\Data\SystemSetting;
use Carbon\Carbon;
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
                if ($this->isModelMethod($modelClone, $field)) {
                    $has = Str::camel($field);
                    $related = $modelClone->$has()->getRelated();
                    $relatedField = $this->isRelationship($related->slug());
                    $model = $model->filterHas([$has, $relatedField, $request->$field]);
                } else {
                    $model = $model->filter([$field, $request->$field]);
                }
            }
        }
        if ($request->orderByColumn && $request->orderByDirection) {
            if ($this->isModelMethod($modelClone, $request->orderByColumn)) {
                $field = $request->orderByColumn;
                $field = Str::camel($field);
                $related = $modelClone->$field()->getRelated();
                $relatedField = $this->isRelationship($related->slug());
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
        if ($field === 'created_at' || $field === 'updated_at' || $field === 'deleted_at' || Str::contains($field, '_date')) {
            $dateRange = explode(',', $value);
            $from = Carbon::parse($dateRange[0]);
            $to = Carbon::parse($dateRange[1]);
            return $query->whereBetween($field, [$from, $to]);
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

    private function isRelationship($relatedField)
    {
        if (Str::contains($relatedField, 'parent')) {
            $relatedField = explode('.', $relatedField)[1];
        }
        return $relatedField;
    }

    private function isModelMethod($model, $string)
    {
        if (method_exists($model, Str::camel($string))) {
            return true;
        }
        return false;
    }
}
