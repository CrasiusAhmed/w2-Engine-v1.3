<div class="background">
    <div class="backdrop" data-picker-id="2"></div>
    <div class="main close-f6-style m-b-20">
        <div class="flex-align gap10">
            <div class="reset-styles">
                <img class="small-img" src="/Icon/icons8-arrow-96.png" alt="">
            </div>
            <h1>Background</h1>
        </div>
    </div>



    <div class="f6-style">



        <div class="flex-sb-align m-b-20 background-style">
            <p>Image & Gredient</p>

            <img class="small-img" src="/Icon/add.png" alt="">
        </div>


            @foreach ($blocks as $block)
            <div class="server-block"
            data-block-id="{{ $block->id }}"
            data-unique-class="{{ strtolower($block->unique_class) }}"
            data-first-class="{{ strtolower($block->first_class) }}"
            data-background-type="{{ $block->background_type }}"
            data-background-linear="{{ $block->background_linear }}"
            data-background-url="{{ $block->background_url }}"
            data-background-radial="{{ $block->background_radial }}"
            data-background-linear-rgba="{{ $block->background_linear_rgba }}"
       >
           {!! $block->html_content !!}
       </div>
            @endforeach



        <div class="flex-sb-align">
            <p style="width: 21%">Color</p>


            <div class="flex-align gap5">
                <!-- Color picker -->
                <input type="color" id="backgroundColorInput" add-css="background-color" class="input-color">
                <!-- HEX input -->

                <input type="text" class="input-classic" id="backgroundColorHex" placeholder="#FFFFFF"
                    pattern="^#+([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$" add-css="background-color">
            </div>
        </div>


        <div class="flex-sb-align gap10 m-tb-10">
            <p>Cliping</p>

            <div class="flex-sb-align select-position-add position-r w-mw">
                <h1 id="currentWeight4">None</h1>

                <img class="small-img" src="/Icon/arrow-down.png" alt="">
                <div class="position-css-add">
                    <h1 class="d-explain clip-choice" data-description="1" add-css-button="background-clip: border-box;">None</h1>
                    <h1 class="d-explain clip-choice" data-description="2" add-css-button="background-clip: padding-box;">Clip
                        Background To Padding</h1>
                    <h1 class="d-explain clip-choice" data-description="3" add-css-button="background-clip: content-box;">Clip
                        Background To Content</h1>
                    <h1 class="d-explain clip-choice" data-description="4" add-css-button="background-clip: text;">Clip
                        Background
                        To Text</h1>

                    <div class="description-css">
                        <p>None wont clip the background, meaning any background added will extend all the way to the
                            elements boundry.</p>

                        <p>Clip Background To Padding clips background to the inside of the elements border, including
                            any padding added to the element.</p>

                        <p>Clip Background To Content clip background to the edges of content excluding add any padding
                            added to the element.</p>

                        <p>Clip Background To Text will override font color, filling text with background color, image,
                            gredient, and overlay properties.</p>

                    </div>
                </div>
            </div>

        </div>

















    </div>





</div>
