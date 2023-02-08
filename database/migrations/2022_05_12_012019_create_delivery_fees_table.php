<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDeliveryFeesTable extends Migration
{
    public function up()
    {
        Schema::create('delivery_fees', function (Blueprint $table) {
            $table->id();
            $table->string('name')->nullable();
            $table->boolean('is_enabled')->default(false);
            $table->bigInteger('product_id')->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('delivery_fees');
    }
}
