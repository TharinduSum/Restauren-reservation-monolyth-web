<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreRestaurantTableRequest;
use App\Http\Requests\UpdateRestaurantTableRequest;
use App\Models\RestaurantTable;
use Illuminate\Http\Request;
use Inertia\Response;

class RestaurantTableController extends Controller
{
    public function index(Request $request): Response
    {
        $search = $request->string('search')->trim()->value();

        $tables = RestaurantTable::query()
            ->when($search, function ($query, $searchTerm) {
                $query->where(function ($nestedQuery) use ($searchTerm) {
                    $nestedQuery->where('name', 'like', "%{$searchTerm}%")
                        ->orWhere('location', 'like', "%{$searchTerm}%")
                        ->orWhere('description', 'like', "%{$searchTerm}%");
                });
            })
            ->orderByDesc('created_at')
            ->paginate(10)
            ->withQueryString();

        return inertia('tables', [
            'tables' => $tables->items(),
            'total' => $tables->total(),
            'currentPage' => $tables->currentPage(),
            'lastPage' => $tables->lastPage(),
            'search' => $search,
        ]);
    }

    public function store(StoreRestaurantTableRequest $request)
    {
        $validated = $request->validated();

        RestaurantTable::create([
            'name' => $validated['name'],
            'capacity' => $validated['capacity'],
            'location' => $validated['location'],
            'description' => $validated['description'] ?? null,
            'is_active' => $validated['auto_approve'],
        ]);

        return to_route('tables')->with('success', 'Table created successfully.');
    }

    public function update(UpdateRestaurantTableRequest $request, RestaurantTable $table)
    {
        $table->update($request->validated());

        return to_route('tables')->with('success', 'Table updated successfully.');
    }

    public function destroy(RestaurantTable $table)
    {
        $table->delete();

        return to_route('tables')->with('success', 'Table deleted successfully.');
    }
}
