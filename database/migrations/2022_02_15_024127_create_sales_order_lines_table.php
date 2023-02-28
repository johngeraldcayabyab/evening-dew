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
            $table->unsignedInteger('product_id')->nullable();
            $table->string('description')->nullable();
            $table->double('quantity');
            $table->unsignedInteger('measurement_id');
            $table->double('unit_price');
            $table->double('subtotal');
            $table->dateTime('shipping_date')->nullable();
            $table->unsignedInteger('sales_order_id')->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('sales_order_lines');
    }
}
