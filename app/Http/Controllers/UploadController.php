<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;

class UploadController
{
    public function image(Request $request)
    {
        info($request->file('avatar')->store(Str::uuid()));
    }
}
