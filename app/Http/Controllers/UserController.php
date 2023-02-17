<?php

namespace App\Http\Controllers;

use App\Events\UserCreated;
use App\Events\UserUpdated;
use App\Http\Requests\UserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use App\Models\UserGroupLine;
use App\Traits\ControllerHelperTrait;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;
use Illuminate\Support\Arr;
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
        $userData = Arr::except($data, ['user_group_lines']);
        $userData['password'] = Hash::make($userData['password']);
        $user = User::create($userData);
        if (isset($data['user_group_lines'])) {
            $userGroupLinesData = $data['user_group_lines'];
            UserGroupLine::massUpsert($userGroupLinesData, $user);
        }
        UserCreated::dispatch($user, $userData);
        return $this->responseCreate($user);
    }

    public function update(UserRequest $request, User $user): JsonResponse
    {
        $data = $request->validated();
        $userData = Arr::except($data, ['user_group_lines']);
        $user->update($userData);
        if (isset($data['user_group_lines'])) {
            $userGroupLinesData = $data['user_group_lines'];
            UserGroupLine::massUpsert($userGroupLinesData, $user);
        }
        if (isset($data['user_group_lines_deleted'])) {
            UserGroupLine::massDelete(collect($data['user_group_lines_deleted'])->pluck('id'));
        }
        UserUpdated::dispatch($user, $userData);
        return $this->responseUpdate();
    }

    public function destroy(User $user): JsonResponse
    {
        $user->delete();
        return $this->responseDelete();
    }

    public function mass_destroy(Request $request): JsonResponse
    {
        $this->massDelete(new User(), $request);
        return $this->responseDelete();
    }
}
