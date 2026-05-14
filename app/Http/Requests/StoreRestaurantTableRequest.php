<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreRestaurantTableRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'capacity' => ['required', 'integer', 'min:1', 'max:100'],
            'location' => ['required', Rule::in(['indoor', 'outdoor', 'window', 'private_room', 'bar'])],
            'description' => ['nullable', 'string', 'max:1000'],
            'auto_approve' => ['required', 'boolean'],
        ];
    }
}
