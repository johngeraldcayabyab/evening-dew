<?php

namespace Database\Seeders;

use App\Models\City;
use Illuminate\Database\Seeder;

class CitySeeder extends Seeder
{
    public function run()
    {
        $date = now();
        $data = [
            ['name' => 'Alaminos', 'province' => 'Pangasinan', 'region_id' => 'I', 'created_at' => $date, 'updated_at' => $date],
            ['name' => 'Angeles City', 'province' => 'Pampanga', 'region_id' => 'III', 'created_at' => $date, 'updated_at' => $date],
            ['name' => 'Antipolo', 'province' => 'Rizal', 'region_id' => 'IV-A', 'created_at' => $date, 'updated_at' => $date],
            ['name' => 'Bacolod', 'province' => 'Negros Occidental', 'region_id' => 'VI', 'created_at' => $date, 'updated_at' => $date],
            ['name' => 'Bacoor', 'province' => 'Cavite', 'region_id' => 'IV-A', 'created_at' => $date, 'updated_at' => $date],
            ['name' => 'Bago', 'province' => 'Negros Occidental', 'region_id' => 'VI', 'created_at' => $date, 'updated_at' => $date],
            ['name' => 'Baguio', 'province' => 'Benguet', 'region_id' => 'CAR', 'created_at' => $date, 'updated_at' => $date],
            ['name' => 'Bais', 'province' => 'Negros Oriental', 'region_id' => 'VII', 'created_at' => $date, 'updated_at' => $date],
            ['name' => 'Balanga', 'province' => 'Bataan', 'region_id' => 'III', 'created_at' => $date, 'updated_at' => $date],
            ['name' => 'Batac', 'province' => 'Ilocos Norte', 'region_id' => 'I', 'created_at' => $date, 'updated_at' => $date],
            ['name' => 'Batangas City', 'province' => 'Batangas', 'region_id' => 'IV-A', 'created_at' => $date, 'updated_at' => $date],
            ['name' => 'Bayawan', 'province' => 'Negros Oriental', 'region_id' => 'VII', 'created_at' => $date, 'updated_at' => $date],
            ['name' => 'Baybay', 'province' => 'Leyte', 'region_id' => 'VIII', 'created_at' => $date, 'updated_at' => $date],
            ['name' => 'Bayugan', 'province' => 'Agusan del Sur', 'region_id' => 'XIII', 'created_at' => $date, 'updated_at' => $date],
            ['name' => 'Biñan', 'province' => 'Laguna', 'region_id' => 'IV-A', 'created_at' => $date, 'updated_at' => $date],
            ['name' => 'Bislig', 'province' => 'Surigao del Sur', 'region_id' => 'XIII', 'created_at' => $date, 'updated_at' => $date],
            ['name' => 'Bogo', 'province' => 'Cebu', 'region_id' => 'VII', 'created_at' => $date, 'updated_at' => $date],
            ['name' => 'Borongan', 'province' => 'Eastern Samar', 'region_id' => 'VIII', 'created_at' => $date, 'updated_at' => $date],
            ['name' => 'Butuan', 'province' => 'Agusan del Norte', 'region_id' => 'XIII', 'created_at' => $date, 'updated_at' => $date],
            ['name' => 'Cabadbaran', 'province' => 'Agusan del Norte', 'region_id' => 'XIII', 'created_at' => $date, 'updated_at' => $date],
            ['name' => 'Cabanatuan', 'province' => 'Nueva Ecija', 'region_id' => 'III', 'created_at' => $date, 'updated_at' => $date],
            ['name' => 'Cabuyao', 'province' => 'Laguna', 'region_id' => 'IV-A', 'created_at' => $date, 'updated_at' => $date],
            ['name' => 'Cadiz', 'province' => 'Negros Occidental', 'region_id' => 'VI', 'created_at' => $date, 'updated_at' => $date],
            ['name' => 'Cagayan de Oro', 'province' => 'Misamis Oriental', 'region_id' => 'X', 'created_at' => $date, 'updated_at' => $date],
            ['name' => 'Calamba', 'province' => 'Laguna', 'region_id' => 'IV-A', 'created_at' => $date, 'updated_at' => $date],
            ['name' => 'Calapan', 'province' => 'Oriental Mindoro', 'region_id' => 'Mimaropa', 'created_at' => $date, 'updated_at' => $date],
            ['name' => 'Calbayog', 'province' => 'Samar', 'region_id' => 'VIII', 'created_at' => $date, 'updated_at' => $date],
            ['name' => 'Caloocan', 'province' => null, 'region_id' => 'NCR', 'created_at' => $date, 'updated_at' => $date],
            ['name' => 'Candon', 'province' => 'Ilocos Sur', 'region_id' => 'I', 'created_at' => $date, 'updated_at' => $date],
            ['name' => 'Canlaon', 'province' => 'Negros Oriental', 'region_id' => 'VII', 'created_at' => $date, 'updated_at' => $date],
            ['name' => 'Carcar', 'province' => 'Cebu', 'region_id' => 'VII', 'created_at' => $date, 'updated_at' => $date],
            ['name' => 'Catbalogan', 'province' => 'Samar', 'region_id' => 'VIII', 'created_at' => $date, 'updated_at' => $date],
            ['name' => 'Cauayan', 'province' => 'Isabela', 'region_id' => 'II', 'created_at' => $date, 'updated_at' => $date],
            ['name' => 'Cavite City', 'province' => 'Cavite', 'region_id' => 'IV-A', 'created_at' => $date, 'updated_at' => $date],
            ['name' => 'Cebu City', 'province' => 'Cebu', 'region_id' => 'VII', 'created_at' => $date, 'updated_at' => $date],
            ['name' => 'Cotabato City', 'province' => 'Maguindanao', 'region_id' => 'XII', 'created_at' => $date, 'updated_at' => $date],
            ['name' => 'Dagupan', 'province' => 'Pangasinan', 'region_id' => 'I', 'created_at' => $date, 'updated_at' => $date],
            ['name' => 'Danao', 'province' => 'Cebu', 'region_id' => 'VII', 'created_at' => $date, 'updated_at' => $date],
            ['name' => 'Dapitan', 'province' => 'Zamboanga del Norte', 'region_id' => 'IX', 'created_at' => $date, 'updated_at' => $date],
            ['name' => 'Dasmariñas', 'province' => 'Cavite', 'region_id' => 'IV-A', 'created_at' => $date, 'updated_at' => $date],
            ['name' => 'Davao City', 'province' => 'Davao del Sur', 'region_id' => 'XI', 'created_at' => $date, 'updated_at' => $date],
            ['name' => 'Digos', 'province' => 'Davao del Sur', 'region_id' => 'XI', 'created_at' => $date, 'updated_at' => $date],
            ['name' => 'Dipolog', 'province' => 'Zamboanga del Norte', 'region_id' => 'IX', 'created_at' => $date, 'updated_at' => $date],
            ['name' => 'Dumaguete', 'province' => 'Negros Oriental', 'region_id' => 'VII', 'created_at' => $date, 'updated_at' => $date],
            ['name' => 'El Salvador', 'province' => 'Misamis Oriental', 'region_id' => 'X', 'created_at' => $date, 'updated_at' => $date],
            ['name' => 'Escalante', 'province' => 'Negros Occidental', 'region_id' => 'VI', 'created_at' => $date, 'updated_at' => $date],
            ['name' => 'Gapan', 'province' => 'Nueva Ecija', 'region_id' => 'III', 'created_at' => $date, 'updated_at' => $date],
            ['name' => 'General Santos', 'province' => 'South Cotabato', 'region_id' => 'XII', 'created_at' => $date, 'updated_at' => $date],
            ['name' => 'General Trias', 'province' => 'Cavite', 'region_id' => 'IV-A', 'created_at' => $date, 'updated_at' => $date],
            ['name' => 'Gingoog', 'province' => 'Misamis Oriental', 'region_id' => 'X', 'created_at' => $date, 'updated_at' => $date],
            ['name' => 'Guihulngan', 'province' => 'Negros Oriental', 'region_id' => 'VII', 'created_at' => $date, 'updated_at' => $date],
            ['name' => 'Himamaylan', 'province' => 'Negros Occidental', 'region_id' => 'VI', 'created_at' => $date, 'updated_at' => $date],
            ['name' => 'Ilagan', 'province' => 'Isabela', 'region_id' => 'II', 'created_at' => $date, 'updated_at' => $date],
            ['name' => 'Iligan', 'province' => 'Lanao del Norte', 'region_id' => 'X', 'created_at' => $date, 'updated_at' => $date],
            ['name' => 'Iloilo City', 'province' => 'Iloilo', 'region_id' => 'VI', 'created_at' => $date, 'updated_at' => $date],
            ['name' => 'Imus', 'province' => 'Cavite', 'region_id' => 'IV-A', 'created_at' => $date, 'updated_at' => $date],
            ['name' => 'Iriga', 'province' => 'Camarines Sur', 'region_id' => 'V', 'created_at' => $date, 'updated_at' => $date],
            ['name' => 'Isabela', 'province' => 'Basilan', 'region_id' => 'IX', 'created_at' => $date, 'updated_at' => $date],
            ['name' => 'Kabankalan', 'province' => 'Negros Occidental', 'region_id' => 'VI', 'created_at' => $date, 'updated_at' => $date],
            ['name' => 'Kidapawan', 'province' => 'Cotabato', 'region_id' => 'XII', 'created_at' => $date, 'updated_at' => $date],
            ['name' => 'Koronadal', 'province' => 'South Cotabato', 'region_id' => 'XII', 'created_at' => $date, 'updated_at' => $date],
            ['name' => 'La Carlota', 'province' => 'Negros Occidental', 'region_id' => 'VI', 'created_at' => $date, 'updated_at' => $date],
            ['name' => 'Lamitan', 'province' => 'Basilan', 'region_id' => 'BARMM', 'created_at' => $date, 'updated_at' => $date],
            ['name' => 'Laoag', 'province' => 'Ilocos Norte', 'region_id' => 'I', 'created_at' => $date, 'updated_at' => $date],
            ['name' => 'Lapu-Lapu City', 'province' => 'Cebu', 'region_id' => 'VII', 'created_at' => $date, 'updated_at' => $date],
            ['name' => 'Las Piñas', 'province' => null, 'region_id' => 'NCR', 'created_at' => $date, 'updated_at' => $date],
            ['name' => 'Legazpi', 'province' => 'Albay', 'region_id' => 'V', 'created_at' => $date, 'updated_at' => $date],
            ['name' => 'Ligao', 'province' => 'Albay', 'region_id' => 'V', 'created_at' => $date, 'updated_at' => $date],
            ['name' => 'Lipa', 'province' => 'Batangas', 'region_id' => 'IV-A', 'created_at' => $date, 'updated_at' => $date],
            ['name' => 'Lucena', 'province' => 'Quezon', 'region_id' => 'IV-A', 'created_at' => $date, 'updated_at' => $date],
            ['name' => 'Maasin', 'province' => 'Southern Leyte', 'region_id' => 'VIII', 'created_at' => $date, 'updated_at' => $date],
            ['name' => 'Mabalacat', 'province' => 'Pampanga', 'region_id' => 'III', 'created_at' => $date, 'updated_at' => $date],
            ['name' => 'Makati', 'province' => null, 'region_id' => 'NCR', 'created_at' => $date, 'updated_at' => $date],
            ['name' => 'Malabon', 'province' => null, 'region_id' => 'NCR', 'created_at' => $date, 'updated_at' => $date],
            ['name' => 'Malaybalay', 'province' => 'Bukidnon', 'region_id' => 'X', 'created_at' => $date, 'updated_at' => $date],
            ['name' => 'Malolos', 'province' => 'Bulacan', 'region_id' => 'III', 'created_at' => $date, 'updated_at' => $date],
            ['name' => 'Mandaluyong', 'province' => null, 'region_id' => 'NCR', 'created_at' => $date, 'updated_at' => $date],
            ['name' => 'Mandaue', 'province' => 'Cebu', 'region_id' => 'VII', 'created_at' => $date, 'updated_at' => $date],
            ['name' => 'Manila', 'province' => 'none', 'region_id' => 'NCR', 'created_at' => $date, 'updated_at' => $date],
            ['name' => 'Marawi', 'province' => 'Lanao del Sur', 'region_id' => 'BARMM', 'created_at' => $date, 'updated_at' => $date],
            ['name' => 'Marikina', 'province' => null, 'region_id' => 'NCR', 'created_at' => $date, 'updated_at' => $date],
            ['name' => 'Masbate City', 'province' => 'Masbate', 'region_id' => 'V', 'created_at' => $date, 'updated_at' => $date],
            ['name' => 'Mati', 'province' => 'Davao Oriental', 'region_id' => 'XI', 'created_at' => $date, 'updated_at' => $date],
            ['name' => 'Meycauayan', 'province' => 'Bulacan', 'region_id' => 'III', 'created_at' => $date, 'updated_at' => $date],
            ['name' => 'Muñoz', 'province' => 'Nueva Ecija', 'region_id' => 'III', 'created_at' => $date, 'updated_at' => $date],
            ['name' => 'Muntinlupa', 'province' => null, 'region_id' => 'NCR', 'created_at' => $date, 'updated_at' => $date],
            ['name' => 'Naga', 'province' => 'Camarines Sur', 'region_id' => 'V', 'created_at' => $date, 'updated_at' => $date],
            ['name' => 'Naga', 'province' => 'Cebu', 'region_id' => 'VII', 'created_at' => $date, 'updated_at' => $date],
            ['name' => 'Navotas', 'province' => null, 'region_id' => 'NCR', 'created_at' => $date, 'updated_at' => $date],
            ['name' => 'Olongapo', 'province' => 'Zambales', 'region_id' => 'III', 'created_at' => $date, 'updated_at' => $date],
            ['name' => 'Ormoc', 'province' => 'Leyte', 'region_id' => 'VIII', 'created_at' => $date, 'updated_at' => $date],
            ['name' => 'Oroquieta', 'province' => 'Misamis Occidental', 'region_id' => 'X', 'created_at' => $date, 'updated_at' => $date],
            ['name' => 'Ozamiz', 'province' => 'Misamis Occidental', 'region_id' => 'X', 'created_at' => $date, 'updated_at' => $date],
            ['name' => 'Pagadian', 'province' => 'Zamboanga del Sur', 'region_id' => 'IX', 'created_at' => $date, 'updated_at' => $date],
            ['name' => 'Palayan', 'province' => 'Nueva Ecija', 'region_id' => 'III', 'created_at' => $date, 'updated_at' => $date],
            ['name' => 'Panabo', 'province' => 'Davao del Norte', 'region_id' => 'XI', 'created_at' => $date, 'updated_at' => $date],
            ['name' => 'Parañaque', 'province' => null, 'region_id' => 'NCR', 'created_at' => $date, 'updated_at' => $date],
            ['name' => 'Pasay', 'province' => 'none [g]', 'region_id' => 'NCR', 'created_at' => $date, 'updated_at' => $date],
            ['name' => 'Pasig', 'province' => null, 'region_id' => 'NCR', 'created_at' => $date, 'updated_at' => $date],
            ['name' => 'Passi', 'province' => 'Iloilo', 'region_id' => 'VI', 'created_at' => $date, 'updated_at' => $date],
            ['name' => 'Puerto Princesa', 'province' => 'Palawan', 'region_id' => 'Mimaropa', 'created_at' => $date, 'updated_at' => $date],
            ['name' => 'Quezon City', 'province' => 'none [g]', 'region_id' => 'NCR', 'created_at' => $date, 'updated_at' => $date],
            ['name' => 'Roxas', 'province' => 'Capiz', 'region_id' => 'VI', 'created_at' => $date, 'updated_at' => $date],
            ['name' => 'Sagay', 'province' => 'Negros Occidental', 'region_id' => 'VI', 'created_at' => $date, 'updated_at' => $date],
            ['name' => 'Samal', 'province' => 'Davao del Norte', 'region_id' => 'XI', 'created_at' => $date, 'updated_at' => $date],
            ['name' => 'San Carlos', 'province' => 'Negros Occidental', 'region_id' => 'VI', 'created_at' => $date, 'updated_at' => $date],
            ['name' => 'San Carlos', 'province' => 'Pangasinan', 'region_id' => 'I', 'created_at' => $date, 'updated_at' => $date],
            ['name' => 'San Fernando', 'province' => 'La Union', 'region_id' => 'I', 'created_at' => $date, 'updated_at' => $date],
            ['name' => 'San Fernando', 'province' => 'Pampanga', 'region_id' => 'III', 'created_at' => $date, 'updated_at' => $date],
            ['name' => 'San Jose', 'province' => 'Nueva Ecija', 'region_id' => 'III', 'created_at' => $date, 'updated_at' => $date],
            ['name' => 'San Jose del Monte', 'province' => 'Bulacan', 'region_id' => 'III', 'created_at' => $date, 'updated_at' => $date],
            ['name' => 'San Juan', 'province' => null, 'region_id' => 'NCR', 'created_at' => $date, 'updated_at' => $date],
            ['name' => 'San Pablo', 'province' => 'Laguna', 'region_id' => 'IV-A', 'created_at' => $date, 'updated_at' => $date],
            ['name' => 'San Pedro', 'province' => 'Laguna', 'region_id' => 'IV-A', 'created_at' => $date, 'updated_at' => $date],
            ['name' => 'Santa Rosa', 'province' => 'Laguna', 'region_id' => 'IV-A', 'created_at' => $date, 'updated_at' => $date],
            ['name' => 'Santo Tomas', 'province' => 'Batangas', 'region_id' => 'IV-A', 'created_at' => $date, 'updated_at' => $date],
            ['name' => 'Santiago', 'province' => 'Isabela', 'region_id' => 'II', 'created_at' => $date, 'updated_at' => $date],
            ['name' => 'Silay', 'province' => 'Negros Occidental', 'region_id' => 'VI', 'created_at' => $date, 'updated_at' => $date],
            ['name' => 'Sipalay', 'province' => 'Negros Occidental', 'region_id' => 'VI', 'created_at' => $date, 'updated_at' => $date],
            ['name' => 'Sorsogon City', 'province' => 'Sorsogon', 'region_id' => 'V', 'created_at' => $date, 'updated_at' => $date],
            ['name' => 'Surigao City', 'province' => 'Surigao del Norte', 'region_id' => 'XIII', 'created_at' => $date, 'updated_at' => $date],
            ['name' => 'Tabaco', 'province' => 'Albay', 'region_id' => 'V', 'created_at' => $date, 'updated_at' => $date],
            ['name' => 'Tabuk', 'province' => 'Kalinga', 'region_id' => 'CAR', 'created_at' => $date, 'updated_at' => $date],
            ['name' => 'Tacloban', 'province' => 'Leyte', 'region_id' => 'VIII', 'created_at' => $date, 'updated_at' => $date],
            ['name' => 'Tacurong', 'province' => 'Sultan Kudarat', 'region_id' => 'XII', 'created_at' => $date, 'updated_at' => $date],
            ['name' => 'Tagaytay', 'province' => 'Cavite', 'region_id' => 'IV-A', 'created_at' => $date, 'updated_at' => $date],
            ['name' => 'Tagbilaran', 'province' => 'Bohol', 'region_id' => 'VII', 'created_at' => $date, 'updated_at' => $date],
            ['name' => 'Taguig', 'province' => null, 'region_id' => 'NCR', 'created_at' => $date, 'updated_at' => $date],
            ['name' => 'Tagum', 'province' => 'Davao del Norte', 'region_id' => 'XI', 'created_at' => $date, 'updated_at' => $date],
            ['name' => 'Talisay', 'province' => 'Cebu', 'region_id' => 'VII', 'created_at' => $date, 'updated_at' => $date],
            ['name' => 'Talisay', 'province' => 'Negros Occidental', 'region_id' => 'VI', 'created_at' => $date, 'updated_at' => $date],
            ['name' => 'Tanauan', 'province' => 'Batangas', 'region_id' => 'IV-A', 'created_at' => $date, 'updated_at' => $date],
            ['name' => 'Tandag', 'province' => 'Surigao del Sur', 'region_id' => 'XIII', 'created_at' => $date, 'updated_at' => $date],
            ['name' => 'Tangub', 'province' => 'Misamis Occidental', 'region_id' => 'X', 'created_at' => $date, 'updated_at' => $date],
            ['name' => 'Tanjay', 'province' => 'Negros Oriental', 'region_id' => 'VII', 'created_at' => $date, 'updated_at' => $date],
            ['name' => 'Tarlac City', 'province' => 'Tarlac', 'region_id' => 'III', 'created_at' => $date, 'updated_at' => $date],
            ['name' => 'Tayabas', 'province' => 'Quezon', 'region_id' => 'IV-A', 'created_at' => $date, 'updated_at' => $date],
            ['name' => 'Toledo', 'province' => 'Cebu', 'region_id' => 'VII', 'created_at' => $date, 'updated_at' => $date],
            ['name' => 'Trece Martires', 'province' => 'Cavite', 'region_id' => 'IV-A', 'created_at' => $date, 'updated_at' => $date],
            ['name' => 'Tuguegarao', 'province' => 'Cagayan', 'region_id' => 'II', 'created_at' => $date, 'updated_at' => $date],
            ['name' => 'Urdaneta', 'province' => 'Pangasinan', 'region_id' => 'I', 'created_at' => $date, 'updated_at' => $date],
            ['name' => 'Valencia', 'province' => 'Bukidnon', 'region_id' => 'X', 'created_at' => $date, 'updated_at' => $date],
            ['name' => 'Valenzuela', 'province' => 'none [m]', 'region_id' => 'NCR', 'created_at' => $date, 'updated_at' => $date],
            ['name' => 'Victorias', 'province' => 'Negros Occidental', 'region_id' => 'VI', 'created_at' => $date, 'updated_at' => $date],
            ['name' => 'Vigan', 'province' => 'Ilocos Sur', 'region_id' => 'I', 'created_at' => $date, 'updated_at' => $date],
            ['name' => 'Zamboanga City', 'province' => 'Zamboanga del Sur', 'region_id' => 'IX', 'created_at' => $date, 'updated_at' => $date],
        ];

        foreach ($data as $key => $datum) {
            if ($datum['region_id'] === 'NCR') {
                $data[$key]['region_id'] = 1;
            }
            if ($datum['region_id'] === 'CAR') {
                $data[$key]['region_id'] = 2;
            }
            if ($datum['region_id'] === 'I') {
                $data[$key]['region_id'] = 3;
            }
            if ($datum['region_id'] === 'II') {
                $data[$key]['region_id'] = 4;
            }
            if ($datum['region_id'] === 'III') {
                $data[$key]['region_id'] = 5;
            }
            if ($datum['region_id'] === 'IV-A') {
                $data[$key]['region_id'] = 6;
            }
            if ($datum['region_id'] === 'Mimaropa') {
                $data[$key]['region_id'] = 7;
            }
            if ($datum['region_id'] === 'V') {
                $data[$key]['region_id'] = 8;
            }
            if ($datum['region_id'] === 'VI') {
                $data[$key]['region_id'] = 9;
            }
            if ($datum['region_id'] === 'VII') {
                $data[$key]['region_id'] = 10;
            }
            if ($datum['region_id'] === 'VIII') {
                $data[$key]['region_id'] = 11;
            }
            if ($datum['region_id'] === 'IX') {
                $data[$key]['region_id'] = 12;
            }
            if ($datum['region_id'] === 'X') {
                $data[$key]['region_id'] = 13;
            }
            if ($datum['region_id'] === 'XI') {
                $data[$key]['region_id'] = 14;
            }
            if ($datum['region_id'] === 'XII') {
                $data[$key]['region_id'] = 15;
            }

            if ($datum['region_id'] === 'XIII') {
                $data[$key]['region_id']= 16;
            }
            if ($datum['region_id'] === 'BARMM') {
                $data[$key]['region_id'] = 17;
            }
        }

        City::insert($data);
    }
}
