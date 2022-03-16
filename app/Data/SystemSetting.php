<?php

namespace App\Data;

class SystemSetting
{
    const OPTION_LIMIT = 10;
    const PAGE_SIZE = 80;
    const TIME_STAMP_FORMAT = 'm/d/Y h:i:s A';
    const DATE_TIME_FORMAT = 'Y-m-d H:i:s';
    const INITIAL_VALUES = 'initial_values';
    const OPTION = 'option';
    const SLUG = 'slug';
    const SHOW = 'show';
    const UPDATE = 'update';
    const DESTROY = 'destroy';
    const MASS_DESTROY = 'mass_destroy';
    const STORE = 'store';
    const INDEX = 'index';

    public static function getRoutes()
    {
        return [
            self::INITIAL_VALUES,
            self::OPTION,
            self::SLUG,
            self::SHOW,
            self::UPDATE,
            self::DESTROY,
            self::MASS_DESTROY,
            self::STORE,
            self::INDEX
        ];
    }
}
