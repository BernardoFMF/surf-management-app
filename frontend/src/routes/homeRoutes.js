import { lazy } from 'react';

import MainLayout from '../layout/mainLayout'
import Loadable from '../components/Loadable'
import RequireAuth from "../components/RequireAuth"

const HomePage = Loadable(lazy(() => import('../Pages/HomePage')))

const homeRoutes = {
    path: '/',
    element: <HomePage />,
};

export default homeRoutes;