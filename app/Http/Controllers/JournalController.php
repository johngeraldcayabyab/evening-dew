<?php

namespace App\Http\Controllers;

use App\Events\JournalCreated;
use App\Http\Requests\JournalRequest;
use App\Http\Resources\JournalResource;
use App\Models\Journal;
use App\Traits\ControllerHelperTrait;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class JournalController extends Controller
{
    use ControllerHelperTrait;

    public function index(Request $request): ResourceCollection
    {
        $model = new Journal();
        $model = $model->filterAndOrder($request);
        return JournalResource::collection($model);
    }

    public function show(Journal $journal): JsonResponse
    {
        return response()->json(new JournalResource($journal));
    }

    public function store(JournalRequest $request): JsonResponse
    {
        $journal = Journal::create($request->validated());
        JournalCreated::dispatch($journal);
        return $this->responseCreate($journal);
    }

    public function update(JournalRequest $request, Journal $journal): JsonResponse
    {
        $journal->update($request->validated());
        return $this->responseUpdate();
    }

    public function destroy(Journal $journal): JsonResponse
    {
        $journal->delete();
        return $this->responseDelete();
    }

    public function mass_destroy(Request $request): JsonResponse
    {
        $this->massDelete(new Journal(), $request);
        return $this->responseDelete();
    }
}
