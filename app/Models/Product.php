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

class Product extends Model implements Sluggable
{
    use HasFactory;
    use SoftDeletes;
    use BroadcastsEvents;
    use FilterTrait;
    use LogsActivity;
    use ModelHelperTrait;

    const STORABLE = 'storable';
    const CONSUMABLE = 'consumable';
    const SERVICE = 'service';

    const ORDERED_QUANTITIES = 'ordered_quantities';
    const DELIVERED_QUANTITIES = 'delivered_quantities';

    const DEFAULT_SALES_PRICE = 1.00;
    const DEFAULT_COST = 1.00;

    protected $table = 'products';
    protected $guarded = [];
    protected static $logAttributes = ['*'];

    public static function getProductTypes()
    {
        return [self::STORABLE, self::CONSUMABLE, self::SERVICE];
    }

    public static function getInvoicingPolicies()
    {
        return [self::ORDERED_QUANTITIES, self::DELIVERED_QUANTITIES];
    }

    public function measurement()
    {
        return $this->belongsTo(Measurement::class);
    }

    public function purchaseMeasurement()
    {
        return $this->belongsTo(Measurement::class, 'purchase_measurement_id', 'id');
    }

    public function salesMeasurement()
    {
        return $this->belongsTo(Measurement::class, 'sales_measurement_id', 'id');
    }

    public function productCategory()
    {
        return $this->belongsTo(ProductCategory::class, 'product_category_id', 'id');
    }

    public function material()
    {
        return $this->hasOne(Material::class);
    }

    //    public function updateQuantity($operationType, $demand, $materialQuantity = null)
    //    {
    //        if ($operationType->type === OperationType::DELIVERY) {
    //            if ($materialQuantity) {
    //                $this->quantity = $this->quantity - ($materialQuantity * $demand);
    //            } else {
    //                $this->quantity = $this->quantity - $demand;
    //            }
    //        } else if ($operationType->type === OperationType::RECEIPT) {
    //            if ($materialQuantity) {
    //                $this->quantity = $this->quantity + ($materialQuantity * $demand);
    //            } else {
    //                $this->quantity = $this->quantity + $demand;
    //            }
    //        }
    //        $this->save();
    //        return $this;
    //    }

    public static function isStorable($type)
    {
        if ($type === Product::STORABLE) {
            return true;
        }
        return false;
    }

    public function slug()
    {
        return 'name';
    }
}
