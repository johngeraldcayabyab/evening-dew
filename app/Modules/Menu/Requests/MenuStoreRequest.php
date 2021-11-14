<?php

namespace App\Modules\Menu\Requests;

use Illuminate\Foundation\Http\FormRequest;

class MenuStoreRequest extends FormRequest
{
    public function rules()
    {
        return [
            'label' => 'required',
            'url' => 'required',
        ];
    }
}
