<?php

namespace App\Http\Controllers;

use App\Events\ContactUpsertEvent;
use App\Http\Requests\ContactRequest;
use App\Http\Resources\ContactResource;
use App\Models\Contact;
use App\Models\GlobalSetting;
use App\Traits\ControllerHelperTrait;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;
use Illuminate\Support\Arr;

class ContactController
{
    use ControllerHelperTrait;

    public function index(Request $request): ResourceCollection
    {
        $model = new Contact();
        $model = $model->filterAndOrder($request);
        return ContactResource::collection($model);
    }

    public function show(Contact $contact): JsonResponse
    {
        return response()->json(new ContactResource($contact));
    }

    public function store(ContactRequest $request): JsonResponse
    {
        $data = $request->validated();
        $contactData = Arr::only($data, (new Contact())->getFields());
        $contact = Contact::create($contactData);
        ContactUpsertEvent::dispatch($contact, $data);
        return response()->json([], STATUS_CREATE, $this->locationHeader($contact));
    }

    public function update(ContactRequest $request, Contact $contact): JsonResponse
    {
        $data = $request->validated();
        $contactData = Arr::only($data, (new Contact())->getFields());
        $contact->update($contactData);
        ContactUpsertEvent::dispatch($contact, $data);
        return response()->json([], STATUS_UPDATE);
    }

    public function destroy(Contact $contact): JsonResponse
    {
        $contact->delete();
        return response()->json([], STATUS_DELETE);
    }

    public function mass_destroy(Request $request): JsonResponse
    {
        $this->massDelete(new Contact(), $request);
        return response()->json([], STATUS_DELETE);
    }

    public function initial_values()
    {
        $generalDefaultCountry = GlobalSetting::latestFirst()->generalDefaultCountry;
        return [
            'default_address_country' => $generalDefaultCountry,
            'country_id' => $generalDefaultCountry->id,
        ];
    }
}
