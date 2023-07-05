<?php

namespace App\Http\Requests;

use App\Models\Bill;
use Illuminate\Foundation\Http\FormRequest;

class BillRequest extends FormRequest
{
    public function rules()
    {
        $statuses = implode_types(Bill::getStatuses());
        return [
            'number' => ['required'],
            'vendor_id' => ['required', "exists:contacts,id"],
            'bill_reference' => ['nullable', 'string'],
            'payment_reference' => ['nullable', 'string'],
            'bank_id' => ['nullable', 'exists:banks,id'],
            'auto_complete_sequence' => ['nullable', 'string'],
            'bill_date' => ['nullable'],
            'accounting_date' => ['nullable'],
            'due_date' => ['nullable'],
            'payment_term_id' => ['nullable', "exists:payment_terms,id"],
            'journal_id' => ['required', "exists:journals,id"],
            'currency_id' => ['nullable', "exists:currencies,id"],
            'post_automatically' => ['nullable', 'boolean'],
            'to_check' => ['nullable', 'boolean'],
            'status' => ['nullable', "in:$statuses"],
            'terms_and_conditions' => ['nullable', 'string'],
            'bill_lines.*.id' => ['nullable', 'exists:bill_lines,id'],
            'bill_lines.*.product_id' => ['required', "exists:products,id"],
            'bill_lines.*.description' => ['nullable'],
            'bill_lines.*.quantity' => ['required', 'numeric'],
            'bill_lines.*.unit_price' => ['required', 'numeric'],
            'bill_lines.*.chart_of_account_id' => ['nullable', 'exists:chart_of_accounts,id'],
            'bill_lines.*.tax_id' => ['nullable', "exists:taxes,id"],
            'bill_lines_deleted.*.id' => ['nullable', 'exists:bill_lines,id'],
        ];
    }
}
