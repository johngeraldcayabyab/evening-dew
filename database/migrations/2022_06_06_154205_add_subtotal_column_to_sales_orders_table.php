<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddSubtotalColumnToSalesOrdersTable extends Migration
{
    public function up()
    {
        if (!Schema::hasColumn('sales_orders', 'subtotal')) {
            Schema::table('sales_orders', function (Blueprint $table) {
                $table->integer('subtotal')->nullable()->default(0);
            });
        }
    }

    public function down()
    {
        if (Schema::hasColumn('sales_orders', 'subtotal')) {
            Schema::table('sales_orders', function (Blueprint $table) {
                $table->dropColumn('subtotal');
            });
        }
    }
}
