<?php

namespace App\Http\Controllers;

use App\Data\SystemSetting;

class SystemSettingController
{
    public function system_settings()
    {
        return response()->json(['hello' => 'monkeh']);
    }
}
