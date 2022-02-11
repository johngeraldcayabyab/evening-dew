<?php

namespace App\Http\Requests\MassDestroy;

use Illuminate\Foundation\Http\FormRequest;

class ContactMassDestroyRequest extends FormRequest
{
    public function rules()
    {
        return [
            'ids.*' => 'exists:contacts,id'
        ];
    }
}
