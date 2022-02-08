<?php

namespace App\Http\Requests\Store;

use Illuminate\Foundation\Http\FormRequest;

class GlobalSettingStoreRequest extends FormRequest
{
    public function rules()
    {
        return [
            'inventory_default_measurement_id' => ['required', "exists:measurements,id"],
            'inventory_default_measurement_category_id' => ['required', "exists:measurement_categories,id"]
        ];
    }
}
