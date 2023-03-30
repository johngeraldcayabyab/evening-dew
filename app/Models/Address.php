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

class Address extends Model implements Sluggable
{
    use AutoLogTrait;
    use HasFactory;
    use SoftDeletes;
    use BroadcastsEvents;
    use FilterTrait;
    use ModelHelperTrait;
    use NextAndPreviousRecordTrait;

    const DEFAULT = 'default';
    const INVOICE = 'invoice';
    const DELIVERY = 'delivery';
    const OTHERS = 'others';
    const PRIVATE = 'private';

    protected $table = 'addresses';
    protected $guarded = [];
    protected static $logAttributes = ['*'];

    public static function getTypes()
    {
        return [self::DEFAULT, self::INVOICE, self::DELIVERY, self::OTHERS, self::PRIVATE];
    }

    public function country()
    {
        return $this->belongsTo(Country::class);
    }

    public function city()
    {
        return $this->belongsTo(City::class);
    }

    public function contact()
    {
        return $this->belongsTo(Contact::class);
    }

    public function slug()
    {
        return 'address_name';
    }
}
