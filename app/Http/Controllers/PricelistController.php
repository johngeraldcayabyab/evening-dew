<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreatePricelistRequest;
use App\Models\PaymentTerm;
use App\Traits\ControllerHelperTrait;
use Illuminate\Http\Request;

class PricelistController extends Controller
{

    use ControllerHelperTrait;

    public function index(Request $request)
    {

    }

    public function show(PaymentTerm $paymentTerm)
    {
    }
    public function store(CreatePricelistRequest $request)
    {
    }

}
