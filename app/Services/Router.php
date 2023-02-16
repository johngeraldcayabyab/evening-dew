<?php

namespace App\Services;

use App\Contracts\Generator;
use App\Data\SystemSetting;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Str;
use ReflectionClass;

class Router implements Generator
{
    private static $plural;
    private static $singular;

    public function __construct($model = null)
    {
        if ($model) {
            $model = new $model;
            self::$plural = $model->getTable();
            self::$singular = Str::snake(Str::replace('App\Models\\', '', get_class($model)));
        }
    }

    public static function generate($controller)
    {
        $plural = self::$plural;
        Route::prefix($plural)->group(function () use ($controller) {
            $f = new ReflectionClass($controller);
            $methods = $f->getMethods();
            $singular = self::$singular;
            $initialValues = SystemSetting::INITIAL_VALUES;
            $slug = SystemSetting::SLUG;
            $show = SystemSetting::SHOW;
            $update = SystemSetting::UPDATE;
            $destroy = SystemSetting::DESTROY;
            $massDestroy = SystemSetting::MASS_DESTROY;
            $store = SystemSetting::STORE;
            $index = SystemSetting::INDEX;
            $controllerInstance = get_class(new $controller);
            if (self::findMethod($methods, SystemSetting::INITIAL_VALUES, $controllerInstance)) {
                Route::get("/{$initialValues}", [$controller, $initialValues]);
            }
            if (self::findMethod($methods, SystemSetting::SLUG, $controllerInstance)) {
                Route::get("/{{$singular}}/{$slug}", [$controller, $slug]);
            }
            if (self::findMethod($methods, SystemSetting::SHOW, $controllerInstance)) {
                Route::get("/{{$singular}}", [$controller, $show]);
            }
            if (self::findMethod($methods, SystemSetting::UPDATE, $controllerInstance)) {
                Route::put("/{{$singular}}", [$controller, $update]);
            }
            if (self::findMethod($methods, SystemSetting::DESTROY, $controllerInstance)) {
                Route::delete("/{{$singular}}", [$controller, $destroy]);
            }
            if (self::findMethod($methods, SystemSetting::MASS_DESTROY, $controllerInstance)) {
                Route::post("/{$massDestroy}", [$controller, $massDestroy]);
            }
            if (self::findMethod($methods, SystemSetting::STORE, $controllerInstance)) {
                Route::post("", [$controller, $store]);
            }
            if (self::findMethod($methods, SystemSetting::INDEX, $controllerInstance)) {
                Route::get("", [$controller, $index]);
            }
        });
    }

    private static function findMethod($methods, $specificMethod, $controllerInstance)
    {
        foreach ($methods as $method) {
            if ($method->class !== $controllerInstance) {
                continue;
            }
            if ($method->name === $specificMethod) {
                return true;
            }
        }
        return false;
    }
}
