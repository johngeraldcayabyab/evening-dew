<?php

namespace App\Traits;

use App\Data\SystemSetting;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;

trait ResourceHelper
{
    public function defaults($object, $request, $fields)
    {
        $defaultFields = array_merge([
            'created_at' => $object->created_at->format(SystemSetting::TIME_STAMP_FORMAT),
            'updated_at' => $object->updated_at->format(SystemSetting::TIME_STAMP_FORMAT),
        ], $fields);
        if ($request->selected_fields) {
            if (Str::contains($request->url(), $this->getTable())) {
                $selectedFields = explode(',', $request->selected_fields);
                $defaultFields = Arr::only($defaultFields, $selectedFields);
            }
        }
        $defaultFields['id'] = $object->id;

        if ($object->id) {
            $defaultFields['next_record'] = $object->nextRecord($object->id);
            $defaultFields['previous_record'] = $object->previousRecord($object->id);
        }

        return $defaultFields;
    }

//    public function
}
