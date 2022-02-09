const mix = require('laravel-mix');

mix.options({
    legacyNodePolyfills: false
});

mix.js('resources/js/App.js', 'public/js')
    .react()
    .sass('resources/sass/App.scss', 'public/css');
