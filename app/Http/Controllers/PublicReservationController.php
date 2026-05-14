<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\Reservation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class PublicReservationController extends Controller
{
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email',
            'phone' => 'nullable|string|max:50',
            'date' => 'required|date|after_or_equal:today',
            'time' => 'required',
            'guests' => 'required|integer|min:1|max:50',
            'note' => 'nullable|string|max:1000',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors(),
            ], 422);
        }

        try {
            DB::beginTransaction();

            $customer = Customer::firstOrCreate(
                ['email' => $request->email],
                [
                    'name' => $request->name,
                    'phone' => $request->phone,
                    'notes' => $request->note,
                ]
            );

            if (! $customer->wasRecentlyCreated) {
                $customerUpdated = false;
                if ($customer->name !== $request->name) {
                    $customer->name = $request->name;
                    $customerUpdated = true;
                }
                if ($customer->phone !== $request->phone) {
                    $customer->phone = $request->phone;
                    $customerUpdated = true;
                }
                if ($request->note) {
                    $customer->notes = ($customer->notes ? $customer->notes."\n" : '').$request->note;
                    $customerUpdated = true;
                }
                if ($customerUpdated) {
                    $customer->save();
                }
            }

            $reservation = Reservation::create([
                'customer_id' => $customer->id,
                'reservation_status_id' => 1,
                'date' => $request->date,
                'time' => $request->time,
                'guest_count' => $request->guests,
                'special_requests' => $request->note,
            ]);

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Reservation created successfully! We will confirm your table shortly via email.',
                'reservation_id' => $reservation->id,
            ]);
        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'success' => false,
                'message' => 'Failed to create reservation. Please try again.',
            ], 500);
        }
    }
}
