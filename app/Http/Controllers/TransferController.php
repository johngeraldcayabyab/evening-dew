<?php

namespace App\Http\Controllers;

use App\Data\SystemSetting;
use App\Events\MatchTransferToSalesOrderLine;
use App\Events\TransferValidatedEvent;
use App\Http\Requests\TransferRequest;
use App\Http\Resources\TransferResource;
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
        $model = $model->filterAndOrder($request);
        return TransferResource::collection($model);
    }

    public function show(Transfer $transfer): JsonResponse
    {
        return response()->json(new TransferResource($transfer));
    }

    public function store(TransferRequest $request): JsonResponse
    {
        $data = $request->validated();
        $transferData = Arr::except($data, ['transfer_lines']);
        $transfer = Transfer::create($transferData);
        if (isset($data['transfer_lines'])) {
            $transferLinesData = $data['transfer_lines'];
            TransferLine::updateOrCreateMany($transferLinesData, $transfer->id);
        }
        if ($transfer->status === Transfer::DONE) {
            TransferValidatedEvent::dispatch($transfer);
        }
        return response()->json([], STATUS_CREATE, $this->locationHeader($transfer));
    }

    public function update(TransferRequest $request, Transfer $transfer): JsonResponse
    {
        $data = $request->validated();
        $transferData = Arr::except($data, ['transfer_lines', 'transfer_lines_deleted']);
        $transfer->update($transferData);
        if (isset($data['transfer_lines'])) {
            $transferLinesData = $data['transfer_lines'];
            TransferLine::updateOrCreateMany($transferLinesData, $transfer->id);
        }
        if (isset($data['transfer_lines_deleted'])) {
            TransferLine::massDelete(collect($data['transfer_lines_deleted'])->pluck('id'));
        }
        if ($transfer->status === Transfer::DONE) {
            TransferValidatedEvent::dispatch($transfer);
        }
        MatchTransferToSalesOrderLine::dispatch($transfer);
        return response()->json([], STATUS_UPDATE);
    }

    public function destroy(Transfer $transfer): JsonResponse
    {
        $transfer->delete();
        return response()->json([], STATUS_DELETE);
    }

    public function mass_destroy(Request $request): JsonResponse
    {
        $this->massDelete(new Transfer(), $request);
        return response()->json([], STATUS_DELETE);
    }

    public function initial_values()
    {
        return [
            'responsible_id' => auth()->user()->id,
            'responsible' => auth()->user(),
            'scheduled_date' => now()->format(SystemSetting::DATE_TIME_FORMAT),
            'shipping_policy' => Transfer::AS_SOON_AS_POSSIBLE,
            'status' => Transfer::DRAFT,
        ];
    }
}
