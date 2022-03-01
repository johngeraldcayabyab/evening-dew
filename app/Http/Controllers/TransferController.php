<?php

namespace App\Http\Controllers;

use App\Data\SystemSetting;
use App\Http\Requests\MassDestroy\TransferMassDestroyRequest;
use App\Http\Requests\Store\TransferStoreRequest;
use App\Http\Requests\Update\TransferUpdateRequest;
use App\Http\Resources\Collection\TransferCollection;
use App\Http\Resources\Resource\TransferResource;
use App\Http\Resources\Slug\TransferSlugResource;
use App\Models\Transfer;
use App\Traits\ControllerHelperTrait;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class TransferController
{
    use ControllerHelperTrait;

    public function index(Request $request): ResourceCollection
    {
        $model = new Transfer();
        $model = $this->searchSortThenPaginate($model, $request);
        return new TransferCollection($model);
    }

    public function show(Transfer $transfer): JsonResponse
    {
        return response()->json(new TransferResource($transfer));
    }

    public function store(TransferStoreRequest $request): JsonResponse
    {
        return response()->json([], STATUS_CREATE, $this->locationHeader(Transfer::create($request->validated())));
    }

    public function update(TransferUpdateRequest $request, Transfer $transfer): JsonResponse
    {
        $transfer->update($request->validated());
        return response()->json([], STATUS_UPDATE);
    }

    public function destroy(Transfer $transfer): JsonResponse
    {
        $transfer->delete();
        return response()->json([], STATUS_DELETE);
    }

    public function mass_destroy(TransferMassDestroyRequest $request): JsonResponse
    {
        Transfer::massDelete($request->validated()['ids']);
        return response()->json([], STATUS_DELETE);
    }

    public function slug(Transfer $transfer): JsonResponse
    {
        return response()->json(new TransferSlugResource($transfer));
    }

    public function option(Request $request): JsonResponse
    {
        $model = new Transfer();
        if ($request->search) {
            $model = $model->where('reference', 'like', "%$request->search%");
        }
        $model = $model->limit(SystemSetting::OPTION_LIMIT)->get(['id', 'reference']);
        return response()->json(TransferSlugResource::collection($model));
    }

    public function initial_values()
    {
        return [
            'scheduled_date' => now()->format(SystemSetting::DATE_TIME_FORMAT),
            'shipping_policy' => Transfer::AS_SOON_AS_POSSIBLE,
        ];
    }
}
