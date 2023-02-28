<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTransferLinesTable extends Migration
{
    public function up()
    {
        Schema::create('transfer_lines', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('product_id')->nullable();
            $table->string('description')->nullable();
            $table->double('demand');
            $table->unsignedInteger('measurement_id');
            $table->unsignedInteger('transfer_id')->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('transfer_lines');
    }
}
