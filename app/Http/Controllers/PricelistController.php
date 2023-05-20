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


    public function update(PricelistRequest $request){
        DB::transaction(function () use ($request) {

            $data = $request->validated();
            $priceList = Pricelist::find($request->input('id'));
            $priceList->name = $request->input('name');

            /*
             * TODO - add delete for child model
             * */
            if (isset($data['customer_products_deleted'])) {
                collect($data['customer_products_deleted'])->each(function($obj) use ($priceList) {

                });
            }

            /*
             * Todo - add update for child model
             * */
            $priceList->save();
        });
        return $this->responseUpdate();
    }

    /**
     * @throws Throwable
     */
    public function mass_destroy(Request $request): JsonResponse
    {
        DB::transaction(function () use ($request) {

            $collection = collect($request->input('ids'));
            $collection->each(function (int $item, int $key) {

                $pricelist = Pricelist::find($item);
                $pricelist->products()->delete();
                $pricelist->delete();
            });

       });
        return $this->responseDelete();
    }

    public function get_pricelist_product_price(Request $request, $priceListId ,$productId)
    {

        return PricelistProduct::where('pricelist_id', $priceListId)->where('product_id',$productId)->firstOrFail();

    }

}
