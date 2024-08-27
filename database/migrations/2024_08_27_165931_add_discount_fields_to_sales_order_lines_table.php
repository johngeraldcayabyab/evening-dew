<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('sales_order_lines', function (Blueprint $table) {
            $table->string('discount_type')->nullable();
            $table->double('discount_rate')->nullable()->default(0);
        });
    }

    public function down(): void
    {
        Schema::table('sales_order_lines', function (Blueprint $table) {
            $table->dropColumn('discount_type');
            $table->dropColumn('discount_rate');
        });
    }

};
