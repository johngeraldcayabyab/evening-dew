<?php

namespace App\Http\Resources\Resource;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    public function toArray($request)
    {
        $slug = $this->slug();
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'avatar' => $this->avatar ? asset("storage/images/" . $this->avatar) : null,
            'contact_id' => $this->contact_id,
            'contact' => new ContactResource($this->contact),
            'created_at' => $this->created_at->format('m/d/Y h:i:s A'),
            'slug' => $this->$slug,
        ];
    }
}
