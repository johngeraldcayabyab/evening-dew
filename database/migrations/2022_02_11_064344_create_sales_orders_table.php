<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSalesOrdersTable extends Migration
{
    public function up()
    {
        Schema::create('sales_orders', function (Blueprint $table) {
            $table->id();
            $table->string('number');
            $table->bigInteger('customer_id')->nullable();
            $table->bigInteger('invoice_address_id')->nullable();
            $table->bigInteger('delivery_address_id')->nullable();

            $table->dateTime('expiration')->nullable();
            $table->dateTime('quotation_date');
            $table->bigInteger('payment_term_id')->nullable();

            $table->bigInteger('salesperson_id')->nullable();
            $table->string('customer_reference');

            $table->string('shipping_policy')->nullable();
            $table->dateTime('expected_delivery_date')->nullable();


            $table->string('source_document');

            $table->softDeletes();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('sales_orders');
    }
}
