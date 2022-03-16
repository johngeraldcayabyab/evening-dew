<?php

namespace App\Http\Controllers;

use App\Events\ContactUpsertEvent;
use App\Http\Requests\MassDestroy\ContactMassDestroyRequest;
use App\Http\Requests\Store\ContactStoreRequest;
use App\Http\Requests\Update\ContactUpdateRequest;
use App\Http\Resources\OptionResource;
use App\Http\Resources\Resource\ContactResource;
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
        $model = $this->searchSortThenPaginate($model, $request);
        return ContactResource::collection($model);
    }

    public function show(Contact $contact): JsonResponse
    {
        return response()->json(new ContactResource($contact));
    }

    public function store(ContactStoreRequest $request): JsonResponse
    {
        $data = $request->validated();
        $contactData = Arr::only($data, (new Contact())->getFields());
        $contact = Contact::create($contactData);
        ContactUpsertEvent::dispatch($contact, $data);
        return response()->json([], STATUS_CREATE, $this->locationHeader($contact));
    }

    public function update(ContactUpdateRequest $request, Contact $contact): JsonResponse
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

    public function mass_destroy(ContactMassDestroyRequest $request): JsonResponse
    {
        Contact::massDelete($request->validated()['ids']);
        return response()->json([], STATUS_DELETE);
    }

    public function option(Request $request): JsonResponse
    {
        $model = $this->searchOption(new Contact(), $request);
        return response()->json(OptionResource::collection($model));
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
