<?php

namespace App\Models;

use App\Traits\ModelHelperTrait;
use Illuminate\Database\Eloquent\BroadcastsEvents;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Address extends Model
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

    public function getSearchableAndSortableFields()
    {
        return [
            'address_name',
            'street_1',
            'street_2',
            'city',
            'state',
            'zip',
            'country',
            'contact',
            'type',
            'country_id',
            'contact_id',
        ];
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
        return $this->like($query, 'address_name', $where);
    }

    public function scopeWhereStreet1($query, $where)
    {
        return $this->like($query, 'street_1', $where);
    }

    public function scopeWhereStreet2($query, $where)
    {
        return $this->like($query, 'street_2', $where);
    }

    public function scopeWhereCity($query, $where)
    {
        return $this->like($query, 'city', $where);
    }

    public function scopeWhereState($query, $where)
    {
        return $this->like($query, 'state', $where);
    }

    public function scopeWhereZip($query, $where)
    {
        return $this->like($query, 'zip', $where);
    }

    public function scopeWhereCountry($query, $where)
    {
        return $this->likeHas($query, 'country', 'country_name', $where);
    }

    public function scopeWhereContact($query, $where)
    {
        return $this->likeHas($query, 'contact', 'name', $where);
    }

    public function scopeWhereType($query, $where)
    {
        return $this->like($query, 'type', $where);
    }

    public function scopeWhereCountryId($query, $where)
    {
        return $query->where('country_id', $where);
    }

    public function scopeWhereContactId($query, $where)
    {
        return $query->where('contact_id', $where);
    }

    public function scopeOrderByStreet1($query, $order)
    {
        return $query->orderBy('street_1', $order);
    }

    public function scopeOrderByStreet2($query, $order)
    {
        return $query->orderBy('street_2', $order);
    }

    public function scopeOrderByCity($query, $order)
    {
        return $query->orderBy('city', $order);
    }

    public function scopeOrderByState($query, $order)
    {
        return $query->orderBy('state', $order);
    }

    public function scopeOrderByZip($query, $order)
    {
        return $query->orderBy('zip', $order);
    }

    public function scopeOrderByCountry($query, $order)
    {
        return $query->orderBy(Country::select('country_name')->whereColumn('countries.id', 'addresses.country_id'), $order);
    }

    public function scopeOrderByContact($query, $order)
    {
        return $query->orderBy(Contact::select('name')->whereColumn('contacts.id', 'addresses.contact_id'), $order);
    }

    public function scopeOrderByType($query, $order)
    {
        return $query->orderBy('type', $order);
    }

    public function scopeCountryId($query, $order)
    {
        return $query->orderBy('country_id', $order);
    }

    public function scopeOrderByContactId($query, $order)
    {
        return $query->orderBy('contact_id', $order);
    }
}
