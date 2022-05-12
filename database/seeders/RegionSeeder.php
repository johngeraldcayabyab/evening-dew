<?php

namespace Database\Seeders;

use App\Models\Region;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class RegionSeeder extends Seeder
{
    public function run()
    {
        $date = now();
        $data = [
            [
                'region' => 'National Capital Region (NCR)',
                'region_center' => 'Manila',
                'created_at' => $date,
                'updated_at' => $date,
            ],
            [
                'region' => 'Cordillera Administrative Region (CAR)',
                'region_center' => 'Baguio',
                'created_at' => $date,
                'updated_at' => $date,
            ],
            [
                'region' => 'Ilocos Region (Region I)',
                'region_center' => 'San Fernando (La Union)',
                'created_at' => $date,
                'updated_at' => $date,
            ],
            [
                'region' => 'Cagayan Valley (Region II)',
                'region_center' => 'Tuguegarao',
                'created_at' => $date,
                'updated_at' => $date,
            ],
            [
                'region' => 'Central Luzon (Region III)',
                'region_center' => 'San Fernando (Pampanga)',
                'created_at' => $date,
                'updated_at' => $date,
            ],
            [
                'region' => 'Calabarzon (Region IV-A)',
                'region_center' => 'Calamba',
                'created_at' => $date,
                'updated_at' => $date,
            ],
            [
                'region' => 'Southwestern Taglog Region (Mimaropa)',
                'region_center' => 'Calapan',
                'created_at' => $date,
                'updated_at' => $date,
            ],
            [
                'region' => 'Bicol Region (Region V)',
                'region_center' => 'Legazpi',
                'created_at' => $date,
                'updated_at' => $date,
            ],
            [
                'region' => 'Western Visayan (Region VI)',
                'region_center' => 'Iloilo City',
                'created_at' => $date,
                'updated_at' => $date,
            ],
            [
                'region' => 'Central Visayas (Reguin VII)',
                'region_center' => 'Cebu City',
                'created_at' => $date,
                'updated_at' => $date,
            ],
            [
                'region' => 'Eastern Visayas (Region VIII)',
                'region_center' => 'Tacloban',
                'created_at' => $date,
                'updated_at' => $date,
            ],
            [
                'region' => 'Zamboanga Peninsula (Region IX)',
                'region_center' => 'Pagadian',
                'created_at' => $date,
                'updated_at' => $date,
            ],
            [
                'region' => 'Northern Mindanao (Region X)',
                'region_center' => ' Cagayan de Oro',
                'created_at' => $date,
                'updated_at' => $date,
            ],
            [
                'region' => 'Davao Region (Region XI)',
                'region_center' => 'Davao City',
                'created_at' => $date,
                'updated_at' => $date,
            ],
            [
                'region' => 'Soccsksargen (Region XII)',
                'region_center' => 'Koronadal',
                'created_at' => $date,
                'updated_at' => $date,
            ],
            [
                'region' => 'Caraga (Region XIII)',
                'region_center' => 'Butuan',
                'created_at' => $date,
                'updated_at' => $date,
            ],
            [
                'region' => 'Bangsamoro (BARMM)',
                'region_center' => 'Cotabato City',
                'created_at' => $date,
                'updated_at' => $date,
            ],
        ];
        Region::insert($data);
    }
}
