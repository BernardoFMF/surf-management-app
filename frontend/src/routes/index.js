import { useRoutes, Route } from "react-router-dom";
import authRoutes from "./authRoutes"
import mainRoutes from "./mainRoutes"
import config from '../config';
import homeRoutes from "./homeRoutes";


export default function ThemeRoutes() {
    return useRoutes([homeRoutes, mainRoutes, authRoutes]);
}
