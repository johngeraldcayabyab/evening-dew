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
use App\Models\TransferLine;
use App\Traits\ControllerHelperTrait;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;
use Illuminate\Support\Arr;

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
        $data = $request->validated();
        $transferData = Arr::except($data, ['transfer_lines']);
        $transfer = Transfer::create($transferData);
        if (isset($data['transfer_lines'])) {
            $transferLinesData = $data['transfer_lines'];
            TransferLine::insertMany($transferLinesData, $transfer->id);
        }
        return response()->json([], STATUS_CREATE, $this->locationHeader($transfer));
    }

    public function update(TransferUpdateRequest $request, Transfer $transfer): JsonResponse
    {
        $data = $request->validated();
        $transferData = Arr::except($data, ['transfer_lines']);
        $transfer->update($transferData);
        if (isset($data['transfer_lines'])) {
            $transferLinesData = $data['transfer_lines'];
            TransferLine::updateOrCreateMany($transferLinesData, $transfer->id);
        }
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
        $model = $this->searchOption(new Transfer(), $request);
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
