<?php

namespace App\Traits;

use Illuminate\Support\Arr;
use Illuminate\Support\Str;

trait ResourceHelper
{
    public function defaults($object, $request, $resource)
    {
        $timeStampFormat = 'm/d/Y h:i:s A';
        $filteredResource = $this->filterResource($request, $resource);
        $filteredResource['id'] = $object->id;
        if ($object->created_at) {
            $filteredResource['created_at'] = $object->created_at->format($timeStampFormat);
        }
        if ($object->updated_at) {
            $filteredResource['updated_at'] = $object->updated_at->format($timeStampFormat);
        }
        if ($object->deleted_at) {
            $filteredResource['deleted_at'] = $object->deleted_at->format($timeStampFormat);
        }
        if ($object->id) {
            $filteredResource['next_record'] = $object->nextRecord($object->id);
            $filteredResource['previous_record'] = $object->previousRecord($object->id);
        }
        return $filteredResource;
    }

    private function filterResource($request, $resource)
    {
        $selectedResourceFields = $resource;
        if (!$request->selected_fields) {
            return $selectedResourceFields;
        }
        if ($this->isRequestForTable($request)) {
            $selectedFields = explode(',', $request->selected_fields);
            $selectedResourceFields = Arr::only($selectedResourceFields, $selectedFields);
        }
        return $selectedResourceFields;
    }

    private function isRequestForTable($request)
    {
        if (Str::contains($request->url(), $this->getTable())) {
            return true;
        }
        return false;
    }
}
