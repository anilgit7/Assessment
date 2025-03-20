<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Exception;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function checkAuth()
    {
        $name = '';
        $email = '';
        $id = '';
        $authenticated = Auth::check();
        if($authenticated){
            $name = Auth::user()->name;
            $email = Auth::user()->email;
            $id = Auth::user()->id;
        }
        return response()->json(['authenticated' => $authenticated, 'name' => $name, 'email' => $email, 'id'=> $id]);
    }
    public function login(Request $request){
        try{
            $request->validate([
                'email' => 'required|email',
                'password' => 'required',
            ]);

            if(Auth::attempt(['email' => $request->email, 'password' => $request->password])){
                $request->session()->regenerate();
                return response()->json([
                    'success' => true,
                    'message' => 'Successfully logged in',
                ]);
            }
            return response()->json(['error' => 'Unauthorized'], 401);
        }
        catch(Exception $e){
            return response()->json([
                'error' => true,
                'message' => $e->getMessage()
            ]);
        }
    }

    public function logout(Request $request){
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return response()->json([
            'success' => true,
            'message' => 'Successfully logged out'
        ]);
    }

    public function register(Request $request)
    {
        try {
            $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|email|unique:users,email',
                'password' => 'required|string|confirmed',
            ]);
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => bcrypt($request->password),
            ]);
            if($user){
                Auth::login($user);
                $request->session()->regenerate();
            }

            return response()->json([
                'success' => true,
                'message' => 'User registered successfully',
                'user' => $user
            ]);

        } catch (Exception $e) {
            return response()->json([
                'error' => true,
                'message' => $e->getMessage()
            ]);
        }
    }

}
