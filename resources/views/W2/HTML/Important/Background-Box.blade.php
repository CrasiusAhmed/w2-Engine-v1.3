<div class="background-menu none">
    <div class="padding-menu-main b-b-2">
        <div class="flex-sb-align">
            <h1 class="m-tb-5">Background</h1>

            <img class="small-img close-background-menu remove-event" src="/Icon/icons8-remove-96 (1).png" alt=""
                style="padding: 5px 10px">
        </div>

        <div class="flex-align gap10 m-tb-5">
            <p class="width40">Type</p>
            <div class="flex align-c buttons4">
                <button class="btn-menu-add active bg-setting1 bg-btn"
                    add-css="url(https://d3e54v103j8qbb.cloudfront.net/img/background-image.svg)">
                    <img class="small-img" src="/Icon/background-image.png" alt="">
                </button>

                <button class="btn-menu-add bg-setting2 bg-btn" add-css="linear-gradient(black, white)"><img
                        class="small-img" src="/Icon/linear-gredient.png" alt=""></button>
                <button class="btn-menu-add bg-setting3 bg-btn"
                    add-css="radial-gradient(circle at 50% 50%, black, white)"><img class="small-img"
                        src="/Icon/radial-gredient.png" alt=""></button>
                <button class="btn-menu-add bg-setting4 bg-btn"
                    add-css="linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))"><img class="small-img"
                        src="/Icon/background-color.png" alt=""></button>

            </div>
        </div>
    </div>



    {{-- background image --}}

    <div class="background-image">
        <div class="padding-menu b-b-2">
            <div class="flex-sb m-t-5 align-s gap10">
                <p>Image</p>


                <div class="flex-col gap5">
                    <div class="flex-align gap10">
                        <img class="img-bg image-database-change" src="/Icon/image-file.png" alt="">

                        <div class="flex-col">
                            <p class="m-b-20">background-image</p>

                            <p class="width-height-image-db">250 x 250</p>
                            <p class="m-b-10 size-image-db">3.4kb</p>
                        </div>
                    </div>

                    <div class="buttons1 m-b-5">
                        <button class="btn1 layouts choose-image-db">Choose Image</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="padding-menu m-t-5 b-b-2">
            <div class="flex-align gap10">
                <p class="width30">Size</p>
                <div class="flex align-c buttons4">
                    <button class="btn-s11 classic1 active" add-css="background-size: auto;">
                        Custom
                    </button>

                    <button class="btn-s11 classic2" add-css="background-size: cover;">
                        Cover
                    </button>
                    <button class="btn-s11 classic3 " add-css="background-size: contain;">
                        Contain
                    </button>

                </div>
            </div>

            <div class="flex-align gap10 m-tb-10">
                <p class="width30" style="opacity: 0;">ssss</p>


                <div class="flex-col-align gap5">
                    <div class="flex-sb position-element">
                        <input type="number" id="backgroundSizeX" class="input-number background-size-x width100"
                            style="height: 30px" placeholder="Auto" add-css="background-size-x">
                        <!-- Unit selector for width -->
                        <div class="select-layout" data-unit-for="backgroundSizeX">
                            <div value="px">PX</div>
                            <div value="%">%</div>
                            <div value="em">EM</div>
                            <div value="rem">REM</div>
                            <div value="vw">VW</div>
                            <div value="vh">VH</div>
                            <div value="auto">AUTO</div>
                        </div>
                    </div>
                    <p class="f-s-13">Width</p>
                </div>

                <div class="flex-col-align gap5">
                    <div class="flex-sb position-element">
                        <input type="number" id="backgroundSizeY" class="input-number background-size-y width100"
                            style="height: 30px" placeholder="Auto" add-css="background-size-y">
                        <!-- Unit selector for height -->
                        <div class="select-layout" data-unit-for="backgroundSizeY">
                            <div value="px">PX</div>
                            <div value="%">%</div>
                            <div value="em">EM</div>
                            <div value="rem">REM</div>
                            <div value="vw">VW</div>
                            <div value="vh">VH</div>
                            <div value="auto">AUTO</div>
                        </div>
                    </div>
                    <p class="f-s-13">Height</p>
                </div>
            </div>
        </div>


        <div class="padding-menu b-b-2">
            <div class="flex-sb m-tb-10 align-s gap10">
                <p class="width60">Position</p>


                <div class="flex-col gap5">
                    <div class="flex-align gap10">
                        <div class="square-six-points2" style="width: 90px; height: 40px;">
                            <div class="f1-points2 flex-btn">
                                <div class="f1-access2 active"></div>
                            </div>
                            <div class="f2-points2 flex-btn">
                                <div class="f2-access2"></div>
                            </div>
                            <div class="f3-points2 flex-btn">
                                <div class="f3-access2"></div>
                            </div>
                            <div class="f4-points2 flex-btn">
                                <div class="f4-access2"></div>
                            </div>
                            <div class="f5-points2 flex-btn">
                                <div class="f5-access2"></div>
                            </div>
                            <div class="f6-points2 flex-btn">
                                <div class="f6-access2"></div>
                            </div>
                            <div class="f7-points2 flex-btn">
                                <div class="f7-access2"></div>
                            </div>
                            <div class="f8-points2 flex-btn">
                                <div class="f8-access2"></div>
                            </div>
                            <div class="f9-points2 flex-btn">
                                <div class="f9-access2"></div>
                            </div>
                        </div>

                        <div class="flex-col-align position-r">
                            <div class="flex-sb position-element">
                                <input type="number" class="input-number width100" id="backgroundPositionX" placeholder="Auto"
                                    add-css="background-position-x">

                                <div class="select-layout s-fix" data-unit-for="backgroundPositionX">
                                    <div value="px">PX</div>
                                    <div value="%">%</div>
                                    <div value="em">EM</div>
                                    <div value="rem">REM</div>
                                    <div value="vw">VW</div>
                                    <div value="vh">VH</div>
                                    <div value="auto">AUTO</div>
                                </div>
                            </div>

                            <p class="f-s-13 p-b">Left</p>
                        </div>

                        <div class="flex-col-align position-r">
                            <div class="flex-sb position-element">
                                <input type="number" class="input-number width100" id="backgroundPositionY" placeholder="Auto"
                                    add-css="background-position-y">

                                <div class="select-layout s-fix" data-unit-for="backgroundPositionY">
                                    <div value="px">PX</div>
                                    <div value="%">%</div>
                                    <div value="em">EM</div>
                                    <div value="rem">REM</div>
                                    <div value="vw">VW</div>
                                    <div value="vh">VH</div>
                                    <div value="auto">AUTO</div>
                                </div>
                            </div>

                            <p class="f-s-13 p-b">Top</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="padding-menu">
            <div class="flex-align gap10 m-tb-5">
                <p class="width40">Title</p>
                <div class="flex align-c buttons4">

                    <button class="btn-s12 active" add-css="background-repeat: repeat;"><img class="small-img"
                            src="/Icon/solid.png" alt=""></button>
                    <button class="btn-s12" add-css="background-repeat: repeat-x;"><img class="small-img"
                            src="/Icon/dashed.png" alt=""></button>
                    <button class="btn-s12" add-css="background-repeat: repeat-y;"><img class="small-img"
                            src="/Icon/dotted.png" alt=""></button>

                    <button class="btn-s12" add-css="background-repeat: no-repeat;">
                        <img class="small-img" src="/Icon/icons8-remove-96 (1).png" alt="">
                    </button>

                </div>
            </div>

            <div class="flex-align m-t-5 gap10">
                <p class="width40">Fixed</p>
                <div class="flex align-c buttons4">
                    <button class="btn-s13 active" add-css="background-attachment: fixed;">
                        Fixed
                    </button>

                    <button class="btn-s13" add-css="background-attachment: scroll;">
                        Not Fixed
                    </button>

                </div>
            </div>
        </div>
    </div>






    {{-- linear gredient --}}

    <div class="linear-gredient none">

        <div class="padding-menu b-b-2">
            <div class="flex-sb-align m-tb-10">
                <div class="flex-align gap10">
                    <p>Angel</p>


                    <button class="btn-menu-add btn-rotate-left"><img class="small-img" src="/Icon/rotate-back.png"
                            alt=""></button>

                    <button class="btn-menu-add btn-rotate-right"><img class="small-img" src="/Icon/rotate.png"
                            alt=""></button>

                </div>

                <div class="flex-col-align gap5">
                    <div class="flex-sb position-element">
                        <input type="number" class="input-number linear-deg" style="height: 30px; width: 75px;"
                            placeholder="Auto">

                        <div class="select-layout2" style="right: 3px; top: 43%;">
                            <div>DEG</div>
                        </div>
                    </div>
                </div>
            </div>

        </div>



        <div class="padding-menu b-b-2">
            <div class="flex-col-align m-tb-10">

                <div class="line-gredient">
                    <div class="gredient-c1"></div>
                    <div class="gredient-c2"></div>
                </div>
                <div class="flex-sb-align m-tb-10 width100 gap10">
                    <div style="min-width: 275px;"></div>

                    <button class="btn-menu-reverse btn-reverse-linear"><img class="small-img"
                            src="/Icon/reverse.png" alt=""></button>
                </div>

                <div class="flex-sb-align m-tb-10 width100 gap10">
                    <div class="flex-sb width100 position-element">
                        <p>Color</p>


                        <input id="linear-gredient-color" style="width: 50%;" type="color" />

                        <div class="flex-sb position-element">
                            <input type="number" class="input-number width65 linear-back-forwards"
                                placeholder="Auto">

                            <div class="select-layout2" style="right: 3px; top: 43%;">
                                <div>%</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>



    {{-- radial gredient --}}

    <div class="radial-gredient none">

        <div class="padding-menu b-b-2">
            <div class="flex-sb m-tb-10 align-s gap10">
                <p class="width60">Position</p>


                <div class="flex-col gap5">
                    <div class="flex-align gap10">
                        <div class="square-six-points3" style="width: 90px; height: 40px;">
                            <div class="f1-points3 flex-btn">
                                <div class="f1-access3 active"></div>
                            </div>
                            <div class="f2-points3 flex-btn">
                                <div class="f2-access3"></div>
                            </div>
                            <div class="f3-points3 flex-btn">
                                <div class="f3-access3"></div>
                            </div>
                            <div class="f4-points3 flex-btn">
                                <div class="f4-access3"></div>
                            </div>
                            <div class="f5-points3 flex-btn">
                                <div class="f5-access3"></div>
                            </div>
                            <div class="f6-points3 flex-btn">
                                <div class="f6-access3"></div>
                            </div>
                            <div class="f7-points3 flex-btn">
                                <div class="f7-access3"></div>
                            </div>
                            <div class="f8-points3 flex-btn">
                                <div class="f8-access3"></div>
                            </div>
                            <div class="f9-points3 flex-btn">
                                <div class="f9-access3"></div>
                            </div>
                        </div>

                        <div class="flex-col-align position-r">
                            <div class="flex-sb position-element">
                                <input type="number" id="backgroundRadialLeft" class="input-number width100"
                                    placeholder="Auto" add-css="background-radial-left">

                                <div class="select-layout s-fix2" data-unit-for="backgroundRadialLeft">
                                    <div value="px">PX</div>
                                    <div value="%">%</div>
                                    <div value="em">EM</div>
                                    <div value="rem">REM</div>
                                    <div value="vw">VW</div>
                                    <div value="vh">VH</div>
                                </div>
                            </div>

                            <p class="f-s-13 p-b">Left</p>
                        </div>

                        <div class="flex-col-align position-r">
                            <div class="flex-sb position-element">
                                <input type="number" id="backgroundRadialTop" class="input-number width100"
                                    placeholder="Auto" add-css="background-radial-top">

                                <div class="select-layout s-fix2" data-unit-for="backgroundRadialTop">
                                    <div value="px">PX</div>
                                    <div value="%">%</div>
                                    <div value="em">EM</div>
                                    <div value="rem">REM</div>
                                    <div value="vw">VW</div>
                                    <div value="vh">VH</div>
                                </div>
                            </div>

                            <p class="f-s-13 p-b">Top</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="padding-menu m-t-5 b-b-2">
            <div class="flex-align gap10">
                <p class="width40">Type</p>
                <div class="flex align-c buttons4">
                    <button class="btn-rd-type active"
                        add-css="background-image: radial-gradient(circle closest-side at 50% 50%, black, white);">
                        <img class="small-img" src="/Icon/icons8-remove-96 (1).png" alt="">
                    </button>

                    <button class="btn-rd-type"
                        add-css="background-image: radial-gradient(circle closest-corner at 50% 50%, black, white);"><img
                            class="small-img" src="/Icon/solid.png" alt=""></button>
                    <button class="btn-rd-type"
                        add-css="background-image: radial-gradient(circle farthest-side at 50% 50%, black, white);"><img
                            class="small-img" src="/Icon/dashed.png" alt=""></button>
                    <button class="btn-rd-type" add-css="radial-gradient(circle at 50% 50%, black, white)"><img
                            class="small-img" src="/Icon/dotted.png" alt=""></button>

                </div>
            </div>
        </div>

        <div class="padding-menu b-b-2">
            <div class="flex-col-align m-tb-10">

                <div class="radial-line-gredient">
                    <div class="radial-gredient-c1"></div>
                    <div class="radial-gredient-c2"></div>
                </div>
                <div class="flex-sb-align m-tb-10 width100 gap10">
                    <div style="min-width: 275px;"></div>

                    <button class="btn-menu-reverse classic btn-reverse-radial"><img class="small-img"
                            src="/Icon/reverse.png" alt=""></button>
                </div>

                <div class="flex-sb-align m-tb-10 width100 gap10">
                    <div class="flex-sb width100 position-element">
                        <p>Color</p>


                        <input id="radial-gredient-color" style="width: 50%;" type="color" />

                        <div class="flex-sb position-element">
                            <input type="number" class="input-number width65 radial-back-forwards"
                                placeholder="Auto" add-css="">



                            <div class="select-layout2" style="right: 3px; top: 43%;">
                                <div>%</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>


    {{-- background color --}}

    <div class="background-color none">
        <div class="padding-menu">
            <div class="flex-sb-align m-tb-10 width100 gap10">
                <div class="flex-sb width100 position-element">
                    <p>Color</p>


                    <div class="input-group">
                        <!-- The color picker; note the id exactly matches our JS code -->
                        <input type="color" id="backgroundImageColor" add-css="background-image">
                        <!-- The hex input field -->
                        <input type="text" class="input-text" id="backgroundImageColoHex" placeholder="#FFFFFF"
                            pattern="^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$" add-css="background-image">
                    </div>


                </div>
            </div>
        </div>

    </div>
</div>
