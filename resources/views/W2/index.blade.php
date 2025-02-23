@extends('W2.layouts.w2')

@section('content')
    <div class="hero">



        <div class="show-html">
            <div class="menu-stackflow1">

                <div class="f1-flex">
                    <div class="box-add">
                        <img src="/Icon/add.png" alt="">
                    </div>

                    <div class="box-add2">
                        <img src="/Icon/navigator.png" alt="">
                    </div>


                    <div class="box-add4">
                        <img src="/Icon/image-file.png" alt="">
                    </div>

                    <div class="box-add5">
                        <img src="/Icon/database.png" alt="">
                    </div>

                    <div class="box-add6">
                        <img src="/Icon/laravel.png" alt="">
                    </div>
                </div>


                <div class="f2-flex">
                    <div class="box-add9">
                        <div class="import-code">
                            <img src="/Icon/download.png" alt="Open Code Menu" id="import-code-menu">
                        </div>
                    </div>
                    <div class="box-add8">
                        <div class="coding">
                            <img src="/Icon/code-icon.png" alt="Open Code Menu" id="open-code-menu">
                        </div>
                    </div>
                    <div class="box-add7">
                        <img src="/Icon/Question.png" alt="">
                    </div>



                    <div class="code-bg hidden" id="code-bg">
                        <div id="code-menu">
                            <div class="tab-menu">
                                <button id="html-tab" class="active">HTML</button>
                                <button id="css-tab">CSS</button>
                            </div>
                            <div class="editor">
                                <textarea id="html-preview" placeholder="HTML Preview"></textarea>
                                <textarea id="css-preview" placeholder="CSS Preview" class="hidden"></textarea>
                            </div>
                            <button id="download-html" class="active">Download HTML</button>
                            <button id="download-css" class="hidden">Download CSS</button>
                        </div>
                    </div>


                    <div class="import-menu" id="import-menu">
                        <div id="import-html-box" class="import-box">
                            <img src="/Icon/download.png" class="img-import" alt="">
                            <h2>Import HTML</h2>
                            <p>Drag &amp; drop your HTML file here.</p>
                        </div>
                        <div id="import-css-box" class="import-box">
                            <img src="/Icon/download.png" class="img-import" alt="">
                            <h2>Import CSS</h2>
                            <p>Drag &amp; drop your CSS file here.</p>
                        </div>
                    </div>

                </div>
            </div>

            <!-- //box-adding-html -->
            @include('W2.Elements.Element')




            <!-- //body-view-layout -->
            @include('W2.Other.layoutElement')


            <!-- //user-body-show -->
            @include('W2.HTML.Body-user')




            <!-- //styleMenu -->
            @include('W2.Styles.Style')
            <!-- //styleMenu -->
            @include('w2.styles.css')


            <!-- //setting -->


            <div class="menu-stackflow2">
                <div class="f1-flex">
                    <div class="box-second-menu">
                        <div class="logo-project">
                            <a href="{{ route('dashboard') }}">
                                <img src="/Images/w2-2.png" alt="">
                            </a>
                        </div>
                    </div>

                    <div class="box-second-menu-classic">
                        <img src="/Icon/art-icon.png" alt="">
                    </div>

                    <div class="box-second-menu-css">
                        <img src="/Icon/css.png" alt="">
                    </div>

                    <div class="box-second-menu-js">
                        <img src="/Icon/js.png" alt="">
                    </div>

                    <div class="box-second-menu-threejs">
                        <img src="/Icon/threejs.png" alt="">
                    </div>
                </div>

                <div class="f2-flex">
                    <div class="box-second-menu">
                        <img src="/Icon/eye.png" alt="" id="full-preview">
                    </div>

                    <div class="box-second-menu" id="img-full2">
                        <img src="/Icon/computer-laptop-icon.png" alt="Laptop">
                    </div>

                    <div class="box-second-menu" id="img-medium">
                        <img src="/Icon/copy-icon.png" alt="Copy">
                    </div>

                    <div class="box-second-menu2" id="img-small">
                        <img src="/Icon/cell-phone-icon.png" alt="Phone">
                    </div>


                </div>




            </div>


            {{-- <div class="important-box">

                <div class="style-customer">
                    <img src="/Icon/art-icon.png" alt="">
                </div>

                <div class="setting">
                    <img src="/Icon/js.png" alt="">
                </div>

                <div class="style-customer">
                    <img src="/Icon/threejs.png" alt="">
                </div>

                <div class="other-menu">
                    <img src="/Icon/ellipsis-v-icon.png" alt="">

                    <!-- //otherMenu -->

                    <div class="other-setting">
                        <div class="group-f1 b-group-1">
                            <div class="o-s-title">
                                <h1>View</h1>
                            </div>

                            <div class="flex-sb">
                                <div class="text-sb">
                                    <h1>Top toolbar</h1>
                                    <p>Access all block and document tools in a single place</p>
                                </div>

                            </div>

                            <div class="flex-sb">
                                <div class="text-sb">
                                    <h1>Distraction free</h1>
                                    <p>Write with calmness</p>
                                </div>

                                <h1>Ctrl+Shift+\</h1>
                            </div>

                            <div class="flex-sb">
                                <div class="text-sb">
                                    <h1>Spotlight mode</h1>
                                    <p>Focus on one block at a time</p>
                                </div>
                            </div>
                        </div>

                        <div class="group-f2 b-group-1">
                            <div class="o-s-title">
                                <h1>Editor</h1>
                            </div>

                            <div class="flex-sb">
                                <h1>Visual editor</h1>


                            </div>
                            <div class="flex-sb">
                                <h1>Code editor</h1>

                                <h1>Ctrl+Shift+Alt+M</h1>
                            </div>
                        </div>


                        <div class="group-f3 b-group-1">
                            <div class="o-s-title">
                                <h1>Plugins</h1>
                            </div>

                            <div class="flex-sb">
                                <h1>Styles</h1>


                            </div>

                        </div>

                        <div class="group-f4 b-group-1">
                            <div class="o-s-title">
                                <h1>Tools</h1>
                            </div>

                            <div class="flex-sb">
                                <h1>Keyboard shortcuts</h1>

                                <h1>Shift+Alt+H</h1>
                            </div>

                            <div class="flex-sb">
                                <h1>Copy all blocks</h1>
                            </div>
                            <div class="flex-sb">
                                <h1>Help</h1>


                            </div>

                            <div class="flex-sb">
                                <div class="text-sb">
                                    <h1>Export</h1>
                                    <p>Download your theme with updated templates and styles.</p>
                                </div>


                            </div>

                            <div class="flex-sb">
                                <h1>Welcome Guide</h1>
                            </div>
                        </div>

                        <div class="group-f5">
                            <div class="flex-sb">
                                <h1 class="m-0">Preferences</h1>
                            </div>
                        </div>
                    </div>

                    <!-- //otherMenu -->
                </div>
            </div> --}}
        </div>
    </div>



    <script>
        const selectedUnits = {};
        @if ($project->select_unit)
            const unitPairs = `{!! $project->select_unit !!}`.split(";");
            unitPairs.forEach((pair) => {
                const [key, unit] = pair.split(":");
                if (key && unit) {
                    selectedUnits[key] = unit;
                }
            });
        @endif

        console.log("[selectedUnits] Initialized:", selectedUnits);

       

        function restoreMediaQueriesFromStyles() {
            const mediaStyleTag = document.getElementById("dynamic-media-styles");
            if (!mediaStyleTag) {
                console.error("[ERROR] Missing #dynamic-media-styles");
                return;
            }

            const mediaCss = mediaStyleTag.textContent.trim();
            console.log("[DEBUG] dynamic-media-styles content on load:", mediaCss);

            try {
                const parsedQueries = JSON.parse(mediaCss);
                Object.assign(elementMediaQueries, parsedQueries); 
                console.log("[DEBUG] Successfully restored elementMediaQueries:", elementMediaQueries);

       
                const cssText = generateCssFromMediaQueries(elementMediaQueries);
                mediaStyleTag.textContent = cssText; 
                console.log("[DEBUG] Updated dynamic-media-styles content:", cssText);
            } catch (error) {
                console.error("[ERROR] Failed to parse or generate CSS:", error);
            }
        }

        function generateCssFromMediaQueries(mediaQueries) {
           
            const grouped = {};
            for (const selector in mediaQueries) {
                const queries = mediaQueries[selector];
                for (const mediaQuery in queries) {
                    if (!grouped[mediaQuery]) {
                        grouped[mediaQuery] = {};
                    }
                    
                    grouped[mediaQuery][selector] = queries[mediaQuery];
                }
            }

            let cssText = "";
            
            for (const mediaQuery in grouped) {
                cssText += `@media ${mediaQuery} {\n`;
                const selectors = grouped[mediaQuery];
                for (const selector in selectors) {
                    const props = selectors[selector];
                    
                    const propertyList = Object.entries(props)
                        .map(([prop, value]) => `        ${prop}: ${value};`)
                        .join("\n");
                    cssText += `    .${selector} {\n${propertyList}\n    }\n`;
                }
                cssText += `}\n\n`;
            }
            return cssText.trim();
        }

        
        document.addEventListener("DOMContentLoaded", restoreMediaQueriesFromStyles);


        function restoreAnimationsFromDatabase() {
            const animationStyleTag = document.getElementById("dynamic-animations");
            if (!animationStyleTag) {
                console.error("[ERROR] Missing #dynamic-animations");
                return;
            }

            // Read the content of `dynamic-animations`
            const animationCss = animationStyleTag.textContent.trim();
            console.log("[DEBUG] dynamic-animations content on load:", animationCss);

            try {
                if (animationCss) {
                    window.backendAnimations = JSON.parse(animationCss);
                    Object.assign(elementAnimations, window.backendAnimations); 
                    console.log("[DEBUG] Successfully restored elementAnimations:", elementAnimations);
                }
            } catch (error) {
                console.error("[ERROR] Failed to parse dynamic-animations content:", error);
            }
        }

        
        document.addEventListener("DOMContentLoaded", restoreAnimationsFromDatabase);




        // ++++++ last updated savePreviewContent
        const projectId = {{ $project->id }};
        const elementMediaQueries = {}; // Declare as const to define a base object
        const mediaQueries = JSON.stringify(elementMediaQueries); // Serialize as JSON
        // Merge backend-provided media queries into `elementMediaQueries`
        if (window.backendMediaQueries) {
            console.log("Backend Media Queries:", window.backendMediaQueries);
            Object.assign(elementMediaQueries, window.backendMediaQueries); // Safely merge
        }
        const elementAnimations = {};

        window.backendAnimations = @json($keyframeCss);

        const forimaData = {};
        const previewContentData = {};

        // The rest is your normal code for selected element, handleCssInput, etc.
        window.initialTemplateBlocks = @json($blocksData);



        console.log("Backend Media Queries:", @json($mediaQueries));
        window.backendMediaQueries = @json($mediaQueries);

        const outsideBoxShadowList = [];
        const insideBoxShadowList = [];
        const elementBoxShadowData = new Map();
        window.initialBoxShadows = {!! json_encode($boxShadows) !!};
        

        // Store text-shadow data for each element// Tracks the currently selected text shadow
        const elementTextShadowData = new Map(); // Stores text-shadow data for elements
        const textShadowList = [];
        window.initialTextShadows = {!! json_encode($textShadows) !!};

        function savePreviewContent() {
            const previewContent = document.getElementById("preview-content");
            const baseStyleTag = document.getElementById("dynamic-styles");
            const hoverStyleTag = document.getElementById("dynamic-hover-styles");
            const mediaStyleTag = document.getElementById("dynamic-media-styles");
            const animationStyleTag = document.getElementById("dynamic-animations");

            const htmlContent = previewContent ? previewContent.innerHTML : '';
            const cssContent = baseStyleTag ? baseStyleTag.textContent : '';
            const hoverCss = hoverStyleTag ? hoverStyleTag.textContent : '';
            const mediaQueries = JSON.stringify(elementMediaQueries); // Serialize as JSON
            const keyframeCss = JSON.stringify(elementAnimations); // Serialize animations as JSON

            const boxShadowData = {
                elementMap: Array.from(elementBoxShadowData.entries())
            };

            const textShadowData = {
                elementMap: Array.from(elementTextShadowData.entries())
            };


            console.log("[DEBUG] Sending Data:", {
                mediaQueries,
                keyframeCss,
                backgroundData
            });

            fetch("/save-html-content", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').getAttribute("content"),
                    },
                    body: JSON.stringify({
                        html_content: htmlContent,
                        css_content: cssContent,
                        hover_css: hoverCss,
                        media_queries: mediaQueries,
                        keyframe_css: keyframeCss, // ✅ Send animations
                        project_id: projectId,
                        box_shadows: JSON.stringify(boxShadowData),
                        text_shadows: JSON.stringify(textShadowData)
                    }),
                })
                .then((response) => response.json())
                .then((data) => {
                    if (data.success) {
                        console.log("[DEBUG] Layout saved successfully!");
                        displaySuccessMessage("Layout saved successfully!");
                    } else {
                        console.error("[DEBUG] Failed to save layout.");
                        displayErrorMessage("Failed to save layout. Please try again.");
                    }
                })
                .catch((error) => {
                    console.error("[DEBUG] Error saving layout:", error);
                    displayErrorMessage("An error occurred while saving. Please try again.");
                });
        }


        window.backgroundData = @json($backgroundData);
        // Global gradient state (example)
        let gradientState = {
            angle: 0,
            colors: {
                c1: '#000000',
                c2: '#ffffff'
            },
            positions: {
                c1: 0,
                c2: 100
            }
        };



        function buildBackgroundData() {
            const layers = [];
            for (const elementId in previewContentData) {
                const blocks = previewContentData[elementId];
                blocks.forEach(block => {
                    layers.push({
                        elementId: elementId,
                        uniqueClass: block.uniqueClass,
                        backgroundImage: block.backgroundImage,
                        activeButton: block.activeButton,
                        gradientState: block.gradientState,
                        radialGradientState: block.radialGradientState,
                        firstClass: block.firstClass
                    });
                });
            }
            return layers;
        }




        function displaySuccessMessage(message) {
            const successElement = document.querySelector('.success-message');
            const successText = successElement.querySelector('h1:nth-of-type(2)');
            successText.innerText = message;
            successElement.classList.remove('none');

            setTimeout(() => {
                successElement.classList.add('none');
            }, 5000);
        }

        function displayErrorMessage(message) {
            const errorElement = document.querySelector('.error-message');
            errorElement.querySelector('.error-text').innerText = message;
            errorElement.classList.remove('none'); 

            setTimeout(() => {
                errorElement.classList.add('none'); 
            }, 5000);
        }
    </script>
@endsection
