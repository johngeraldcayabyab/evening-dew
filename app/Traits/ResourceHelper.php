<?php

namespace App\Traits;

use App\Data\SystemSetting;
use Illuminate\Support\Arr;

trait ResourceHelper
{
    public function defaults($object, $request, $resource)
    {
        $mergedResource = array_merge([
            'id' => $object->id,
            'created_at' => $object->created_at->format(SystemSetting::TIME_STAMP_FORMAT),
            'updated_at' => $object->updated_at->format(SystemSetting::TIME_STAMP_FORMAT),
        ], $resource);
        if ($request->selected_fields) {
            $mergedResource = Arr::only($mergedResource, explode(',', $request->selected_fields));
        }
        return $mergedResource;
    }
}
