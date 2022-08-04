<?php

namespace App\Http\Controllers;

use App\Http\Resources\AddressResource;
use App\Models\Address;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;
use Spatie\Activitylog\Models\Activity;

class ActivityController
{
    public function index(Request $request): ResourceCollection
    {
        $model = new Activity();
        return $model->paginate();
    }
}
