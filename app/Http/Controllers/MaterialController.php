<?php

namespace App\Http\Controllers;

use App\Http\Requests\MaterialRequest;
use App\Http\Resources\MaterialResource;
use App\Models\Material;
use App\Models\MaterialLine;
use App\Models\Measurement;
use App\Traits\ControllerHelperTrait;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;
use Illuminate\Support\Arr;

class MaterialController extends Controller
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

    public function store(MaterialRequest $request): JsonResponse
    {
        $data = $request->validated();
        $materialData = Arr::except($data, ['material_lines']);
        $material = Material::create($materialData);
        if (isset($data['material_lines'])) {
            $materialLinesData = $data['material_lines'];
            MaterialLine::massUpsert($materialLinesData, $material);
        }
        return $this->responseCreate($material);
    }

    public function update(MaterialRequest $request, Material $material): JsonResponse
    {
        $data = $request->validated();
        $materialData = Arr::except($data, ['material_lines', 'material_lines_deleted']);
        $material->update($materialData);
        if (isset($data['material_lines'])) {
            $materialLinesData = $data['material_lines'];
            MaterialLine::massUpsert($materialLinesData, $material);
        }
        if (isset($data['material_lines_deleted'])) {
            MaterialLine::massDelete(collect($data['material_lines_deleted'])->pluck('id'));
        }
        return $this->responseUpdate();
    }

    public function destroy(Material $material): JsonResponse
    {
        $material->delete();
        return $this->responseDelete();
    }

    public function mass_destroy(Request $request): JsonResponse
    {
        $this->massDelete(new Material(), $request);
        return $this->responseDelete();
    }

    public function initial_values()
    {
        $defaultMeasurement = Measurement::default();
        return [
            'quantity' => 1,
            'measurement_id' => $defaultMeasurement->id,
            'material_type' => Material::MANUFACTURE_THIS_PRODUCT,
            'flexible_consumption' => Material::ALLOWED_WITH_WARNING,
            'measurement' => $defaultMeasurement,
        ];
    }
}
