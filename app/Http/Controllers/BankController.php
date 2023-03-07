<?php

namespace App\Http\Controllers;

use App\Http\Requests\BankRequest;
use App\Http\Resources\BankResource;
use App\Models\Bank;
use App\Traits\ControllerHelperTrait;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class BankController extends Controller
{
    use ControllerHelperTrait;

    public function index(Request $request): ResourceCollection
    {
        $model = new Bank();
        $model = $model->filterAndOrder($request);
        return BankResource::collection($model);
    }

    public function show(Bank $bank): JsonResponse
    {
        return response()->json(new BankResource($bank));
    }

    public function store(BankRequest $request): JsonResponse
    {
        return $this->responseCreate(Bank::create($request->validated()));
    }

    public function update(BankRequest $request, Bank $bank): JsonResponse
    {
        $bank->update($request->validated());
        return $this->responseUpdate();
    }

    public function destroy(Bank $bank): JsonResponse
    {
        $bank->delete();
        return $this->responseDelete();
    }

    public function mass_destroy(Request $request): JsonResponse
    {
        $this->massDelete(new Bank(), $request);
        return $this->responseDelete();
    }
}
