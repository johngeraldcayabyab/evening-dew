<?php

namespace App\Traits;

use Illuminate\Support\Arr;
use Illuminate\Support\Str;

trait ResourceHelper
{
    public function defaults($object, $request, $resource)
    {
        $timeStampFormat = 'm/d/Y h:i:s A';
        $selectedResource = $this->getSelectedFieldsOnly($request, $resource);
        $selectedResource['id'] = $object->id;
        if ($object->created_at) {
            $selectedResource['created_at'] = $object->created_at->format($timeStampFormat);
        }
        if ($object->updated_at) {
            $selectedResource['updated_at'] = $object->updated_at->format($timeStampFormat);
        }
        if ($object->deleted_at) {
            $selectedResource['deleted_at'] = $object->deleted_at->format($timeStampFormat);
        }
        if ($object->id) {
            $selectedResource['next_record'] = $object->nextRecord($object->id);
            $selectedResource['previous_record'] = $object->previousRecord($object->id);
        }
        return $selectedResource;
    }

    private function getSelectedFieldsOnly($request, $resource)
    {
        $selectedResourceFields = $resource;
        if ($request->selected_fields) {
            if ($this->isRequestForTable($request)) {
                $selectedFields = explode(',', $request->selected_fields);
                $selectedResourceFields = Arr::only($selectedResourceFields, $selectedFields);
            }
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
