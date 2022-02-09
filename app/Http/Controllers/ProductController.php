<?php

namespace App\Http\Controllers;

use App\Data\SystemSetting;
use App\Http\Query\ProductQuery;
use App\Http\Requests\MassDestroy\ProductMassDestroyRequest;
use App\Http\Requests\Store\ProductStoreRequest;
use App\Http\Requests\Update\ProductUpdateRequest;
use App\Http\Resources\Collection\ProductCollection;
use App\Http\Resources\Resource\ProductResource;
use App\Http\Resources\Slug\ProductSlugResource;
use App\Models\GlobalSetting;
use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProductController
{
    public function index(Request $request): ProductCollection
    {
        $model = new Product();
        $requestQuery = new ProductQuery();
        $model = $requestQuery->search($model, $request);
        $model = $requestQuery->sort($model, $request);
        return new ProductCollection($model->paginate(SystemSetting::PAGE_SIZE));
    }

    public function show(Product $product): JsonResponse
    {
        return response()->json(new ProductResource($product));
    }

    public function store(ProductStoreRequest $request): JsonResponse
    {
        $headers = location_header(route('products.show', Product::create($request->validated())));
        return response()->json([], STATUS_CREATE, $headers);
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
        Product::whereIn('id', $request->validated()['ids'])->delete();
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
        return [
            'product_type' => Product::STORABLE,
            'invoicing_policy' => Product::ORDERED_QUANTITIES,
            'sales_price' => 1.00,
            'cost' => 1.00,
            'measurement_id' => GlobalSetting::inventoryDefaultMeasurement(),
            'purchase_measurement_id' => GlobalSetting::inventoryDefaultPurchaseMeasurement(),
            'sales_measurement_id' => GlobalSetting::inventoryDefaultSalesMeasurement(),
            'product_category_id' => GlobalSetting::inventoryDefaultProductCategory(),
        ];
    }
}
