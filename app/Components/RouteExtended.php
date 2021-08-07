<?php

namespace App\Components;

use Illuminate\Routing\PendingResourceRegistration;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Str;

class RouteExtended extends Route
{
    public static function apiResource(string $name, string $controller, array $options = []): PendingResourceRegistration
    {
        $controllerName = explode('\\', $controller);
        $controllerName = end($controllerName);
        $modeName = str_replace('Controller', '', $controllerName);
        $model = new ('App\\Models\\' . $modeName)();
        $previous = $model->getTable();
        $new = Str::snake($modeName);

        return parent::apiResource($name, $controller, $options)->parameter($previous, $new);
    }
}
