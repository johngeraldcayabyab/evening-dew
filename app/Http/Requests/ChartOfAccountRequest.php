<?php

namespace App\Http\Requests;

use App\Models\ChartOfAccount;
use Illuminate\Foundation\Http\FormRequest;

class ChartOfAccountRequest extends FormRequest
{
    public function rules()
    {
        $types = implode_types(ChartOfAccount::getTypes());
        return [
            'code' => ['string', 'required'],
            'name' => ['string', 'nullable'],
            'type' => ['required', "in:$types"],
            'currency_id' => ['nullable', "exists:currencies,id"],
            'deprecated' => ['nullable', 'boolean'],
            'allow_reconciliation' => ['nullable', 'boolean'],
        ];
    }
}
