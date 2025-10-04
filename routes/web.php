<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('home');
})->name('home');

Route::get('/login', function() {
    return Inertia::render('auth/login');
})->name('login');

Route::get('/signup', function() {
    return Inertia::render('auth/signup');
})->name('signup');

Route::get('/dashboard', function() {
    return Inertia::render('dashboard');
})->name('dashboard');

Route::get('/profile', function () {
    return Inertia::render('profile');
})->name('profile');

Route::post('/logout', [AuthController::class, 'logout'])->name('logout');