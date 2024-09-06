<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('sales_order_lines', function (Blueprint $table) {
            $table->double('discounted_unit_price')->nullable()->default(0)->after('unit_price');
        });
    }

    public function down(): void
    {
        Schema::table('sales_order_lines', function (Blueprint $table) {
            $table->dropColumn('discounted_unit_price');
        });
    }
};
