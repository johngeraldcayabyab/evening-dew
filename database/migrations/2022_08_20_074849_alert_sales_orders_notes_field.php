<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlertSalesOrdersNotesField extends Migration
{
    public function up()
    {
        if (Schema::hasColumn('sales_orders', 'notes')) {
            Schema::table('sales_orders', function (Blueprint $table) {
                $table->longText('notes')->nullable()->change();
            });
        }
    }

    public function down()
    {
        if (Schema::hasColumn('sales_orders', 'notes')) {
            Schema::table('sales_orders', function (Blueprint $table) {
                $table->string('notes')->nullable()->change();
            });
        }
    }
}
