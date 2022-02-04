<?php

namespace App\Http\Controllers;

use App\Data\SystemSetting;
use App\Http\Query\UserQuery;
use App\Http\Requests\MassDestroy\UserMassDestroyRequest;
use App\Http\Requests\Store\UserStoreRequest;
use App\Http\Requests\Update\UserUpdateRequest;
use App\Http\Resources\Collection\UserCollection;
use App\Http\Resources\Resource\UserResource;
use App\Http\Resources\Slug\UserSlugResource;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;
use Illuminate\Support\Facades\Hash;

class UserController
{
    public function index(Request $request): ResourceCollection
    {
        $model = new User();
        $requestQuery = new UserQuery();
        $model = $requestQuery->search($model, $request);
        $model = $requestQuery->sort($model, $request);
        return new UserCollection($model->paginate(SystemSetting::PAGE_SIZE));
    }

    public function show(User $user): JsonResponse
    {
        return response()->json(new UserResource($user));
    }

    public function store(UserStoreRequest $request): JsonResponse
    {
        $data = $request->validated();
        $data['password'] = Hash::make($data['password']);
        $headers = location_header(route('users.show', User::create($data)));
        return response()->json([], STATUS_CREATE, $headers);
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
        User::whereIn('id', $request->validated()['ids'])->delete();
        return response()->json([], STATUS_DELETE);
    }

    public function slug(User $user): JsonResponse
    {
        return response()->json(new UserSlugResource($user));
    }

    public function option(Request $request): JsonResponse
    {
        $model = new User();
        if ($request->search) {
            $model = $model->where('name', 'like', "%$request->search%");
        }
        $model = $model->limit(SystemSetting::OPTION_LIMIT)->get(['id', 'name']);
        return response()->json(UserSlugResource::collection($model));
    }
}
