<?php

namespace Database\Factories;

use App\Models\UnitOfMeasureCategory;
use Illuminate\Database\Eloquent\Factories\Factory;

class UnitOfMeasureCategoryFactory extends Factory
{
    protected $model = UnitOfMeasureCategory::class;


    public function definition()
    {
        return [
            'name' => $this->faker->firstName
        ];
    }
}
