import manifests from './Manifests';
import Home from "./Modules/Home/Home"
import Login from "./Modules/Login/Login"
import TableGenerator from "./Components/TableAndKanban/TableGenerator"
import FormGenerator from "./Components/Form/FormGenerator"
import {HAS_FORM_CREATE, HAS_FORM_UPDATE, HAS_TABLE} from "./consts"

export const generateRoutesFromManifests = () => {
    const routes = [
        {path: "/", element: <Home/>},
        {path: "/login", element: <Login/>},
        {path: "/home", element: <Home/>},
    ];

    manifests.forEach(manifest => {
        const manifestRoutes = manifest.routes;
        const children = [];

        if (manifestRoutes.includes(HAS_TABLE)) {
            children.push({
                index: true,
                key: `${manifest.moduleName}-${manifest.displayName}`,
                element: <TableGenerator {...manifest} />,
            });
        }

        if (manifestRoutes.includes(HAS_FORM_CREATE)) {
            children.push({
                path: "create",
                element: <FormGenerator {...manifest} />,
            });
        }

        if (manifestRoutes.includes(HAS_FORM_UPDATE)) {
            children.push({
                path: ":id",
                element: <FormGenerator {...manifest} />,
            });
        }

        if (children.length) {
            routes.push({
                key: `${manifest.moduleName}-${manifest.displayName}`,
                path: `/${manifest.displayName}`,
                children
            });
        }
    });

    return routes;
}
