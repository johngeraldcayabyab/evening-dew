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
            $table->unsignedInteger('product_id')->nullable();
            $table->unsignedInteger('source_location_id')->nullable();
            $table->unsignedInteger('destination_location_id')->nullable();
            $table->double('quantity_done');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('stock_movements');
    }
}
