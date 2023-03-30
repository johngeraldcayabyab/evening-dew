<?php

namespace App\Models;

use App\Contracts\Sluggable;
use App\Traits\AutoLogTrait;
use App\Traits\FilterTrait;
use App\Traits\HierarchyTrait;
use App\Traits\ModelHelperTrait;
use App\Traits\NextAndPreviousRecordTrait;
use Illuminate\Database\Eloquent\BroadcastsEvents;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Location extends Model implements Sluggable
{
    use AutoLogTrait;
    use HasFactory;
    use SoftDeletes;
    use BroadcastsEvents;
    use FilterTrait;
    use HierarchyTrait;
    use ModelHelperTrait;
    use NextAndPreviousRecordTrait;

    const VENDOR = 'vendor';
    const VIEW = 'view';
    const INTERNAL = 'internal';
    const CUSTOMER = 'customer';
    const INVENTORY_LOSS = 'inventory_loss';
    const PRODUCTION = 'production';
    const TRANSIT_LOCATION = 'transit_location';

    protected $table = 'locations';
    protected $guarded = [];
    protected static $logAttributes = ['*'];

    public static function getTypes()
    {
        return [self::VENDOR, self::VIEW, self::INTERNAL, self::CUSTOMER, self::INVENTORY_LOSS, self::PRODUCTION, self::TRANSIT_LOCATION];
    }

    public function parentLocation()
    {
        return $this->belongsTo(Location::class, 'parent_location_id', 'id');
    }

    public function stockMovementSources()
    {
        return $this->hasMany(StockMovement::class, 'source_location_id', 'id');
    }

    public function stockMovementDestinations()
    {
        return $this->hasMany(StockMovement::class, 'destination_location_id', 'id');
    }

    public function slug()
    {
        return 'parent.name';
    }

    public static function isVendor($location)
    {
        if ($location->type === Location::VENDOR) {
            return true;
        }
        return false;
    }

    public static function isInternal($location)
    {
        if ($location->type === Location::INTERNAL) {
            return true;
        }
        return false;
    }

    public static function isCustomer($location)
    {
        if ($location->type === Location::CUSTOMER) {
            return true;
        }
        return false;
    }

    public static function isInventoryLoss($location)
    {
        if ($location->type === Location::INVENTORY_LOSS) {
            return true;
        }
        return false;
    }
}
