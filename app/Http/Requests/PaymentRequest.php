<?php

namespace App\Http\Requests;

use App\Models\Payment;
use Illuminate\Foundation\Http\FormRequest;

class PaymentRequest extends FormRequest
{
    public function rules()
    {
        $paymentTypes = implode_types(Payment::getPaymentTypes());
        $partnerTypes = implode_types(Payment::getPartnerTypes());
        return [
            'number' => ['string', 'required'],
            'payment_type' => ['required', "in:$paymentTypes"],
            'partner_type' => ['required', "in:$partnerTypes"],
            'contact_id' => ['nullable', "exists:contacts,id"],
            'destination_account_id' => ['required', "exists:chart_of_accounts,id"],
            'is_internal_transfer' => ["nullable", "boolean"],
            'amount' => ["required", " numeric"],
            'currency_id' => ["required", "exists:currencies,id"],
            'payment_date' => ["required"],
            'memo' => ["nullable"],
            'journal_id' => ["required", "exists:journals,id"],
            'bank_account_id' => ["nullable", "exists:bank_accounts,id"],
            'notes' => ["nullable"],
        ];
    }
}
