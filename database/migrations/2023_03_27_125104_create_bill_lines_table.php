<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBillLinesTable extends Migration
{
    public function up()
    {
        Schema::create('bill_lines', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('product_id')->nullable();
            $table->string('description')->nullable();
            $table->double('quantity');
            $table->double('unit_price');
            $table->double('subtotal');
            $table->unsignedInteger('chart_of_account_id')->nullable();
            $table->unsignedInteger('bill_id')->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('bill_lines');
    }
}
