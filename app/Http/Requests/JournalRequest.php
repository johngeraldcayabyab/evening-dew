<?php

namespace App\Http\Requests;

use App\Models\Journal;
use Illuminate\Foundation\Http\FormRequest;

class JournalRequest extends FormRequest
{
    public function rules()
    {
        $types = implode_types(Journal::getTypes());
        return [
            'name' => ['string', 'required'],
            'type' => ['nullable', "in:$types"],
            'dedicated_credit_note_sequence' => ['nullable', 'boolean'],
            'short_code' => ['nullable', 'required'],
            'currency_id' => ['nullable', "exists:currencies,id"],
            'incoming_payment_method_manual' => ['nullable', 'boolean'],
            'incoming_payment_method_electronic' => ['nullable', 'boolean'],
            'outgoing_payment_method_manual' => ['nullable', 'boolean'],
            'income_chart_of_account_id' => ['nullable', 'exists:chart_of_accounts:id'],
            'expense_chart_of_account_id' => ['nullable', 'exists:chart_of_accounts:id'],
            'bank_chart_of_account_id' => ['nullable', 'exists:chart_of_accounts:id'],
            'suspense_chart_of_account_id' => ['nullable', 'exists:chart_of_accounts:id'],
            'cash_chart_of_account_id' => ['nullable', 'exists:chart_of_accounts:id'],
            'profit_chart_of_account_id' => ['nullable', 'exists:chart_of_accounts:id'],
            'loss_chart_of_account_id' => ['nullable', 'exists:chart_of_accounts:id'],
        ];
    }
}
