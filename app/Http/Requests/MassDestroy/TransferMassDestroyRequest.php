<?php

namespace App\Http\Requests\MassDestroy;

use Illuminate\Foundation\Http\FormRequest;

class TransferMassDestroyRequest extends FormRequest
{
    public function rules()
    {
        return [
            'ids.*' => 'exists:transfers,id'
        ];
    }
}
