<?php

namespace App\Http\Resources;

use App\Traits\ResourceHelper;
use Illuminate\Http\Resources\Json\JsonResource;

class UserGroupLineResource extends JsonResource
{
    use ResourceHelper;

    public function toArray($request)
    {
        return $this->defaults($this, $request, [
            'user_id' => $this->user_id,
            'group_id' => $this->group_id,
            'group' => new GroupResource($this->group),
        ]);
    }
}
