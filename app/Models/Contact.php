<?php

namespace App\Models;

use App\Contracts\Sluggable;
use App\Traits\AutoLogTrait;
use App\Traits\FilterTrait;
use App\Traits\ModelHelperTrait;
use App\Traits\NextAndPreviousRecordTrait;
use Illuminate\Database\Eloquent\BroadcastsEvents;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Contact extends Model implements Sluggable
{
    use AutoLogTrait;
    use HasFactory;
    use SoftDeletes;
    use BroadcastsEvents;
    use FilterTrait;
    use ModelHelperTrait;
    use NextAndPreviousRecordTrait;

    protected $table = 'contacts';
    protected $guarded = [];
    protected static $logAttributes = ['*'];

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

    public function bankAccounts()
    {
        return $this->hasMany(BankAccount::class);
    }

    public function slug()
    {
        return 'name';
    }
}
