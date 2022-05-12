<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRegionsTable extends Migration
{
    public function up()
    {
        Schema::create('regions', function (Blueprint $table) {
            $table->id();
            $table->string('region')->nullable();
            $table->string('region_center')->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('regions');
    }
}
