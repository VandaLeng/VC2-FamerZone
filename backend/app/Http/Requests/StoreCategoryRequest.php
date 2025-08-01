<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreCategoryRequest extends FormRequest
{
    /**
     * Allow the user to make this request.
     */
    public function authorize(): bool
    {
        return true; // must be true to proceed with validation
    }

    /**
     * Validation rules for storing a category.
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255|unique:categories,name',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048', // validate image if present
        ];
    }
}
