<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMaterialLinesTable extends Migration
{
    public function up()
    {
        Schema::create('material_lines', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('product_id')->nullable();
            $table->double('quantity');
            $table->unsignedInteger('measurement_id');
            $table->unsignedInteger('material_id')->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('material_lines');
    }
}
