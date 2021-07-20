<?php

namespace Tests\Feature;

use Database\Factories\UnitOfMeasureCategoryFactory;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class UnitOfMeasureCategoryTest extends TestCase
{
    public function test_example()
    {
        $response = $this->get('/');

        $response->assertStatus(200);
    }

    public function test_create()
    {
        $factory = new UnitOfMeasureCategoryFactory();
        $response = $this->postJson(route('units_of_measure_categories.index'), $factory->make()->toArray());
        $response->assertStatus(201);
    }
}
