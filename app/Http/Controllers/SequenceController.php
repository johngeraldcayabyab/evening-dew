<?php

namespace App\Http\Controllers;

use App\Data\SystemSetting;
use App\Http\Query\SequenceQuery;
use App\Http\Requests\MassDestroy\SequenceMassDestroyRequest;
use App\Http\Requests\Store\SequenceStoreRequest;
use App\Http\Requests\Update\SequenceUpdateRequest;
use App\Http\Resources\Collection\SequenceCollection;
use App\Http\Resources\Resource\SequenceResource;
use App\Http\Resources\Slug\SequenceSlugResource;
use App\Models\Sequence;
use App\Traits\ControllerHelperTrait;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class SequenceController
{
    use ControllerHelperTrait;

    public function index(Request $request): ResourceCollection
    {
        $model = new Sequence();
        $model = $this->searchThenSort($model, $request);
        return new SequenceCollection($model->paginate(SystemSetting::PAGE_SIZE));
    }

    public function show(Sequence $sequence): JsonResponse
    {
        return response()->json(new SequenceResource($sequence));
    }

    public function store(SequenceStoreRequest $request): JsonResponse
    {
        $headers = ['Location' => route('sequences.show', Sequence::create($request->validated()))];
        return response()->json([], STATUS_CREATE, $headers);
    }

    public function update(SequenceUpdateRequest $request, Sequence $sequence): JsonResponse
    {
        $sequence->update($request->validated());
        return response()->json([], STATUS_UPDATE);
    }

    public function destroy(Sequence $sequence): JsonResponse
    {
        $sequence->delete();
        return response()->json([], STATUS_DELETE);
    }

    public function mass_destroy(SequenceMassDestroyRequest $request): JsonResponse
    {
        Sequence::massDelete($request->validated()['ids']);
        return response()->json([], STATUS_DELETE);
    }

    public function slug(Sequence $sequence): JsonResponse
    {
        return response()->json(new SequenceSlugResource($sequence));
    }

    public function initial_values()
    {
        return [
            'implementation' => Sequence::STANDARD,
            'sequence_size' => 0,
            'step' => 1,
            'next_number' => 0,
        ];
    }
}
