<?php

namespace App\Http\Resources;

use App\Models\UserGroup;
use App\Traits\ResourceHelper;
use Illuminate\Http\Resources\Json\JsonResource;

class AccessRightResource extends JsonResource
{
    use ResourceHelper;

    public function toArray($request)
    {
        $slug = $this->slug();
        return $this->defaults($this, $request, [
            'name' => $this->name,
            'user_group_id' => $this->user_group_id,
            'read_access' => $this->read_access,
            'write_access' => $this->write_access,
            'create_access' => $this->create_access,
            'delete_access' => $this->delete_access,
            'user_group' => new UserGroup($this->userGroup),
            'slug' => $this->$slug,
        ]);
    }
}
