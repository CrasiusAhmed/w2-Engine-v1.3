<?php

use App\Http\Controllers\dashboardController;
use App\Http\Controllers\DatabaseController;
use App\Http\Controllers\ImageController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\W2Controller;
use App\Http\Controllers\websiteBuilderController;
use Illuminate\Support\Facades\Route;

Route::get('/', action: function () {
    return view('w2-Home');
});
Route::get('/dashboard', [dashboardController::class, 'dashboard'])->name('dashboard')->middleware(['auth']);

/* Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard'); */

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/work', [W2Controller::class, 'index']);

Route::post('/save-html-content', [websiteBuilderController::class, 'saveLayout'])
    ->middleware(['auth']);



Route::post('/create-template', [WebsiteBuilderController::class, 'createTemplate'])->middleware('auth');
Route::get('/project/{id}', [WebsiteBuilderController::class, 'showProject'])->middleware('auth');
Route::delete('/delete-template/{id}', [WebsiteBuilderController::class, 'deleteTemplate'])->middleware('auth');

// NEW routes for blocks
Route::post('/blocks/create', [WebsiteBuilderController::class, 'createBlock'])->middleware('auth');
Route::post('/blocks/{block}/update', [WebsiteBuilderController::class, 'updateBlock'])->middleware('auth');
Route::delete('/blocks/{block}', [WebsiteBuilderController::class, 'deleteBlock'])->middleware('auth');

/* Route::get('/get-layout-data', [WebsiteBuilderController::class, 'getLayoutData']);
 */
Route::post('/upload-image', [ImageController::class, 'uploadFile'])->name('upload.file');
Route::delete('/delete-image/{id}', [ImageController::class, 'deleteFile']);


Route::get('/database', [DatabaseController::class, 'showDatabase'])->name('database.show');

require __DIR__.'/auth.php';
