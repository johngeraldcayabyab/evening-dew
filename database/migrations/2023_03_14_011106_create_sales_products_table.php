<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSalesProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sales_products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('product_type');
            $table->boolean('can_be_sold')->default(true);
            $table->boolean('can_be_purchased')->default(true);
            $table->string('invoicing_policy');
            $table->double('sales_price');
            $table->double('cost');
            $table->unsignedInteger('measurement_id')->nullable();
            $table->unsignedInteger('purchase_measurement_id')->nullable();
            $table->unsignedInteger('sales_measurement_id')->nullable();
            $table->unsignedInteger('product_category_id')->nullable();
            $table->string('internal_reference')->nullable();
            $table->string('avatar')->nullable();
            $table->string('sales_description')->nullable();
            $table->string('purchase_description')->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('sales_products');
    }
}
