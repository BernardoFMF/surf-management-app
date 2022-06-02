import { lazy } from 'react';

// project imports
import Loadable from '../components/Loadable'
import MinimalLayout from '../layout/minimalLayout/index'
import RequireCompany from '../components/RequireCompany'

const AuthLogin = Loadable(lazy(() => import('../Pages/auth/SignInPage')))
const AuthRegister = Loadable(lazy(() => import('../Pages/auth/SignUpPage')))
const ValidatePage = Loadable(lazy(() => import('../Pages/ValidatePage')))

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
        },
        {
            path: 'validate/:id',
            element: <RequireCompany><ValidatePage/></RequireCompany>
        },
    ]
};

export default authRoutes;