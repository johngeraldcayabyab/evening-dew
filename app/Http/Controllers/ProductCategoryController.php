<?php

namespace App\Http\Controllers;

use App\Data\SystemSetting;
use App\Http\Requests\MassDestroy\ProductCategoryMassDestroyRequest;
use App\Http\Requests\Store\ProductCategoryStoreRequest;
use App\Http\Requests\Update\ProductCategoryUpdateRequest;
use App\Http\Resources\Collection\ProductCategoryCollection;
use App\Http\Resources\Resource\ProductCategoryResource;
use App\Http\Resources\Slug\ProductCategorySlugResource;
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
        return new ProductCategoryCollection($model);
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

    public function slug(ProductCategory $productCategory): JsonResponse
    {
        return response()->json(new ProductCategorySlugResource($productCategory));
    }

    public function option(Request $request): JsonResponse
    {
        $productCategory = new ProductCategory();
        if ($request->search) {
            $productCategory = $productCategory->where('category', 'like', "%$request->search%");
        }
        $productCategory = $productCategory->limit(SystemSetting::OPTION_LIMIT)->get();
        return response()->json(ProductCategorySlugResource::collection($productCategory));
    }
}
