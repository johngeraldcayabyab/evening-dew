<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAccessRightsTable extends Migration
{
    public function up()
    {
        Schema::create('access_rights', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->bigInteger('user_group_id')->nullable();
            $table->boolean('read_access')->default(true);
            $table->boolean('write_access')->default(true);
            $table->boolean('create_access')->default(true);
            $table->boolean('delete_access')->default(true);
            $table->softDeletes();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('access_rights');
    }
}
