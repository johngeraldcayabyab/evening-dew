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
            $table->string('short_name');
            $table->boolean('manufacture_to_resupply')->default(true);
            $table->boolean('buy_to_resupply')->default(true);
            $table->unsignedInteger('view_location_id')->nullable();
            $table->unsignedInteger('stock_location_id')->nullable();
            $table->unsignedInteger('input_location_id')->nullable();
            $table->unsignedInteger('quality_control_location_id')->nullable();
            $table->unsignedInteger('packing_location_id')->nullable();
            $table->unsignedInteger('output_location_id')->nullable();
            $table->unsignedInteger('adjustment_location_id')->nullable();
            $table->unsignedInteger('stock_after_manufacturing_location_id')->nullable();
            $table->unsignedInteger('picking_before_manufacturing_location_id')->nullable();
            $table->unsignedInteger('in_type_id')->nullable();
            $table->unsignedInteger('internal_type_id')->nullable();
            $table->unsignedInteger('pick_type_id')->nullable();
            $table->unsignedInteger('pack_type_id')->nullable();
            $table->unsignedInteger('out_type_id')->nullable();
            $table->unsignedInteger('stock_after_manufacturing_operation_type_id')->nullable();
            $table->unsignedInteger('picking_before_manufacturing_operation_type_id')->nullable();
            $table->unsignedInteger('manufacturing_operation_type_id')->nullable();
            $table->unsignedInteger('adjustment_operation_type_id')->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('warehouses');
    }
}
