<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

#[Fillable([
    'name',
    'email',
    'password',
    'equipped_board_id',
    'equipped_theme',
    'custom_pieces',
    'credits',
    'isAdmin',
])]

#[Hidden(['password', 'remember_token'])]
class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable;

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */

    protected $fillable = [
        'password',
        'is_admin',
        'equipped_board_id',
        'credits',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'is_admin' => 'boolean',
            'equipped_board_id' => 'integer',
            'credits' => 'integer',
        ];
    }

    public function inventories()
    {
        return $this->hasMany(Inventory::class);
    }

    public function equippedPieces()
    {
        return $this->hasMany(UserEquippedPiece::class);
    }

    public function getEquippedItemIds()
    {
        $pieceIds = $this->equippedPieces()->pluck('item_id')->toArray();

        if ($this->equipped_board_id) {
            $pieceIds[] = $this->equipped_board_id;
        }

        return $pieceIds;
    }

    public function hasEquipped($itemId)
    {
        return in_array($itemId, $this->getEquippedItemIds());
    }

    public function items()
    {
        return $this->hasManyThrough(
            Item::class,
            Inventory::class,
            'user_id',
            'id',
            'id',
            'item_id'
        );
    }

    public function puzzles(): BelongsToMany
    {
        return $this->belongsToMany(Puzzle::class, 'puzzles_user')
            ->withPivot('solve_time')
            ->withTimestamps();
    }

    /**
     * Helper to get the highest solved puzzle ID
     */
    public function getHighestSolvedPuzzleId()
    {
        return $this->puzzles()->max('puzzle_id') ?? 0;
    }

    public function games()
    {
        return $this->hasMany(Game::class);
    }
}
