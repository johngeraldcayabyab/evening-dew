<?php

namespace Database\Seeders;

use App\Models\Location;
use Illuminate\Database\Seeder;

class LocationSeeder extends Seeder
{
    public function run()
    {
        $partnerLocations = Location::create([
            'name' => 'Partner Locations',
            'parent_location_id' => null,
            'is_a_scrap_location' => false,
            'is_a_return_location' => false,
            'type' => Location::VIEW,
        ]);

        $virtualLocations = Location::create([
            'name' => 'Virtual Locations',
            'parent_location_id' => null,
            'is_a_scrap_location' => false,
            'is_a_return_location' => false,
            'type' => Location::VIEW,
        ]);

        $locationsData = [
            [
                'name' => 'Customer Location',
                'parent_location_id' => $partnerLocations->id,
                'is_a_scrap_location' => false,
                'is_a_return_location' => false,
                'type' => Location::CUSTOMER,
            ],
            [
                'name' => 'Vendor Location',
                'parent_location_id' => $partnerLocations->id,
                'is_a_scrap_location' => false,
                'is_a_return_location' => false,
                'type' => Location::VENDOR,
            ],
            [
                'name' => 'Production',
                'parent_location_id' => $virtualLocations->id,
                'is_a_scrap_location' => false,
                'is_a_return_location' => false,
                'type' => Location::PRODUCTION,
            ],
            [
                'name' => 'Scrap',
                'parent_location_id' => $virtualLocations->id,
                'is_a_scrap_location' => true,
                'is_a_return_location' => false,
                'type' => Location::INVENTORY_LOSS,
            ],
        ];

        foreach ($locationsData as $locationsDatum) {
            Location::create($locationsDatum);
        }
    }
}
