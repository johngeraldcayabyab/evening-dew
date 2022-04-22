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
            'Abra',
            'Agusan del Norte',
            'Agusan del Sur',
            'Aklan',
            'Albay',
            'Antique',
            'Apayao',
            'Aurora',
            'Basilan',
            'Bataan',
            'Batanes',
            'Batangas',
            'Benguet',
            'Biliran',
            'Bohol',
            'Bukidnon',
            'Bulacan',
            'Cagayan',
            'Camarines Norte',
            'Camarines Sur',
            'Camiguin',
            'Capiz',
            'Catanduanes',
            'Cavite',
            'Cebu',
            'Cotabato',
            'Davao Occidental',
            'Davao Oriental',
            'Compostela Valley',
            'Davao del Norte',
            'Davao del Sur',
            'Dinagat Islands',
            'Eastern Samar',
            'Guimaras',
            'Ifugao',
            'Ilocos Norte',
            'Ilocos Sur',
            'Iloilo',
            'Isabela',
            'Kalinga',
            'La Union',
            'Laguna',
            'Lanao del Norte',
            'Lanao del Sur',
            'Leyte',
            'Maguindanao',
            'Marinduque',
            'Masbate',
            'Metro Manila',
            'Misamis Occidental',
            'Misamis Oriental',
            'Mountain',
            'Negros Occidental',
            'Negros Oriental',
            'Northern Samar',
            'Nueva Ecija',
            'Nueva Vizcaya',
            'Occidental Mindoro',
            'Oriental Mindoro',
            'Palawan',
            'Pampanga',
            'Pangasinan',
            'Quezon',
            'Quirino',
            'Rizal',
            'Romblon',
            'Samar',
            'Sarangani',
            'Siquijor',
            'Sorsogon',
            'South Cotabato',
            'Southern Leyte',
            'Sultan Kudarat',
            'Sulu',
            'Surigao del Norte',
            'Surigao del Sur',
            'Tarlac',
            'Tawi-Tawi',
            'Zambales',
            'Zamboanga Sibugay',
            'Zamboanga del Norte',
            'Zamboanga del Sur',
        ];
        $data = [];
        foreach ($regions as $region) {
            $data[] = [
                'region_name' => $region,
                'region_code' => Str::of($region)->snake(),
                'country_id' => 1,
            ];
        }
        Region::insert($data);
    }
}
