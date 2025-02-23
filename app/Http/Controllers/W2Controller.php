<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\UserTemplate; // Import your UserTemplate model
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class W2Controller extends Controller
{
    public function index()
    {

        $userId = Auth::id();
        

        $userHtml = UserTemplate::where('user_id', $userId)->value('html_content');

        $tables = DB::select("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'");


        $tables = collect($tables)->sortBy('name')->values();

        $tableDetails = [];

        foreach ($tables as $table) {
            $tableName = $table->name;
            

            $columns = DB::select("PRAGMA table_info($tableName)");


            $foreignKeys = DB::select("PRAGMA foreign_key_list($tableName)");

            $tableDetails[$tableName] = [
                'columns' => $columns,
                'foreignKeys' => $foreignKeys,
            ];
        }

        return view('W2.index', compact('userId', 'userHtml', 'tableDetails'));
    }
}
