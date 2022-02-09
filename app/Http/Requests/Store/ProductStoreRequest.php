<?php

namespace App\Http\Requests\Store;

use App\Models\Product;
use Illuminate\Foundation\Http\FormRequest;

class ProductStoreRequest extends FormRequest
{
    public function rules()
    {
        $productTypes = Product::getProductTypes();
        $invoicingPolicies = Product::getInvoicingPolicies();

        return [
            'name' => 'required',
            'product_type' => ['required', "in:$productTypes"],
            'invoicing_policy' => ['required', "in:$invoicingPolicies"],
            'cost' => 'required',
            'sales_price' => 'required',
            'measurement_id' => ['required', "exists:measurements,id"],
            'purchase_measurement_id' => ['required', "exists:measurements,id"],
            'sales_measurement_id' => ['required', "exists:measurements,id"],
            'product_category_id' => ['required', "exists:product_categories,id"],
            'internal_reference' => 'required',
            'avatar' => 'nullable',
        ];
    }
}
