<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateJournalsTable extends Migration
{
    public function up()
    {
        Schema::create('journals', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('type');
            $table->boolean('dedicated_credit_note_sequence')->default(false);
            $table->string('short_code');
            $table->unsignedInteger('currency_id')->nullable();
            $table->boolean('incoming_payment_method_manual')->default(false);
            $table->boolean('incoming_payment_method_electronic')->default(false);
            $table->boolean('outgoing_payment_method_manual')->default(false);
            $table->softDeletes();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('journals');
    }
}
