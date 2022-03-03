<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStockMovementsTable extends Migration
{
    public function up()
    {
        Schema::create('stock_movements', function (Blueprint $table) {
            $table->id();
            $table->string('reference')->nullable();
            $table->string('source')->nullable();
            $table->bigInteger('product_id')->nullable();
            $table->bigInteger('source_location_id')->nullable();
            $table->bigInteger('destination_location_id')->nullable();
            $table->integer('quantity_done');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('stock_movements');
    }
}
