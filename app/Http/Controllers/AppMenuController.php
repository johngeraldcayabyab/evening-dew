<?php

namespace App\Http\Controllers;

use App\Http\Resources\Resource\AppMenuResource;
use App\Models\AppMenu;

class AppMenuController
{
    public function show(AppMenu $appMenu)
    {
        return response()->json(new AppMenuResource($appMenu));
    }
}
