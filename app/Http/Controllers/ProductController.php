<?php

namespace App\Http\Controllers;

use App\Data\SystemSetting;
use App\Http\Requests\MassDestroy\ProductMassDestroyRequest;
use App\Http\Requests\Store\ProductStoreRequest;
use App\Http\Requests\Update\ProductUpdateRequest;
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
        $model = $this->searchSortThenPaginate($model, $request);
        return ProductResource::collection($model);
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

    public function option(Request $request): ResourceCollection
    {
        $model = $this->searchThenSort(new Product(), $request);
        $model = $model->limit(SystemSetting::OPTION_LIMIT)->get();
        return ProductResource::collection($model);
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
