<?php

namespace App\Services;

use App\Contacts\Generator;
use App\Data\SystemSetting;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Str;
use ReflectionClass;

class RouteGenerator implements Generator
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
        Route::middleware('auth:sanctum')->group(function () use ($controller) {
            $f = new ReflectionClass($controller);
            $methods = $f->getMethods();
            $plural = self::$plural;
            $singular = self::$singular;
            $initialValues = SystemSetting::INITIAL_VALUES;
            $slug = SystemSetting::SLUG;
            $show = SystemSetting::SHOW;
            $update = SystemSetting::UPDATE;
            $destroy = SystemSetting::DESTROY;
            $massDestroy = SystemSetting::MASS_DESTROY;
            $store = SystemSetting::STORE;
            $index = SystemSetting::INDEX;
            $controllerInstance = new $controller;
            if (self::findMethod($methods, SystemSetting::INITIAL_VALUES, $controllerInstance)) {
                Route::get("{$plural}/{$initialValues}", [$controller, $initialValues])->name("{$plural}.{$initialValues}");
            }
            if (self::findMethod($methods, SystemSetting::SLUG, $controllerInstance)) {
                Route::get("{$plural}/{{$singular}}/{$slug}", [$controller, $slug])->name("{$plural}.{$slug}");
            }
            if (self::findMethod($methods, SystemSetting::SHOW, $controllerInstance)) {
                Route::get("{$plural}/{{$singular}}", [$controller, $show])->name("{$plural}.{$show}");
            }
            if (self::findMethod($methods, SystemSetting::UPDATE, $controllerInstance)) {
                Route::put("{$plural}/{{$singular}}", [$controller, $update])->name("{$plural}.{$update}");
            }
            if (self::findMethod($methods, SystemSetting::DESTROY, $controllerInstance)) {
                Route::delete("{$plural}/{{$singular}}", [$controller, $destroy])->name("{$plural}.{$destroy}");
            }
            if (self::findMethod($methods, SystemSetting::MASS_DESTROY, $controllerInstance)) {
                Route::post("{$plural}/{$massDestroy}", [$controller, $massDestroy])->name("{$plural}.{$massDestroy}");
            }
            if (self::findMethod($methods, SystemSetting::STORE, $controllerInstance)) {
                Route::post("{$plural}", [$controller, $store])->name("{$plural}.{$store}");
            }
            if (self::findMethod($methods, SystemSetting::INDEX, $controllerInstance)) {
                Route::get("{$plural}", [$controller, $index])->name("{$plural}.{$index}");
            }
        });
    }

    public static function generateCustom($controller, $controllerMethod, $httpMethod, $uri, $routeName)
    {
        Route::middleware('auth:sanctum')->group(function () use ($controller, $controllerMethod, $httpMethod, $uri, $routeName) {
            if ($httpMethod === 'GET') {
                Route::get($uri, [$controller, $controllerMethod])->name($routeName);
            }
            if ($httpMethod === 'POST') {
                Route::post($uri, [$controller, $controllerMethod])->name($routeName);
            }
            if ($httpMethod === 'PUT') {
                Route::put($uri, [$controller, $controllerMethod])->name($routeName);
            }
            if ($httpMethod === 'DELETE') {
                Route::delete($uri, [$controller, $controllerMethod])->name($routeName);
            }
        });
    }

    private static function findMethod($methods, $specificMethod, $controllerInstance)
    {
        foreach ($methods as $method) {
            if ($method->class == get_class($controllerInstance)) {
                if ($method->name === $specificMethod) {
                    return true;
                }
            }
        }
        return false;
    }
}
