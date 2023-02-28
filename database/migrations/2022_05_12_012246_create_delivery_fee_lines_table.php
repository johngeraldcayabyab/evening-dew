<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDeliveryFeeLinesTable extends Migration
{
    public function up()
    {
        Schema::create('delivery_fee_lines', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('city_id')->nullable();
            $table->unsignedInteger('delivery_fee_id')->nullable();
            $table->double('fee')->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('delivery_fee_lines');
    }
}
