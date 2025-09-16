<?php

use App\Http\Controllers\BlogController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Settings\ProfileController;
use App\Http\Controllers\Settings\PasswordController;
use App\Http\Controllers\WelcomeController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [WelcomeController::class,'index'])->name('welcome');

Route::get('/blog', [BlogController::class,'index'])->name('blog');
Route::get('/blog/category/{slug}',[BlogController::class,'category'])->name('blog.category');
Route::get('/blog/{slug}',[BlogController::class,'show'])->name('blog.show');

Route::middleware('auth')->group(function(){
    Route::post('/comments',[CommentController::class,'store'])->name('comments.store');
    Route::delete('/comments/{comment}',[CommentController::class,'destroy'])->name('comments.destroy');
});

Route::get('/contact',fn()=>Inertia::render('Contact'))->name('contact');
Route::get('/legal',fn()=>Inertia::render('Legal'))->name('legal');
Route::get('/cgu',fn()=>Inertia::render('CGU'))->name('cgu');

Route::middleware('auth')->group(function(){
    Route::get('/dashboard',[DashboardController::class,'index'])->name('dashboard');
    Route::get('/settings/profile',[ProfileController::class,'edit'])->name('profile.edit');
    Route::post('/profile',[ProfileController::class,'update'])->name('profile.update');
    Route::post('/user/avatar/update',[ProfileController::class,'updateAvatar'])->name('user.avatar.update');
    Route::delete('/profile',[ProfileController::class,'destroy'])->name('profile.destroy');
    Route::get('/settings/password',[PasswordController::class,'edit'])->name('password.edit');
    Route::put('/password',[PasswordController::class,'update'])->name('password.update');

});


Route::fallback(fn()=>Inertia::render('NotFound'));


require __DIR__.'/auth.php';

