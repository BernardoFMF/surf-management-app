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
const AllCandidatesPage = Loadable(lazy(() => import('../Pages/application/AllCandidatesPage')))
const AllCompaniesPage = Loadable(lazy(() => import('../Pages/application/AllCompaniesPage')))
const MyQuotasPage = Loadable(lazy(() => import('../Pages/application/MyQuotasPage')))
const AllEventsPage = Loadable(lazy(() => import('../Pages/application/AllEventsPage')))
const MySportsPage = Loadable(lazy(() => import('../Pages/application/MySportsPage')))
const QuotasManagementPage = Loadable(lazy(() => import('../Pages/application/QuotasManagementPage')))




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
        },
        {
            path: '/application/candidates',
            element: <AllCandidatesPage/>
        },
        {
            path: '/application/companies',
            element: <AllCompaniesPage/>
        },
        {
            path: '/application/myquotas/:id',
            element: <MyQuotasPage/>
        },
        {
            path: '/application/events',
            element: <AllEventsPage/>
        },
        {
            path: '/application/members/:id/sports',
            element: <MySportsPage/>
        },
        {
            path: '/application/quotas/management',
            element: <QuotasManagementPage/>
        }
    ]
};

export default mainRoutes;