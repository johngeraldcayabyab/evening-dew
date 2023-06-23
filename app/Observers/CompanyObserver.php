<?php

namespace App\Observers;

use App\Models\Company;

class CompanyObserver
{
    public function updating(Company $user)
    {
        $user->avatar = avatar_filter($user->avatar);
    }
}
