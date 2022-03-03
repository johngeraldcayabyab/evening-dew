<?php

namespace App\Models;

use App\Contacts\Sluggable;
use App\Traits\ModelHelperTrait;
use Illuminate\Database\Eloquent\BroadcastsEvents;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class SalesOrder extends Model implements Sluggable
{
    use HasFactory;
    use SoftDeletes;
    use BroadcastsEvents;
    use ModelHelperTrait;

    protected $table = 'sales_orders';
    protected $guarded = [];

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

    public function salesperson()
    {
        return $this->belongsTo(User::class, 'salesperson_id', 'id');
    }

    public function salesOrderLines()
    {
        return $this->hasMany(SalesOrderLine::class);
    }

    public function scopeWhereNumber($query, $where)
    {
        return $this->like($query, __FUNCTION__, $where);
    }

    public function scopeWhereExpirationDate($query, $where)
    {
        return $this->like($query, __FUNCTION__, $where);
    }

    public function scopeWhereQuotationDate($query, $where)
    {
        return $this->like($query, __FUNCTION__, $where);
    }

    public function scopeWhereCustomerId($query, $where)
    {
        return $this->whereSingle($query, __FUNCTION__, $where);
    }

    public function scopeWhereInvoiceAddressId($query, $where)
    {
        return $this->whereSingle($query, __FUNCTION__, $where);
    }

    public function scopeWhereDeliveryAddressId($query, $where)
    {
        return $this->whereSingle($query, __FUNCTION__, $where);
    }

    public function scopeWherePaymentTermId($query, $where)
    {
        return $this->whereSingle($query, __FUNCTION__, $where);
    }

    public function scopeWhereSalespersonId($query, $where)
    {
        return $this->whereSingle($query, __FUNCTION__, $where);
    }

    public function scopeWhereCustomerReference($query, $where)
    {
        return $this->like($query, __FUNCTION__, $where);
    }

    public function scopeOrderByNumber($query, $order)
    {
        return $this->order($query, __FUNCTION__, $order);
    }

    public function scopeOrderByCustomerId($query, $order)
    {
        return $this->order($query, __FUNCTION__, $order);
    }

    public function scopeOrderByInvoiceAddressId($query, $order)
    {
        return $this->order($query, __FUNCTION__, $order);
    }

    public function scopeOrderByDeliveryAddressId($query, $order)
    {
        return $this->order($query, __FUNCTION__, $order);
    }

    public function scopeOrderByExpirationDate($query, $order)
    {
        return $this->order($query, __FUNCTION__, $order);
    }

    public function scopeOrderByQuotationDate($query, $order)
    {
        return $this->order($query, __FUNCTION__, $order);
    }

    public function scopeOrderByPaymentTermId($query, $order)
    {
        return $this->order($query, __FUNCTION__, $order);
    }

    public function scopeOrderBySalespersonId($query, $order)
    {
        return $this->order($query, __FUNCTION__, $order);
    }

    public function scopeOrderByCustomerReference($query, $order)
    {
        return $this->order($query, __FUNCTION__, $order);
    }

    public function scopeWhereCustomer($query, $where)
    {
        return $this->likeHas($query, __FUNCTION__, 'name', $where);
    }

    public function scopeWhereInvoiceAddress($query, $where)
    {
        return $this->likeHas($query, __FUNCTION__, 'address_name', $where);
    }

    public function scopeWhereDeliveryAddress($query, $where)
    {
        return $this->likeHas($query, __FUNCTION__, 'address_name', $where);
    }

    public function scopeWhereSalesperson($query, $where)
    {
        return $this->likeHas($query, __FUNCTION__, 'name', $where);
    }

    public function scopeWherePaymentTerm($query, $where)
    {
        return $this->likeHas($query, __FUNCTION__, 'name', $where);
    }

    public function scopeOrderByCustomer($query, $order)
    {
        return $this->orderHas($query, new Contact(), 'name', __FUNCTION__, $order);
    }

    public function scopeOrderByInvoiceAddress($query, $order)
    {
        return $this->orderHas($query, new Address(), 'address_name', __FUNCTION__, $order);
    }

    public function scopeOrderByDeliveryAddress($query, $order)
    {
        return $this->orderHas($query, new Address(), 'address_name', __FUNCTION__, $order);
    }

    public function scopeOrderByPaymentTerm($query, $order)
    {
        return $this->orderHas($query, new PaymentTerm(), 'name', __FUNCTION__, $order);
    }

    public function scopeOrderBySalesperson($query, $order)
    {
        return $this->orderHas($query, new User(), 'name', __FUNCTION__, $order);
    }

    public function slug()
    {
        return 'number';
    }
}
