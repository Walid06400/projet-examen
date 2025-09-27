<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphTo;
class Reaction extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'reactable_id',
        'reactable_type',
        'type'
    ];

     public const TYPE_LIKE = 'like';
    public const TYPE_DISLIKE = 'dislike';

    // ✅ CONSTANTES pour affichage (optionnel)
    public const TYPES = [
        self::TYPE_LIKE => '👍',
        self::TYPE_DISLIKE => '👎',
    ];
    /**
     * Relations
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * ✅ RELATION POLYMORPHE - Élément réagi (Comment ou Article)
     */
    public function reactable(): MorphTo
    {
        return $this->morphTo();
    }

    /**
     * Scopes
     */
    public function scopeOfType($query, string $type)
    {
        return $query->where('type', $type);
    }

    /**
     * Constants pour les types de réactions
     */


    public function getEmojiAttribute(): string
    {
        return self::TYPES[$this->type] ?? '👍';
    }
}
