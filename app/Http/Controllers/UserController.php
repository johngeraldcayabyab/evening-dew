<?php

namespace App\Http\Controllers;

use App\Data\SystemSetting;
use App\Events\UserCreatedEvent;
use App\Events\UserUpdatedEvent;
use App\Http\Requests\UserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use App\Traits\ControllerHelperTrait;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;
use Illuminate\Support\Facades\Hash;

class UserController
{
    use ControllerHelperTrait;

    public function index(Request $request): ResourceCollection
    {
        $model = new User();
        $model = $model->filterAndOrder($request);
        return UserResource::collection($model);
    }

    public function show(User $user): JsonResponse
    {
        return response()->json(new UserResource($user));
    }

    public function store(UserRequest $request): JsonResponse
    {
        $data = $request->validated();
        $data['password'] = Hash::make($data['password']);
        $user = User::create($data);
        UserCreatedEvent::dispatch($user, $data);
        return response()->json([], SystemSetting::STATUS_CREATE, $this->locationHeader($user));
    }

    public function update(UserRequest $request, User $user): JsonResponse
    {
        $data = $request->validated();
        $user->update($data);
        UserUpdatedEvent::dispatch($user, $data);
        return response()->json([], SystemSetting::STATUS_UPDATE);
    }

    public function destroy(User $user): JsonResponse
    {
        $user->delete();
        return response()->json([], SystemSetting::STATUS_DELETE);
    }

    public function mass_destroy(Request $request): JsonResponse
    {
        $this->massDelete(new User(), $request);
        return response()->json([], SystemSetting::STATUS_DELETE);
    }
}
