<?php

namespace App\Http\Resources;

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
            'group_id' => $this->group_id,
            'read_access' => $this->read_access,
            'write_access' => $this->write_access,
            'create_access' => $this->create_access,
            'delete_access' => $this->delete_access,
            'group' => new GroupResource($this->group),
            'slug' => $this->$slug,
        ]);
    }
}
