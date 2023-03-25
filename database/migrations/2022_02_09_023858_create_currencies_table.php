<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCurrenciesTable extends Migration
{
    public function up()
    {
        Schema::create('currencies', function (Blueprint $table) {
            $table->id();
            $table->string('currency');
            $table->string('name')->nullable();
            $table->string('unit')->nullable();
            $table->string('sub_unit')->nullable();
            $table->unsignedDouble('rounding_factor');
            $table->integer('decimal_places');
            $table->string('symbol');
            $table->string('symbol_position');
            $table->boolean('is_default')->default(false);
            $table->softDeletes();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('currencies');
    }
}
