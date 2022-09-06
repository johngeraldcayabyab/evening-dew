<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddColumnToGlobalSettingsClickableRowTable extends Migration
{
    public function up()
    {
        if (!Schema::hasColumn('global_settings', 'general_clickable_row')) {
            Schema::table('global_settings', function (Blueprint $table) {
                $table->boolean('general_clickable_row')->default(true);
            });
        }
    }

    public function down()
    {
        if (Schema::hasColumn('global_settings', 'general_clickable_row')) {
            Schema::table('global_settings', function (Blueprint $table) {
                $table->dropColumn('general_clickable_row');
            });
        }
    }
}
