<?php

namespace App\Http\Requests\MassDestroy;

use Illuminate\Foundation\Http\FormRequest;

class TransferLineMassDestroyRequest extends FormRequest
{
    public function rules()
    {
        return [
            'ids.*' => 'exists:transfer_lines,id'
        ];
    }
}
