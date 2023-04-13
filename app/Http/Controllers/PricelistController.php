<?php

namespace App\Http\Controllers;

use App\Http\Requests\PricelistRequest;
use App\Http\Resources\PricelistResource;
use App\Models\Pricelist;
use App\Models\PricelistProduct;
use App\Traits\ControllerHelperTrait;
use DB;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;
use Illuminate\Support\Arr;
use Throwable;

class PricelistController extends Controller
{

    use ControllerHelperTrait;

    public function index(Request $request): ResourceCollection
    {
        $model = new Pricelist();
        $model = $model->filterAndOrder($request);
        return PricelistResource::collection($model);
    }


    public function show(Pricelist $pricelist): JsonResponse
    {
        return response()->json(new PricelistResource($pricelist));
    }


    /**
     * @throws Throwable
     */
    public function store(PricelistRequest $request): JsonResponse
    {

        DB::transaction(function () use ($request) {
            $data = $request->validated();
            $priceListData = Arr::except($data, ['customer_products']);
            $priceList = Pricelist::create($priceListData);


            collect($data['customer_products'])->each(function ($obj) use ($priceList) {
                $priceListProduct = new PricelistProduct();
                $priceListProduct->product_id=$obj['product_id'];
                $priceListProduct->unit_price=$obj['unit_price'];
                $priceListProduct->pricelist()->associate($priceList);
                $priceListProduct->save();
            });
        });

        return $this->responseCreate();
    }

    /*
     * TODO -Add cascade delete
     * */
    public function mass_destroy(Request $request): JsonResponse
    {
        $this->massDelete(new Pricelist(), $request);
        return $this->responseDelete();
    }

    public function get_pricelist_product_price(Request $request, $priceListId ,$productId)
    {

        return PricelistProduct::where('pricelist_id', $priceListId)->where('product_id',$productId)->firstOrFail();

    }

}
