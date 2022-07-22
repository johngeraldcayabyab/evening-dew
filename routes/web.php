<?php

use App\Http\Controllers\SalesOrderController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Redis;

/**
 * Test mode
 */
//Route::get('/', function(){
//
//    $user3Stats = [
//        'favorites' => 420,
//        'watchLaters' => 420,
//        'completions' => 420,
//    ];
//
//    Redis::hmset('user.3.stats', $user3Stats);
//
////    $redis = new Illuminate\Redis\
//    return [
//        Redis::hgetall('user.1.stats'),
//        Redis::hgetall('user.2.stats')
//    ];
////    return Redis::hgetall('user.2.stats');
//});

/**
 * React
 */
Route::get("/sales_orders/export", [SalesOrderController::class, 'export'])->name("sales_orders.export");
Route::view('/{path?}', 'app')->where('path', '.*')->name('react');

