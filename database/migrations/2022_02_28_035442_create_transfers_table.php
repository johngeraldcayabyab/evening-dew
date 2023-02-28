<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTransfersTable extends Migration
{
    public function up()
    {
        Schema::create('transfers', function (Blueprint $table) {
            $table->id();
            $table->string('reference')->nullable();
            $table->unsignedInteger('contact_id')->nullable();
            $table->unsignedInteger('operation_type_id')->nullable();
            $table->unsignedInteger('source_location_id')->nullable();
            $table->unsignedInteger('destination_location_id')->nullable();
            $table->dateTime('scheduled_date');
            $table->string('source_document')->nullable();
            $table->string('tracking_reference')->nullable();
            $table->unsignedDouble('weight')->nullable();
            $table->unsignedDouble('weight_for_shipping')->nullable();
            $table->string('shipping_policy')->nullable();
            $table->unsignedInteger('responsible_id')->nullable();
            $table->string('note')->nullable();
            $table->string('status')->nullable();
            $table->string('shipping_method')->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('transfers');
    }
}
