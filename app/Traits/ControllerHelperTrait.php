<?php

namespace App\Traits;


use App\Data\SystemSetting;

trait ControllerHelperTrait
{
    public function responseCreate($model = null)
    {
        if ($model) {
            $newResourceLocation = $this->locationHeader($model);
            return response()->json([], SystemSetting::STATUS_CREATE, $newResourceLocation);
        }
        return response()->json([], SystemSetting::STATUS_CREATE);
    }

    public function locationHeader($model)
    {
        $route = route("{$model->getTable()}.show", $model);
        return ['Location' => $route];
    }

    public function responseUpdate()
    {
        return response()->json([], SystemSetting::STATUS_UPDATE);
    }

    public function responseDelete()
    {

    }

    public function massDelete($model, $request): void
    {
        $tableName = $model->getTable();
        $model::massDelete($request->validate([
            'ids.*' => "exists:$tableName,id"
        ])['ids']);
    }
}
