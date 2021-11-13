<?php

namespace App\Modules\Menu\Requests;

use Illuminate\Foundation\Http\FormRequest;

class MenuRequest extends FormRequest
{
    public function rules()
    {
        return [
            'label' => 'required',
            'url' => 'required',
        ];
    }
}
