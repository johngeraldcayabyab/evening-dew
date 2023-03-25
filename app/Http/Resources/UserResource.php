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
            'app_menu_id' => $this->app_menu_id,
            'general_clickable_row' => $this->general_clickable_row,
            'contact' => new ContactResource($this->contact),
            'app_menu' => new AppMenuResource($this->appMenu),
            'user_group_lines' => UserGroupLineResource::collection($this->userGroupLines),
            'slug' => $this->$slug,
        ]);
    }
}
