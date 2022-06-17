import { useRoutes, Route } from "react-router-dom";
import authRoutes from "./authRoutes"
import mainRoutes from "./mainRoutes"
import errorRoutes from "./errorRoutes"

import config from '../config';
import homeRoutes from "./homeRoutes";


export default function ThemeRoutes() {
    return useRoutes([homeRoutes, authRoutes, mainRoutes, errorRoutes]);
}
