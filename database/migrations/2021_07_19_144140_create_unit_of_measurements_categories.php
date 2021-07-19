<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUnitOfMeasurementsCategories extends Migration
{
    public function up()
    {
        Schema::create('unit_of_measurements_categories', function (Blueprint $table) {
            $table->id();
            $table->enum('type', ['reference', 'bigger', 'smaller']);
            $table->decimal('rounding_precision', 19, 4)->default(0.01000);
            $table->decimal('ratio', 19, 4)->default(1.000000);
            $table->softDeletes();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('unit_of_measurements_categories');
    }
}
