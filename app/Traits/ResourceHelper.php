<?php

namespace App\Traits;

use App\Data\SystemSetting;

trait ResourceHelper
{
    public function defaults($object, $resource)
    {
        return array_merge([
            'id' => $object->id,
            'created_at' => $object->created_at->format(SystemSetting::TIME_STAMP_FORMAT),
            'updated_at' => $object->updated_at->format(SystemSetting::TIME_STAMP_FORMAT),
        ], $resource);
    }
}
