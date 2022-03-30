<?php

namespace App\Http\Requests\Store;

use App\Models\Location;
use Illuminate\Foundation\Http\FormRequest;

class LocationStoreRequest extends FormRequest
{
    public function rules()
    {
        $types = implode_types(Location::getTypes());
        return [
            'name' => ['required'],
            'parent_location_id' => ['nullable', "exists:locations,id"],
            'is_a_scrap_location' => ['nullable'],
            'is_a_return_location' => ['nullable'],
            'type' => ['required', "in:$types"],
        ];
    }
}
