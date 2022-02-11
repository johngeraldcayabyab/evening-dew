<?php

namespace App\Http\Controllers;

use App\Data\SystemSetting;
use App\Http\Requests\MassDestroy\ContactMassDestroyRequest;
use App\Http\Requests\Store\ContactStoreRequest;
use App\Http\Requests\Update\ContactUpdateRequest;
use App\Http\Resources\Collection\ContactCollection;
use App\Http\Resources\Resource\ContactResource;
use App\Http\Resources\Slug\ContactSlugResource;
use App\Models\Address;
use App\Models\Contact;
use App\Models\GlobalSetting;
use App\Traits\ControllerHelperTrait;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Http;

class ContactController
{
    use ControllerHelperTrait;

    public function index(Request $request): ContactCollection
    {
        $model = new Contact();
        $model = $this->searchThenSort($model, $request);
        return new ContactCollection($model->paginate(SystemSetting::PAGE_SIZE));
    }

    public function show(Contact $contact): JsonResponse
    {
        return response()->json(new ContactResource($contact));
    }

    public function store(ContactStoreRequest $request): JsonResponse
    {
        $data = $request->validated();
        $contactData = Arr::except($data, ['street_1', 'street_2', 'city', 'state', 'zip', 'country_id']);
        $contact = Contact::create($contactData);
        $addressData = Arr::except($data, ['name', 'phone', 'mobile', 'email', 'website', 'tax_id', 'avatar']);
        $addressData['address_name'] = $contact->name . " " . Address::DEFAULT . " address";
        $addressData['type'] = Address::DEFAULT;
        $addressData['contact_id'] = $contact->id;
        $post = 'url';
        if (config('app.env') === 'production') {
            $post = '';
        } else {
            $post = 'http://localhost:8800/api/addresses';
        }
        Http::withToken($request->bearerToken())->post($post, $addressData);
        $headers = location_header(route('contacts.show', $contact));
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
        $contact = new Contact();
        if ($request->search) {
            $contact = $contact->where('name', 'like', "%$request->search%");
        }
        $contact = $contact->limit(SystemSetting::OPTION_LIMIT)->get();
        return response()->json(ContactSlugResource::collection($contact));
    }

    public function initial_values()
    {
        return [
            'country_id' => GlobalSetting::generalDefaultCountry(),
        ];
    }
}
