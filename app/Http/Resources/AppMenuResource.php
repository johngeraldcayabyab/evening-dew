<?php

namespace App\Http\Resources;

use App\Traits\ResourceHelper;
use Illuminate\Http\Resources\Json\JsonResource;

class AppMenuResource extends JsonResource
{
    use ResourceHelper;

    public function toArray($request)
    {
        $slug = $this->getWithParents('label');
        return $this->defaults($this, $request, [
            'label' => $this->label,
            'menu_id' => $this->menu_id,
            'parent_app_menu_id' => $this->parent_app_menu_id,
            'menu' => new MenuResource($this->menu),
            'parent_app_menu' => $this->parentAppMenu,
            'children' => AppMenuResource::collection($this->children),
            'parent_location' => new LocationResource($this->parentLocation),
            'parents' => $slug,
            'slug' => $slug,
        ]);
    }
}
