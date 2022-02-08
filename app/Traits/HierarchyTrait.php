<?php

namespace App\Traits;

use App\Models\ProductCategory;

trait HierarchyTrait
{
    private $flattenedElements = [];

    public function parent()
    {
        return $this->belongsTo(static::class, 'product_category_id', 'id');
    }

    public function children()
    {
        return $this->hasMany(static::class);
    }

    public function parentRecursive()
    {
        return $this->parent()->with('parentRecursive');
    }

    public function childrenRecursive()
    {
        return $this->children()->with('childrenRecursive');
    }

    public function getWithParentsAttribute()
    {
        $parents = $this->parentRecursive()->get();
        $this->flattenedElements[] = $this->category;
        if ($parents) {
            $this->flattenParents($parents[0]);
        }
        $parentsReverse = array_reverse($this->flattenedElements);
        return implode(' / ', $parentsReverse);
    }

    public function flattenParents($parents)
    {
        $this->flattenedElements[] = $parents->category;
        if ($parents->parent) {
            $this->flattenParents($parents->parent);
        }
    }
}
