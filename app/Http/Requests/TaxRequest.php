<?php

namespace App\Http\Requests;

use App\Models\Tax;
use Illuminate\Foundation\Http\FormRequest;

class TaxRequest extends FormRequest
{
    public function rules()
    {
        $types = implode_types(Tax::getTypes());
        $scopes = implode_types(Tax::getScopes());
        $computations = implode_types(Tax::getComputations());
        return [
            'name' => ['required'],
            'type' => ['required', "in:$types"],
            'scope' => ['required', "in:$scopes"],
            'computation' => ['required', "in:$computations"],
            'amount' => ['required', 'numeric'],
            'chart_of_account_id' => ['required', 'exists:chart_of_accounts,id'],
            'label_on_invoices' => ['required'],
            'included_in_price' => ['nullable'],
        ];
    }
}
