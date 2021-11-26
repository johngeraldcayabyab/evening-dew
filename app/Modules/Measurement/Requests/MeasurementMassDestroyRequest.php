<?php

namespace App\Modules\Measurement\Requests;

use Illuminate\Foundation\Http\FormRequest;

class MeasurementMassDestroyRequest extends FormRequest
{
    public function rules()
    {
        return [
            'ids.*' => 'exists:measurements,id'
        ];
    }
}
