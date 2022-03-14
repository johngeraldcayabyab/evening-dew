<?php

namespace App\Http\Resources\Resource;

use Illuminate\Http\Resources\Json\JsonResource;

class AppMenuResource extends JsonResource
{
    public function toArray($request)
    {
        $slug = $this->getWithParents('label');
        return [
            'id' => $this->id,
            'label' => $this->label,
            'menu_id' => $this->menu_id,
            'parent_app_menu_id' => $this->parent_app_menu_id,
            'created_at' => $this->created_at->format('m/d/Y h:i:s A'),
            'menu' => new MenuResource($this->menu),
            'children' => AppMenuResource::collection($this->children),
            'parent_location' => new LocationResource($this->parentLocation),
            'parents' => $slug,
            'slug' => $slug,
        ];
    }
}
