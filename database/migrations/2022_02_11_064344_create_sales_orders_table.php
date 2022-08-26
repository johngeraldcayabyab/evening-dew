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
            $table->string('invoice_address')->nullable();
            $table->string('delivery_address')->nullable();
            $table->bigInteger('invoice_city_id')->nullable();
            $table->bigInteger('delivery_city_id')->nullable();
            $table->string('invoice_phone')->nullable();
            $table->string('delivery_phone')->nullable();
            $table->dateTime('expiration_date')->nullable();
            $table->dateTime('quotation_date')->nullable();
            $table->bigInteger('payment_term_id')->nullable();
            $table->bigInteger('salesperson_id')->nullable();
            $table->string('shipping_method')->nullable();
            $table->string('customer_reference')->nullable();
            $table->string('shipping_policy')->nullable();
            $table->dateTime('shipping_date')->nullable();
            $table->string('source_document')->nullable();
            $table->longText('notes')->nullable();
            $table->string('status')->nullable();
            $table->bigInteger('source_id')->nullable();
            $table->bigInteger('courier_id')->nullable();
            $table->integer('subtotal')->nullable()->default(0);
            $table->softDeletes();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('sales_orders');
    }
}
