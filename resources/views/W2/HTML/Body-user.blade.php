@include('W2.layouts.websiteBuilder')

@if (!empty($userHtml))
    {{-- Display the user's custom HTML content --}}
    <div id="preview-content" class="Body w2-engine-body">
        {!! $userHtml !!}

        @if (!empty($customCss))
        <style id="preview-dynamic-styles">
            {!! trim($customCss) !!}
        </style>
    @endif
    </div>
    @if (!empty($userCss))
        {{-- Inject the user's custom CSS content --}}
        <style id="dynamic-styles">
            {!! $userCss !!}
        </style>
    @endif

    {{-- Inject the user's custom hover CSS --}}
    @if (!empty($hoverCss))
        <style id="dynamic-hover-styles">
            {!! $hoverCss !!}
        </style>
    @endif
    {{-- Inject the user's custom media query CSS --}}
    @if (!empty($mediaQueries))
        <style id="dynamic-media-styles">
            {!! $mediaQueries !!}
        </style>
    @endif
    @if (!empty($keyframeCss))
        <style id="dynamic-animations">
            {!! $keyframeCss !!}
        </style>
    @endif
    @include('W2.HTML.Important.Little-Box')
    @include('W2.HTML.Important.Background-Box')
    @include('W2.HTML.Important.KeyFrame')
    @include('W2.HTML.Important.Media')
    @include('W2.HTML.Important.Hover')
    @include('W2.HTML.Important.Form')
    @include('W2.HTML.Important.Label')
    @include('W2.HTML.Important.Input')
    @include('W2.HTML.Important.Textarea')
    @include('W2.HTML.Important.Checkbox')
    @include('W2.HTML.Important.RadioButton')
    @include('W2.HTML.Important.SelectOption')
    @include('W2.HTML.Important.FormButton')
    @include('W2.HTML.Important.Text-Box')
    @include('W2.HTML.Important.Error-Message')
    @include('W2.HTML.Important.Success-Message')

    @include('W2.HTML.Important.Image-Upload')
    @include('W2.HTML.Important.Video-Upload')
@else
    <div id="preview-content" class="Body w2-engine-body">

    </div>
    @include('W2.HTML.Important.Little-Box')
    @include('W2.HTML.Important.Background-Box')
    @include('W2.HTML.Important.KeyFrame')
    @include('W2.HTML.Important.Media')
    @include('W2.HTML.Important.Form')
    @include('W2.HTML.Important.Label')
    @include('W2.HTML.Important.Input')
    @include('W2.HTML.Important.Textarea')
    @include('W2.HTML.Important.Checkbox')
    @include('W2.HTML.Important.RadioButton')
    @include('W2.HTML.Important.SelectOption')
    @include('W2.HTML.Important.FormButton')
    @include('W2.HTML.Important.Hover')
    @include('W2.HTML.Important.Text-Box')
    @include('W2.HTML.Important.Error-Message')
    @include('W2.HTML.Important.Success-Message')

    @include('W2.HTML.Important.Image-Upload')
    @include('W2.HTML.Important.Video-Upload')
@endif
