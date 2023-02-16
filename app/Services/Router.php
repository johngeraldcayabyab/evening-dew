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
        Route::prefix($plural)->group(function () use ($controller, $controllerPath, $singular) {
            $f = new ReflectionClass($controller);
            $methods = $f->getMethods();
            $initialValues = SystemSetting::INITIAL_VALUES;
            $slug = SystemSetting::SLUG;
            $show = SystemSetting::SHOW;
            $update = SystemSetting::UPDATE;
            $destroy = SystemSetting::DESTROY;
            $massDestroy = SystemSetting::MASS_DESTROY;
            $store = SystemSetting::STORE;
            $index = SystemSetting::INDEX;
            if (self::findMethod($methods, SystemSetting::INITIAL_VALUES, $controllerPath)) {
                Route::get("/{$initialValues}", [$controller, $initialValues]);
            }
            if (self::findMethod($methods, SystemSetting::SLUG, $controllerPath)) {
                Route::get("/{{$singular}}/{$slug}", [$controller, $slug]);
            }
            if (self::findMethod($methods, SystemSetting::SHOW, $controllerPath)) {
                Route::get("/{{$singular}}", [$controller, $show]);
            }
            if (self::findMethod($methods, SystemSetting::UPDATE, $controllerPath)) {
                Route::put("/{{$singular}}", [$controller, $update]);
            }
            if (self::findMethod($methods, SystemSetting::DESTROY, $controllerPath)) {
                Route::delete("/{{$singular}}", [$controller, $destroy]);
            }
            if (self::findMethod($methods, SystemSetting::MASS_DESTROY, $controllerPath)) {
                Route::post("/{$massDestroy}", [$controller, $massDestroy]);
            }
            if (self::findMethod($methods, SystemSetting::STORE, $controllerPath)) {
                Route::post("", [$controller, $store]);
            }
            if (self::findMethod($methods, SystemSetting::INDEX, $controllerPath)) {
                Route::get("", [$controller, $index]);
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
