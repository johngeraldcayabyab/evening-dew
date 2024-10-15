import "../sass/App.scss";
import './bootstrap.js';
import React, {useState} from 'react';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import {getCookie} from "./Helpers/cookie";
import ContentContainer from './Components/ContentContainter';
import {AppContextProvider} from "./Contexts/AppContext";
import {createRoot} from 'react-dom/client';
import ErrorPage from "./Error";
import {generateRoutesFromManifests} from "./RoutesManifest"
import {Provider} from "react-redux"
import store from './redux/store'


const App = () => {
    const [appState, setAppState] = useState({
        isLogin: getCookie('Authorization'),
        userEmail: getCookie('userEmail'),
        appInitialLoad: true,
        user: {},
        globalSettings: {}
    });

    const routes = generateRoutesFromManifests();

    const router = createBrowserRouter([{
        element: <ContentContainer/>,
        errorElement: <ErrorPage/>,
        children: routes
    }]);

    return (
        <AppContextProvider
            value={{
                appState: appState,
                setAppState: setAppState
            }}
        >
            <RouterProvider router={router}/>
        </AppContextProvider>
    )
};


let container = null;
document.addEventListener('DOMContentLoaded', function (event) {
    if (!container) {
        container = document.getElementById('root');
        const root = createRoot(container)
        root.render(
            <Provider store={store}>
                <App/>
            </Provider>
        );
    }
});
