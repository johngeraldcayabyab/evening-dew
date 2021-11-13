<?php

namespace App\Modules\MeasurementCategory\Factories;

use App\Modules\MeasurementCategory\Models\MeasurementCategory;
use Illuminate\Database\Eloquent\Factories\Factory;

class MeasurementCategoryFactory extends Factory
{
    protected $model = MeasurementCategory::class;

    public function definition()
    {
        return [
            'name' => $this->faker->firstName
        ];
    }
}
