<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\PublicReservationController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'asian-food')->name('home');

Route::post('api/reservations', [PublicReservationController::class, 'store'])
    ->name('reservations.store')
    ->withoutMiddleware('web');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
});

require __DIR__.'/customers.php';
require __DIR__.'/settings.php';
