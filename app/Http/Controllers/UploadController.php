<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UploadController
{
    public function image(Request $request)
    {
        $fileName = sha1(now()->toString() . $request->file('avatar')->getFilename()) . '.' . $request->file('avatar')->guessExtension();
        info($request->file('avatar')->storeAs('images', $fileName));
    }
}
