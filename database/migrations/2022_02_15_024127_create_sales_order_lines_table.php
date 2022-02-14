<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSalesOrderLinesTable extends Migration
{
    public function up()
    {
        Schema::create('sales_order_lines', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('product_id')->nullable();
            $table->bigInteger('description')->nullable();
            $table->integer('quantity');
            $table->bigInteger('measurement_id');
            $table->integer('unit_price');
            $table->integer('subtotal');
            $table->bigInteger('sales_order_id')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('sales_order_lines');
    }
}
