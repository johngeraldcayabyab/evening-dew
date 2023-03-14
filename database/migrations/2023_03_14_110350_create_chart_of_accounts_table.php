<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateChartOfAccountsTable extends Migration
{
    public function up()
    {
        Schema::create('chart_of_accounts', function (Blueprint $table) {
            $table->id();
            $table->string('code');
            $table->string('name');
            $table->string('type');
            $table->unsignedInteger('currency_id')->nullable();
            $table->boolean('deprecated')->default(false);
            $table->boolean('allow_reconciliation')->default(false);
            $table->softDeletes();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('chart_of_accounts');
    }
}
