<?php

namespace App\Http\Controllers;

use App\Data\SystemSetting;
use App\Http\Requests\MassDestroy\ProductCategoryMassDestroyRequest;
use App\Http\Requests\Store\ProductCategoryStoreRequest;
use App\Http\Requests\Update\ProductCategoryUpdateRequest;
use App\Http\Resources\ProductCategoryResource;
use App\Models\ProductCategory;
use App\Traits\ControllerHelperTrait;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class ProductCategoryController
{
    use ControllerHelperTrait;

    public function index(Request $request): ResourceCollection
    {
        $model = new ProductCategory();
        $model = $this->searchSortThenPaginate($model, $request);
        return ProductCategoryResource::collection($model);
    }

    public function show(ProductCategory $productCategory): JsonResponse
    {
        return response()->json(new ProductCategoryResource($productCategory));
    }

    public function store(ProductCategoryStoreRequest $request): JsonResponse
    {
        return response()->json([], STATUS_CREATE, $this->locationHeader(ProductCategory::create($request->validated())));
    }

    public function update(ProductCategoryUpdateRequest $request, ProductCategory $productCategory): JsonResponse
    {
        $productCategory->update($request->validated());
        return response()->json([], STATUS_UPDATE);
    }

    public function destroy(ProductCategory $productCategory): JsonResponse
    {
        $productCategory->delete();
        return response()->json([], STATUS_DELETE);
    }

    public function mass_destroy(ProductCategoryMassDestroyRequest $request): JsonResponse
    {
        ProductCategory::massDelete($request->validated()['ids']);
        return response()->json([], STATUS_DELETE);
    }

    public function option(Request $request): ResourceCollection
    {
        $model = $this->searchThenSort(new ProductCategory(), $request);
        $model = $model->limit(SystemSetting::OPTION_LIMIT)->get();
        return ProductCategoryResource::collection($model);
    }
}
