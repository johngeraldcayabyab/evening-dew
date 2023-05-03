<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddPickupLocationFieldToSalesOrdersTable extends Migration
{
    public function up()
    {
        if (!Schema::hasColumn('sales_orders', 'pickup_location')) {
            Schema::table('sales_orders', function (Blueprint $table) {
                $table->string('pickup_location')->nullable();
            });
        }
    }

    public function down()
    {
        if (Schema::hasColumn('sales_orders', 'pickup_location')) {
            Schema::table('sales_orders', function (Blueprint $table) {
                $table->dropColumn('pickup_location');
            });
        }
    }
}
