<?php

namespace App\Http\Controllers;

use App\Models\Reservation;
use App\Models\ReservationStatus;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ReservationController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->query('search', '');
        $statusFilter = $request->query('status', '');
        $page = $request->query('page', 1);
        $perPage = 10;

        $query = Reservation::with(['customer', 'status'])
            ->orderBy('date', 'desc')
            ->orderBy('time', 'desc');

        if ($search) {
            $query->whereHas('customer', function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%")
                    ->orWhere('phone', 'like', "%{$search}%");
            });
        }

        if ($statusFilter) {
            $query->where('reservation_status_id', $statusFilter);
        }

        $reservations = $query->paginate($perPage, ['*'], 'page', $page);
        $statuses = ReservationStatus::all();

        return inertia('reservations', [
            'reservations' => $reservations->items(),
            'total' => $reservations->total(),
            'currentPage' => $reservations->currentPage(),
            'lastPage' => $reservations->lastPage(),
            'search' => $search,
            'statusFilter' => $statusFilter,
            'statuses' => $statuses,
        ]);
    }

    public function updateStatus(Request $request, Reservation $reservation)
    {
        $validator = Validator::make($request->all(), [
            'reservation_status_id' => 'required|exists:reservation_statuses,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $reservation->update([
            'reservation_status_id' => $request->reservation_status_id,
        ]);

        return response()->json([
            'reservation' => $reservation->fresh(['customer', 'status']),
            'message' => 'Reservation status updated successfully',
        ]);
    }
}
