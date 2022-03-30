<?php

namespace App\Http\Requests\Store;

use App\Models\Product;
use Illuminate\Foundation\Http\FormRequest;

class ProductStoreRequest extends FormRequest
{
    public function rules()
    {
        $productTypes = implode_types(Product::getProductTypes());
        $invoicingPolicies = implode_types(Product::getInvoicingPolicies());
        return [
            'name' => 'required',
            'product_type' => ['required', "in:$productTypes"],
            'invoicing_policy' => ['required', "in:$invoicingPolicies"],
            'sales_price' => 'required',
            'cost' => 'required',
            'measurement_id' => ['required', "exists:measurements,id"],
            'purchase_measurement_id' => ['required', "exists:measurements,id"],
            'sales_measurement_id' => ['required', "exists:measurements,id"],
            'product_category_id' => ['required', "exists:product_categories,id"],
            'internal_reference' => 'nullable',
            'avatar' => 'nullable',
            'sales_description' => 'nullable',
            'purchase_description' => 'nullable',
        ];
    }
}
