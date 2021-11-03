<?php

namespace Tests\Feature;

use Database\Factories\MeasurementCategoryFactory;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class MeasureCategoryTest extends TestCase
{
    public function test_example()
    {
        $response = $this->get('/');

        $response->assertStatus(200);
    }

    public function test_create()
    {
        $factory = new MeasurementCategoryFactory();
        $response = $this->postJson(route('measurement_categories.index'), $factory->make()->toArray());
        $response->assertStatus(201);
    }
}
