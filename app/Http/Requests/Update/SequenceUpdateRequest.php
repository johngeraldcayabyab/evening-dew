<?php

namespace App\Http\Requests\Update;

use Illuminate\Foundation\Http\FormRequest;

class SequenceUpdateRequest extends FormRequest
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
            'next_number' => 'nullable',
        ];
    }
}
