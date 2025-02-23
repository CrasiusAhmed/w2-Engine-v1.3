<div class="keyframe-menu none">


    <div id="keyframe-modal" class="modal-overlay-animation none">
        <div class="modal-box-animation">
            <h3 class="m-b-10">Enter Keyframe Percent (0-100)</h3>
            <input type="number" id="keyframe-percent-input" placeholder="Keyframe Percent" class="input-number"
                style="width: auto; padding: 4px 20px;" />
            <div class="modal-actions-animation">
                <button class="btn-submit" id="confirm-keyframe">Confirm</button>
                <button class="btn-cancel" id="cancel-keyframe">Cancel</button>
            </div>
        </div>
    </div>

    <div class="flex-sb-align m-tb-10 p-lr-20 b-b-2">
        <h1>Keyframes Queries</h1>

        <div class="remove-keyframe-menu">

            <img class="small-img" src="/Icon/icons8-remove-96 (1).png" alt=""></button>
        </div>
    </div>

    <div class="custom-pad m-t-20">
        {{-- <h2>Keyframes</h2> --}}
        <!-- 1) pick which animation to edit keyframes for -->
        <div class="flex-sb-align gap10 mtb-10">
            <h1>Choose Animation</h1>

            <div class="select-wrapper" style="width: 150px">
                <select class="keyframe-animation-picker styled-select"></select>
            </div>
        </div>
        {{-- <label>Choose Animation:
            <select class="keyframe-animation-picker"></select>
        </label> --}}
        <!-- 2) a button to add keyframe -->
        <div class="flex-sb-align">
            <button class="add-keyframe-btn btn-click">+ Add Keyframe</button>
            <button class="run-animation-btn btn-click">Run Animation</button>
        </div>
        <!-- 3) a list of keyframes -->
    </div>
    <div class="keyframe-box">
        <ul class="keyframe-list"></ul>
    </div>

    <div class="custom-pad m-t-20">
        <button class="finish-keyframe-btn btn-click m-tb-10">Finish Keyframe</button>

        <!-- 4) a property editor for the selected keyframe -->
        <div class="keyframe-editor">
            <h3>Editing Keyframe: <span class="current-keyframe-label"></span></h3>
            <p>(Use normal "add-css" inputs below; they will store CSS in this keyframe’s properties)</p>
        </div>
    </div>
</div>
