<?php

use App\Http\Controllers\CustomerController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('customers', [CustomerController::class, 'index'])->name('customers');
    Route::post('customers', [CustomerController::class, 'store'])->name('customers.store');
    Route::put('customers/{customer}', [CustomerController::class, 'update'])->name('customers.update');
    Route::delete('customers/{customer}', [CustomerController::class, 'destroy'])->name('customers.destroy');
    Route::get('customers/{customer}', [CustomerController::class, 'show'])->name('customers.show');
});
