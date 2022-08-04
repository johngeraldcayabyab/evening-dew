<?php

namespace App\Http\Resources;

use App\Traits\ResourceHelper;
use Illuminate\Http\Resources\Json\JsonResource;

class ActivityLogResource extends JsonResource
{
    use ResourceHelper;

    public function toArray($request)
    {
        return $this->defaults($this, $request, [
            "user" => $this->causer,
            "causer_id" => $this->causer_id,
            "causer_type" => $this->causer_type,
            "description" => $this->description,
            "log_name" => $this->log_name,
            "properties" => $this->properties,
            "subject_id" => $this->subject_id,
            "subject_type" => $this->subject_type,
            "changes" => $this->changes,
        ]);
    }
}
