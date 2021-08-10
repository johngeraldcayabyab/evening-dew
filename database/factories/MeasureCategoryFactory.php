<?php

namespace Database\Factories;

use App\Models\MeasureCategory;
use Illuminate\Database\Eloquent\Factories\Factory;

class MeasureCategoryFactory extends Factory
{
    protected $model = MeasureCategory::class;


    public function definition()
    {
        return [
            'name' => $this->faker->firstName
        ];
    }
}
