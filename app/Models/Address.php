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

    public function getSearchableFields()
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
        ];
    }

    public function getSortableFields()
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
            'created_at',
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

    public function scopeWhereAddressName($query, $addressName)
    {
        return $query->where('address_name', 'like', "%$addressName%");
    }

    public function scopeWhereStreet1($query, $street1)
    {
        return $query->where('street_1', 'like', "%$street1%");
    }

    public function scopeWhereStreet2($query, $street2)
    {
        return $query->where('street_2', 'like', "%$street2%");
    }

    public function scopeWhereCity($query, $city)
    {
        return $query->where('city', 'like', "%$city%");
    }

    public function scopeWhereState($query, $state)
    {
        return $query->where('state', 'like', "%$state%");
    }

    public function scopeWhereZip($query, $zip)
    {
        return $query->where('zip', 'like', "%$zip%");
    }

    public function scopeWhereCountry($query, $country)
    {
        return $query->whereHas('country', function ($query) use ($country) {
            return $query->where('country_name', 'like', "%$country%");
        });
    }

    public function scopeWhereContact($query, $contact)
    {
        return $query->whereHas('contact', function ($query) use ($contact) {
            return $query->where('name', 'like', "%$contact%");
        });
    }

    public function scopeWhereType($query, $type)
    {
        return $query->where('type', 'like', "%$type%");
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
}
