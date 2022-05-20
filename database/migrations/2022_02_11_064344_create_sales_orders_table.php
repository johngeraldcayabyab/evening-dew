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
            $table->bigInteger('customer_id');
            $table->bigInteger('invoice_address_id');
            $table->bigInteger('delivery_address_id');
            $table->string('phone')->nullable();
            $table->dateTime('expiration_date')->nullable();
            $table->dateTime('quotation_date');
            $table->bigInteger('payment_term_id')->nullable();
            $table->bigInteger('salesperson_id');
            $table->string('customer_reference')->nullable();
            $table->string('shipping_policy');
            $table->dateTime('expected_delivery_date')->nullable();
            $table->string('source_document')->nullable();
            $table->string('notes')->nullable();
            $table->string('status')->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('sales_orders');
    }
}
