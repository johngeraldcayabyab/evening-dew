<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSalesOrderTransferLineTable extends Migration
{
    public function up()
    {
        Schema::create('sales_order_transfer_line', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('sales_order_id')->nullable();
            $table->bigInteger('transfer_id')->nullable();
            $table->bigInteger('sales_order_line_id')->nullable();
            $table->bigInteger('transfer_line_id')->nullable();
            $table->bigInteger('sales_order_transfer_id')->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('sales_order_transfer_line');
    }
}
