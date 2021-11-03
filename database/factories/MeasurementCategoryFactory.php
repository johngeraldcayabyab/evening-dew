<?php

namespace Database\Factories;

use App\Models\MeasurementCategory;
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
