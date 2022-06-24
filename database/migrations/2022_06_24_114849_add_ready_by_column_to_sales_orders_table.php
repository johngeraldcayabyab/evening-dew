<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddReadyByColumnToSalesOrdersTable extends Migration
{
    public function up()
    {
        if (!Schema::hasColumn('sales_orders', 'ready_by')) {
            Schema::table('sales_orders', function (Blueprint $table) {
                $table->string('ready_by')->nullable();
            });
        }
    }

    public function down()
    {
        if (Schema::hasColumn('sales_orders', 'ready_by')) {
            Schema::table('sales_orders', function (Blueprint $table) {
                $table->dropColumn('ready_by');
            });
        }
    }
}
