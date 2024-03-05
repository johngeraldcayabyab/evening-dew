<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SalesSettingRequest extends FormRequest
{
    public function rules()
    {
        return [
            'name' => ['required'],
            'generate_transfer_on_validate' => ['nullable'],
            'validate_transfer_on_validate' => ['nullable'],
            'company_id' => ['nullable', 'exists:companies,id'],
        ];
    }
}
