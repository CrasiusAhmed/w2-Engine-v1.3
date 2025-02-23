<?php

namespace App\Http\Controllers;

use App\Models\Image;
use App\Models\TemplateBlock;
use Illuminate\Http\Request;
use App\Models\UserTemplate;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class websiteBuilderController extends Controller
{
     public function saveLayout(Request $request)
    {
        $user = Auth::user();

        // Validate the incoming request
        $request->validate([
            'html_content' => 'required|string',
            'css_content' => 'nullable|string',
            'hover_css' => 'nullable|string',
            'keyframe_css' => 'nullable|string',
            'media_queries' => 'nullable|string',
            'select_unit' => 'nullable|string',
            'project_id' => 'required|integer',

            // NEW: expect background_data as a string
            'background_data' => 'nullable|string',
            'box_shadows' => 'nullable|json',
            'text_shadows' => 'nullable|json'
        ]);

        $projectId = $request->input('project_id');

        // Save or update the user's custom layout for the specific project
        $userTemplate = UserTemplate::updateOrCreate(
            [
                'user_id' => $user->id,
                'id' => $projectId,
            ],
            [
                'html_content' => $request->input('html_content'),
                'css_content' => $request->input('css_content'),
                'hover_css' => $request->input('hover_css'),
                'keyframe_css' => $request->input('keyframe_css'),
                'media_queries' => $request->input('media_queries'),
                'select_unit' => $request->input('select_unit'),


                // NEW: store the raw string of JSON in 'background_data'
                'background_data' => $request->input('background_data'),
                'box_shadows' => $request->input('box_shadows'),
                'text_shadows' => $request->input('text_shadows')
            ]
        );

        return response()->json(['success' => true, 'message' => 'Layout saved successfully']);
    }
    public function getLayout()
    {
        $user = Auth::user();
        $userTemplate = UserTemplate::where('user_id', $user->id)->first();

        return view('layout', [
            'userHtml' => $userTemplate->html_content ?? '<div></div>',
            'userCss' => $userTemplate->css_content ?? '',
            'hoverCss' => $userTemplate->hover_css ?? '',
            'keyframeCss' => json_decode($userTemplate->keyframe_css, true) ?? [],
            'mediaQueries' => json_decode($userTemplate->media_queries, true) ?? [],
            'selectUnit' => $userTemplate->select_unit ?? '{}', 


            'backgroundData' => $userTemplate ? $userTemplate->background_data : '[]',
            'box_shadows' => $userTemplate?->box_shadows ?? '{}', 
            'text_shadows' => $userTemplate?->text_shadows ?? '{}',
        ]);
    }



    public function showLayout()
    {
        $user = Auth::user();
        $userTemplate = UserTemplate::where('user_id', $user->id)->first();

        return view('layout', [
            'userHtml' => $userTemplate->html_content ?? '<div></div>',
            'userCss' => $userTemplate->css_content ?? '',
            'hoverCss' => $userTemplate->hover_css ?? '',
            'keyframeCss' => json_decode($userTemplate->keyframe_css, true) ?? [],
            'mediaQueries' => json_decode($userTemplate->media_queries, true) ?? [],
            'select_unit' => json_decode($userTemplate->select_unit, true) ?? [],

            'backgroundData' => json_decode($userTemplate->select_unit, true) ?? []
        ]);
    }

    public function createTemplate(Request $request)
    {
        $user = Auth::user();

        // Validate the request
        $request->validate([
            'projectName' => 'required|string|max:255',
        ]);

        // Create a new user template
        $userTemplate = UserTemplate::create([
            'user_id' => $user->id,
            'html_content' => '',  
            'css_content' => '',   
            'hover_css' => '',     
            'keyframe_css' => '',  
            'media_queries' => '', 
            'select_unit' => '{}', 
            'backgroundData' => '{}',
            'box_shadows' => '[]',
            'text_shadows' => '[]',
            'project_name' => $request->projectName, 
        ]);

        return response()->json([
            'success' => true,
            'templateId' => $userTemplate->id,
            'projectName' => $userTemplate->project_name, 
        ]);
    }

    

    public function showProject($id)
    {
        $user = Auth::user();


        $userTemplate = UserTemplate::where('id', $id)
        ->where(function($query) use ($user) {
            $query->where('user_id', $user->id)
                    ->orWhere('is_custom', true);
        })
        ->first();

        if (!$userTemplate) {
        abort(404, 'Template not found.');
        }


            $customCss = $userTemplate->css_content;


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

        $blocks = $userTemplate->blocks; 


    $blocksData = $blocks->toArray();
    


        $uploadedFiles = Image::all(); 


        return view('W2.index', [
            'blocks'  => $blocks,
            'blocksData' => $blocksData, 
            'userHtml' => $userTemplate->html_content,
            'userCss' => $userTemplate->css_content,
            'hoverCss' => $userTemplate->hover_css,
            'keyframeCss' => $userTemplate->keyframe_css,
            'mediaQueries' => $userTemplate->media_queries,
            'selectUnit' => $userTemplate->select_unit,
            'backgroundData' => $userTemplate->background_data,
            'boxShadows' => json_decode($userTemplate->box_shadows, true) ?? [],
            'textShadows' => json_decode($userTemplate->text_shadows, true) ?? [],
            'templateId' => $id,
            'tableDetails' => $tableDetails,
            'project' => $userTemplate, 
            'uploadedFiles' => $uploadedFiles,
            'customCss' => $customCss,
        ]);
    }
    public function deleteTemplate($id)
    {
        $user = Auth::user();


        $userTemplate = UserTemplate::where('id', $id)->where('user_id', $user->id)->first();

        if (!$userTemplate) {
            return response()->json(['success' => false, 'message' => 'Template not found.'], 404);
        }

        $userTemplate->delete();

        return response()->json(['success' => true, 'message' => 'Template deleted successfully.']);
    }


















    public function createBlock(Request $request)
    {

        $request->validate([
            'user_template_id' => 'required|integer',
            'unique_class'     => 'nullable|string',
            'first_class'      => 'nullable|string',
            'html_content'     => 'nullable|string',
            'background_type'  => 'nullable|string',

            'background_url'         => 'nullable|string',
            'background_linear'      => 'nullable|string',
            'background_radial'      => 'nullable|string',
            'background_linear_rgba' => 'nullable|string',
        ]);


        $template = UserTemplate::where('id', $request->user_template_id)
                                ->where('user_id', Auth::id())
                                ->firstOrFail();


        $block = TemplateBlock::create([
            'user_template_id'       => $template->id,
            'unique_class'           => $request->input('unique_class'),
            'first_class'            => $request->input('first_class'),  // NEW!
            'html_content'           => $request->input('html_content'),
            'background_type'        => $request->input('background_type'),
            'background_url'         => $request->input('background_url'),
            'background_linear'      => $request->input('background_linear'),
            'background_radial'      => $request->input('background_radial'),
            'background_linear_rgba' => $request->input('background_linear_rgba'),
        ]);

        return response()->json([
            'success' => true,
            'block'   => $block,
        ]);
    }


    /**
     * Update an existing block.
     */
    public function updateBlock(Request $request, TemplateBlock $block)
    {

        if ($block->userTemplate->user_id !== Auth::id()) {
            abort(403, 'Unauthorized');
        }

        // Validate incoming data
        $request->validate([
            'html_content'           => 'nullable|string',
            'first_class'            => 'nullable|string',
            'background_type'        => 'nullable|string',
            'background_url'         => 'nullable|string',
            'background_linear'      => 'nullable|string',
            'background_radial'      => 'nullable|string',
            'background_linear_rgba' => 'nullable|string',
        ]);

        // Update only the fields that were sent
        $block->update($request->only([
            'html_content',
            'first_class', 
            'background_type',
            'background_url',
            'background_linear',
            'background_radial',
            'background_linear_rgba',
        ]));

        return response()->json([
            'success' => true,
            'block'   => $block,
        ]);
    }
    

    /**
     * Delete a block.
     */
    public function deleteBlock(TemplateBlock $block)
    {
        // Ensure the user owns the parent userTemplate
        if ($block->userTemplate->user_id !== Auth::id()) {
            abort(403, 'Unauthorized');
        }

        $block->delete();

        return response()->json([
            'success' => true
        ]);
    }
}