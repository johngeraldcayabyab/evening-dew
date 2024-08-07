<?php

use App\Http\Controllers\SalesOrderLineController;
use Illuminate\Support\Facades\Route;

dd(\App\Models\Address::with('city')->find(20));

/**
 * Exports
 */
Route::get("/sales_order_lines/export", [SalesOrderLineController::class, 'export'])->name("sales_order_lines.export");

/**
 * React
 */
Route::view('/{path?}', 'app')->where('path', '.*')->name('react');

