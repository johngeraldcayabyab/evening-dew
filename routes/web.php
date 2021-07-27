<?php

use App\Events\OrderStatusUpdated;
use App\Events\TaskCreated;
use App\Models\Task;
use App\Models\User;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Redis;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    Redis::set('name', 'gerald');
    echo Redis::get('name');
//    return view('welcome');
});


Route::get('/update', function (){
    OrderStatusUpdated::dispatch(User::first());
});


Route::get('/tasks', function(){
   return Task::latest()->pluck('body');
});

Route::post('/tasks', function(){
   $task = Task::forceCreate(request(['body']));
   event(new TaskCreated($task));
});
