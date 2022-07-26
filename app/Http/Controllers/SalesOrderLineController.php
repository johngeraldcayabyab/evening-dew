<?php

namespace App\Http\Controllers;

use App\Exports\SalesOrderLineExport;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;

class SalesOrderLineController
{
    public function export(Request $request)
    {
        return Excel::download(new SalesOrderLineExport($request->all()), 'sales_orders.xlsx');
    }
}
