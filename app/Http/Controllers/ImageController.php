<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Models\Image;
use Illuminate\Support\Facades\Auth;

class ImageController extends Controller
{

    public function uploadFile(Request $request)
    {
        $request->validate([
            'file' => 'required|file|max:10240|mimes:jpeg,png,jpg,gif,mp4,mp3', // Specify allowed formats
        ]);

        $file = $request->file('file');
        $mimeType = $file->getMimeType();
        $type = '';

        if (str_contains($mimeType, 'image')) {
            $type = 'image';
        } elseif (str_contains($mimeType, 'video')) {
            $type = 'video';
        } elseif (str_contains($mimeType, 'audio')) {
            $type = 'audio';
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Unsupported file type.',
            ]);
        }

        $path = $file->store('uploads', 'public');
        $fileRecord = Image::create([
            'path' => $path,
            'name' => $file->getClientOriginalName(),
            'size' => $file->getSize(),
            'type' => $type,
        ]);

        return response()->json([
            'success' => true,
            'fileId' => $fileRecord->id,
            'fileUrl' => asset('storage/' . $path),
            'fileName' => $fileRecord->name,
            'fileSize' => $fileRecord->size,
            'fileType' => $fileRecord->type,
        ]);
    }

    public function deleteFile($id)
    {
        $file = Image::find($id);
    
        if ($file) {
            Storage::disk('public')->delete($file->path);
            $file->delete();
    
            return response()->json(['success' => true]);
        }
    
        return response()->json(['success' => false, 'message' => 'File not found.']);
    }
}
