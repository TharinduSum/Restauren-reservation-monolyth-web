<?php

use App\Http\Controllers\RestaurantTableController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('tables', [RestaurantTableController::class, 'index'])->name('tables');
    Route::post('tables', [RestaurantTableController::class, 'store'])->name('tables.store');
    Route::put('tables/{table}', [RestaurantTableController::class, 'update'])->name('tables.update');
    Route::delete('tables/{table}', [RestaurantTableController::class, 'destroy'])->name('tables.destroy');
});
