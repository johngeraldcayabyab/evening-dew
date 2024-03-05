<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('sales_settings', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->boolean('validate_transfer_on_validate')->default(false);
            $table->unsignedInteger('company_id')->nullable()->default(false);
            $table->softDeletes();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('sales_settings');
    }
};
