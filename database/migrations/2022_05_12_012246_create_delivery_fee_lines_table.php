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
            $table->bigInteger('product_id')->nullable();
            $table->integer('quantity');
            $table->bigInteger('measurement_id');
            $table->bigInteger('delivery_fee_id')->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('delivery_fee_lines');
    }
}
