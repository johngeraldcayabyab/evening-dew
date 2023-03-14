<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePaymentsTable extends Migration
{
    public function up()
    {
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->string('number');
            $table->string('payment_type');
            $table->string('partner_type');
            $table->string('contact_id');
            $table->boolean('is_internal_transfer')->default(false);
            $table->double('amount')->default(0);
            $table->unsignedInteger('currency_id');
            $table->dateTime('payment_date')->nullable();
            $table->string('memo');
            $table->unsignedInteger('journal_id');
            $table->unsignedInteger('bank_accounts_id');
            $table->longText('notes');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('payments');
    }
}
