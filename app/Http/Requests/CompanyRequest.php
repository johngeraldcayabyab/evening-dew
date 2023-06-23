<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CompanyRequest extends FormRequest
{
    public function rules()
    {
        $id = $this->company->id ?? null;
        return [
            'name' => "required|unique:companies,name,{$id}",
            'email' => "required|unique:companies,email,{$id}",
            'tax_registry' => ['nullable'],
            'avatar' => 'nullable',
            'is_default' => ['nullable', 'boolean'],
        ];
    }
}
