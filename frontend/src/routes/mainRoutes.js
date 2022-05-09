import { lazy } from 'react';

import MainLayout from '../layout/mainLayout'
import Loadable from '../components/Loadable'
import RequireAuth from '../components/RequireAuth'

const DashboardDefault = Loadable(lazy(() => import('../Pages/dashboard/DashboardOverviewPage')))
const DashboardAnalytics = Loadable(lazy(() => import('../Pages/dashboard/DashboardAnalyticsPage')))
const AllMembersPage = Loadable(lazy(() => import('../Pages/application/AllMembersPage')))
const MemberProfile = Loadable(lazy(() => import('../Pages/application/MemberProfile')))
const AllSportsPage = Loadable(lazy(() => import('../Pages/application/AllSportsPage')))
const AllQuotasPage = Loadable(lazy(() => import('../Pages/application/AllQuotasPage')))

//const DashboardStatistics = Loadable(lazy(() => import('Pages/dashboard/DashboardStatisticsPage')))

const mainRoutes = {
    path: '/',
    element: <RequireAuth><MainLayout /></RequireAuth>,
    children: [
        {
            path: '/dashboard/analytics',
            element: <DashboardAnalytics/>
        },
        {
            path: '/dashboard/overview',
            element: <DashboardDefault/>
        },
        {
            path: '/application/users',
            element: <AllMembersPage/>
        },
        {
            path: '/application/members/:id',
            element: <MemberProfile/>
        },
        {
            path: '/application/sports',
            element: <AllSportsPage/>
        },
        {
            path: '/application/quotas',
            element: <AllQuotasPage/>
        }
    ]
};

export default mainRoutes;