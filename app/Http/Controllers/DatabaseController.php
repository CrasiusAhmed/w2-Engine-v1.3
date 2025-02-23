<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class DatabaseController extends Controller
{
    public function showDatabase()
    {
        $tables = DB::select("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'");
        $tables = collect($tables)->sortBy('name')->values();

        $tableDetails = [];
        foreach ($tables as $table) {
            $tableName = $table->name;
            
            $columns = DB::select("PRAGMA table_info($tableName)");

            $foreignKeys = DB::select("PRAGMA foreign_key_list($tableName)");
            $rows = DB::table($tableName)->get();

            $tableDetails[$tableName] = [
                'columns' => $columns,
                'foreignKeys' => $foreignKeys,
                'rows' => $rows,
            ];
        }

        return view('database.show', compact('tableDetails'));
    }
}