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


if (!function_exists('implode_types')) {
    function implode_types($types)
    {
        return implode(',', $types);
    }
}

if (!function_exists('avatar_filter')) {
    function avatar_filter($avatar)
    {
        if (filter_var($avatar, FILTER_VALIDATE_URL)) {
            $parsedUrl = parse_url($avatar);
            $path = explode('/', $parsedUrl['path']);
            return end($path);
        }
        return $avatar;
    }
}
