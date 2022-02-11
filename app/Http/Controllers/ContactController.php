<?php

namespace App\Http\Controllers;

use App\Data\SystemSetting;
use App\Http\Query\ContactQuery;
use App\Http\Requests\MassDestroy\ContactMassDestroyRequest;
use App\Http\Requests\Store\ContactStoreRequest;
use App\Http\Requests\Update\ContactUpdateRequest;
use App\Http\Resources\Collection\ContactCollection;
use App\Http\Resources\Resource\ContactResource;
use App\Http\Resources\Slug\ContactSlugResource;
use App\Models\Contact;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ContactController
{
    public function index(Request $request): ContactCollection
    {
        $model = new Contact();
        $requestQuery = new ContactQuery();
        $model = $requestQuery->search($model, $request);
        $model = $requestQuery->sort($model, $request);
        return new ContactCollection($model->paginate(SystemSetting::PAGE_SIZE));
    }

    public function show(Contact $contact): JsonResponse
    {
        return response()->json(new ContactResource($contact));
    }

    public function store(ContactStoreRequest $request): JsonResponse
    {
        $headers = location_header(route('contacts.show', Contact::create($request->validated())));
        return response()->json([], STATUS_CREATE, $headers);
    }

    public function update(ContactUpdateRequest $request, Contact $contact): JsonResponse
    {
        $contact->update($request->validated());
        return response()->json([], STATUS_UPDATE);
    }

    public function destroy(Contact $contact): JsonResponse
    {
        $contact->delete();
        return response()->json([], STATUS_DELETE);
    }

    public function mass_destroy(ContactMassDestroyRequest $request): JsonResponse
    {
        Contact::massDelete($request->validated()['ids']);
        return response()->json([], STATUS_DELETE);
    }

    public function slug(Contact $contact): JsonResponse
    {
        return response()->json(new ContactSlugResource($contact));
    }

    public function option(Request $request): JsonResponse
    {
        $Contact = new Contact();
        if ($request->search) {
            $Contact = $Contact->where('Contact', 'like', "%$request->search%");
        }
        $Contact = $Contact->limit(SystemSetting::OPTION_LIMIT)->get();
        return response()->json(ContactSlugResource::collection($Contact));
    }

    public function initial_values()
    {
        return [
//            'symbol_position' => Contact::AFTER_AMOUNT,
//            'rounding_factor' => 0.010000,
//            'decimal_places' => 2,
        ];
    }
}
