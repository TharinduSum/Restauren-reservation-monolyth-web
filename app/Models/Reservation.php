<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Reservation extends Model
{
    protected $fillable = [
        'customer_id',
        'reservation_status_id',
        'date',
        'time',
        'guest_count',
        'special_requests',
    ];

    protected $casts = [
        'date' => 'date',
    ];

    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }

    public function status(): BelongsTo
    {
        return $this->belongsTo(ReservationStatus::class, 'reservation_status_id');
    }

    public function tables(): BelongsToMany
    {
        return $this->belongsToMany(RestaurantTable::class, 'reservation_tables')
            ->withTimestamps();
    }

    public function specialRequests(): HasMany
    {
        return $this->hasMany(SpecialRequest::class);
    }
}
