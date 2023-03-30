<?php

namespace App\Models;

use App\Contracts\Sluggable;
use App\Traits\FilterTrait;
use App\Traits\ModelHelperTrait;
use App\Traits\NextAndPreviousRecordTrait;
use Illuminate\Database\Eloquent\BroadcastsEvents;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Transfer extends Model implements Sluggable
{
    use HasFactory;
    use SoftDeletes;
    use BroadcastsEvents;
    use FilterTrait;
    use ModelHelperTrait;
    use NextAndPreviousRecordTrait;

    protected $table = 'transfers';
    protected $guarded = [];
    protected static $logAttributes = ['*'];
    protected $casts = [
        'quantity' => 'weight',
        'unit_price' => 'weight_for_shipping',
    ];


    const AS_SOON_AS_POSSIBLE = 'as_soon_as_possible';
    const WHEN_ALL_PRODUCTS_ARE_READY = 'when_all_products_are_ready';

    const DRAFT = 'draft';
    const DONE = 'done';
    const CANCELLED = 'cancelled';

    const DELIVERY = 'delivery';
    const PICKUP = 'pickup';

    public static function getShippingPolicies()
    {
        return [self::AS_SOON_AS_POSSIBLE, self::WHEN_ALL_PRODUCTS_ARE_READY];
    }

    public static function getStatuses()
    {
        return [self::DRAFT, self::DONE, self::CANCELLED];
    }

    public static function getShippingMethods()
    {
        return [self::DELIVERY, self::PICKUP];
    }

    public function contact()
    {
        return $this->belongsTo(Contact::class, 'contact_id', 'id');
    }

    public function operationType()
    {
        return $this->belongsTo(OperationType::class, 'operation_type_id', 'id');
    }

    public function sourceLocation()
    {
        return $this->belongsTo(Location::class, 'source_location_id', 'id');
    }

    public function destinationLocation()
    {
        return $this->belongsTo(Location::class, 'destination_location_id', 'id');
    }

    public function responsible()
    {
        return $this->belongsTo(User::class, 'responsible_id', 'id');
    }

    public function transferLines()
    {
        return $this->hasMany(TransferLine::class);
    }

    public function isDone($status)
    {
        if ($status === Transfer::DONE) {
            return true;
        }
        return false;
    }

    public function slug()
    {
        return 'reference';
    }
}
