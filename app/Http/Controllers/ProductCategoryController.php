<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductCategoryRequest;
use App\Http\Resources\ProductCategoryResource;
use App\Models\GlobalSetting;
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
        $model = $model->filterAndOrder($request);
        return ProductCategoryResource::collection($model);
    }

    public function show(ProductCategory $productCategory): JsonResponse
    {
        return response()->json(new ProductCategoryResource($productCategory));
    }

    public function store(ProductCategoryRequest $request): JsonResponse
    {
        return response()->json([], STATUS_CREATE, $this->locationHeader(ProductCategory::create($request->validated())));
    }

    public function update(ProductCategoryRequest $request, ProductCategory $productCategory): JsonResponse
    {
        $productCategory->update($request->validated());
        return response()->json([], STATUS_UPDATE);
    }

    public function destroy(ProductCategory $productCategory): JsonResponse
    {
        $productCategory->delete();
        return response()->json([], STATUS_DELETE);
    }

    public function mass_destroy(Request $request): JsonResponse
    {
        $this->massDelete(new ProductCategory(), $request);
        return response()->json([], STATUS_DELETE);
    }

    public function initial_values()
    {
        $inventoryDefaultProductCategory = GlobalSetting::latestFirst()->inventoryDefaultProductCategory;
        return [
            'parent_product_category_id' => $inventoryDefaultProductCategory->id,
        ];
    }
}
