<?php

namespace App\Http\Controllers;

use App\Data\SystemSetting;
use App\Http\Requests\MassDestroy\PaymentTermMassDestroyRequest;
use App\Http\Requests\Store\PaymentTermStoreRequest;
use App\Http\Requests\Update\PaymentTermUpdateRequest;
use App\Http\Resources\Collection\PaymentTermCollection;
use App\Http\Resources\Resource\PaymentTermResource;
use App\Http\Resources\Slug\PaymentTermSlugResource;
use App\Models\PaymentTerm;
use App\Traits\ControllerHelperTrait;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class PaymentTermController
{
    use ControllerHelperTrait;

    public function index(Request $request): ResourceCollection
    {
        $model = new PaymentTerm();
        $model = $this->searchSortThenPaginate($model, $request);
        return new PaymentTermCollection($model);
    }

    public function show(PaymentTerm $paymentTerm): JsonResponse
    {
        return response()->json(new PaymentTermResource($paymentTerm));
    }

    public function store(PaymentTermStoreRequest $request): JsonResponse
    {
        return response()->json([], STATUS_CREATE, $this->locationHeader(PaymentTerm::create($request->validated())));
    }

    public function update(PaymentTermUpdateRequest $request, PaymentTerm $paymentTerm): JsonResponse
    {
        $paymentTerm->update($request->validated());
        return response()->json([], STATUS_UPDATE);
    }

    public function destroy(PaymentTerm $paymentTerm): JsonResponse
    {
        $paymentTerm->delete();
        return response()->json([], STATUS_DELETE);
    }

    public function mass_destroy(PaymentTermMassDestroyRequest $request): JsonResponse
    {
        PaymentTerm::massDelete($request->validated()['ids']);
        return response()->json([], STATUS_DELETE);
    }

    public function slug(PaymentTerm $paymentTerm): JsonResponse
    {
        return response()->json(new PaymentTermSlugResource($paymentTerm));
    }

    public function option(Request $request): JsonResponse
    {
        $model = new PaymentTerm();
        if ($request->search) {
            $model = $model->name($request->search);
        }
        $model = $model->limit(SystemSetting::OPTION_LIMIT)->get(['id', 'name']);
        return response()->json(PaymentTermSlugResource::collection($model));
    }
}
