<?php

use App\Models\Customer;
use App\Models\Reservation;
use App\Models\ReservationStatus;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('guests are redirected to the login page', function () {
    $response = $this->get(route('dashboard'));
    $response->assertRedirect(route('login'));
});

test('authenticated users can visit the dashboard', function () {
    $user = User::factory()->create();
    $this->actingAs($user);

    $response = $this->get(route('dashboard'));
    $response->assertOk();
});

test('dashboard provides weekly reservations data for chart', function () {
    $user = User::factory()->create();
    $status = ReservationStatus::query()->firstOrCreate(
        ['slug' => 'confirmed'],
        ['name' => 'Confirmed'],
    );
    $customer = Customer::query()->create([
        'name' => 'Chart User',
        'email' => 'chart@example.com',
        'phone' => null,
        'notes' => null,
    ]);

    Reservation::query()->create([
        'customer_id' => $customer->id,
        'reservation_status_id' => $status->id,
        'date' => Carbon::today()->startOfWeek()->toDateString(),
        'time' => '18:00:00',
        'guest_count' => 2,
        'special_requests' => null,
    ]);

    $response = $this->actingAs($user)->get(route('dashboard'));

    $response->assertInertia(fn ($page) => $page
        ->component('dashboard')
        ->has('weeklyChart', 7)
        ->has('weekLabels', 7));
});
