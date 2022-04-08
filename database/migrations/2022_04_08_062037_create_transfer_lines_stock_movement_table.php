<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTransferLinesStockMovementTable extends Migration
{
    public function up()
    {
        Schema::create('transfer_lines_stock_movement', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('transfer_id')->nullable();
            $table->bigInteger('transfer_line_id')->nullable();
            $table->bigInteger('stock_movement_id')->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('transfer_lines_stock_movement');
    }
}
