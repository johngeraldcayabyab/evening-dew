<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBankAccountsTable extends Migration
{
    public function up()
    {
        Schema::create('bank_accounts', function (Blueprint $table) {
            $table->id();
            $table->string('account_number');
            $table->unsignedInteger('account_holder_id')->nullable();
            $table->unsignedInteger('bank_id')->nullable();
            $table->unsignedInteger('currency_id')->nullable();
            $table->string('account_holder_name')->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('bank_accounts');
    }
}
