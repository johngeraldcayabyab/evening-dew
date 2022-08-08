<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddDefaultDeliveryFeeInGlobalSettingsTable extends Migration
{
    public function up()
    {
        if (!Schema::hasColumn('global_settings', 'sales_order_default_delivery_fee_id')) {
            Schema::table('global_settings', function (Blueprint $table) {
                $table->unsignedInteger('sales_order_default_delivery_fee_id')->nullable();
            });
        }
    }

    public function down()
    {
        if (Schema::hasColumn('global_settings', 'inventory_compute_product_quantity')) {
            Schema::table('global_settings', function (Blueprint $table) {
                $table->dropColumn('sales_order_default_delivery_fee_id');
            });
        }
    }
}
