<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddFieldInGlobalSettingsTable extends Migration
{
    public function up()
    {
        if (!Schema::hasColumn('global_settings', 'inventory_compute_product_quantity')) {
            Schema::table('global_settings', function (Blueprint $table) {
                $table->boolean('inventory_compute_product_quantity')->default(false);
            });
        }
    }

    public function down()
    {
        if (Schema::hasColumn('global_settings', 'inventory_compute_product_quantity')) {
            Schema::table('global_settings', function (Blueprint $table) {
                $table->dropColumn('inventory_compute_product_quantity');
            });
        }
    }
}
