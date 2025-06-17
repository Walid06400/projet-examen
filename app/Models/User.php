<?php

namespace App\Models;

use Filament\Models\Contracts\FilamentUser;
use Filament\Panel;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable implements FilamentUser
{
    use HasFactory, Notifiable, HasApiTokens;
    //SoftDeletes

    //protected $datere = ['deleted_at'];


    
    protected $fillable = [
        'name',
        'email',
        'password',
        'profile_picture',
        'is_admin',
        'status',
    ];


    protected $hidden = [
        'password',
        'remember_token',
    ];


    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'is_admin' => 'boolean',
            'status' => 'string',
        ];
    }
    
    
    // Configuration Filament
    public function canAccessPanel(Panel $panel): bool
    {
        return $this->is_admin && $this->status === 'active';
    }
    
    // Relations pour le projet MAOlogie
    public function cart()
    {
        return $this->hasOne(Cart::class);
    }
     
    public function articles() {
        return $this->hasMany(Article::class);
    }
    
    public function forumTopics() {
        return $this->hasMany(ForumTopic::class);
    }

    public function forumPosts()
    {
        return $this->hasMany(ForumPost::class);
    }

    public function reactions()
    {
        return $this->hasMany(Reaction::class);
    }
}
