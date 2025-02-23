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
        Schema::create('template_blocks', function (Blueprint $table) {
            $table->id();

            $table->foreignId('user_template_id')->constrained()->onDelete('cascade');
        
    
            $table->string('unique_class')->nullable();
        
            $table->longText('html_content')->nullable();
        
            $table->string('background_type')->nullable();

            $table->string('first_class')->nullable();
        
            $table->longText('background_url')->nullable();          // e.g. url("...") 
            $table->longText('background_linear')->nullable();       // e.g. linear-gradient(...)
            $table->longText('background_radial')->nullable();       // e.g. radial-gradient(...)
            $table->longText('background_linear_rgba')->nullable();  // e.g. linear-gradient(rgba(...))
        
        
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('template_blocks');
    }
};
