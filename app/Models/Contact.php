<?php

namespace App\Models;

use App\Traits\ModelHelperTrait;
use Illuminate\Database\Eloquent\BroadcastsEvents;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Contact extends Model
{
    use HasFactory;
    use SoftDeletes;
    use BroadcastsEvents;
    use ModelHelperTrait;

    protected $table = 'contacts';
    protected $guarded = [];

    public function addresses()
    {
        return $this->hasMany(Address::class, 'contact_id', 'id');
    }

    public function defaultAddress()
    {
        return $this->addresses->where('type', Address::DEFAULT)->last();
    }

    public function invoiceAddress()
    {
        return $this->addresses->where('type', Address::INVOICE)->last();
    }

    public function deliveryAddress()
    {
        return $this->addresses->where('type', Address::DELIVERY)->last();
    }

    public function othersAddress()
    {
        return $this->addresses->where('type', Address::OTHERS)->last();
    }

    public function privateAddress()
    {
        return $this->addresses->where('type', Address::PRIVATE)->last();
    }

    public function scopeWhereName($query, $where)
    {
        return $this->like($query, __FUNCTION__, $where);
    }

    public function scopeWherePhone($query, $where)
    {
        return $this->like($query, __FUNCTION__, $where);
    }

    public function scopeWhereMobile($query, $where)
    {
        return $this->like($query, __FUNCTION__, $where);
    }

    public function scopeWhereEmail($query, $where)
    {
        return $this->like($query, __FUNCTION__, $where);
    }

    public function scopeWhereWebsite($query, $where)
    {
        return $this->like($query, __FUNCTION__, $where);
    }

    public function scopeWhereTaxId($query, $where)
    {
        return $this->whereId($query, __FUNCTION__, $where);
    }

    public function scopeOrderByName($query, $order)
    {
        return $this->order($query, __FUNCTION__, $order);
    }

    public function scopeOrderByPhone($query, $order)
    {
        return $this->order($query, __FUNCTION__, $order);
    }

    public function scopeOrderByMobile($query, $order)
    {
        return $this->order($query, __FUNCTION__, $order);
    }

    public function scopeOrderByEmail($query, $order)
    {
        return $this->order($query, __FUNCTION__, $order);
    }

    public function scopeOrderByWebsite($query, $order)
    {
        return $this->order($query, __FUNCTION__, $order);
    }

    public function scopeOrderByTaxId($query, $order)
    {
        return $this->order($query, __FUNCTION__, $order);
    }
}
