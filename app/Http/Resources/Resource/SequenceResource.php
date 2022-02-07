<?php

namespace App\Http\Resources\Resource;

use Illuminate\Http\Resources\Json\JsonResource;

class SequenceResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'sequence_code' => $this->sequence_code,
            'implementation' => $this->implementation,
            'prefix' => $this->prefix,
            'suffix' => $this->suffix,
            'sequence_size' => $this->sequence_size,
            'step' => $this->step,
            'next_number' => $this->next_number,
            'created_at' => $this->created_at->format('m/d/Y h:i:s A'),
        ];
    }
}
