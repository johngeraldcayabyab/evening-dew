<?php

namespace App\Http\Controllers;

use App\Http\Requests\GroupRequest;
use App\Http\Resources\GroupResource;
use App\Models\Group;
use App\Traits\ControllerHelperTrait;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class GroupController  extends Controller
{
    use ControllerHelperTrait;

    public function index(Request $request): ResourceCollection
    {
        $model = new Group();
        $model = $model->filterAndOrder($request);
        return GroupResource::collection($model);
    }

    public function show(Group $group): JsonResponse
    {
        return response()->json(new GroupResource($group));
    }

    public function store(GroupRequest $request): JsonResponse
    {
        return $this->responseCreate(Group::create($request->validated()));
    }

    public function update(GroupRequest $request, Group $group): JsonResponse
    {
        $group->update($request->validated());
        return $this->responseUpdate();
    }

    public function destroy(Group $group): JsonResponse
    {
        $group->delete();
        return $this->responseDelete();
    }

    public function mass_destroy(Request $request): JsonResponse
    {
        $this->massDelete(new Group(), $request);
        return $this->responseDelete();
    }
}
