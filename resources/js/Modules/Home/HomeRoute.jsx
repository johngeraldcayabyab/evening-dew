import {Navigate, Routes, Route} from "react-router-dom";
import React from "react";
import manifest from "./home_manifest.json";
import {uuidv4} from "../../Helpers/string";
import Home from "./Home";

const HomeRoute = () => {
    const displayName = manifest.displayName;
    return (
        <Routes>
            <Route key={uuidv4()} path={`/`} element={<Navigate to={`/${displayName}`}/>}/>
            <Route key={uuidv4()} path={`/${displayName}`} element={<Home/>}/>
        </Routes>
    );
};

export default HomeRoute;
