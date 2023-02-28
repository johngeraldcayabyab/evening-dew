<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSalesOrderTransfersTable extends Migration
{
    public function up()
    {
        Schema::create('sales_order_transfers', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('sales_order_id')->nullable();
            $table->unsignedInteger('transfer_id')->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('sales_order_transfers');
    }
}
