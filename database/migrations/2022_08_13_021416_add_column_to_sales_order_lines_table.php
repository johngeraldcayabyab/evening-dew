<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddColumnToSalesOrderLinesTable extends Migration
{
    public function up()
    {
        if (!Schema::hasColumn('sales_order_lines', 'shipping_date')) {
            Schema::table('sales_order_lines', function (Blueprint $table) {
                $table->dateTime('shipping_date')->nullable();
            });
        }
    }

    public function down()
    {
        if (Schema::hasColumn('sales_order_lines', 'shipping_date')) {
            Schema::table('sales_order_lines', function (Blueprint $table) {
                $table->dropColumn('shipping_date');
            });
        }
    }
}
