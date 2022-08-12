<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddColumnsToSalesOrdersTable extends Migration
{
    public function up()
    {
        if (!Schema::hasColumn('sales_orders', 'select_time')) {
            Schema::table('sales_orders', function (Blueprint $table) {
                $table->string('select_time')->nullable();
            });
        }
        if (!Schema::hasColumn('sales_orders', 'vehicle_type')) {
            Schema::table('sales_orders', function (Blueprint $table) {
                $table->string('vehicle_type')->nullable();
            });
        }
    }

    public function down()
    {
        if (Schema::hasColumn('sales_orders', 'select_time')) {
            Schema::table('sales_orders', function (Blueprint $table) {
                $table->dropColumn('select_time');
            });
        }
        if (Schema::hasColumn('sales_orders', 'vehicle_type')) {
            Schema::table('sales_orders', function (Blueprint $table) {
                $table->dropColumn('vehicle_type');
            });
        }
    }
}
