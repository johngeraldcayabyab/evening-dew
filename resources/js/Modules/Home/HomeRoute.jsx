import {Navigate, Route} from "react-router-dom";
import React from "react";
import manifest from "./home_manifest.json";
import Home from "./Home";

const HomeRoute = () => {
    const displayName = manifest.displayName;
    return (
        <>
            <Route key={'root'} path={`/`} element={<Navigate to={`/${displayName}`}/>}/>
            <Route key={'/home'} path={`/${displayName}`} element={<Home/>}/>
        </>
    );
};

export default HomeRoute;
