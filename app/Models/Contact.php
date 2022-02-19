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

    public function getSearchableAndSortableFields()
    {
        return [
            'name',
            'phone',
            'mobile',
            'email',
            'website',
            'tax_id',
        ];
    }

    public function addresses()
    {
        return $this->hasMany(Address::class, 'contact_id', 'id');
    }

    public function defaultAddress()
    {
        return $this->addresses->where('type', Address::DEFAULT)->last();
    }

    public function scopeInvoiceAddress()
    {
        return $this->addresses->where('type', Address::INVOICE)->last();
    }

    public function scopeDeliveryAddress()
    {
        return $this->addresses->where('type', Address::DELIVERY)->last();
    }

    public function scopeOthersAddress()
    {
        return $this->addresses->where('type', Address::OTHERS)->last();
    }

    public function scopePrivateAddress()
    {
        return $this->addresses->where('type', Address::PRIVATE)->last();
    }

    public function scopeWhereName($query, $where)
    {
        return $this->like($query, 'name', $where);
    }

    public function scopeWherePhone($query, $where)
    {
        return $this->like($query, 'phone', $where);
    }

    public function scopeWhereMobile($query, $where)
    {
        return $this->like($query, 'mobile', $where);
    }

    public function scopeWhereEmail($query, $where)
    {
        return $this->like($query, 'email', $where);
    }

    public function scopeWhereWebsite($query, $where)
    {
        return $this->like($query, 'website', $where);
    }

    public function scopeWhereTaxId($query, $where)
    {
        return $query->where('tax_id', $where);
    }

    public function scopeOrderByName($query, $where)
    {
        return $query->orderBy('name', $where);
    }

    public function scopeOrderByPhone($query, $order)
    {
        return $query->orderBy('phone', $order);
    }

    public function scopeOrderByMobile($query, $order)
    {
        return $query->orderBy('mobile', $order);
    }

    public function scopeOrderByEmail($query, $order)
    {
        return $query->orderBy('email', $order);
    }

    public function scopeOrderByWebsite($query, $order)
    {
        return $query->orderBy('website', $order);
    }

    public function scopeOrderByTaxId($query, $order)
    {
        return $query->orderBy('tax_id', $order);
    }
}
