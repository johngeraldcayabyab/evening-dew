<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterExpectedShippingDateColumn extends Migration
{
    public function up()
    {
        if (Schema::hasColumn('sales_orders', 'expected_shipping_date')) {
            Schema::table('sales_orders', function (Blueprint $table) {
                $table->renameColumn('expected_shipping_date', 'shipping_date');
            });
        }
    }

    public function down()
    {
        if (Schema::hasColumn('sales_orders', 'expected_shipping_date')) {
            Schema::table('sales_orders', function (Blueprint $table) {
                $table->renameColumn('shipping_date', 'expected_shipping_date');
            });
        }
    }
}
