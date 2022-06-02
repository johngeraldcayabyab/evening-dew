<?php

namespace App\Observers;

use App\Models\User;

class UserObserver
{
    public function updating(User $user)
    {
        $user->avatar = avatar_filter($user->avatar);
    }
}
