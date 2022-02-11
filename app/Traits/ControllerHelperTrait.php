<?php

namespace App\Traits;

use Illuminate\Support\Str;

trait ControllerHelperTrait
{
    public function searchThenSort($model, $request)
    {
        $searchableAndSortableFields = $model->getSearchableAndSortableFields();
        $searchableFields = $searchableAndSortableFields;
        $sortableFields = $searchableFields;
        $sortableFields[] = 'created_at';
        $model = $this->search($model, $request, $searchableFields);
        return $this->sort($model, $request, $sortableFields);
    }

    private function search($model, $request, $fields = [])
    {
        return $this->isSearchField($model, $request, $fields);
    }

    private function sort($model, $request, $fields = [])
    {
        if ($this->isSort($request)) {
            $model = $this->isSortField($model, $request, $fields);
        } else {
            $model = $model->orderByCreatedAt('desc');
        }
        return $model;
    }

    private function isSearchField($model, $request, $fields)
    {
        foreach ($fields as $field) {
            if ($request->$field) {
                $funcName = "where" . Str::studly($field);
                $model = $model->$funcName($request->$field);
            }
        }
        return $model;
    }

    private function isSort($request)
    {
        if ($request->orderByColumn && $request->orderByDirection) {
            return true;
        }
        return false;
    }

    private function isSortField($model, $request, $fields)
    {
        foreach ($fields as $field) {
            if ($request->orderByColumn === $field) {
                $funcName = "orderBy" . Str::studly($field);
                $model = $model->$funcName($request->orderByDirection);
            }
        }
        return $model;
    }
}
