<?php

namespace App\Traits;

use App\Data\SystemSetting;
use Carbon\Carbon;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

/**
 * There should be multiple type of filter for
 * string, numbers, id, relationships
 */
trait FilterTrait
{
    public function filterAndOrder($request)
    {
//        $selectedFields = explode(',', $request->selected_fields);
        $model = $this;
        $modelClone = $this;
        $modelFields = $model->getFields();
//        $with = [];
//        foreach ($selectedFields as $selectedField) {
//            if ($this->isModelMethod($modelClone, $selectedField)) {
//                $selectedFields[] = $selectedField . "_id";
//                if (($key = array_search($selectedField, $selectedFields)) !== false) {
//                    $with[] = $selectedField;
//                    unset($selectedFields[$key]);
//                }
//            }
//        }
//        $selectedFields[] = 'id';
//        $model = $model->with($with);
        foreach ($modelFields as $modelField) {
            $requestField = $request->$modelField;
            if ($requestField) {
                if ($this->isModelMethod($modelClone, $requestField)) {
                    $has = Str::camel($requestField);
                    $related = $modelClone->$has()->getRelated();
                    $relatedField = $this->isRelationship($related->slug());
                    $model = $model->filterHas([$has, $relatedField, $requestField]);
                } else {
                    $model = $model->filter([$modelField, $requestField]);
                }
            }
        }
        if ($request->orderByColumn && $request->orderByDirection) {
            if ($this->isModelMethod($modelClone, $request->orderByColumn)) {
                $has = Str::camel($request->orderByColumn);
                $related = $modelClone->$has()->getRelated();
                $relatedField = $this->isRelationship($related->slug());
                $hasId = $related->getTable() . '.id';
                $parentTable = $this->getTable();
                $foreignKey = $modelClone->$has()->getForeignKeyName();
                $model = $model->orderBy($related::select($relatedField)->whereColumn($hasId, "{$parentTable}.{$foreignKey}"), $request->orderByDirection);
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
//        if (is_array($selectedFields) && count($selectedFields)) {
//            info($selectedFields);
//            return $model->paginate($pageSize, $selectedFields);
//        }
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
