<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAdjustmentLinesTable extends Migration
{
    public function up()
    {
        Schema::create('adjustment_lines', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('adjustment_id')->nullable();
            $table->bigInteger('product_id')->nullable();
            $table->bigInteger('measurement_id');
            $table->integer('quantity_on_hand');
            $table->integer('quantity_counted');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('adjustment_lines');
    }
}
