<?php

namespace App\Http\Resources;

use App\Traits\ResourceHelper;
use Illuminate\Http\Resources\Json\JsonResource;

class JournalResource extends JsonResource
{
    use ResourceHelper;

    public function toArray($request)
    {
        $slug = $this->slug();
        return $this->defaults($this, $request, [
            'name' => $this->name,
            'type' => $this->type,
            'dedicated_credit_note_sequence' => $this->dedicated_credit_note_sequence,
            'short_code' => $this->short_code,
            'currency_id' => $this->currency_id,
            'incoming_payment_method_manual' => $this->incoming_payment_method_manual,
            'incoming_payment_method_electronic' => $this->incoming_payment_method_electronic,
            'outgoing_payment_method_manual' => $this->outgoing_payment_method_manual,
            'income_chart_of_account_id' => $this->income_chart_of_account_id,
            'expense_chart_of_account_id' => $this->expense_chart_of_account_id,
            'bank_chart_of_account_id' => $this->bank_chart_of_account_id,
            'suspense_chart_of_account_id' => $this->suspense_chart_of_account_id,
            'cash_chart_of_account_id' => $this->cash_chart_of_account_id,
            'profit_chart_of_account_id' => $this->profit_chart_of_account_id,
            'loss_chart_of_account_id' => $this->loss_chart_of_account_id,
            'outstanding_receipt_account_id' => $this->outstanding_receipt_account_id,
            'outstanding_payment_account_id' => $this->outstanding_payment_account_id,
            'currency' => new CurrencyResource($this->currency),
            'income_chart_of_account' => new ChartOfAccountResource($this->incomeChartOfAccount),
            'expense_chart_of_account' => new ChartOfAccountResource($this->expenseChartOfAccount),
            'bank_chart_of_account' => new ChartOfAccountResource($this->bankChartOfAccount),
            'suspense_chart_of_account' => new ChartOfAccountResource($this->suspenseChartOfAccount),
            'cash_chart_of_account' => new ChartOfAccountResource($this->cashChartOfAccount),
            'profit_chart_of_account' => new ChartOfAccountResource($this->profitChartOfAccount),
            'loss_chart_of_account' => new ChartOfAccountResource($this->lossChartOfAccount),
            'outstanding_receipt_account' => new ChartOfAccountResource($this->outstandingReceiptAccount),
            'outstanding_payment_account' => new ChartOfAccountResource($this->outstandingPaymentAccount),
            'slug' => $this->$slug,
        ]);
    }
}
