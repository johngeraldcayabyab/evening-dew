<?php

namespace App\Http\Resources\Resource;

use App\Traits\ResourceHelper;
use Illuminate\Http\Resources\Json\JsonResource;

class SequenceResource extends JsonResource
{
    use ResourceHelper;

    public function toArray($request)
    {
        $slug = $this->slug();
        return $this->defaults($this, [
            'name' => $this->name,
            'sequence_code' => $this->sequence_code,
            'implementation' => $this->implementation,
            'prefix' => $this->prefix,
            'suffix' => $this->suffix,
            'sequence_size' => $this->sequence_size,
            'step' => $this->step,
            'next_number' => $this->next_number,
            'slug' => $this->$slug,
        ]);
    }
}
