<?php

namespace App\Http\Requests;

use App\Models\Invoice;
use Illuminate\Foundation\Http\FormRequest;

class InvoiceRequest extends FormRequest
{
    public function rules()
    {
        $statuses = implode_types(Invoice::getStatuses());
        return [
            'number' => 'required',
            'customer_id' => ['required', "exists:contacts,id"],
            'payment_reference' => ['nullable'],
            'invoice_date' => ['nullable'],
            'due_date' => ['nullable'],
            'payment_term_id' => ['nullable', "exists:payment_terms,id"],
            'journal_id' => ['required', "exists:journals,id"],
            'currency_id' => ['nullable', "exists:currencies,id"],
            'customer_reference' => ['nullable'],
            'salesperson_id' => ['nullable', 'exists:users,id'],
            'bank_id' => ['nullable', 'exists:banks,id'],
            'post_automatically' => ['nullable', 'boolean'],
            'to_check' => ['nullable', 'boolean'],
            'source_document' => ['nullable'],
            'status' => ['nullable', "in:$statuses"],
            'invoice_lines.*.id' => ['nullable', 'exists:invoice_lines,id'],
            'invoice_lines.*.product_id' => ['required', "exists:products,id"],
            'invoice_lines.*.description' => ['nullable'],
            'invoice_lines.*.quantity' => ['required', 'numeric'],
            'invoice_lines.*.unit_price' => ['required', 'numeric'],
            'invoice_lines.*.chart_of_account_id' => ['nullable', 'exists:chart_of_accounts,id'],
            'invoice_lines.*.tax_id' => ['nullable', "exists:taxes,id"],
            'invoice_lines_deleted.*.id' => ['nullable', 'exists:invoice_lines,id'],
        ];
    }
}
