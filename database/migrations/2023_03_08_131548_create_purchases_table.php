<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePurchasesTable extends Migration
{
    public function up()
    {
        Schema::create('purchases', function (Blueprint $table) {
            $table->id();
            $table->string('number');
            $table->unsignedInteger('vendor_id')->nullable();
            $table->string('vendor_reference')->nullable();
            $table->longText('notes')->nullable();
            $table->unsignedInteger('currency_id')->nullable();
            $table->dateTime('order_deadline')->nullable();
            $table->dateTime('receipt_date')->nullable();
            $table->string('shipping_method')->nullable();
            $table->unsignedInteger('purchase_representative_id')->nullable();
            $table->unsignedInteger('drop_ship_address_id')->nullable();
            $table->unsignedInteger('payment_term_id')->nullable();
            $table->double('subtotal')->nullable()->default(0);
            $table->string('status')->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('purchases');
    }
}
