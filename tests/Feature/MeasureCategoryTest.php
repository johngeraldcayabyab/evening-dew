<?php

namespace Tests\Feature;

use Database\Factories\MeasureCategoryFactory;
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
        $factory = new MeasureCategoryFactory();
        $response = $this->postJson(route('measures_categories.index'), $factory->make()->toArray());
        $response->assertStatus(201);
    }
}
