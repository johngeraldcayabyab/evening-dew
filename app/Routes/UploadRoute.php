<?php

namespace App\Routes;

use App\Http\Controllers\UploadController;
use Illuminate\Support\Facades\Route;

class UploadRoute
{
    public static function initialize()
    {
        Route::middleware('auth:sanctum')->group(function () {
            Route::post('uploads/images', [UploadController::class, 'image']);
        });
    }
}
