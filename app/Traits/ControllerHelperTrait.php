<?php

namespace App\Traits;

trait ControllerHelperTrait
{
    public function locationHeader($model)
    {
        $route = route("{$model->getTable()}.show", $model);
        return ['Location' => $route];
    }
}
