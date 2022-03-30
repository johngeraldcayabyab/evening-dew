<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAdjustmentsTable extends Migration
{
    public function up()
    {
        Schema::create('adjustments', function (Blueprint $table) {
            $table->id();
            $table->string('number');
            $table->bigInteger('product_category_id')->nullable();
            $table->bigInteger('warehouse_id')->nullable();
            $table->string('status')->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('adjustments');
    }
}
