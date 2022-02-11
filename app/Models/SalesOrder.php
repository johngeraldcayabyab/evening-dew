<?php

namespace App\Models;

use App\Traits\ModelHelperTrait;
use Illuminate\Database\Eloquent\BroadcastsEvents;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class SalesOrder extends Model
{
    use HasFactory;
    use SoftDeletes;
    use BroadcastsEvents;
    use ModelHelperTrait;

    protected $table = 'sales_orders';
    protected $guarded = [];

    public function getSearchableAndSortableFields()
    {
        return [
            'number',
            'customer',
            'invoice_address',
            'delivery_address',
            'payment_term',
        ];
    }

    public function customer()
    {
        return $this->belongsTo(Contact::class, 'customer_id', 'id');
    }

    public function invoiceAddress()
    {
        return $this->belongsTo(Address::class, 'invoice_address_id', 'id');
    }

    public function deliveryAddress()
    {
        return $this->belongsTo(Address::class, 'delivery_address_id', 'id');
    }

    public function paymentTerm()
    {
        return $this->belongsTo(PaymentTerm::class, 'payment_term_id', 'id');
    }

    public function scopeWhereNumber($query, $number)
    {
        return $query->where('number', 'like', "%$number%");
    }

    public function scopeWhereCustomer($query, $customer)
    {
        return $query->whereHas('contacts', function ($query) use ($customer) {
            return $query->where('name', 'like', "%$customer%");
        });
    }

    public function scopeWhereInvoiceAddress($query, $invoiceAddress)
    {
        return $query->whereHas('invoiceAddress', function ($query) use ($invoiceAddress) {
            return $query->where('address_name', 'like', "%$invoiceAddress%");
        });
    }

    public function scopeWhereDeliveryAddress($query, $deliveryAddress)
    {
        return $query->whereHas('deliveryAddress', function ($query) use ($deliveryAddress) {
            return $query->where('address_name', 'like', "%$deliveryAddress%");
        });
    }

    public function scopeWherePaymentTerm($query, $paymentTerm)
    {
        return $query->whereHas('paymentTerm', function ($query) use ($paymentTerm) {
            return $query->where('name', 'like', "%$paymentTerm%");
        });
    }

    public function scopeOrderByNumber($query, $order)
    {
        return $query->orderBy('number', $order);
    }

    public function scopeOrderByCustomer($query, $order)
    {
        return $query->orderBy(Contact::select('name')->whereColumn('contacts.id', 'sales_orders.customer_id'), $order);
    }

    public function scopeOrderByInvoiceAddress($query, $order)
    {
        return $query->orderBy(Address::select('address_name')->whereColumn('addresses.id', 'sales_orders.invoice_address_id'), $order);
    }

    public function scopeOrderByDeliveryAddress($query, $order)
    {
        return $query->orderBy(Address::select('address_name')->whereColumn('addresses.id', 'sales_orders.delivery_address_id'), $order);
    }

    public function scopeOrderByPaymentTerm($query, $order)
    {
        return $query->orderBy(PaymentTerm::select('name')->whereColumn('payment_terms.id', 'sales_orders.payment_term_id'), $order);
    }
}
