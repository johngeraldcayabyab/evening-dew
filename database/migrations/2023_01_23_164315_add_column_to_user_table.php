<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddColumnToUserTable extends Migration
{
    public function up()
    {
        if (!Schema::hasColumn('users', 'app_menu_id')) {
            Schema::table('users', function (Blueprint $table) {
                $table->bigInteger('app_menu_id')->nullable();
            });
        }
    }

    public function down()
    {
        if (Schema::hasColumn('users', 'app_menu_id')) {
            Schema::table('users', function (Blueprint $table) {
                $table->dropColumn('app_menu_id');
            });
        }
    }
}
