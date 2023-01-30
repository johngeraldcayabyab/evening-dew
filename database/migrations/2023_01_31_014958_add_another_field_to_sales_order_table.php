<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddAnotherFieldToSalesOrderTable extends Migration
{
    public function up()
    {
        if (!Schema::hasColumn('sales_orders', 'customer_name')) {
            Schema::table('sales_orders', function (Blueprint $table) {
                $table->string('customer_name');
            });
        }
    }

    public function down()
    {
        if (Schema::hasColumn('sales_orders', 'customer_name')) {
            Schema::table('sales_orders', function (Blueprint $table) {
                $table->dropColumn('customer_name');
            });
        }
    }
}
