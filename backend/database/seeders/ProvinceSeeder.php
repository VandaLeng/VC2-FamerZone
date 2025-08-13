<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Province;

class ProvinceSeeder extends Seeder
{
    public function run()
    {
        $provinces = [
            ['id' => 'phnom-penh', 'province_name' => 'Phnom Penh', 'city' => 'Phnom Penh', 'country' => 'Cambodia', 'latitude' => 11.5564, 'longitude' => 104.9282],
            ['id' => 'kampong-cham', 'province_name' => 'Kampong Cham', 'city' => 'Kampong Cham', 'country' => 'Cambodia', 'latitude' => 11.9809, 'longitude' => 105.5009],
            ['id' => 'siem-reap', 'province_name' => 'Siem Reap', 'city' => 'Siem Reap', 'country' => 'Cambodia', 'latitude' => 13.3671, 'longitude' => 103.8448],
            ['id' => 'battambang', 'province_name' => 'Battambang', 'city' => 'Battambang', 'country' => 'Cambodia', 'latitude' => 13.0950, 'longitude' => 103.2038],
            ['id' => 'kandal', 'province_name' => 'Kandal', 'city' => 'Ta Khmau', 'country' => 'Cambodia', 'latitude' => 11.4378, 'longitude' => 104.9621],
            ['id' => 'kampot', 'province_name' => 'Kampot', 'city' => 'Kampot', 'country' => 'Cambodia', 'latitude' => 10.6110, 'longitude' => 104.1811],
            ['id' => 'sihanoukville', 'province_name' => 'Sihanoukville', 'city' => 'Sihanoukville', 'country' => 'Cambodia', 'latitude' => 10.6340, 'longitude' => 103.5233],
            ['id' => 'kampong-thom', 'province_name' => 'Kampong Thom', 'city' => 'Kampong Thom', 'country' => 'Cambodia', 'latitude' => 12.6833, 'longitude' => 104.8833],
            ['id' => 'prey-veng', 'province_name' => 'Prey Veng', 'city' => 'Prey Veng', 'country' => 'Cambodia', 'latitude' => 11.4833, 'longitude' => 105.3333],
            ['id' => 'takeo', 'province_name' => 'Takeo', 'city' => 'Takeo', 'country' => 'Cambodia', 'latitude' => 10.9800, 'longitude' => 104.7833],
            ['id' => 'svay-rieng', 'province_name' => 'Svay Rieng', 'city' => 'Svay Rieng', 'country' => 'Cambodia', 'latitude' => 11.1167, 'longitude' => 105.8000],
            ['id' => 'kampong-speu', 'province_name' => 'Kampong Speu', 'city' => 'Kampong Speu', 'country' => 'Cambodia', 'latitude' => 11.3500, 'longitude' => 104.5333],
            ['id' => 'koh-kong', 'province_name' => 'Koh Kong', 'city' => 'Koh Kong', 'country' => 'Cambodia', 'latitude' => 11.6167, 'longitude' => 102.9833],
            ['id' => 'stung-treng', 'province_name' => 'Stung Treng', 'city' => 'Stung Treng', 'country' => 'Cambodia', 'latitude' => 13.5242, 'longitude' => 105.9667],
            ['id' => 'ratanakiri', 'province_name' => 'Ratanakiri', 'city' => 'Banlung', 'country' => 'Cambodia', 'latitude' => 13.8333, 'longitude' => 107.2333],
            ['id' => 'mondulkiri', 'province_name' => 'Mondulkiri', 'city' => 'Sen Monorom', 'country' => 'Cambodia', 'latitude' => 12.5, 'longitude' => 107.0],
            ['id' => 'kratie', 'province_name' => 'Kratie', 'city' => 'Kratie', 'country' => 'Cambodia', 'latitude' => 12.4860, 'longitude' => 106.0157],
            ['id' => 'pursat', 'province_name' => 'Pursat', 'city' => 'Pursat', 'country' => 'Cambodia', 'latitude' => 12.5350, 'longitude' => 103.9421],
            ['id' => 'preah-vihear', 'province_name' => 'Preah Vihear', 'city' => 'Preah Vihear', 'country' => 'Cambodia', 'latitude' => 13.8333, 'longitude' => 105.8333],
            ['id' => 'banteay-meanchey', 'province_name' => 'Banteay Meanchey', 'city' => 'Serei Saophoan', 'country' => 'Cambodia', 'latitude' => 13.5842, 'longitude' => 102.5657],
            ['id' => 'oddar-meanchey', 'province_name' => 'Oddar Meanchey', 'city' => 'Samraong', 'country' => 'Cambodia', 'latitude' => 14.0333, 'longitude' => 102.5667],
            ['id' => 'kep', 'province_name' => 'Kep', 'city' => 'Kep', 'country' => 'Cambodia', 'latitude' => 10.5167, 'longitude' => 104.3000],
            ['id' => 'pailin', 'province_name' => 'Pailin', 'city' => 'Pailin', 'country' => 'Cambodia', 'latitude' => 12.6667, 'longitude' => 102.6167],
            ['id' => 'tboung-khmum', 'province_name' => 'Tboung Khmum', 'city' => 'Suong', 'country' => 'Cambodia', 'latitude' => 11.4000, 'longitude' => 105.2667],
        ];

        foreach ($provinces as $province) {
            Province::updateOrCreate(['id' => $province['id']], $province);
        }
    }
}
