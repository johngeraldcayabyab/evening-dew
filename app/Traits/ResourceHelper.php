<?php

namespace App\Traits;

use App\Data\SystemSetting;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;

trait ResourceHelper
{
    public function defaults($object, $request, $fields)
    {
        $timeStampFormat = 'm/d/Y h:i:s A';
        $defaultFields = $fields;
        if ($request->selected_fields) {
            if (Str::contains($request->url(), $this->getTable())) {
                $selectedFields = explode(',', $request->selected_fields);
                $defaultFields = Arr::only($defaultFields, $selectedFields);
            }
        }
        $defaultFields['id'] = $object->id;
        if ($object->created_at) {
            $defaultFields['created_at'] = $object->created_at->format($timeStampFormat);
        }
        if ($object->updated_at) {
            $defaultFields['updated_at'] = $object->updated_at->format($timeStampFormat);
        }
        if ($object->deleted_at) {
            $defaultFields['deleted_at'] = $object->deleted_at->format($timeStampFormat);
        }
        if ($object->id) {
            $defaultFields['next_record'] = $object->nextRecord($object->id);
            $defaultFields['previous_record'] = $object->previousRecord($object->id);
        }
        return $defaultFields;
    }
}
