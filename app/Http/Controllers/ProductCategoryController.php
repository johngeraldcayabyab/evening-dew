<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductCategoryRequest;
use App\Http\Resources\ProductCategoryResource;
use App\Models\ProductCategory;
use App\Traits\ControllerHelperTrait;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class ProductCategoryController extends Controller
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
        return $this->responseCreate(ProductCategory::create($request->validated()));
    }

    public function update(ProductCategoryRequest $request, ProductCategory $productCategory): JsonResponse
    {
        $productCategory->update($request->validated());
        return $this->responseUpdate();
    }

    public function destroy(ProductCategory $productCategory): JsonResponse
    {
        $productCategory->delete();
        return $this->responseDelete();
    }

    public function mass_destroy(Request $request): JsonResponse
    {
        $this->massDelete(new ProductCategory(), $request);
        return $this->responseDelete();
    }

    public function initial_values()
    {
        return [
            'parent_product_category_id' => ProductCategory::default()->id,
        ];
    }
}
