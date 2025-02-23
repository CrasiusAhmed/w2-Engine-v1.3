<div class="animation">
    <div class="main close-f6-style m-b-20">
        <div class="flex-align gap10">
            <div class="reset-styles">
                <img class="small-img" src="/Icon/icons8-arrow-96.png" alt="">
            </div>
            <h1>Animation</h1>
        </div>
    </div>

    <div class="f13-style">

        <div id="animation-modal" class="modal-overlay-animation none">
            <div class="modal-box-animation">
                <h3 class="m-b-10">Enter Animation Name</h3>
                <input type="text" id="animation-name-input" placeholder="Animation Name" class="input-number"
                    style="width: auto; padding: 4px 20px;" />
                <div class="modal-actions-animation">
                    <button class="btn-submit" id="confirm-animation-name">Confirm</button>
                    <button class="btn-cancel" id="cancel-animation-name">Cancel</button>
                </div>
            </div>
        </div>

        <!-- Panel for listing & creating animations -->
        <div class="animation-panel m-tb-20">
            <div class="animation-list m-tb-20">
                <button class="add-animation-btn btn-click">Add Animation</button>
                <div class="animation-items"></div>
            </div>

            <!-- Editor for the currently selected animation’s main props -->
            <div class="animation-editor">

                <h3>Animation Properties</h3>

                <div class="flex-sb position-element m-tb-20">
                    <p>Name</p>

                    <div class="flex-align gap10">


                        <input type="text" class="input-number-anime anim-name-input" style="width: 109px;" placeholder="Name">
                    </div>


                </div>
                {{-- <label>Name:
                    <input type="text" class="anim-name-input" placeholder="bounce" />
                </label> --}}

                <div class="flex-sb position-element m-tb-20">
                    <p>Duration (s)</p>

                    <div class="flex-align gap10">

                        <div class="square-style-adding">
                            <p class="anim-duration-adding">S</p>
                        </div>

                        <input type="number" id="animDuration" class="input-number-anime width70px anim-duration-input" placeholder="0"
                        >
                    </div>

                </div>
                {{-- <label>Duration (s):
                    <input type="number" class="anim-duration-input" placeholder="2" />
                </label> --}}
                <div class="flex-sb position-element m-tb-20">
                    <p>Timing Function</p>

                    <div class="select-wrapper" style="width: 125px">
                        <select class="anim-timing-fn styled-select">
                            <option value="linear">linear</option>
                            <option value="ease">ease</option>
                            <option value="ease-in-out">ease-in-out</option>
                            <option value="ease-out">ease-out</option>
                        </select>
                    </div>
                </div>
                {{-- <label>Timing Function:
                    <select class="anim-timing-fn">
                        <option value="linear">linear</option>
                        <option value="ease">ease</option>
                        <option value="ease-in-out">ease-in-out</option>
                        <option value="ease-out">ease-out</option>
                    </select>
                </label> --}}
                <div class="flex-sb position-element m-tb-20">
                    <p>Iteration Count</p>

                    <div class="select-wrapper" style="width: 125px">
                        <select class="anim-iteration-input styled-select">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="infinite">infinite</option>
                        </select>
                    </div>
                </div>


                {{-- <label>Iteration Count:
                    <select class="anim-iteration-input">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="infinite">infinite</option>
                    </select>
                </label> --}}

                <div class="flex-sb position-element m-tb-20">
                    <p>Direction</p>

                    <div class="select-wrapper" style="width: 125px">
                        <select class="anim-direction-input styled-select">
                            <option value="normal">normal</option>
                            <option value="reverse">reverse</option>
                            <option value="alternate">alternate</option>
                        </select>
                    </div>
                </div>

                {{-- <label>Direction:
                    <select class="anim-direction-input">
                        <option value="normal">normal</option>
                        <option value="reverse">reverse</option>
                        <option value="alternate">alternate</option>
                    </select>
                </label> --}}

                <div class="flex-sb position-element m-tb-20">
                    <p>Delay (s)</p>

                    <div class="flex-align gap10">

                        <div class="square-style-adding">
                            <p class="anim-delay-adding">S</p>
                        </div>

                        <input type="number" id="animDelay" class="input-number-anime width70px anim-delay-input" placeholder="0"
                        >
                    </div>

                </div>

                {{-- <label>Delay (s):
                    <input type="number" class="anim-delay-input" placeholder="0" />
                </label> --}}

                <div class="flex-sb position-element m-tb-20">
                    <p>Fill Mode</p>

                    <div class="select-wrapper" style="width: 125px">
                        <select class="anim-fill-mode styled-select">
                            <option value="none">none</option>
                            <option value="forwards">forwards</option>
                            <option value="backwards">backwards</option>
                            <option value="both">both</option>
                        </select>
                    </div>
                </div>

                {{-- <label>Fill Mode:
                    <select class="anim-fill-mode">
                        <option value="none">none</option>
                        <option value="forwards">forwards</option>
                        <option value="backwards">backwards</option>
                        <option value="both">both</option>
                    </select>
                </label> --}}

                <div class="flex-sb position-element m-tb-20">
                    <p>Play State</p>

                    <div class="select-wrapper" style="width: 125px">
                        <select class="anim-play-state styled-select">
                            <option value="running">running</option>
                            <option value="paused">paused</option>
                        </select>
                    </div>
                </div>

                {{-- <label>Play State:
                    <select class="anim-play-state">
                        <option value="running">running</option>
                        <option value="paused">paused</option>
                    </select>
                </label> --}}
            </div>
        </div>




    </div>
</div>
