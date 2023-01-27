import Echo from 'laravel-echo';
import process from 'process';

window.Pusher = require('pusher-js');

window.Echo = new Echo({
    broadcaster: 'pusher',
    key: '15782bb59abeb0e94942',
    cluster: 'ap1',
    forceTLS: true,
    encryption: true
});
