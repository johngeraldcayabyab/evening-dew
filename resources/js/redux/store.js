// store.js
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slice';

const store = configureStore({
    reducer: {
        counter: counterReducer
    }
});

export default store;
