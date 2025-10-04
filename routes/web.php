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
