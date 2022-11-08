<?php

namespace App\Http\Resources;

use App\Traits\ResourceHelper;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    use ResourceHelper;

    public function toArray($request)
    {
        $slug = $this->slug();
        return $this->defaults($this, $request, [
            'name' => $this->name,
            'email' => $this->email,
            'avatar' => $this->avatar ? asset("storage/images/" . $this->avatar) : null,
            'contact_id' => $this->contact_id,
            'contact' => new ContactResource($this->contact),
            'user_group_lines' => UserGroupLineResource::collection($this->userGroupLines),
            'slug' => $this->$slug,
        ]);
    }
}
