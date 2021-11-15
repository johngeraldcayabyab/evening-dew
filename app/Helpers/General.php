<?php

if (!function_exists('get_modules_path')) {
    function get_modules_path()
    {
        return app_path('Modules');
    }
}

if (!function_exists('get_modules')) {
    function get_modules()
    {
        return array_diff(scandir(get_modules_path()), array('..', '.'));
    }
}
