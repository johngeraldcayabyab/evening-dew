<?php

namespace App\Traits;


use App\Data\SystemSetting;
use Illuminate\Http\JsonResponse;

trait ControllerHelperTrait
{
    public function responseCreate($model = null): JsonResponse
    {
        if ($model) {
            $newResourceLocation = $this->locationHeader($model);
            return response()->json([], SystemSetting::STATUS_CREATE, $newResourceLocation);
        }
        return response()->json([], SystemSetting::STATUS_CREATE);
    }

    public function locationHeader($model): array
    {
        $route = route("{$model->getTable()}.show", $model);
        return ['Location' => $route];
    }

    public function responseUpdate(): JsonResponse
    {
        return response()->json([], SystemSetting::STATUS_UPDATE);
    }

    public function responseDelete(): JsonResponse
    {
        return response()->json([], SystemSetting::STATUS_DELETE);
    }

    public function massDelete($model, $request): void
    {
        $tableName = $model->getTable();
        $model::massDelete($request->validate([
            'ids.*' => "exists:$tableName,id"
        ])['ids']);
    }
}
