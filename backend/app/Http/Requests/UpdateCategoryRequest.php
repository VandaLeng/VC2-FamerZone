<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateCategoryRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $categoryId = $this->route('category'); // works if using route model binding

        return [
            'name' => 'required|string|max:255|unique:categories,name,' . $categoryId,
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048', // validate image if present
        ];
    }
}
