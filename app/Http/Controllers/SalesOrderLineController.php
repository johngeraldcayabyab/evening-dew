<?php

namespace App\Http\Controllers;

use App\Exports\SalesOrderLineExport;
use App\Http\Resources\SalesOrderLineResource;
use App\Models\SalesOrderLine;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;

class SalesOrderLineController extends Controller
{
    public function index(Request $request)
    {
        $model = new SalesOrderLine();
        $model = $model->filterAndOrder($request);
        return SalesOrderLineResource::collection($model);
    }

    public function export(Request $request)
    {
        return Excel::download(new SalesOrderLineExport($request->all()), 'sales_orders.xlsx');
    }
}
