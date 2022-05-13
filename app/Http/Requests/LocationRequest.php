<?php

namespace App\Http\Requests;

use App\Models\Location;
use Illuminate\Foundation\Http\FormRequest;

class LocationRequest extends FormRequest
{
    public function rules()
    {
        $types = implode_types(Location::getTypes());
        return [
            'name' => ['required'],
            'parent_location_id' => ['nullable', "exists:locations,id"],
            'is_a_scrap_location' => ['nullable'],
            'is_a_return_location' => ['nullable'],
            'type' => ['nullable', "in:$types"],
        ];
    }
}
