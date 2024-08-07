<?php

namespace App\Services;

use App\Contracts\Generator;
use App\Data\SystemSetting;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Str;
use ReflectionClass;

class Router implements Generator
{
    public static function generate($controller)
    {
        $controllerPath = get_class(new $controller);
        $model = Str::replace(['App\Http\Controllers\\', 'Controller'], '', $controllerPath);
        $modelPath = "App\Models\\" . $model;
        $modelInstance = new $modelPath();
        $plural = $modelInstance->getTable();
        $singular = Str::snake($model);
        Route::controller($controller)->prefix($plural)->group(function () use ($controller, $controllerPath, $plural, $singular) {
            $f = new ReflectionClass($controller);
            $methods = $f->getMethods();
            $initialValues = SystemSetting::INITIAL_VALUES;
            $slug = SystemSetting::SLUG;
            $show = SystemSetting::SHOW;
            $update = SystemSetting::UPDATE;
            $clone = SystemSetting::CLONE;
            $destroy = SystemSetting::DESTROY;
            $massDestroy = SystemSetting::MASS_DESTROY;
            $store = SystemSetting::STORE;
            $index = SystemSetting::INDEX;
            if (self::findMethod($methods, SystemSetting::INITIAL_VALUES, $controllerPath)) {
                Route::get("/{$initialValues}", $initialValues)->name("{$plural}.{$initialValues}");
            }
            if (self::findMethod($methods, SystemSetting::SLUG, $controllerPath)) {
                Route::get("/{{$singular}}/{$slug}", $slug)->name("{$plural}.{$slug}");
            }
            if (self::findMethod($methods, SystemSetting::SHOW, $controllerPath)) {
                Route::get("/{{$singular}}", $show)->name("{$plural}.{$show}");
            }
            if (self::findMethod($methods, SystemSetting::UPDATE, $controllerPath)) {
                Route::put("/{{$singular}}", $update)->name("{$plural}.{$update}");
            }
            if (self::findMethod($methods, SystemSetting::CLONE, $controllerPath)) {
                Route::post("/{{$singular}}/clone", $clone)->name("{$plural}.{$clone}");
            }
            if (self::findMethod($methods, SystemSetting::DESTROY, $controllerPath)) {
                Route::delete("/{{$singular}}", $destroy)->name("{$plural}.{$massDestroy}");
            }
            if (self::findMethod($methods, SystemSetting::MASS_DESTROY, $controllerPath)) {
                Route::post("/{$massDestroy}", $massDestroy);
            }
            if (self::findMethod($methods, SystemSetting::STORE, $controllerPath)) {
                Route::post("", $store)->name("{$plural}.{$store}");
            }
            if (self::findMethod($methods, SystemSetting::INDEX, $controllerPath)) {
                Route::get("", $index)->name("{$plural}.{$index}");
            }
        });
    }

    private static function findMethod($methods, $specificMethod, $controllerPath)
    {
        foreach ($methods as $method) {
            if ($method->class !== $controllerPath) {
                continue;
            }
            if ($method->name === $specificMethod) {
                return true;
            }
        }
        return false;
    }
}
