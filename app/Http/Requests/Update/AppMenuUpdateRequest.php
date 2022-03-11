<?php

namespace App\Http\Requests\Update;

use Illuminate\Foundation\Http\FormRequest;

class AppMenuUpdateRequest extends FormRequest
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
