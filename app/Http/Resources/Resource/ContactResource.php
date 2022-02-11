<?php

namespace App\Http\Resources\Resource;

use Illuminate\Http\Resources\Json\JsonResource;

class ContactResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'phone' => $this->phone,
            'mobile' => $this->mobile,
            'email' => $this->email,
            'website' => $this->website,
            'tax_id' => $this->tax_id,
            'avatar' => $this->avatar ? asset("storage/images/" . $this->avatar) : null,
            'created_at' => $this->created_at->format('m/d/Y h:i:s A'),
        ];
    }
}