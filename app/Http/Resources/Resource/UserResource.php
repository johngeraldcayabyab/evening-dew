<?php

namespace App\Http\Resources\Resource;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'email_verified_at' => $this->email_verified_at->format('m/d/Y h:i:s A'),
            'created_at' => $this->created_at->format('m/d/Y h:i:s A'),
        ];
    }
}
