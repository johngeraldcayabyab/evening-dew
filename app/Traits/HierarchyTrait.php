<?php

namespace App\Traits;


use Illuminate\Support\Str;

trait HierarchyTrait
{
    private $flattenedElements = [];

    public function parent()
    {
        $foreignKey = Str::snake(Str::replace('App\\Models\\', '', static::class));
        return $this->belongsTo(static::class, "parent_{$foreignKey}_id", 'id');
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

    public function getWithParents($field)
    {
        if (!$this->parent) {
            return $this->$field;
        }
        $parents = $this->parentRecursive()->get();
        $this->flattenedElements[] = $this->$field;
        if ($parents) {
            $this->flattenParents($parents[0], $field);
        }
        $parentsReverse = array_reverse($this->flattenedElements);
        return implode(' / ', $parentsReverse);
    }

    public function flattenParents($parents, $field)
    {
        $this->flattenedElements[] = $parents->$field;
        if ($parents->parent) {
            $this->flattenParents($parents->parent, $field);
        }
    }
}
