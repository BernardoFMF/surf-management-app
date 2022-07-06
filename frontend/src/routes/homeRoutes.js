import { lazy } from 'react';

import Loadable from '../components/Loadable'

const HomePage = Loadable(lazy(() => import('../Pages/HomePage')))

const homeRoutes = {
    path: '/',
    element: <HomePage/>
};

export default homeRoutes;