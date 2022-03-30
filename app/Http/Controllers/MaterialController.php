<?php

namespace App\Http\Controllers;

use App\Http\Requests\Store\MaterialStoreRequest;
use App\Http\Requests\Update\MaterialUpdateRequest;
use App\Http\Resources\MaterialResource;
use App\Models\GlobalSetting;
use App\Models\Material;
use App\Models\MaterialLine;
use App\Traits\ControllerHelperTrait;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;
use Illuminate\Support\Arr;

class MaterialController
{
    use ControllerHelperTrait;

    public function index(Request $request): ResourceCollection
    {
        $model = new Material();
        $model = $model->filterAndOrder($request);
        return MaterialResource::collection($model);
    }

    public function show(Material $material): JsonResponse
    {
        return response()->json(new MaterialResource($material));
    }

    public function store(MaterialStoreRequest $request): JsonResponse
    {
        $data = $request->validated();
        $materialData = Arr::except($data, ['material_lines']);
        $material = Material::create($materialData);
        if (isset($data['material_lines'])) {
            $materialLinesData = $data['material_lines'];
            MaterialLine::insertMany($materialLinesData, $material->id);
        }
        return response()->json([], STATUS_CREATE, $this->locationHeader($material));
    }

    public function update(MaterialUpdateRequest $request, Material $material): JsonResponse
    {
        $data = $request->validated();
        $materialData = Arr::except($data, ['material_lines']);
        $material->update($materialData);
        if (isset($data['material_lines'])) {
            $materialLinesData = $data['material_lines'];
            MaterialLine::updateOrCreateMany($materialLinesData, $material->id);
        }
        return response()->json([], STATUS_UPDATE);
    }

    public function destroy(Material $material): JsonResponse
    {
        $material->delete();
        return response()->json([], STATUS_DELETE);
    }

    public function mass_destroy(Request $request): JsonResponse
    {
        $this->massDelete(new Material(), $request);
        return response()->json([], STATUS_DELETE);
    }

    public function initial_values()
    {
        $inventoryDefaultMeasurement = GlobalSetting::latestFirst()->inventoryDefaultMeasurement;
        return [
            'quantity' => 1,
            'measurement_id' => $inventoryDefaultMeasurement->id,
            'material_type' => Material::MANUFACTURE_THIS_PRODUCT,
            'flexible_consumption' => Material::ALLOWED_WITH_WARNING,
            'measurement' => $inventoryDefaultMeasurement,
        ];
    }
}
