<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SmNorthSalesController
{
    public function import(Request $request)
    {
        info('***pulse start***');
        info($request->all());
        info('***pulse end***');
        return response()->json([], 202);
    }

    public function import_lines(Request $request)
    {
        info('***pulse line start***');
        info($request->all());
        info('***pulse line start***');
        return response()->json([], 202);
    }
}
