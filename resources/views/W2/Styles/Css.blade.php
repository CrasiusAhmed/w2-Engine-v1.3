<div class="css-menu none">
    <div class="devtools-header">Mini DevTools</div>

    <div class="section-custom1">
      <h3 class="m-b-10">HTML</h3>
      <textarea class="textarea-design" id="htmlDisplay"></textarea>
    </div>

    <div class="section-custom2">
      <h3 class="m-b-10">CSS Rules</h3>
      <!-- A regular textarea. We'll add mouse-listeners to do numeric drag. -->
      <textarea class="textarea-design" id="cssDisplay"></textarea>
      {{-- <button id="applyCssBtn">Apply CSS</button> --}}

      <div id="suggestionContainer" class="suggestion-container"></div>
    </div>
    
    <div class="section-custom3" id="resizeDemo">
      <h3>Resize Demo</h3>
      <p class="hint">Drag handle below to resize selected element (width).</p>
      <div class="resizer" id="widthResizer"></div>
    </div>
</div>
