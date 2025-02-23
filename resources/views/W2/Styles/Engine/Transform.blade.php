<div class="transform">
    <div class="main close-f6-style m-b-20">
        <div class="flex-align gap10">
            <div class="reset-styles">
                <img class="small-img" src="/Icon/icons8-arrow-96.png" alt="">
            </div>
            <h1>Transform</h1>
        </div>
    </div>

    <div class="f12-style">


        <div class="flex-sb height-element position-element m-tb-20">

            <p>TranslateX</p>

            <div class="flex-align gap10">
                <div class="square-style-adding">
                    <p class="translateX-adding">T</p>
                </div>

                <!-- Translate X -->
                <input type="number" class="input-number width70px" id="translateXInput" placeholder="0"
                    add-css="transform:translateX">

                <div class="select-layout s-fix2" data-unit-for="translateXInput">
                    <div value="px">PX</div>
                    <div value="%">%</div>
                    <div value="em">EM</div>
                </div>
            </div>

        </div>

        <div class="flex-sb height-element position-element m-tb-20">

            <p>TranslateY</p>

            <div class="flex-align gap10">
                <div class="square-style-adding">
                    <p class="translateY-adding">T</p>
                </div>

                <!-- Translate Y -->
                <input type="number" class="input-number width70px" id="translateYInput" placeholder="0"
                    add-css="transform:translateY">

                <div class="select-layout s-fix2" data-unit-for="translateYInput">
                    <div value="px">PX</div>
                    <div value="%">%</div>
                    <div value="em">EM</div>
                </div>
            </div>

        </div>

        {{-- <div class="flex-sb height-element position-element m-tb-20">

            <p>TranslateZ</p>

            <div class="flex-align gap10">
                <div class="square-style-adding">
                    <p class="height-adding">T</p>
                </div>

                <!-- Translate Y -->
                <input type="number" class="input-number" id="translateZInput" placeholder="0"
                    add-css="transform:translateZ">

                <div class="select-layout s-fix2" data-unit-for="translateZInput">
                    <div value="px">PX</div>
                    <div value="%">%</div>
                    <div value="em">EM</div>
                </div>
            </div>

        </div> --}}

        <div class="flex-sb height-element position-element m-tb-20">

            <p>Scale</p>

            <div class="flex-align gap10">
                <div class="square-style-adding">
                    <p class="scale-adding">S</p>
                </div>

                <!-- Translate Y -->
                <input type="number" class="input-number width70px" id="scaleInput" placeholder="0" add-css="transform:scale">

                <div class="select-layout s-fix2" data-unit-for="scaleInput">
                    {{-- <div value="empty">none</div>
                    <div value="%">%</div> --}}
                </div>
            </div>

        </div>

        <div class="flex-sb height-element position-element m-tb-20">

            <p>ScaleX</p>

            <div class="flex-align gap10">
                <div class="square-style-adding">
                    <p class="scaleX-adding">S</p>
                </div>

                <!-- Translate Y -->
                <input type="number" class="input-number width70px" id="scaleXInput" placeholder="0" add-css="transform:scaleX">

                <div class="select-layout s-fix2" data-unit-for="scaleXInput">
                    {{-- <div value="">none</div>
                    <div value="%">%</div> --}}
                </div>
            </div>

        </div>

        <div class="flex-sb height-element position-element m-tb-20">

            <p>ScaleY</p>

            <div class="flex-align gap10">
                <div class="square-style-adding">
                    <p class="scaleY-adding">S</p>
                </div>

                <!-- Translate Y -->
                <input type="number" class="input-number width70px" id="scaleYInput" placeholder="0" add-css="transform:scaleY">

                <div class="select-layout s-fix2" data-unit-for="scaleYInput">
                    {{-- <div value="">none</div>
                    <div value="%">%</div> --}}
                </div>
            </div>

        </div>

        <div class="flex-sb height-element position-element m-tb-20">

            <p>Rotate</p>

            <div class="flex-align gap10">
                <div class="square-style-adding">
                    <p class="rotate-adding">R</p>
                </div>

                <!-- Rotate -->
                <input type="number" class="input-number width70px" id="rotateInput" placeholder="0" add-css="transform:rotate">

                <div class="select-layout s-fix2" data-unit-for="rotateInput">
                    <div value="deg">DEG</div>
                    <div value="rad">RAD</div>
                </div>
            </div>

        </div>

        <div class="flex-sb height-element position-element m-tb-20">

            <p>RotateX</p>

            <div class="flex-align gap10">
                <div class="square-style-adding">
                    <p class="rotateX-adding">R</p>
                </div>

                <!-- Rotate -->
                <input type="number" class="input-number width70px" id="rotateXInput" placeholder="0"
                    add-css="transform:rotateX">

                <div class="select-layout s-fix2" data-unit-for="rotateInput">
                    <div value="deg">DEG</div>
                    <div value="rad">RAD</div>
                </div>
            </div>

        </div>

        <div class="flex-sb height-element position-element m-tb-20">

            <p>RotateY</p>

            <div class="flex-align gap10">
                <div class="square-style-adding">
                    <p class="rotateY-adding">R</p>
                </div>
                <!-- Rotate -->
                <input type="number" class="input-number width70px" id="rotateYInput" placeholder="0"
                    add-css="transform:rotateY">

                <div class="select-layout s-fix2" data-unit-for="rotateInput">
                    <div value="deg">DEG</div>
                    <div value="rad">RAD</div>
                </div>
            </div>

        </div>

        <div class="flex-sb height-element position-element m-tb-20">

            <p>SkewX</p>

            <div class="flex-align gap10">
                <div class="square-style-adding">
                    <p class="skewX-adding">S</p>
                </div>

                <!-- Rotate -->
                <input type="number" class="input-number width70px" id="skewXInput" placeholder="0"
                    add-css="transform:skewX">

                <div class="select-layout s-fix2" data-unit-for="skewXInput">
                    <div value="deg">DEG</div>
                    <div value="rad">RAD</div>
                </div>
            </div>

        </div>

        <div class="flex-sb height-element position-element m-tb-20">

            <p>SkewY</p>

            <div class="flex-align gap10">
                <div class="square-style-adding">
                    <p class="skewY-adding">S</p>
                </div>

                <!-- Rotate -->
                <input type="number" class="input-number width70px" id="skewYInput" placeholder="0"
                    add-css="transform:skewY">

                <div class="select-layout s-fix2" data-unit-for="skewYInput">
                    <div value="deg">DEG</div>
                    <div value="rad">RAD</div>
                </div>
            </div>

        </div>

        <!-- Translate -->
        {{-- <div class="translate-setting">
            <div class="flex-sb m-tb-20">
                <div class="flex-col-align gap10" style="width: 20%">
                    <img class="normal-img" src="/Icon/Horizontal-shadow.png" alt="">
                    <p>Translate</p>
                </div>
                <div class="flex-col-align gap10 position-element">

                    <div class="flex-align gap10">


                        <div class="square-style-adding">
                            <p class="max-height-adding">X</p>
                        </div>


                        <!-- X -->
                        <input type="number" class="input-number3" id="translateX1" placeholder="0"
                            data-transform-type="translate" data-axis="x" />
                        <!-- Dropdown for X axis -->
                        <div class="select-wrapper">
                            <select id="unit-translateX1" class="styled-select">
                                <option value="px">px</option>
                                <option value="%">%</option>
                            </select>
                        </div>


                    </div>





                    <div class="flex-align gap10">

                        <div class="square-style-adding">
                            <p class="max-height-adding">Y</p>
                        </div>

                        <input type="number" class="input-number3" id="translateY1" placeholder="0"
                            data-transform-type="translate" data-axis="y" />
                        <div class="select-wrapper">
                            <select id="unit-translateY1" class="styled-select">
                                <option value="px">px</option>
                                <option value="%">%</option>
                            </select>
                        </div>
                    </div>





                    <div class="flex-align gap10">

                        <div class="square-style-adding">
                            <p class="max-height-adding">Z</p>
                        </div>

                        <!-- Z -->
                        <input type="number" class="input-number3" id="translateZ1" placeholder="0"
                            data-transform-type="translate" data-axis="z" />

                        <div class="select-wrapper">
                            <select id="unit-translateZ1" class="styled-select">
                                <option value="px">px</option>
                                <option value="%">%</option>
                            </select>
                        </div>
                    </div>

                </div>
            </div>
        </div> --}}

        <!-- Scale -->
        {{-- <div class="scale-setting">
            <div class="flex-sb m-tb-20">
                <div class="flex-col-align gap10" style="width: 20%">
                    <img class="normal-img" src="/Icon/Horizontal-shadow.png" alt="">
                    <p>Scale</p>
                </div>
                <div class="flex-col-align gap10 position-element">

                    <div class="flex-align gap10">

                        <div class="square-style-adding">
                            <p class="max-height-adding">X</p>
                        </div>

                        <!-- X -->
                        <input type="number" class="input-number3" id="scaleX1" placeholder="1"
                            data-transform-type="scale" data-axis="x" />
                        <div class="select-wrapper">
                            <select id="unit-scaleX1" class="styled-select">
                                <option value="">0</option>
                                <option value="%">%</option>
                            </select>
                        </div>
                    </div>






                    <div class="flex-align gap10">

                        <div class="square-style-adding">
                            <p class="max-height-adding">Y</p>
                        </div>

                        <!-- Y -->
                        <input type="number" class="input-number3" id="scaleY1" placeholder="1"
                            data-transform-type="scale" data-axis="y" />

                        <div class="select-wrapper">
                            <select id="unit-scaleY1" class="styled-select">
                                <option value="">0</option>
                                <option value="%">%</option>
                            </select>
                        </div>
                    </div>





                    <div class="flex-align gap10">

                        <div class="square-style-adding">
                            <p class="max-height-adding">Z</p>
                        </div>

                        <!-- Z -->
                        <input type="number" class="input-number3" id="scaleZ1" placeholder="1"
                            data-transform-type="scale" data-axis="z" />

                        <div class="select-wrapper">
                            <select id="unit-scaleZ1" class="styled-select">
                                <option value="">0</option>
                                <option value="%">%</option>
                            </select>
                        </div>
                    </div>

                </div>
            </div>
        </div> --}}

        <!-- Rotate -->
        {{-- <div class="rotate-setting">
            <div class="flex-sb m-tb-20">
                <div class="flex-col-align gap10" style="width: 20%">
                    <img class="normal-img" src="/Icon/Horizontal-shadow.png" alt="">
                    <p>Rotate</p>
                </div>
                <div class="flex-col-align gap10 position-element">

                    <div class="flex-align gap10">

                        <div class="square-style-adding">
                            <p class="max-height-adding">X</p>
                        </div>

                        <!-- X -->
                        <input type="number" class="input-number3" id="rotateX1" placeholder="0"
                            data-transform-type="rotate" data-axis="x" />

                        <div class="select-wrapper">
                            <select id="unit-rotateX1" class="styled-select">
                                <option value="">0</option>
                            </select>
                        </div>
                    </div>




                    <div class="flex-align gap10">

                        <div class="square-style-adding">
                            <p class="max-height-adding">Y</p>
                        </div>

                        <!-- Y -->
                        <input type="number" class="input-number3" id="rotateY1" placeholder="0"
                            data-transform-type="rotate" data-axis="y" />
                        <div class="select-wrapper">
                            <select id="unit-rotateY1" class="styled-select">
                                <option value="">0</option>
                            </select>
                        </div>
                    </div>



                    <div class="flex-align gap10">

                        <div class="square-style-adding">
                            <p class="max-height-adding">Z</p>
                        </div>

                        <!-- Z -->
                        <input type="number" class="input-number3" id="rotateZ1" placeholder="0"
                            data-transform-type="rotate" data-axis="z" />

                        <div class="select-wrapper">
                            <select id="unit-rotateZ1" class="styled-select">
                                <option value="">0</option>
                            </select>
                        </div>
                    </div>


                    <div class="flex-align gap10">

                        <div class="square-style-adding">
                            <p class="max-height-adding">A</p>
                        </div>

                        <!-- angle -->
                        <input type="number" class="input-number3" id="rotateAngle1" placeholder="0"
                            data-transform-type="rotate" data-axis="angle" />
                        <div class="select-wrapper">
                            <select id="unit-rotateAngle1" class="styled-select">
                                <option value="deg">deg</option>
                                <option value="rad">rad</option>
                            </select>
                        </div>
                    </div>

                </div>
            </div>
        </div> --}}

        <!-- Skew -->
        {{-- <div class="skew-setting">
            <div class="flex-sb m-tb-20">
                <div class="flex-col-align gap10" style="width: 20%">
                    <img class="normal-img" src="/Icon/Horizontal-shadow.png" alt="">
                    <p>Skew</p>
                </div>
                <div class="flex-col-align gap10 position-element">

                    <div class="flex-align gap10">

                        <div class="square-style-adding">
                            <p class="max-height-adding">X</p>
                        </div>

                        <!-- X -->
                        <input type="number" class="input-number3" id="skewX1" placeholder="0"
                            data-transform-type="skew" data-axis="x" />
                        <div class="select-wrapper">
                            <select id="unit-skewX1" class="styled-select">
                                <option value="deg">deg</option>
                                <option value="rad">rad</option>
                            </select>
                        </div>
                    </div>



                    <div class="flex-align gap10">

                        <div class="square-style-adding">
                            <p class="max-height-adding">Y</p>
                        </div>

                        <!-- Y -->
                        <input type="number" class="input-number3" id="skewY1" placeholder="0"
                            data-transform-type="skew" data-axis="y" />

                        <div class="select-wrapper">
                            <select id="unit-skewY1" class="styled-select">
                                <option value="deg">deg</option>
                                <option value="rad">rad</option>
                            </select>
                        </div>
                    </div>

                </div>
            </div>
        </div> --}}





    </div>
</div>
