<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAddressesTable extends Migration
{
    public function up()
    {
        Schema::create('addresses', function (Blueprint $table) {
            $table->id();
            $table->string('address_name');
            $table->string('street_1');
            $table->string('street_2');
            $table->string('city');
            $table->string('state');
            $table->string('zip');
            $table->bigInteger('country_id')->nullable();
            $table->bigInteger('contact_id')->nullable();
            $table->string('type');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('addresses');
    }
}
