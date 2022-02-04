<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductCategoriesTables extends Migration
{
    public function up()
    {
        Schema::create('product_categories_tables', function (Blueprint $table) {
            $table->id();
            $table->string('category');
            $table->bigInteger('parent_category_id')->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('product_categories_tables');
    }
}
