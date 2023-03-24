<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductRequest;
use App\Http\Resources\ProductResource;
use App\Models\GlobalSetting;
use App\Models\Product;
use App\Models\ProductCategory;
use App\Traits\ControllerHelperTrait;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class ProductController extends Controller
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
        return $this->responseCreate(Product::create($request->validated()));
    }

    public function update(ProductRequest $request, Product $product): JsonResponse
    {
        $product->update($request->validated());
        return $this->responseUpdate();
    }

    public function destroy(Product $product): JsonResponse
    {
        $product->delete();
        return $this->responseDelete();
    }

    public function mass_destroy(Request $request): JsonResponse
    {
        $this->massDelete(new Product(), $request);
        return $this->responseDelete();
    }

    public function initial_values()
    {
        $globalSetting = GlobalSetting::latestFirst();
        $inventoryDefaultMeasurement = $globalSetting->inventoryDefaultMeasurement;
        $inventoryDefaultPurchaseMeasurement = $globalSetting->inventoryDefaultPurchaseMeasurement;
        $inventoryDefaultSalesMeasurement = $globalSetting->inventoryDefaultSalesMeasurement;
        $defaultProductCategory = ProductCategory::default();
        return [
            'product_type' => Product::STORABLE,
            'can_be_sold' => Product::DEFAULT_CAN_BE_SOLD,
            'can_be_purchased' => Product::DEFAULT_CAN_BE_PURCHASED,
            'invoicing_policy' => Product::ORDERED_QUANTITIES,
            'sales_price' => Product::DEFAULT_SALES_PRICE,
            'cost' => Product::DEFAULT_COST,
            'measurement' => $inventoryDefaultMeasurement,
            'measurement_id' => $inventoryDefaultMeasurement->id,
            'purchase_measurement' => $inventoryDefaultPurchaseMeasurement,
            'purchase_measurement_id' => $inventoryDefaultPurchaseMeasurement->id,
            'sales_measurement' => $inventoryDefaultSalesMeasurement,
            'sales_measurement_id' => $inventoryDefaultSalesMeasurement->id,
            'product_category' => $defaultProductCategory,
            'product_category_id' => $defaultProductCategory ? $defaultProductCategory->id : null,
        ];
    }

    public function stockLocationQuantity(Product $product)
    {
        return $product->stockLocationQuantity();
    }
}
