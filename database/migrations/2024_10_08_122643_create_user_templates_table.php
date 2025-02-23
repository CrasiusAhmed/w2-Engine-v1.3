<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('user_templates', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->text('html_content')->nullable(); 
            $table->longText('css_content')->nullable(); 
            $table->longText('hover_css')->nullable(); 
            $table->longText('keyframe_css')->nullable(); 
            $table->longText('media_queries')->nullable(); 
            $table->longText('select_unit')->nullable(); 
            $table->string('project_name')->nullable(); 
            $table->longText('background_data')->nullable();
            $table->json('box_shadows')->nullable(); 
            $table->json('text_shadows')->nullable(); 
            $table->boolean('is_custom')->default(false); 
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_templates');
    }
};
