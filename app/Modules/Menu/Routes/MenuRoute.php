<?php

namespace App\Modules\Menu\Routes;

use App\Modules\Menu\Controllers\MenuController;
use Illuminate\Support\Facades\Route;

class MenuRoute
{
    public static function initialize()
    {
        Route::get('menus/{menu}/slug', [MenuController::class, 'slug'])->name('menus.slug');
        Route::get('menus/{menu}', [MenuController::class, 'show'])->name('menus.show');
        Route::put('menus/{menu}', [MenuController::class, 'update'])->name('menus.update');
        Route::delete('menus/{menu}', [MenuController::class, 'destroy'])->name('menus.destroy');
        Route::post('menus/mass_destroy', [MenuController::class, 'mass_destroy'])->name('menus.mass_destroy');
        Route::post('menus', [MenuController::class, 'store'])->name('menus.store');
        Route::get('menus', [MenuController::class, 'index'])->name('menus.index');
    }
}
