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

        $groupBy = $request->group_by;
        $aggregateBy = $request->aggregate_by;
        $aggregateType = $request->aggregate_type;
        if ($groupBy && $aggregateBy && $aggregateType) {
            $originalFields = [$groupBy, DB::raw("{$aggregateType}({$aggregateBy}) as {$aggregateBy}")];
            $query = $query->select($originalFields);
        }

        $query = $this->filterNow($fields, $request, $modelInstance, $query);
        $query = $this->orderNow($request, $modelInstance, $query);
        $pageSize = SystemSetting::PAGE_SIZE;

        if ($groupBy && $aggregateBy && $aggregateType) {
            $query = $query->groupBy($groupBy);
        }

        if ($request->page_size) {
            $pageSize = $request->page_size;
        }
        return $query->paginate($pageSize);
    }

    private function filterNow($fields, $request, $modelInstance, $query)
    {
        foreach ($fields as $field) {
            $requestField = $request->$field;
            if (!$requestField) {
                continue;
            }
            $has = $this->hasRelationGet($modelInstance, $field);
            if ($has) {
                $related = $modelInstance->$has()->getRelated();
                $relatedSlug = $related->slug();
                $relatedField = $this->isParentGet($relatedSlug);
                $query = $query->filterHas([$has, $relatedField, $requestField]);
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
        return $query;
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
        return $query->where($field, 'like', "%$value%");
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

    public function getFields($hasRelation = true)
    {
        $fields = Schema::getColumnListing($this->getTable());
        if ($hasRelation) {
            foreach ($fields as $field) {
                $id = substr($field, -3);
                if ($id === '_id') {
                    $fields[] = str_replace($id, '', $field);
                }
            }
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
}
