<?php

namespace App\Modules\Menu\Routes;

use App\Modules\Menu\Controllers\MenuController;
use Illuminate\Support\Facades\Route;

class MenuRoute
{
    public static function initialize()
    {
        Route::get('menus/{menu}/slug', [MenuController::class, 'slug']);
        Route::get('menus/{menu}', [MenuController::class, 'show']);
        Route::put('menus/{menu}', [MenuController::class, 'update']);
        Route::delete('menus/{menu}', [MenuController::class, 'destroy']);
        Route::post('menus', [MenuController::class, 'store']);
        Route::get('menus', [MenuController::class, 'index']);
    }
}
