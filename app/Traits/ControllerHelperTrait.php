<?php

namespace App\Traits;


trait ControllerHelperTrait
{
    public function locationHeader($model)
    {
        $route = route("{$model->getTable()}.show", $model);
        return ['Location' => $route];
    }

    public function massDelete($model, $request): void
    {
        $tableName = $model->getTable();
        $model::massDelete($request->validate([
            'ids.*' => "exists:$tableName,id"
        ])['ids']);
    }
}
