<?php

use App\Routes\MeasurementCategoryRoute;
use App\Routes\MeasurementRoute;
use App\Routes\MenuRoute;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/tokens/create', function (Request $request) {
    $token = $request->user()->createToken($request->token_name);

    return ['token' => $token->plainTextToken];
});

Route::post('/sanctum/token', );


Route::get('password/reset', function (Request $request) {

})->name('password.reset');

Route::group(['middleware' => ['api', 'cors']], function () {
    MeasurementCategoryRoute::initialize();
    MeasurementRoute::initialize();
    MenuRoute::initialize();
});
