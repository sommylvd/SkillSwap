<?php
namespace App\Http\Controllers;
use App\Models\Service;
use App\Models\User;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TransactionController extends Controller
{
    public function buy(Request $request, $id)
    {
        $request->validate([
            'buyer_id' => 'required|exists:users,id',
        ]);

        $service = Service::find($id);
        $buyer = User::find($request->buyer_id);

        if (!$service) {
            return response()->json(['message' => 'Услуга не найдена'], 404);
        }

        if (!$buyer) {
            return response()->json(['message' => 'Покупатель не найден'], 404);
        }

        if ($buyer->id === $service->user_id) {
            return response()->json(['message' => 'Нельзя купить свою услугу'], 403);
        }

        if ($buyer->coins < $service->price) {
            return response()->json(['message' => 'Недостаточно коинов'], 400);
        }

        DB::transaction(function () use ($buyer, $service) {
            $buyer->decrement('coins', $service->price);
            $service->user->increment('coins', $service->price);
            
            Transaction::create([
                'from_user_id' => $buyer->id,
                'to_user_id' => $service->user_id,
                'service_id' => $service->id,
                'amount' => $service->price
            ]);
        });

        return response()->json(['message' => 'Услуга успешно оплачена']);
    }
}