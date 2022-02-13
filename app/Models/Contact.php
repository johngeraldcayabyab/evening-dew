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

    public function scopeWhereName($query, $name)
    {
        return $query->where('name', 'like', "%$name%");
    }

    public function scopeWherePhone($query, $phone)
    {
        return $query->where('phone', 'like', "%$phone%");
    }

    public function scopeWhereMobile($query, $mobile)
    {
        return $query->where('mobile', 'like', "%$mobile%");
    }

    public function scopeWhereEmail($query, $email)
    {
        return $query->where('email', 'like', "%$email%");
    }

    public function scopeWhereWebsite($query, $website)
    {
        return $query->where('website', 'like', "%$website%");
    }

    public function scopeWhereTaxId($query, $taxId)
    {
        return $query->where('tax_id', 'like', "%$taxId%");
    }

    public function scopeOrderByName($query, $order)
    {
        return $query->orderBy('name', $order);
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
