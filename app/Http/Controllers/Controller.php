<?php

namespace App\Http\Controllers;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Str;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function persistCreate(FormRequest $request, Model $model)
    {
        $validated = $request->validated();
        return $model->create($validated);
    }

    public function persistUpdate(FormRequest $request, Model $model)
    {
        $validated = $request->validated();
        return $model->update($validated);
    }

    public function responseCreate(Model $model)
    {
        $tableName = $model->getTable();
        $parameter = get_class($model);
        $parameter = explode('\\', $parameter);
        $parameter = end($parameter);
        $parameter = Str::snake($parameter);
        return response()->json([], 201, [
            'Location' => "/$tableName/$model->id"
//            'Location' => route("$tableName.show", [$parameter => $model->id])
        ]);
    }

    public function responseRead($resource)
    {
        return response()->json($resource);
    }

    public function responseUpdate()
    {
        return response()->json([], 204);
    }

    public function responseDelete()
    {
        return response()->json([], 204);
    }
}
