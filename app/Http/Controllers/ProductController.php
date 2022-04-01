<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductRequest;
use App\Http\Resources\ProductResource;
use App\Models\GlobalSetting;
use App\Models\Product;
use App\Traits\ControllerHelperTrait;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class ProductController
{
    use ControllerHelperTrait;

    public function index(Request $request): ResourceCollection
    {
        $model = new Product();
        $model = $model->filterAndOrder($request);
        return ProductResource::collection($model);
    }

    public function show(Product $product): JsonResponse
    {
        return response()->json(new ProductResource($product));
    }

    public function store(ProductRequest $request): JsonResponse
    {
        return response()->json([], STATUS_CREATE, $this->locationHeader(Product::create($request->validated())));
    }

    public function update(ProductRequest $request, Product $product): JsonResponse
    {
        $product->update($request->validated());
        return response()->json([], STATUS_UPDATE);
    }

    public function destroy(Product $product): JsonResponse
    {
        $product->delete();
        return response()->json([], STATUS_DELETE);
    }

    public function mass_destroy(Request $request): JsonResponse
    {
        $this->massDelete(new Product(), $request);
        return response()->json([], STATUS_DELETE);
    }

    public function initial_values()
    {
        return Product::defaults();
    }
}
