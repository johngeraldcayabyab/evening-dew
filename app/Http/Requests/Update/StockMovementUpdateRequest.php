<?php

namespace App\Http\Requests\Update;

use Illuminate\Foundation\Http\FormRequest;

class StockMovementUpdateRequest extends FormRequest
{
    public function rules()
    {
        return [
            'reference' => ['required'],
            'source' => ['nullable'],
            'product_id' => ['required', "exists:products,id"],
            'source_location_id' => ['required', 'exists:locations,id'],
            'destination_location_id' => ['required', 'exists:locations,id'],
            'quantity_done' => ['required'],
        ];
    }
}
