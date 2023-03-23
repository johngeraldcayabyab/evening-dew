<?php

namespace App\Http\Controllers;

use App\Http\Resources\ActivityLogResource;
use App\Models\ActivityLog;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class ActivityLogController extends Controller
{
    public function index(Request $request): ResourceCollection
    {
        $model = new ActivityLog();
        $model = $model->filterAndOrder($request);
        return ActivityLogResource::collection($model);
    }
}
