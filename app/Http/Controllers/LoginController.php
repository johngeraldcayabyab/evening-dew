<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class LoginController
{
    public function tokensCreate(Request $request)
    {
        $token = $request->user()->createToken($request->token_name);
        return ['token' => $token->plainTextToken];
    }

    public function authenticate(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        if (Auth::attempt($credentials)) {
            $user = User::where('email', $request->email)->first();
            return $user->createToken($request->device_name, ['server:update'])->plainTextToken;
        }

        throw ValidationException::withMessages([
            'email' => ['The provided credentials are incorrect.'],
        ]);
    }
}
