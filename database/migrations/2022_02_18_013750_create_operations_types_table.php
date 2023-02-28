<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOperationsTypesTable extends Migration
{
    public function up()
    {
        Schema::create('operations_types', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->unsignedInteger('reference_sequence_id')->nullable();
            $table->string('code');
            $table->unsignedInteger('warehouse_id')->nullable();
            $table->string('reservation_method')->nullable();
            $table->string('type');
            $table->unsignedInteger('operation_type_for_returns_id')->nullable();
            $table->boolean('show_detailed_operation')->default(false);
            $table->boolean('pre_fill_detailed_operation')->default(false);
            $table->unsignedInteger('reservation_days_before')->nullable()->default(0);
            $table->unsignedInteger('reservation_days_before_priority')->nullable()->default(0);
            $table->boolean('create_new_lots_serial_numbers')->default(false);
            $table->boolean('use_existing_lots_serial_numbers')->default(false);
            $table->boolean('create_new_lots_serial_numbers_for_components')->default(false); // only shows at manufacturing type
            $table->unsignedInteger('default_source_location_id')->nullable();
            $table->unsignedInteger('default_destination_location_id')->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('operations_types');
    }
}
