import { lazy } from 'react';

// project imports
import Loadable from '../components/Loadable'
import MinimalLayout from '../layout/minimalLayout/index'

const AuthLogin = Loadable(lazy(() => import('../Pages/auth/SignInPage')))
const AuthRegister = Loadable(lazy(() => import('../Pages/auth/SignUpPage')))

const authRoutes = {
    path: '/',
    element: <MinimalLayout />,
    children: [
        {
            path: '/sign-in',
            element: <AuthLogin />
        },
        {
            path: '/sign-up',
            element: <AuthRegister />
        }
    ]
};

export default authRoutes;