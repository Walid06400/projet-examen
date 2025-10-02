<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;

class Comment extends Model
{
    use HasFactory;

    protected $fillable = [
        'article_id',
        'user_id',
        'parent_id',
        'content',
    ];

    protected $casts = [
        'created_at' => 'datetime',
    ];

    /**
     * ✅ RELATION - Article commenté
     */
    public function article(): BelongsTo
    {
        return $this->belongsTo(Article::class);
    }

    /**
     * ✅ RELATION - Utilisateur qui a commenté
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * ✅ RELATION - Commentaire parent (pour les réponses)
     */
    public function parent(): BelongsTo
    {
        return $this->belongsTo(Comment::class, 'parent_id');
    }

    /**
     * ✅ RELATION - Réponses à ce commentaire
     */
    public function replies(): HasMany
    {
        return $this->hasMany(Comment::class, 'parent_id');
    }

    /**
     * ✅ RELATION POLYMORPHE - Réactions sur ce commentaire
     */
    public function reactions(): MorphMany
    {
        return $this->morphMany(Reaction::class, 'reactable');
    }

    /**
     * ✅ MÉTHODE HELPER - Compter les likes
     */
    public function likesCount(): int
    {
        return $this->reactions()->where('type', Reaction::TYPE_LIKE)->count();
    }

    /**
     * ✅ MÉTHODE HELPER - Compter les dislikes
     */
    public function dislikesCount(): int
    {
        return $this->reactions()->where('type', Reaction::TYPE_DISLIKE)->count();
    }

    /**
     * ✅ MÉTHODE HELPER - Obtenir la réaction d'un utilisateur
     */
    public function getUserReaction($userId)
    {
        return $this->reactions()->where('user_id', $userId)->first();
    }
}
