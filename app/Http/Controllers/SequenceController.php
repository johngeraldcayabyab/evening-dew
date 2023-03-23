<?php

namespace App\Http\Controllers;

use App\Data\SystemSetting;
use App\Http\Requests\SequenceRequest;
use App\Http\Resources\SequenceResource;
use App\Models\Sequence;
use App\Traits\ControllerHelperTrait;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class SequenceController extends Controller
{
    use ControllerHelperTrait;

    public function index(Request $request): ResourceCollection
    {
        $model = new Sequence();
        $model = $model->filterAndOrder($request);
        return SequenceResource::collection($model);
    }

    public function show(Sequence $sequence): JsonResponse
    {
        return response()->json(new SequenceResource($sequence));
    }

    public function store(SequenceRequest $request): JsonResponse
    {
        return $this->responseCreate(Sequence::create($request->validated()));
    }

    public function update(SequenceRequest $request, Sequence $sequence): JsonResponse
    {
        $sequence->update($request->validated());
        return response()->json([], SystemSetting::STATUS_UPDATE);
    }

    public function destroy(Sequence $sequence): JsonResponse
    {
        $sequence->delete();
        return $this->responseDelete();
    }

    public function mass_destroy(Request $request): JsonResponse
    {
        $this->massDelete(new Sequence(), $request);
        return $this->responseDelete();
    }

    public function initial_values()
    {
        return [
            'implementation' => Sequence::STANDARD,
            'sequence_size' => 6,
            'step' => 1,
            'next_number' => 0,
        ];
    }
}
