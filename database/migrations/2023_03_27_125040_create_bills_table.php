<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBillsTable extends Migration
{
    public function up()
    {
        Schema::create('bills', function (Blueprint $table) {
            $table->id();
            $table->string('number');
            $table->unsignedInteger('vendor_id')->nullable();
            $table->string('bill_reference')->nullable();
            $table->string('payment_reference')->nullable();
            $table->unsignedInteger('bank_id')->nullable();
            $table->string('auto_complete_sequence');
            $table->dateTime('bill_date')->nullable();
            $table->dateTime('accounting_date')->nullable();
            $table->dateTime('due_date')->nullable();
            $table->unsignedInteger('payment_term_id')->nullable();
            $table->unsignedInteger('journal_id')->nullable();
            $table->unsignedInteger('currency_id')->nullable();
            $table->boolean('post_automatically')->default(false);
            $table->boolean('to_check')->default(false);
            $table->string('status')->nullable();
            $table->double('total')->nullable()->default(0);
            $table->longText('terms_and_conditions');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('bills');
    }
}
