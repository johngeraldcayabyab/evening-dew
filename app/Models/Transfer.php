<?php

namespace App\Models;

use App\Contacts\Sluggable;
use App\Traits\FilterTrait;
use App\Traits\ModelHelperTrait;
use Illuminate\Database\Eloquent\BroadcastsEvents;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Activitylog\Traits\LogsActivity;

class Transfer extends Model implements Sluggable
{
    use HasFactory;
    use SoftDeletes;
    use BroadcastsEvents;
    use FilterTrait;
    use LogsActivity;
    use ModelHelperTrait;

    protected $table = 'transfers';
    protected $guarded = [];
    protected static $logAttributes = ['*'];

    const AS_SOON_AS_POSSIBLE = 'as_soon_as_possible';
    const WHEN_ALL_PRODUCTS_ARE_READY = 'when_all_products_are_ready';

    const DRAFT = 'draft';
    const DONE = 'done';
    const CANCELLED = 'cancelled';

    public static function getShippingPolicies()
    {
        return [self::AS_SOON_AS_POSSIBLE, self::WHEN_ALL_PRODUCTS_ARE_READY];
    }

    public static function getStatuses()
    {
        return [self::DRAFT, self::DONE, self::CANCELLED];
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

    public function salesOrderTransfer()
    {
        return $this->hasOne(SalesOrderTransfer::class);
    }

    public function slug()
    {
        return 'reference';
    }
}
