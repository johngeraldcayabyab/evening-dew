<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SequenceRequest extends FormRequest
{
    public function rules()
    {
        return [
            'name' => 'required',
            'sequence_code' => 'nullable',
            'implementation' => 'required',
            'prefix' => 'nullable',
            'suffix' => 'nullable',
            'sequence_size' => 'required',
            'step' => 'required',
            'next_number' => 'required',
        ];
    }
}
