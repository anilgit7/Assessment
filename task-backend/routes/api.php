<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CommentController;
use Illuminate\Support\Facades\Route;

Route::post('login', [AuthController::class, 'login'])->name('login');
Route::get('check-auth', [AuthController::class, 'checkAuth']);
Route::post('/register', [AuthController::class, 'register']);

Route::group(['middleware' => 'auth'], function () {
    Route::post('logout', [AuthController::class, 'logout'])->name('logout');
});

Route::get('/comments', [CommentController::class, 'index']);
Route::post('/comments', [CommentController::class, 'store']);
Route::delete('/comments/{id}', [CommentController::class, 'destroy']);
Route::get('/comments/{id}/edit', [CommentController::class, 'edit']);
Route::put('/comments/edit/{id}', [CommentController::class, 'update']);

