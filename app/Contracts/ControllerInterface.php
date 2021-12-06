<?php

namespace App\Contracts;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request as HttpRequest;
use Illuminate\Foundation\Http\FormRequest;

interface ControllerInterface
{
    public function index(): JsonResponse;

    public function show(Model $model): JsonResponse;

    public function store(FormRequest $request): JsonResponse;

    public function update(Model $model, FormRequest $request): JsonResponse;

    public function destroy(Model $model): JsonResponse;

    public function mass_destroy(FormRequest $request): JsonResponse;

    public function slug(Model $model): JsonResponse;

    public function option(HttpRequest $request): JsonResponse;
}
