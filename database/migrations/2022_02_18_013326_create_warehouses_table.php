<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateWarehousesTable extends Migration
{
    public function up()
    {
        Schema::create('warehouses', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->boolean('manufacture_to_resupply')->default(false);
            $table->boolean('buy_to_resupply')->default(false);

            /**
             * Locations
             */
            $table->bigInteger('view_location_id')->nullable();
            $table->bigInteger('stock_location_id')->nullable();
            $table->bigInteger('input_location_id')->nullable();
            $table->bigInteger('quality_control_location_id')->nullable();
            $table->bigInteger('packing_location_id')->nullable();
            $table->bigInteger('output_location_id')->nullable();
            $table->bigInteger('stock_after_manufacturing_location_id')->nullable();
            $table->bigInteger('picking_before_manufacturing_location_id')->nullable();

            /**
             * Operation Types
             */
            $table->bigInteger('in_type_id')->nullable();
            $table->bigInteger('internal_type_id')->nullable();
            $table->bigInteger('pick_type_id')->nullable();
            $table->bigInteger('pack_type_id')->nullable();
            $table->bigInteger('out_type_id')->nullable();
            $table->bigInteger('stock_after_manufacturing_operation_type_id')->nullable();
            $table->bigInteger('picking_before_manufacturing_operation_type_id')->nullable();
            $table->bigInteger('manufacturing_operation_type_id')->nullable();

            $table->softDeletes();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('warehouses');
    }
}