<?php

namespace App\Http\Controllers;

use App\Data\SystemSetting;
use App\Http\Requests\MassDestroy\ProductMassDestroyRequest;
use App\Http\Requests\Store\ProductStoreRequest;
use App\Http\Requests\Update\ProductUpdateRequest;
use App\Http\Resources\Collection\ProductCollection;
use App\Http\Resources\Resource\ProductResource;
use App\Http\Resources\Slug\ProductSlugResource;
use App\Models\GlobalSetting;
use App\Models\Measurement;
use App\Models\Product;
use App\Models\ProductCategory;
use App\Traits\ControllerHelperTrait;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProductController
{
    use ControllerHelperTrait;

    public function index(Request $request): ProductCollection
    {
        $model = new Product();
        $model = $this->searchSortThenPaginate($model, $request);
        return new ProductCollection($model);
    }

    public function show(Product $product): JsonResponse
    {
        return response()->json(new ProductResource($product));
    }

    public function store(ProductStoreRequest $request): JsonResponse
    {
        return response()->json([], STATUS_CREATE, $this->locationHeader(Product::create($request->validated())));
    }

    public function update(ProductUpdateRequest $request, Product $product): JsonResponse
    {
        $product->update($request->validated());
        return response()->json([], STATUS_UPDATE);
    }

    public function destroy(Product $product): JsonResponse
    {
        $product->delete();
        return response()->json([], STATUS_DELETE);
    }

    public function mass_destroy(ProductMassDestroyRequest $request): JsonResponse
    {
        Product::massDelete($request->validated()['ids']);
        return response()->json([], STATUS_DELETE);
    }

    public function slug(Product $product): JsonResponse
    {
        return response()->json(new ProductSlugResource($product));
    }

    public function option(Request $request): JsonResponse
    {
        $product = new Product();
        if ($request->search) {
            $product = $product->where('name', 'like', "%$request->search%");
        }
        $product = $product->limit(SystemSetting::OPTION_LIMIT)->get();
        return response()->json(ProductSlugResource::collection($product));
    }

    public function initial_values()
    {
        $globalSetting = GlobalSetting::latestFirst();
        $inventoryDefaultMeasurement = $globalSetting->inventoryDefaultMeasurement;
        $inventoryDefaultPurchaseMeasurement = $globalSetting->inventoryDefaultPurchaseMeasurement;
        $inventoryDefaultSalesMeasurement = $globalSetting->inventoryDefaultSalesMeasurement;
        $inventoryDefaultProductCategory = $globalSetting->inventoryDefaultProductCategory;
        return [
            'product_type' => Product::STORABLE,
            'invoicing_policy' => Product::ORDERED_QUANTITIES,
            'sales_price' => 1.00,
            'cost' => 1.00,
            'measurement' => $inventoryDefaultMeasurement,
            'measurement_id' => $inventoryDefaultMeasurement->id,
            'purchase_measurement' => $inventoryDefaultPurchaseMeasurement,
            'purchase_measurement_id' => $inventoryDefaultPurchaseMeasurement->id,
            'sales_measurement' => $inventoryDefaultSalesMeasurement,
            'sales_measurement_id' => $inventoryDefaultSalesMeasurement->id,
            'product_category' => $inventoryDefaultProductCategory,
            'product_category_id' => $inventoryDefaultProductCategory->id,
        ];
    }
}
