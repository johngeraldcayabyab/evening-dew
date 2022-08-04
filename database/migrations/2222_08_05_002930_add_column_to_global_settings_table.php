<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddColumnToGlobalSettingsTable extends Migration
{
    public function up()
    {
        if (!Schema::hasColumn('global_settings', 'sales_order_run_shopify_import')) {
            Schema::table('global_settings', function (Blueprint $table) {
                $table->boolean('sales_order_run_shopify_import')->default(false);
            });
        }
    }

    public function down()
    {
        if (Schema::hasColumn('global_settings', 'sales_order_run_shopify_import')) {
            Schema::table('global_settings', function (Blueprint $table) {
                $table->dropColumn('sales_order_run_shopify_import');
            });
        }
    }
}
