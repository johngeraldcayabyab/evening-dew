<?php

namespace App\Http\Controllers;

use App\Events\CompanyCreated;
use App\Events\CompanyUpdated;
use App\Http\Requests\CompanyRequest;
use App\Http\Resources\CompanyResource;
use App\Models\Company;
use App\Traits\ControllerHelperTrait;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class CompanyController extends Controller
{
    use ControllerHelperTrait;

    public function index(Request $request): ResourceCollection
    {
        $model = new Company();
        $model = $model->filterAndOrder($request);
        return CompanyResource::collection($model);
    }

    public function show(Company $company): JsonResponse
    {
        return response()->json(new CompanyResource($company));
    }

    public function store(CompanyRequest $request): JsonResponse
    {
        $data = $request->validated();
        $company = Company::create($data);
        CompanyCreated::dispatch($company, $data);
        return $this->responseCreate($company);
    }

    public function update(CompanyRequest $request, Company $company): JsonResponse
    {
        $data = $request->validated();
        $company->update($data);
        CompanyUpdated::dispatch($company, $data);
        return $this->responseUpdate();
    }

    public function destroy(Company $company): JsonResponse
    {
        $company->delete();
        return $this->responseDelete();
    }

    public function mass_destroy(Request $request): JsonResponse
    {
        $this->massDelete(new Company(), $request);
        return $this->responseDelete();
    }
}
