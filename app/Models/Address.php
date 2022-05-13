<?php

namespace App\Models;

use App\Contracts\Sluggable;
use App\Traits\FilterTrait;
use App\Traits\ModelHelperTrait;
use Illuminate\Database\Eloquent\BroadcastsEvents;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Activitylog\Traits\LogsActivity;

class Address extends Model implements Sluggable
{
    use HasFactory;
    use SoftDeletes;
    use BroadcastsEvents;
    use FilterTrait;
    use LogsActivity;
    use ModelHelperTrait;

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
