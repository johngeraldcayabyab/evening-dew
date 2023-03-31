<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{{config('app.name')}}</title>
    @viteReactRefresh
    @vite(['resources/sass/App.scss', 'resources/js/App.jsx'])
</head>
<body>

<div id="root">
</div>

{{--<script type="application/javascript" src="{{ mix('/js/manifest.js') }}"></script>--}}
{{--<script type="application/javascript" src="{{ mix('/js/vendor.js') }}"></script>--}}
{{--<script type="application/javascript" src="{{ mix('/js/App.jsx') }}"></script>--}}

</body>
</html>
