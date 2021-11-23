<?php

if (!function_exists('get_modules_path')) {
    function get_modules_path($module = null)
    {
        $module = $module ? '\\' . $module : '';
        return app_path("Modules{$module}");
    }
}

if (!function_exists('get_modules')) {
    function get_modules()
    {
        return array_diff(scandir(get_modules_path()), array('..', '.'));
    }
}


if (!function_exists('location_header')) {
    function location_header($route)
    {
        return ['Location' => $route];
    }
}
