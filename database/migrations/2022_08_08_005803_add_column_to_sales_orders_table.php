<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddColumnToSalesOrdersTable extends Migration
{
    public function up()
    {
        if (!Schema::hasColumn('sales_orders', 'steps')) {
            Schema::table('sales_orders', function (Blueprint $table) {
                $table->string('steps')->nullable();
            });
        }
    }

    public function down()
    {
        if (Schema::hasColumn('sales_orders', 'steps')) {
            Schema::table('sales_orders', function (Blueprint $table) {
                $table->dropColumn('steps');
            });
        }
    }
}
