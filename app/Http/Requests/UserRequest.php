<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserRequest extends FormRequest
{
    public function rules()
    {
        $id = $this->user->id ?? null;
        return [
            'name' => "required|unique:users,name,{$id}",
            'email' => "required|unique:users,email,{$id}",
            'password' => 'nullable|confirmed|min:6',
            'app_menu_id' => ['nullable', 'exists:app_menus,id'],
            'avatar' => 'nullable',

            'user_group_lines.*.id' => ['nullable', 'exists:user_group_lines,id'],
            'user_group_lines.*.user_id' => ['required', "exists:users,id"],
            'user_group_lines.*.group_id' => ["required", "exists:groups,id"],
            'user_group_lines_deleted.*.id' => ['nullable', 'exists:user_group_lines,id'],
        ];
    }
}
