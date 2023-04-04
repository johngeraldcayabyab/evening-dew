<?php

namespace App\Traits;

use App\Data\SystemSetting;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

/**
 * There should be multiple type of filter for
 * string, numbers, id, relationships
 */
trait FilterTrait
{
    public function filterAndOrder(Request $request)
    {
        $query = $this;
        $modelInstance = $this;
        $fields = $query->getFields();
        $relationships = [];
//        foreach ($fields as $field) {
//            $relationship = $this->hasRelationGet($modelInstance, $field);
//            if ($relationship) {
//                $relationships[] = $relationship;
//            }
//        }
//        if (count($relationships)) {
//            $query = $query->with($relationships);
//        }
        $query = $this->groupNow($request, $query);
        $query = $this->filterNowGlobal($fields, $request, $modelInstance, $query);
        $query = $this->filterNow($fields, $request, $modelInstance, $query);
        $query = $this->hasNow($request, $query);
        $query = $this->orderNow($request, $modelInstance, $query);
        $pageSize = $request->page_size ?? SystemSetting::PAGE_SIZE;
        return $query->paginate($pageSize);
    }

    private function groupNow($request, $query)
    {
        $groupBy = $request->group_by;
        $aggregateBy = $request->aggregate_by;
        $aggregateType = $request->aggregate_type;
        if ($this->hasGroup($request)) {
            $originalFields = [DB::raw("RAND(5) * 5000 as id")];
            $originalFieldsExploded = explode(",", $groupBy);
            foreach ($originalFieldsExploded as $originalFieldExploded) {
                if (Str::contains($originalFieldExploded, 'date')) {
                    $originalFields[] = DB::raw("DATE($originalFieldExploded) as $originalFieldExploded");
                } else {
                    $originalFields[] = $originalFieldExploded;
                }
            }
            $originalFields[] = DB::raw("$aggregateType($aggregateBy) as $aggregateBy");
            $query = $query->select($originalFields);
        }
        if ($this->hasGroup($request)) {
            $groupByExplodes = explode(",", $groupBy);
            $groupBy = [];
            foreach ($groupByExplodes as $groupByExplode) {
                if (Str::contains($groupByExplode, 'date')) {
                    $groupBy[] = DB::raw("DATE($groupByExplode)");
                } else {
                    $groupBy[] = $groupByExplode;
                }
            }
            $query = $query->groupBy($groupBy);
        }
        return $query;
    }

    private function hasNow($request, $query)
    {
        $has = $request->has;
        $hasField = $request->has_field;
        $hasValue = $request->has_value;
        if (!$has || !$hasField || !$hasValue) {
            return $query;
        }
        return $query->whereHas($has, function ($query) use ($hasField, $hasValue) {
            return $query->where($hasField, $hasValue);
        });
    }

    private function filterNow($fields, $request, $modelInstance, $query)
    {
        foreach ($fields as $field) {
            $requestField = $request->$field;
            if (!$requestField) {
                continue;
            }
            $relationship = $this->hasRelationGet($modelInstance, $field);
            if ($relationship) {
                $related = $modelInstance->$relationship()->getRelated();
                $relatedSlug = $related->slug();
                $relatedField = $this->isParentGet($relatedSlug);
                $query = $query->filterHas([$relationship, $relatedField, $requestField]);
                continue;
            }
            $query = $query->filter([$field, $requestField]);
        }
        return $query;
    }

    private function orderNow($request, $modelInstance, $query)
    {
        if ($request->orderByColumn && $request->orderByDirection) {
            $has = $this->hasRelationGet($modelInstance, $request->orderByColumn);
            if ($has) {
                $related = $modelInstance->$has()->getRelated();
                $relatedSlug = $related->slug();
                $relatedField = $this->isParentGet($relatedSlug);
                $shing = $related->getTable() . '.id';
                $parentTable = $this->getTable();
                $foreignKey = $modelInstance->$has()->getForeignKeyName();
                return $query->orderBy($related::select($relatedField)->whereColumn($shing, "$parentTable.$foreignKey"), $request->orderByDirection);
            }
            return $query->order([$request->orderByColumn, $request->orderByDirection]);
        }

        if ($this->hasGroup($request)) {
            return $query;
        }

        return $query->order(['created_at', 'desc']);
    }

    public function scopeFilter($query, $filter)
    {
        $field = $filter[0];
        $value = $filter[1];
        if ($field === 'id' || Str::contains($field, '_id')) {
            return $query->where($field, $value);
        }
        if ($field === 'created_at' || $field === 'updated_at' || $field === 'deleted_at' || Str::contains($field, '_date')) {
            $dateRange = explode(',', $value);
            $from = Carbon::parse($dateRange[0]);
            $to = Carbon::parse($dateRange[1]);
            return $query->whereBetween($field, [$from, $to]);
        }
        return $this->whereLike($query, $field, $value);
    }

    public function scopeFilterHas($query, $filter)
    {
        return $query->whereHas($filter[0], function ($query) use ($filter) {
            return $this->whereLike($query, $filter[1], $filter[2]);
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
            if ($id !== '_id') {
                continue;
            }
            $fields[] = str_replace($id, '', $field);
        }
        return $fields;
    }

    private function hasRelationGet($model, $relation)
    {
        $relation = Str::camel($relation);
        if (method_exists($model, $relation)) {
            return $relation;
        }
        return false;
    }

    private function isParentGet($relatedField)
    {
        if (Str::contains($relatedField, 'parent')) {
            $relatedField = explode('.', $relatedField)[1];
        }
        return $relatedField;
    }

    private function hasGroup($request)
    {
        $groupBy = $request->group_by;
        $aggregateBy = $request->aggregate_by;
        $aggregateType = $request->aggregate_type;
        if ($groupBy && $aggregateBy && $aggregateType) {
            return true;
        }
        return false;
    }

    private function filterNowGlobal($fields, $request, $modelInstance, $query)
    {
        foreach ($fields as $field) {
            $fields[] = "global_" . $field;
        }
        foreach ($fields as $field) {
            $requestField = $request->$field;
            if (!$requestField) {
                continue;
            }
            if (!Str::contains($field, 'global_')) {
                continue;
            }
            $field = Str::remove('global_', $field);
            $has = $this->hasRelationGet($modelInstance, $field);
            if ($has) {
                $related = $modelInstance->$has()->getRelated();
                $relatedSlug = $related->slug();
                $relatedField = $this->isParentGet($relatedSlug);
                $query = $query->filterHasGlobal([$has, $relatedField, $requestField]);
                continue;
            }
            $query = $query->filterGlobal([$field, $requestField]);
        }
        return $query;
    }

    public function scopeFilterGlobal($query, $filter)
    {
        $field = $filter[0];
        $value = $filter[1];
        if ($field === 'created_at' || $field === 'updated_at' || $field === 'deleted_at' || Str::contains($field, '_date')) {
            $dateRange = explode(',', $value);
            $from = Carbon::parse($dateRange[0]);
            $to = Carbon::parse($dateRange[1]);
            return $query->orWhereBetween($field, [$from, $to]);
        }
        return $query->orWhere($field, 'like', "%$value%");
    }

    public function scopeFilterHasGlobal($query, $filter)
    {
        return $query->orWhereHas($filter[0], function ($query) use ($filter) {
            return $this->whereLike($query, $filter[1], $filter[2]);
        });
    }

    private function whereLike($query, $field, $value)
    {
        return $query->where($field, 'like', "%$value%");
    }
}
