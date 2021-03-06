<?php

namespace Botble\Support\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

abstract class Request extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     * @author Dung Thinh
     */
    public function authorize()
    {
        return true;
    }
}
