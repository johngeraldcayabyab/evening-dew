<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePurchaseLinesTable extends Migration
{
    public function up()
    {
        Schema::create('purchase_lines', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('product_id')->nullable();
            $table->string('description')->nullable();
            $table->double('quantity');
            $table->unsignedInteger('measurement_id');
            $table->double('unit_price');
            $table->double('subtotal');
            $table->dateTime('receiving_date')->nullable();
            $table->unsignedInteger('purchase_id')->nullable();
            $table->unsignedInteger('tax_id')->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('purchase_lines');
    }
}
