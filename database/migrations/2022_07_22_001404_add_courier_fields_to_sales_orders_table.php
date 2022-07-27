<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddCourierFieldsToSalesOrdersTable extends Migration
{
    public function up()
    {
        if (!Schema::hasColumn('sales_orders', 'courier_id')) {
            Schema::table('sales_orders', function (Blueprint $table) {
                $table->bigInteger('courier_id')->nullable();
            });
        }

        if (!Schema::hasColumn('sales_orders', 'pickup_time')) {
            Schema::table('sales_orders', function (Blueprint $table) {
                $table->dateTime('pickup_time')->nullable();
            });
        }
    }

    public function down()
    {
        if (Schema::hasColumn('sales_orders', 'courier_id')) {
            Schema::table('sales_orders', function (Blueprint $table) {
                $table->dropColumn('courier_id');
            });
        }

        if (Schema::hasColumn('sales_orders', 'pickup_time')) {
            Schema::table('sales_orders', function (Blueprint $table) {
                $table->dropColumn('pickup_time');
            });
        }
    }
}
