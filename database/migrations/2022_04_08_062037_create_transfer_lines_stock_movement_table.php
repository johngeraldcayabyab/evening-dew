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
            $table->unsignedInteger('transfer_id')->nullable();
            $table->unsignedInteger('transfer_line_id')->nullable();
            $table->unsignedInteger('stock_movement_id')->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('transfer_lines_stock_movement');
    }
}
