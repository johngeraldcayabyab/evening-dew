<?php

namespace Database\Seeders;

use App\Models\Region;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class RegionSeeder extends Seeder
{
    public function run()
    {
        $regions = [
            [
                'region_name' => 'Manila',
                'region_code' => 'NCR',
            ],
            [
                'region_name' => 'Baguio',
                'region_code' => 'CAR',
            ],
            [
                'region_name' => 'San Fernando',
                'region_code' => '',
            ],
            [
                'region_name' => '',
                'region_code' => '',
            ],
            [
                'region_name' => '',
                'region_code' => '',
            ],
            [
                'region_name' => '',
                'region_code' => '',
            ],
            [
                'region_name' => '',
                'region_code' => '',
            ],
            [
                'region_name' => '',
                'region_code' => '',
            ],
            [
                'region_name' => '',
                'region_code' => '',
            ],
            [
                'region_name' => '',
                'region_code' => '',
            ],
            [
                'region_name' => '',
                'region_code' => '',
            ],
            [
                'region_name' => '',
                'region_code' => '',
            ],
            [
                'region_name' => '',
                'region_code' => '',
            ],
            [
                'region_name' => '',
                'region_code' => '',
            ],
            [
                'region_name' => '',
                'region_code' => '',
            ],
            [
                'region_name' => '',
                'region_code' => '',
            ],
            [
                'region_name' => '',
                'region_code' => '',
            ],
        ];
        $data = [];
        foreach ($regions as $region) {
            $date = now();
            $data[] = [
                'region_name' => $region,
                'region_code' => Str::of($region)->snake(),
                'country_id' => 1,
                'created_at' => $date,
                'updated_at' => $date,
            ];
        }
        Region::insert($data);
    }
}
