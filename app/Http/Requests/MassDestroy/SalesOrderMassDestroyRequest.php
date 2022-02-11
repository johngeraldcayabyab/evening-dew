<?php

namespace App\Http\Requests\MassDestroy;

use Illuminate\Foundation\Http\FormRequest;

class SalesOrderMassDestroyRequest extends FormRequest
{
    public function rules()
    {
        return [
            'ids.*' => 'exists:sales_orders,id'
        ];
    }
}
