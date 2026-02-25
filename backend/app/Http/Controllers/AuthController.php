<?php
namespace App\Http\Controllers;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'coins' => 100,
        ]);

        return response()->json([
            'message' => 'Пользователь создан',
            'user_id' => $user->id,
            'name' => $user->name,
            'coins' => $user->coins
        ]);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Неверные данные'], 401);
        }

        return response()->json([
            'message' => 'Вход выполнен',
            'user_id' => $user->id,
            'name' => $user->name,
            'coins' => $user->coins
        ]);
    }

    public function profile($id)
    {
    $user = User::with([
        'services', 
        'purchasedServices.service.user'
    ])->find($id);
    
    if (!$user) {
        return response()->json(['message' => 'Пользователь не найден'], 404);
    }
    return response()->json($user);
    }
}