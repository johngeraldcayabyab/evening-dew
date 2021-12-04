import '../css/App.scss';

import Echo from 'laravel-echo';

window.Pusher = require('pusher-js');

console.log(process.env.MIX_PUSHER_APP_KEY);

console.log('egg');

window.Echo = new Echo({
    broadcaster: 'pusher',
    key: "123",
    cluster: "123",
    forceTLS: true
});
