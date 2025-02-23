<?php

namespace App\Http\Controllers;

use App\Models\Image;
use App\Models\UserTemplate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class dashboardController extends Controller
{
    public function dashboard()
    {
        $user = Auth::user();

        $userTemplates = UserTemplate::where('user_id', $user->id)
            ->orWhere('is_custom', true)
            ->get();
        
        $customTemplates = UserTemplate::where('is_custom', true)->get();
    
        $images = Image::all();
    
        return view('dashboard', compact('userTemplates', 'customTemplates', 'images'));
    }
}
