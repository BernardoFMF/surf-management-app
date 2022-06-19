import { useRoutes, Route } from "react-router-dom";
import authRoutes from "./authRoutes"
import mainRoutes from "./mainRoutes"
import errorRoutes from "./errorRoutes"

import homeRoutes from "./homeRoutes";


export default function Routes() {
    return useRoutes([homeRoutes, authRoutes, mainRoutes, errorRoutes]);
}
