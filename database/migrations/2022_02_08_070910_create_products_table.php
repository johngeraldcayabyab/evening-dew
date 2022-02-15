<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductsTable extends Migration
{
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('product_type');
            $table->string('invoicing_policy');

            $table->double('sales_price');
            $table->double('cost');

            $table->bigInteger('measurement_id')->nullable();
            $table->bigInteger('purchase_measurement_id')->nullable();
            $table->bigInteger('sales_measurement_id')->nullable();


            $table->bigInteger('product_category_id')->nullable();

            $table->string('internal_reference')->nullable();
            $table->string('avatar')->nullable();

            $table->string('sales_description')->nullable();
            $table->string('purchase_description')->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('products');
    }
}
