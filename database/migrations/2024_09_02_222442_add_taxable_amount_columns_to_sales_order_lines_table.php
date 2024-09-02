<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('sales_order_lines', function (Blueprint $table) {
            $table->double('taxable_amount')->nullable()->default(0)->after('unit_price');
            $table->double('tax_amount')->nullable()->default(0)->after('taxable_amount');
        });
    }

    public function down(): void
    {
        Schema::table('sales_order_lines', function (Blueprint $table) {
            $table->dropColumn('taxable_amount');
            $table->dropColumn('tax_amount');
        });
    }
};
