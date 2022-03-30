<?php

namespace App\Models;

use App\Contacts\Sluggable;
use App\Traits\FilterTrait;
use App\Traits\HierarchyTrait;
use App\Traits\ModelHelperTrait;
use Illuminate\Database\Eloquent\BroadcastsEvents;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Activitylog\Traits\LogsActivity;

class ProductCategory extends Model implements Sluggable
{
    use HasFactory;
    use SoftDeletes;
    use BroadcastsEvents;
    use FilterTrait;
    use HierarchyTrait;
    use LogsActivity;
    use ModelHelperTrait;

    protected $table = 'product_categories';
    protected $guarded = [];
    protected static $logAttributes = ['*'];

    public function parentProductCategory()
    {
        return $this->belongsTo(ProductCategory::class, 'parent_product_category_id', 'id');
    }

    public function slug()
    {
        return 'parent.category';
    }
}
