import '../css/App.scss';

import Echo from "laravel-echo";

window.io = require('socket.io-client');

window.Echo = new Echo({
    broadcaster: 'socket.io',
    host: window.location.hostname + ':6001' // this is laravel-echo-server host
});
