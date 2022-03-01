<?php

namespace App\Http\Controllers;

use App\Data\SystemSetting;
use App\Http\Requests\MassDestroy\UserMassDestroyRequest;
use App\Http\Requests\Store\UserStoreRequest;
use App\Http\Requests\Update\UserUpdateRequest;
use App\Http\Resources\Collection\UserCollection;
use App\Http\Resources\Resource\UserResource;
use App\Http\Resources\Slug\UserSlugResource;
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
        $model = $this->searchSortThenPaginate($model, $request);
        return new UserCollection($model);
    }

    public function show(User $user): JsonResponse
    {
        return response()->json(new UserResource($user));
    }

    public function store(UserStoreRequest $request): JsonResponse
    {
        $data = $request->validated();
        $data['password'] = Hash::make($data['password']);
        return response()->json([], STATUS_CREATE, $this->locationHeader(User::create($data)));
    }

    public function update(UserUpdateRequest $request, User $user): JsonResponse
    {
        $data = $request->validated();
        $user->update($data);
        return response()->json([], STATUS_UPDATE);
    }

    public function destroy(User $user): JsonResponse
    {
        $user->delete();
        return response()->json([], STATUS_DELETE);
    }

    public function mass_destroy(UserMassDestroyRequest $request): JsonResponse
    {
        User::massDelete($request->validated()['ids']);
        return response()->json([], STATUS_DELETE);
    }

    public function slug(User $user): JsonResponse
    {
        return response()->json(new UserSlugResource($user));
    }

    public function option(Request $request): JsonResponse
    {
        $model = $this->searchOption(new User(), $request);
        return response()->json(UserSlugResource::collection($model));
    }
}
