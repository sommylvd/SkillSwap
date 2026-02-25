<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;

    protected $fillable = ['from_user_id', 'to_user_id', 'service_id', 'amount'];

    /**
     * Связь: услуга
     */
    public function service()
    {
        return $this->belongsTo(Service::class);
    }

    /**
     * Связь: покупатель
     */
    public function buyer()
    {
        return $this->belongsTo(User::class, 'from_user_id');
    }

    /**
     * Связь: продавец
     */
    public function seller()
    {
        return $this->belongsTo(User::class, 'to_user_id');
    }
}