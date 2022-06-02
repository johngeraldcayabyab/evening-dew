const mix = require('laravel-mix');

mix.options({
    legacyNodePolyfills: false
});

mix.sass('resources/sass/App.scss', 'public/css');

mix.js('resources/js/App.js', 'public/js')
    .react()
    .extract([
        'react',
        'react-router',
        'react-dom',
        'react-router-dom',
        'moment',
        'antd',
        '@ant-design/icons'
    ]).version();

if (mix.inProduction()) {
    mix.disableNotifications();
}
