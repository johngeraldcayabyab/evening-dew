<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateGlobalSettingsTable extends Migration
{
    public function up()
    {
        Schema::create('global_settings', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('inventory_default_measurement_category_id')->nullable();
            $table->unsignedInteger('inventory_default_measurement_id')->nullable();
            $table->unsignedInteger('inventory_default_purchase_measurement_id')->nullable();
            $table->unsignedInteger('inventory_default_sales_measurement_id')->nullable();
            $table->unsignedInteger('inventory_default_product_category_id')->nullable();
            $table->unsignedInteger('inventory_default_vendor_location_id')->nullable();
            $table->unsignedInteger('inventory_default_adjustment_location_id')->nullable();
            $table->unsignedInteger('inventory_default_production_id')->nullable();
            $table->unsignedInteger('inventory_default_scrap_id')->nullable();
            $table->unsignedInteger('inventory_default_warehouse_id')->nullable();
            $table->boolean('inventory_auto_validate_draft')->default(false);
            $table->boolean('inventory_compute_product_quantity')->default(false);
            $table->unsignedInteger('accounting_default_currency_id')->nullable();
            $table->unsignedInteger('general_default_country_id')->nullable();
            $table->boolean('general_clickable_row')->default(true);
            $table->unsignedInteger('sales_order_default_delivery_fee_id')->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('global_settings');
    }
}
