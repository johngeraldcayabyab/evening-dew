<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;

class UploadController extends Controller
{
    public function image(Request $request)
    {
        $fileName = sha1(now()->toString() . $request->file('avatar')->getFilename()) . '.' . $request->file('avatar')->guessExtension();
        $request->file('avatar')->storeAs('public/images', $fileName);

        return response()->json([
            'uid' => Str::uuid(),
            'name' => $fileName,
            'status' => 'done',
            'url' => asset("storage/images/${fileName}"),
            'thumbUrl' => asset("storage/images/${fileName}"),
        ]);
    }
}
