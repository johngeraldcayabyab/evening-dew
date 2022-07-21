<?php

namespace App\Exports;

use App\Models\SalesOrder;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class SalesOrderExport implements FromQuery, ShouldAutoSize, WithMapping, WithHeadings
{
    use Exportable;

    public function query()
    {
        return SalesOrder::query()->orderBy('created_at', 'desc');
    }

    public function map($row): array
    {
        return [
            'number' => $row->number,
        ];
    }

    public function headings(): array
    {
        return [
            'Number',
        ];
    }
}
