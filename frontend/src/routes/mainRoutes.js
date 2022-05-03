import { lazy } from 'react';

import MainLayout from '../layout/mainLayout'
import Loadable from '../components/Loadable'
import RequireAuth from '../components/RequireAuth'
import { element } from 'prop-types';

const DashboardDefault = Loadable(lazy(() => import('../Pages/dashboard/DashboardOverviewPage')))
const DashboardAnalytics = Loadable(lazy(() => import('../Pages/dashboard/DashboardAnalyticsPage')))
const AllMembersPage = Loadable(lazy(() => import('../Pages/application/AllMembersPage')))
//const DashboardStatistics = Loadable(lazy(() => import('Pages/dashboard/DashboardStatisticsPage')))

const mainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/dashboard/overview',
            element: <RequireAuth><DashboardDefault/></RequireAuth>
        },
        {
            path: '/dashboard/analytics',
            element: <RequireAuth><DashboardAnalytics/></RequireAuth>
        },
        {
            path: '/application/users',
            element: <RequireAuth><AllMembersPage/></RequireAuth>
        }
    ]
};

export default mainRoutes;