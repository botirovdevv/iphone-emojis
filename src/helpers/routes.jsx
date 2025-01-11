import Admin from "../admin/Admin";
import Home from "../pages/Home";

export const routes = [
    {
        path: "/",
        element: <Home/>
    },

    {
        path: "/admin",
        element: <Admin/>
    }
]