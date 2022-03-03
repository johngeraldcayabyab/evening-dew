<?php

namespace App\Models;

use App\Contacts\Sluggable;
use App\Traits\ModelHelperTrait;
use Illuminate\Database\Eloquent\BroadcastsEvents;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Address extends Model implements Sluggable
{
    use HasFactory;
    use SoftDeletes;
    use BroadcastsEvents;
    use ModelHelperTrait;

    const DEFAULT = 'default';
    const INVOICE = 'invoice';
    const DELIVERY = 'delivery';
    const OTHERS = 'others';
    const PRIVATE = 'private';

    protected $table = 'addresses';
    protected $guarded = [];

    public static function getTypes()
    {
        return [self::DEFAULT, self::INVOICE, self::DELIVERY, self::OTHERS, self::PRIVATE];
    }

    public function country()
    {
        return $this->belongsTo(Country::class);
    }

    public function contact()
    {
        return $this->belongsTo(Contact::class);
    }

    public function scopeWhereAddressName($query, $where)
    {
        return $this->like($query, __FUNCTION__, $where);
    }

    public function scopeWhereStreetOne($query, $where)
    {
        return $this->like($query, __FUNCTION__, $where);
    }

    public function scopeWhereStreetTwo($query, $where)
    {
        return $this->like($query, __FUNCTION__, $where);
    }

    public function scopeWhereCity($query, $where)
    {
        return $this->like($query, __FUNCTION__, $where);
    }

    public function scopeWhereState($query, $where)
    {
        return $this->like($query, __FUNCTION__, $where);
    }

    public function scopeWhereZip($query, $where)
    {
        return $this->like($query, __FUNCTION__, $where);
    }

    public function scopeWhereCountryId($query, $where)
    {
        return $this->whereSingle($query, __FUNCTION__, $where);
    }

    public function scopeWhereContactId($query, $where)
    {
        return $this->whereSingle($query, __FUNCTION__, $where);
    }

    public function scopeWhereType($query, $where)
    {
        return $this->like($query, __FUNCTION__, $where);
    }

    public function scopeOrderByAddressName($query, $order)
    {
        return $this->order($query, __FUNCTION__, $order);
    }

    public function scopeOrderByStreetOne($query, $order)
    {
        return $this->order($query, __FUNCTION__, $order);
    }

    public function scopeOrderByStreetTwo($query, $order)
    {
        return $this->order($query, __FUNCTION__, $order);
    }

    public function scopeOrderByCity($query, $order)
    {
        return $this->order($query, __FUNCTION__, $order);
    }

    public function scopeOrderByState($query, $order)
    {
        return $this->order($query, __FUNCTION__, $order);
    }

    public function scopeOrderByZip($query, $order)
    {
        return $this->order($query, __FUNCTION__, $order);
    }

    public function scopeCountryId($query, $order)
    {
        return $this->order($query, __FUNCTION__, $order);
    }

    public function scopeOrderByContactId($query, $order)
    {
        return $this->order($query, __FUNCTION__, $order);
    }

    public function scopeOrderByType($query, $order)
    {
        return $this->order($query, __FUNCTION__, $order);
    }

    public function scopeWhereCountry($query, $where)
    {
        return $this->likeHas($query, __FUNCTION__, 'country_name', $where);
    }

    public function scopeWhereContact($query, $where)
    {
        return $this->likeHas($query, __FUNCTION__, 'name', $where);
    }

    public function scopeOrderByCountry($query, $order)
    {
        return $this->orderHas($query, new Country(), 'country_name', __FUNCTION__, $order);
    }

    public function scopeOrderByContact($query, $order)
    {
        return $this->orderHas($query, new Contact(), 'name', __FUNCTION__, $order);
    }

    public function slug()
    {
        return 'address_name';
    }
}
