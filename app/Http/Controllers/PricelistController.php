<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreatePricelistRequest;
use App\Models\PaymentTerm;
use App\Models\Pricelist;
use App\Models\PricelistProduct;
use App\Models\SalesOrderLine;
use App\Traits\ControllerHelperTrait;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;

class PricelistController extends Controller
{

    use ControllerHelperTrait;

    public function index(Request $request): JsonResponse
    {
        return $this->responseCreate("priceList");

    }

    public function show(Pricelist $priceList): JsonResponse
    {
        return $this->responseCreate("");

    }

    /*
     * TODO - refactor
     * */
    public function store(CreatePricelistRequest $request): JsonResponse
    {
        $data = $request->validated();
        $priceListData = Arr::except($data, ['customer_products']);
        $priceList = Pricelist::create($priceListData);

        foreach ($data['customer_products'] as $obj){
            $priceListProduct = new PricelistProduct;
            $priceListProduct->product_id=$obj['product_id'];
            $priceListProduct->unit_price=$obj['unit_price'];
            $priceListProduct->pricelist()->associate($priceList);
            $priceListProduct->save();
        }


        return $this->responseCreate($priceList);
    }

}
