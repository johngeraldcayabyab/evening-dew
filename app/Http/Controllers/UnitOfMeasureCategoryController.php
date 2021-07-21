<?php

namespace App\Http\Controllers;

use App\Models\UnitOfMeasureCategory;
use App\Modules\UnitsOfMeasureCategories\Services\UnitOfMeasureCategoryStore;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class UnitOfMeasureCategoryController extends Controller
{
    public function index()
    {
        return response()->json([UnitOfMeasureCategory::all()]);
    }

    public function store(Request $request) : JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|unique:units_of_measure_categories,name'
        ]);
        $results = resolve(UnitOfMeasureCategoryStore::class)->store($validated);
        return response()->json([], 201, [
            'Location' => route('units_of_measure_categories.show', ['unit_of_measure_category' => $results->id])
        ]);
    }


    public function show($id)
    {
        return response()->json(UnitOfMeasureCategory::find($id));
    }


    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'id' => 'required|exists:units_of_measure_categories,id',
            'name' => ['required', Rule::unique('units_of_measure_categories')]
        ]);
        resolve(UnitOfMeasureCategoryStore::class)->store($validated);
        return response()->json([], 204);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
