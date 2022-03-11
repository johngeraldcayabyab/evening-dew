<?php

namespace App\Http\Requests\Store;

use Illuminate\Foundation\Http\FormRequest;

class AppMenuStoreRequest extends FormRequest
{
    public function rules()
    {
        return [
            'label' => ['required'],
            'parent_app_menu_id' => ['nullable', 'exists:app_menus,id'],
            'menu_id' => ['nullable', "exists:menus,id"],
        ];
    }
}
