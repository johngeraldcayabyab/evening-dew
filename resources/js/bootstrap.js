import Echo from 'laravel-echo';
import process from 'process';

/**
 * Vite only allows es6 so require() will break the compilationg
 */
// window.Pusher = require('pusher-js');
//
// window.Echo = new Echo({
//     broadcaster: 'pusher',
//     key: process.env.MIX_PUSHER_APP_KEY,
//     cluster: process.env.MIX_PUSHER_APP_CLUSTER,
//     forceTLS: true,
//     encryption: true
// });
