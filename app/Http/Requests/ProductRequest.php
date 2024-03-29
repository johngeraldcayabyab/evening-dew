<?php

namespace App\Http\Requests;

use App\Models\Product;
use App\Rules\SameMeasurementCategory;
use Illuminate\Foundation\Http\FormRequest;

class ProductRequest extends FormRequest
{
    public function rules()
    {
        $productTypes = implode_types(Product::getProductTypes());
        $invoicingPolicies = implode_types(Product::getInvoicingPolicies());
        return [
            'name' => 'required',
            'product_type' => ['nullable', "in:$productTypes"], //required in front end
            'can_be_sold' => ['nullable'],
            'can_be_purchased' => ['nullable'],
            'can_be_discounted' => ['nullable'],
            'invoicing_policy' => ['nullable', "in:$invoicingPolicies"], //required in front end
            'sales_price' => ['nullable', 'numeric'], //required in front end
            'cost' => ['nullable', 'numeric'], //required in front end
            'measurement_id' => ['nullable', "exists:measurements,id"], //required in front end
            'purchase_measurement_id' => ['nullable', "exists:measurements,id", new SameMeasurementCategory], //required in front end
            'sales_measurement_id' => ['nullable', "exists:measurements,id", new SameMeasurementCategory], //required in front end
            'product_category_id' => ['nullable', "exists:product_categories,id"], //required in front end
            'internal_reference' => 'nullable',
            'avatar' => 'nullable',
            'sales_description' => 'nullable',
            'purchase_description' => 'nullable',
        ];
    }
}
