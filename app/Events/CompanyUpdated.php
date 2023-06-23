<?php

namespace App\Events;

use App\Models\Company;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class CompanyUpdated
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $company;
    public $data;

    public function __construct(Company $company, $data = [])
    {
        $this->company = $company;
        $this->data = $data;
    }
}
