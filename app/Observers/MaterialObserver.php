<?php

namespace App\Observers;

use App\Models\Material;

class MaterialObserver
{
    public function creating(Material $material)
    {
        if (!$material->reference) {
            $material->reference = $material->product->name;
        }
        if (!$material->flexible_consumption) {
            $material->flexible_consumption = Material::ALLOWED_WITH_WARNING;
        }
    }

    public function updating(Material $material)
    {
        if (!$material->reference) {
            $material->reference = $material->product->name;
        }
        if (!$material->flexible_consumption) {
            $material->flexible_consumption = Material::ALLOWED_WITH_WARNING;
        }
    }
}
