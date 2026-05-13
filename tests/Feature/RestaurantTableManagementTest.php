<?php

use App\Models\RestaurantTable;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('authenticated users can view tables page with search and pagination', function () {
    $user = User::factory()->create();
    RestaurantTable::query()->create([
        'name' => 'Window A1',
        'capacity' => 4,
        'location' => 'window',
        'description' => 'Near front entrance',
        'is_active' => true,
    ]);
    RestaurantTable::query()->create([
        'name' => 'Indoor B2',
        'capacity' => 6,
        'location' => 'indoor',
        'description' => 'Center hall',
        'is_active' => true,
    ]);

    $response = $this->actingAs($user)->get(route('tables', [
        'search' => 'Window',
        'page' => 1,
    ]));

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('tables')
        ->where('search', 'Window')
        ->where('total', 1)
        ->has('tables', 1));
});

test('authenticated users can create table with auto approve option', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->post(route('tables.store'), [
        'name' => 'Patio P1',
        'capacity' => 2,
        'location' => 'outdoor',
        'description' => 'Patio corner',
        'auto_approve' => false,
    ]);

    $response->assertRedirect(route('tables'));

    $this->assertDatabaseHas('restaurant_tables', [
        'name' => 'Patio P1',
        'capacity' => 2,
        'location' => 'outdoor',
        'description' => 'Patio corner',
        'is_active' => false,
    ]);
});

test('authenticated users can update table details', function () {
    $user = User::factory()->create();
    $table = RestaurantTable::query()->create([
        'name' => 'Bar C1',
        'capacity' => 3,
        'location' => 'bar',
        'description' => null,
        'is_active' => true,
    ]);

    $response = $this->actingAs($user)->put(route('tables.update', $table), [
        'name' => 'Bar C1 Updated',
        'capacity' => 5,
        'location' => 'bar',
        'description' => 'Updated description',
        'is_active' => true,
    ]);

    $response->assertRedirect(route('tables'));
    $this->assertDatabaseHas('restaurant_tables', [
        'id' => $table->id,
        'name' => 'Bar C1 Updated',
        'capacity' => 5,
        'description' => 'Updated description',
    ]);
});

test('authenticated users can delete tables', function () {
    $user = User::factory()->create();
    $table = RestaurantTable::query()->create([
        'name' => 'Private D1',
        'capacity' => 8,
        'location' => 'private_room',
        'description' => null,
        'is_active' => true,
    ]);

    $response = $this->actingAs($user)->delete(route('tables.destroy', $table));

    $response->assertRedirect(route('tables'));
    $this->assertDatabaseMissing('restaurant_tables', ['id' => $table->id]);
});
