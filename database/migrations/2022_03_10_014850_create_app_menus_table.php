<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAppMenusTable extends Migration
{
    public function up()
    {
        Schema::create('app_menus', function (Blueprint $table) {
            $table->id();
            $table->string('label');
            $table->boolean('is_view')->default(false);
            $table->bigInteger('menu_id')->nullable();
            $table->bigInteger('parent_menu_id')->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('app_menus');
    }
}
