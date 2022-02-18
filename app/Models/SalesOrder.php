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
            'customer_id',
            'invoice_address_id',
            'delivery_address_id',
            'payment_term_id'
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

    public function salesOrderLines()
    {
        return $this->hasMany(SalesOrderLine::class);
    }

    public function scopeWhereNumber($query, $where)
    {
        return $query->where('number', 'like', "%$where%");
    }

    public function scopeWhereCustomer($query, $where)
    {
        return $query->whereHas('contacts', function ($query) use ($where) {
            return $query->where('name', 'like', "%$where%");
        });
    }

    public function scopeWhereInvoiceAddress($query, $where)
    {
        return $query->whereHas('invoiceAddress', function ($query) use ($where) {
            return $query->where('address_name', 'like', "%$where%");
        });
    }

    public function scopeWhereDeliveryAddress($query, $where)
    {
        return $query->whereHas('deliveryAddress', function ($query) use ($where) {
            return $query->where('address_name', 'like', "%$where%");
        });
    }

    public function scopeWherePaymentTerm($query, $where)
    {
        return $query->whereHas('paymentTerm', function ($query) use ($where) {
            return $query->where('name', 'like', "%$where%");
        });
    }

    public function scopeWhereCustomerId($query, $where)
    {
        return $query->where('customer_id', $where);
    }

    public function scopeWhereInvoiceAddressId($query, $where)
    {
        return $query->where('invoice_address_id', $where);
    }

    public function scopeWhereDeliveryAddressId($query, $where)
    {
        return $query->where('delivery_address_id', $where);
    }

    public function scopeWherePaymentTermId($query, $where)
    {
        return $query->where('payment_term_id', $where);
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

    public function scopeOrderByCustomerId($query, $order)
    {
        return $query->orderBy('customer_id', $order);
    }

    public function scopeOrderByInvoiceAddressId($query, $order)
    {
        return $query->orderBy('invoice_address_id', $order);
    }

    public function scopeOrderByDeliveryAddressId($query, $order)
    {
        return $query->orderBy('delivery_address_id', $order);
    }

    public function scopeOrderByPaymentTermId($query, $order)
    {
        return $query->orderBy('payment_term_id', $order);
    }
}
