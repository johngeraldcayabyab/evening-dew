<?php

namespace App\Http\Controllers;

use App\Http\Requests\BankAccountRequest;
use App\Http\Resources\BankAccountResource;
use App\Models\BankAccount;
use App\Traits\ControllerHelperTrait;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class BankAccountController extends Controller
{
    use ControllerHelperTrait;

    public function index(Request $request): ResourceCollection
    {
        $model = new BankAccount();
        $model = $model->filterAndOrder($request);
        return BankAccountResource::collection($model);
    }

    public function show(BankAccount $bankAccount): JsonResponse
    {
        return response()->json(new BankAccountResource($bankAccount));
    }

    public function store(BankAccountRequest $request): JsonResponse
    {
        return $this->responseCreate(BankAccount::create($request->validated()));
    }

    public function update(BankAccountRequest $request, BankAccount $bankAccount): JsonResponse
    {
        $bankAccount->update($request->validated());
        return $this->responseUpdate();
    }

    public function destroy(BankAccount $bankAccount): JsonResponse
    {
        $bankAccount->delete();
        return $this->responseDelete();
    }

    public function mass_destroy(Request $request): JsonResponse
    {
        $this->massDelete(new BankAccount(), $request);
        return $this->responseDelete();
    }
}
