<?php

use App\Http\Controllers\SalesOrderLineController;
use Illuminate\Support\Facades\Route;


Route::get('/json_test', function(){
	$data = json_decode(file_get_contents(storage_path('data.json')), true);         collect($data)->chunk(500, function ($orders) {             info($orders);         });
	#dd(123);
});

/**
 * Exports
 */
Route::get("/sales_order_lines/export", [SalesOrderLineController::class, 'export'])->name("sales_order_lines.export");

/**
 * React
 */
Route::view('/{path?}', 'app')->where('path', '.*')->name('react');

