<?php

namespace App\Http\Controllers;

use App\Models\Reservation;
use App\Models\RestaurantTable;
use Carbon\Carbon;
use Carbon\CarbonPeriod;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function index()
    {
        $today = Carbon::today()->format('Y-m-d');

        $todayReservations = Reservation::where('date', $today)->get();
        $allReservations = Reservation::all();

        $stats = [
            'total_today_reservations' => $todayReservations->count(),
            'total_confirmed' => $allReservations->where('reservation_status_id', 2)->count(),
            'total_guests_expected' => $allReservations->sum('guest_count'),
            'total_capacity' => RestaurantTable::where('is_active', true)->sum('capacity'),
            'total_tables' => RestaurantTable::where('is_active', true)->count(),
            'total_reserved_tables' => DB::table('reservation_tables')
                ->distinct('restaurant_table_id')
                ->count('restaurant_table_id'),
        ];

        $weekStart = Carbon::today()->startOfWeek();
        $weekEnd = (clone $weekStart)->endOfWeek();

        $weeklyReservations = Reservation::query()
            ->whereBetween('date', [$weekStart->toDateString(), $weekEnd->toDateString()])
            ->selectRaw('date, COUNT(*) as count')
            ->groupBy('date')
            ->pluck('count', 'date');

        $weekDates = collect(CarbonPeriod::create($weekStart, $weekEnd))
            ->map(fn (Carbon $date) => $date->toDateString());

        $weeklyChart = $weekDates
            ->map(fn (string $date) => (int) ($weeklyReservations[$date] ?? 0))
            ->values()
            ->toArray();

        $weekLabels = $weekDates
            ->map(fn (string $date) => Carbon::parse($date)->shortEnglishDayOfWeek)
            ->values()
            ->toArray();

        $reservationByStatus = Reservation::join('reservation_statuses', 'reservations.reservation_status_id', '=', 'reservation_statuses.id')
            ->select('reservation_statuses.name', DB::raw('COUNT(*) as count'))
            ->groupBy('reservation_statuses.id', 'reservation_statuses.name')
            ->get();

        $tablesByLocation = RestaurantTable::where('is_active', true)
            ->select('location', DB::raw('COUNT(*) as count'), DB::raw('SUM(capacity) as capacity'))
            ->groupBy('location')
            ->get();

        $recentReservations = Reservation::with(['customer', 'status'])
            ->orderBy('created_at', 'desc')
            ->limit(5)
            ->get();

        return inertia('dashboard', [
            'stats' => $stats,
            'weeklyChart' => $weeklyChart,
            'weekLabels' => $weekLabels,
            'statusChart' => [
                'labels' => $reservationByStatus->pluck('name')->toArray(),
                'data' => $reservationByStatus->pluck('count')->toArray(),
            ],
            'locationChart' => [
                'labels' => $tablesByLocation->pluck('location')->toArray(),
                'tables' => $tablesByLocation->pluck('count')->toArray(),
                'capacity' => $tablesByLocation->pluck('capacity')->toArray(),
            ],
            'recentReservations' => $recentReservations,
        ]);
    }
}
