<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateInvoicesTable extends Migration
{
    public function up()
    {
        Schema::create('invoices', function (Blueprint $table) {
            $table->id();
            $table->string('number');
            $table->unsignedInteger('customer_id')->nullable();
            $table->string('payment_reference')->nullable();
            $table->dateTime('invoice_date')->nullable();
            $table->dateTime('due_date')->nullable();
            $table->unsignedInteger('payment_term_id')->nullable();
            $table->unsignedInteger('journal_id')->nullable();
            $table->unsignedInteger('currency_id')->nullable();
            $table->string('customer_reference')->nullable();
            $table->unsignedInteger('salesperson_id')->nullable();
            $table->unsignedInteger('bank_id')->nullable();
            $table->boolean('post_automatically')->default(false);
            $table->boolean('to_check')->default(false);
            $table->string('status')->nullable();
            $table->double('amount_due')->nullable()->default(0);
            $table->softDeletes();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('invoices');
    }
}
