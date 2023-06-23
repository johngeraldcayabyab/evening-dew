<?php

namespace App\Http\Controllers;

use App\Http\Resources\CompanyResource;
use App\Http\Resources\CurrencyResource;
use App\Models\Company;
use App\Models\Currency;
use App\Models\Option;
use Illuminate\Http\Request;

class GlobalSettingController extends Controller
{
    public function index(Request $request)
    {
        $options = Option::select(['name', 'value'])->get();
        $optionsArray = [];
        foreach ($options as $key => $items) {
            $optionsArray[$items->name] = $items->value;
        }
        $company = Company::where('is_default', true)->first();
        $currency = Currency::where('is_default', true)->first();
        $settings = [
            'company' => $company ? new CompanyResource($company) : null,
            'currency' => $currency ? new CurrencyResource($currency) : null,
        ];
        return array_merge($optionsArray, $settings);
    }
}
