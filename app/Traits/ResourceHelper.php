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
                $selectedFieldsClone = $selectedFields;
                foreach ($selectedFieldsClone as $selectedField) {
                    foreach ($defaultFields as $key => $defaultField) {
                        if ("{$selectedField}_id" === $key) {
                            $selectedFields[] = $key;
                        }
                    }
                }
                $defaultFields = Arr::only($defaultFields, $selectedFields);
            }
        }
        $defaultFields['id'] = $object->id;
        return $defaultFields;
    }
}
