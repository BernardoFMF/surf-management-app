import { lazy } from 'react';

// project imports
import Loadable from '../components/Loadable'
import MinimalLayout from '../layout/minimalLayout/index'

const Unauthorized = Loadable(lazy(() => import('../Pages/error/Unauthorized')))

const authRoutes = {
    path: '/',
    element: <MinimalLayout />,
    children: [
        {
            path: '/unauthorized',
            element: <Unauthorized />
        }
    ]
};

export default authRoutes;