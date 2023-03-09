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
        ];
    }
}
