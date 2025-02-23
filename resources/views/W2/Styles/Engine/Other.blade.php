<div class="other">
    <div class="backdrop" data-picker-id="4"></div>
    <div class="main close-f8-style m-b-20">
        <div class="flex-align gap10">
            <div class="reset-styles">
                <img class="small-img" src="/Icon/icons8-arrow-96.png" alt="">
            </div>
            <h1>Effect</h1>
        </div>
    </div>

    <div class="f8-style">

        <div class="flex-sb-align gap10 m-b-10">
            <p>Bleding</p>

            <div class="flex-sb-align select-position-add position-r">
                <div id="currentWeight5">Normal</div>

                <img class="small-img" src="/Icon/arrow-down.png" alt="">

                <div class="position-css-add simple-size">
                    <h1 class="blending-choice" add-css-button="mix-blend-mode: normal;">Normal</h1>
                    <h1 class="blending-choice" add-css-button="mix-blend-mode: darken;">Darken</h1>
                    <h1 class="blending-choice" add-css-button="mix-blend-mode: multiply;">Multiply</h1>
                    <h1 class="blending-choice" add-css-button="mix-blend-mode: color-burn;">Color Burn</h1>
                    <h1 class="blending-choice" add-css-button="mix-blend-mode: lighten;">Lighten</h1>
                    <h1 class="blending-choice" add-css-button="mix-blend-mode: screen;">Screen</h1>
                    <h1 class="blending-choice" add-css-button="mix-blend-mode: color-dodge;">Color Dodge</h1>
                    <h1 class="blending-choice" add-css-button="mix-blend-mode: overlay;">Overlay</h1>
                    <h1 class="blending-choice" add-css-button="mix-blend-mode: soft-light;">Soft Light</h1>
                    <h1 class="blending-choice" add-css-button="mix-blend-mode: hard-light;">Hard Light</h1>
                    <h1 class="blending-choice" add-css-button="mix-blend-mode: difference;">Difference</h1>
                    <h1 class="blending-choice" add-css-button="mix-blend-mode: exclusion;">Exclusion</h1>
                    <h1 class="blending-choice" add-css-button="mix-blend-mode: hue;">Hue</h1>
                    <h1 class="blending-choice" add-css-button="mix-blend-mode: saturation;">Saturation</h1>
                    <h1 class="blending-choice" add-css-button="mix-blend-mode: color;">Color</h1>
                    <h1 class="blending-choice" add-css-button="mix-blend-mode: luminosity;">Luminosity</h1>
                </div>
            </div>
        </div>

        <div class="flex gap10 m-b-10" id="opacity-container">
            <div class="flex-align gap10 width100">
                <img class="normal-img" src="/Icon/opacity.png" alt="">
                <p>Opacity</p>
            </div>


            <div class="flex-sb position-element">
                <input type="number" class="input-number width65" id="opacityInput" min="0" max="100"
                    placeholder="Auto" add-css="opacity">

                <div class="select-layout s-fix" data-unit-for="opacityInput">
                    <span class="unit-display">%</span>

                </div>
            </div>
        </div>

        <div class="flex-sb-align gap10 m-b-10">
            <p>Cursor</p>



            <div class="flex-sb-align select-position-add position-r">
                <div id="currentWeight6">Auto</div>

                <img class="small-img" src="/Icon/arrow-down.png" alt="">

                <div class="position-css-add simple-size">
                    <h1 class="cursor-choice" add-css-button="cursor: auto;">Auto</h1>
                    <h1 class="cursor-choice" add-css-button="cursor: none;">None</h1>
                    <h1 class="cursor-choice" add-css-button="cursor: pointer;">Pointer</h1>
                    <h1 class="cursor-choice" add-css-button="cursor: grab;">Grab</h1>
                    <h1 class="cursor-choice" add-css-button="cursor: grabbing;">Grabbing</h1>
                    <h1 class="cursor-choice" add-css-button="cursor: move;">Move</h1>
                    <h1 class="cursor-choice" add-css-button="cursor: wait;">Wait</h1>
                    <h1 class="cursor-choice" add-css-button="cursor: help;">Help</h1>
                </div>
            </div>
        </div>

        <div class="flex-sb-align gap10 m-b-10">
            <p>Events</p>

            <div class="flex buttons4">
                <button class="btn-s10 active" add-css="pointer-events: auto;">Auto</button>
                <button class="btn-s10" add-css="pointer-events: none;">None</button>
            </div>
        </div>


        <div class="flex-align gap10 m-tb-10 p-t-20 b-t-2">
            <p class="width30">Outline</p>
            <div class="flex align-c buttons4">
                <button class="btn-s8 classic-simple" add-css="remove: outline-style">
                    <img class="normal-img" src="/Icon/icons8-remove-96 (1).png" alt="">
                </button>

                <button class="btn-s8 classic" add-css="outline-style: solid;"><img class="normal-img"
                        src="/Icon/solid.png" alt=""></button>
                <button class="btn-s8 classic" add-css="outline-style: dashed;"><img class="normal-img"
                        src="/Icon/dashed.png" alt=""></button>
                <button class="btn-s8 classic" add-css="outline-style: dotted;"><img class="normal-img"
                        src="/Icon/dotted.png" alt=""></button>

            </div>
        </div>

        <div class="flex-sb position-element m-tb-20">
            <p>Width</p>

            <div class="flex-align gap10">

                <div class="square-style-adding">
                    <p class="outline-width-adding">W</p>
                </div>

                <input type="number" class="input-number width70px" id="outlineWidthInput" placeholder="None"
                    add-css="outline-width">

                <div class="select-layout s-fix" data-unit-for="outlineWidthInput">
                    <div value="px">PX</div>
                    <div value="%">%</div>
                    <div value="em">EM</div>
                    <div value="rem">REM</div>
                    <div value="vw">VW</div>
                    <div value="vh">VH</div>
                    <div value="auto">AUTO</div>
                </div>
            </div>


        </div>
        <div class="flex-sb position-element m-tb-20">
            <p>Offset</p>

            <div class="flex-align gap10">

                <div class="square-style-adding">
                    <p class="outline-offset-adding">O</p>
                </div>

                <input type="number" class="input-number width70px" id="outlineOffsetInput" placeholder="None"
                    add-css="outline-offset">

                <div class="select-layout s-fix" data-unit-for="outlineOffsetInput">
                    <div value="px">PX</div>
                    <div value="%">%</div>
                    <div value="em">EM</div>
                    <div value="rem">REM</div>
                    <div value="vw">VW</div>
                    <div value="vh">VH</div>
                    <div value="auto">AUTO</div>
                </div>
            </div>

        </div>


        <div class="flex-sb-align m-tb-10 b-b-2 p-b-20 position-r">
            <p style="width: 21%">Color</p>


            <div class="flex-align gap5">
                <!-- Color picker -->
                <!-- Outline Color -->
                <input type="color" id="outlineColorInput" add-css="outline-color" class="input-color">
                <input type="text" class="input-classic" id="outlineColorHex" placeholder="#FFFFFF"
                    pattern="^#+([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$" add-css="outline-color">
            </div>
        </div>

        {{--   <div class="flex-sb-align gap10 m-tb-10 b-b-2 p-b-20 position-r">
            <p>Color</p>



            <div class="color-picker" data-picker-id="4">
                <!-- The clickable box for inputting color in hex format -->
                <input type="text" class="hex-color4 w-mw-color p-l-im" placeholder="Auto"
                    add-css="outline-color">
                <div class="color-box">Color</div>

                <!-- The color picker UI -->
                <div class="color-picker-ui" id="picker-ui-4" data-picker-id="4" Z-id="hex-color4">
                    <!-- The color selection area (big div) -->
                    <div class="color-display" id="color-display4" Z-id="hex-color4">
                        <!-- Circle for selecting color in the big div -->
                        <div class="color-display-circle" id="color-display-circle" Z-id="hex-color4"></div>
                    </div>

                    <!-- The hue slider (line) -->
                    <div class="hue-slider">
                        <div class="slider-bar" id="hue-bar" Z-id="hex-color4"></div>
                        <div class="slider-circle" id="hue-circle" Z-id="hex-color4"></div>
                    </div>

                    <!-- The opacity slider -->
                    <div class="opacity-slider">
                        <div class="slider-bar" id="opacity-bar" Z-id="hex-color4"></div>
                        <div class="slider-circle" id="opacity-circle" Z-id="hex-color4"></div>
                    </div>

                    <!-- Secondary input field for color -->
                    <input type="text" class="hex-color4 w-mw m-t-20" placeholder="Auto" add-css="outline-color">
                </div>
            </div>
        </div> --}}

        {{-- <div class="flex-sb-align gap10 m-tb-10 b-b-2 p-b-20 position-r">
            <p>Color</p>



            <div class="color-picker" data-picker-id="4">
                <!-- The clickable box -->
                <input type="text" class="hex-color w-mw-color p-l-im" value="#ff0000ff" change-color="color-picker-4" placeholder="Auto" add-css="outline-color">
                <div class="color-box">Color</div>
            
                <!-- The color picker UI -->
                <div class="color-picker-ui" id="picker-ui-4" style="display:none;" change-color="color-picker-4">
                    <!-- The color selection area (big div) -->
                    <div class="color-display" id="color-display" change-color="color-picker-4">
                        <!-- Circle for selecting color in the big div -->
                        <div class="color-display-circle" id="color-display-circle"></div>
                    </div>
            
                    <!-- The hue slider (line) with change-color attribute -->
                    <div class="hue-slider" change-color="color-picker-4">
                        <div class="slider-bar" id="hue-bar"></div>
                        <div class="slider-circle" id="hue-circle"></div>
                    </div>
            
                    <!-- The opacity slider with change-color attribute -->
                    <div class="opacity-slider" change-color="color-picker-4">
                        <div class="slider-bar" id="opacity-bar"></div>
                        <div class="slider-circle" id="opacity-circle"></div>
                    </div>
                </div>
            
                    <!-- Secondary hex input for background color, also with change-color attribute -->
                    <input type="text" class="hex-color w-mw m-t-20" value="#ff0000ff" maxlength="9"
                           add-css="outline-color" change-color="color-picker-4" />
            </div>
        </div> --}}



        <div class="flex-col m-b-10 b-b-2 p-b-20 position-r">
            <h3 class="m-tb-10">Filters</h3>



            <div class="flex-sb position-element m-tb-10">
                <p>Blur</p>
                <div class="flex-align gap10">
    
                    <div class="square-style-adding">
                        <p class="blur-adding">B</p>
                    </div>
    
                    <input type="number" class="input-number width70px" id="filterBlurInput" placeholder="None"
                        add-css="filter: blur">
    
                    <div class="select-layout s-fix" data-unit-for="filterBlurInput">
                        <div value="px">px</div>
                    </div>
                </div>
            </div>

            <div class="flex-sb position-element m-tb-10">
                <p>Brightness</p>
                <div class="flex-align gap10">
    
                    <div class="square-style-adding">
                        <p class="brightness-adding">B</p>
                    </div>
    
                    <input type="number" class="input-number width70px" id="filterbrightnessInput" min="0" value="100%" placeholder="None"
                        add-css="filter: brightness">
    
                    <div class="select-layout s-fix" data-unit-for="filterBrightnessInput">
                        <div value="%">%</div>
                    </div>
                </div>
            </div>

            <div class="flex-sb position-element m-tb-10">
                <p>Contrast</p>
                <div class="flex-align gap10">
    
                    <div class="square-style-adding">
                        <p class="contrast-adding">C</p>
                    </div>
    
                    <input type="number" class="input-number width70px" id="filterContrastInput" placeholder="None"
                        add-css="filter: contrast">
    
                    <div class="select-layout s-fix" data-unit-for="filterContrastInput">
                        <div value="%">%</div>
                    </div>
                </div>
            </div>

            <div class="flex-sb position-element m-tb-10">
                <p>Hue Rotate</p>
                <div class="flex-align gap10">
    
                    <div class="square-style-adding">
                        <p class="hue-rotate-adding">H</p>
                    </div>
    
                    <input type="number" class="input-number width70px" id="filterHueRotateInput" placeholder="None"
                        add-css="filter: hue-rotate">
    
                    <div class="select-layout s-fix" data-unit-for="filterHueRotateInput">
                        <div value="deg">deg</div>
                    </div>
                </div>
            </div>

            <div class="flex-sb position-element m-tb-10">
                <p>Saturate</p>
                <div class="flex-align gap10">
    
                    <div class="square-style-adding">
                        <p class="saturate-adding">S</p>
                    </div>
    
                    <input type="number" class="input-number width70px" id="filterSaturateInput" placeholder="None"
                        add-css="filter: saturate">
    
                    <div class="select-layout s-fix" data-unit-for="filterSaturateInput">
                        <div value="%">%</div>
                    </div>
                </div>
            </div>

            <div class="flex-sb position-element m-tb-10">
                <p>Grayscale</p>
                <div class="flex-align gap10">
    
                    <div class="square-style-adding">
                        <p class="grayscale-adding">G</p>
                    </div>
    
                    <input type="number" class="input-number width70px" id="filterGrayscaleInput" placeholder="None"
                        add-css="filter: grayscale">
    
                    <div class="select-layout s-fix" data-unit-for="filterGrayscaleInput">
                        <div value="%">%</div>
                    </div>
                </div>
            </div>

            <div class="flex-sb position-element m-tb-10">
                <p>Invert</p>
                <div class="flex-align gap10">
    
                    <div class="square-style-adding">
                        <p class="invert-adding">I</p>
                    </div>
    
                    <input type="number" class="input-number width70px" id="filterInvertInput" placeholder="None"
                        add-css="filter: invert">
    
                    <div class="select-layout s-fix" data-unit-for="filterInvertInput">
                        <div value="%">%</div>
                    </div>
                </div>
            </div>

            <div class="flex-sb position-element m-tb-10">
                <p>Sepia</p>
                <div class="flex-align gap10">
    
                    <div class="square-style-adding">
                        <p class="sepia-adding">S</p>
                    </div>
    
                    <input type="number" class="input-number width70px" id="filterSepiaInput" placeholder="None"
                        add-css="filter: sepia">
    
                    <div class="select-layout s-fix" data-unit-for="filterSepiaInput">
                        <div value="%">%</div>
                    </div>
                </div>
            </div>
        </div>


        <div class="flex-col m-b-10 p-b-20 position-r">
            <h3 class="m-tb-10">Backdrop Filter</h3>



            <div class="flex-sb position-element m-tb-10">
                <p>Blur</p>
                <div class="flex-align gap10">
    
                    <div class="square-style-adding">
                        <p class="blur-adding2">B</p>
                    </div>
    
                    <input type="number" class="input-number width70px" id="backdropFilterBlurInput" placeholder="None"
                        add-css="backdrop-filter: blur">
    
                    <div class="select-layout s-fix" data-unit-for="backdropFilterBlurInput">
                        <div value="px">px</div>
                    </div>
                </div>
            </div>

            <div class="flex-sb position-element m-tb-10">
                <p>Brightness</p>
                <div class="flex-align gap10">
    
                    <div class="square-style-adding">
                        <p class="brightness-adding2">B</p>
                    </div>
    
                    <input type="number" class="input-number width70px" id="backdropFilterbrightnessInput" placeholder="None"
                        add-css="backdrop-filter: brightness">
    
                    <div class="select-layout s-fix" data-unit-for="backdropFilterBrightnessInput">
                        <div value="%">%</div>
                    </div>
                </div>
            </div>

            <div class="flex-sb position-element m-tb-10">
                <p>Contrast</p>
                <div class="flex-align gap10">
    
                    <div class="square-style-adding">
                        <p class="contrast-adding2">C</p>
                    </div>
    
                    <input type="number" class="input-number width70px" id="backdropFilterContrastInput" placeholder="None"
                        add-css="backdrop-filter: contrast">
    
                    <div class="select-layout s-fix" data-unit-for="backdropFilterContrastInput">
                        <div value="%">%</div>
                    </div>
                </div>
            </div>

            <div class="flex-sb position-element m-tb-10">
                <p>Hue Rotate</p>
                <div class="flex-align gap10">
    
                    <div class="square-style-adding">
                        <p class="hue-rotate-adding2">H</p>
                    </div>
    
                    <input type="number" class="input-number width70px" id="backdropFilterHueRotateInput" placeholder="None"
                        add-css="backdrop-filter: hue-rotate">
    
                    <div class="select-layout s-fix" data-unit-for="backdropFilterHueRotateInput">
                        <div value="deg">deg</div>
                    </div>
                </div>
            </div>

            <div class="flex-sb position-element m-tb-10">
                <p>Saturate</p>
                <div class="flex-align gap10">
    
                    <div class="square-style-adding">
                        <p class="saturate-adding2">S</p>
                    </div>
    
                    <input type="number" class="input-number width70px" id="backdropFilterSaturateInput" placeholder="None"
                        add-css="backdrop-filter: saturate">
    
                    <div class="select-layout s-fix" data-unit-for="backdropFilterSaturateInput">
                        <div value="%">%</div>
                    </div>
                </div>
            </div>

            <div class="flex-sb position-element m-tb-10">
                <p>Grayscale</p>
                <div class="flex-align gap10">
    
                    <div class="square-style-adding">
                        <p class="grayscale-adding2">G</p>
                    </div>
    
                    <input type="number" class="input-number width70px" id="backdropFilterGrayscaleInput" placeholder="None"
                        add-css="backdrop-filter: grayscale">
    
                    <div class="select-layout s-fix" data-unit-for="backdropFilterGrayscaleInput">
                        <div value="%">%</div>
                    </div>
                </div>
            </div>

            <div class="flex-sb position-element m-tb-10">
                <p>Invert</p>
                <div class="flex-align gap10">
    
                    <div class="square-style-adding">
                        <p class="invert-adding2">I</p>
                    </div>
    
                    <input type="number" class="input-number width70px" id="backdropFilterInvertInput" placeholder="None"
                        add-css="backdrop-filter: invert">
    
                    <div class="select-layout s-fix" data-unit-for="backdropFilterInvertInput">
                        <div value="%">%</div>
                    </div>
                </div>
            </div>

            <div class="flex-sb position-element m-tb-10">
                <p>Sepia</p>
                <div class="flex-align gap10">
    
                    <div class="square-style-adding">
                        <p class="sepia-adding2">S</p>
                    </div>
    
                    <input type="number" class="input-number width70px" id="backdropFilterSepiaInput" placeholder="None"
                        add-css="backdrop-filter: sepia">
    
                    <div class="select-layout s-fix" data-unit-for="backdropFilterSepiaInput">
                        <div value="%">%</div>
                    </div>
                </div>
            </div>
        </div>

        


    </div>



    
</div>
