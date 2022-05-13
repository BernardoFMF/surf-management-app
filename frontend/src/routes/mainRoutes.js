import { lazy } from 'react';

import MainLayout from '../layout/mainLayout'
import Loadable from '../components/Loadable'
import RequireAuth from '../components/RequireAuth'
import RequireAdmin from '../components/RequireAdmin';

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
            element: <RequireAdmin><AllMembersPage/></RequireAdmin>
        },
        {
            path: '/application/members/:id',
            element: <RequireAdmin><MemberProfile/></RequireAdmin>
        },
        {
            path: '/application/sports',
            element: <RequireAdmin><AllSportsPage/></RequireAdmin>
        },
        {
            path: '/application/quotas',
            element: <RequireAdmin><AllQuotasPage/></RequireAdmin>
        },
        {
            path: '/application/candidates',
            element: <RequireAdmin><AllCandidatesPage/></RequireAdmin>
        },
        {
            path: '/application/companies',
            element: <RequireAdmin><AllCompaniesPage/></RequireAdmin>
        },
        {
            path: '/application/myquotas/:id',
            element: <RequireAdmin><MyQuotasPage/></RequireAdmin>
        },
        {
            path: '/application/events',
            element: <RequireAdmin><AllEventsPage/></RequireAdmin>
        },
        {
            path: '/application/members/:id/sports',
            element: <RequireAdmin><MySportsPage/></RequireAdmin>
        },
        {
            path: '/application/quotas/management',
            element: <RequireAdmin><QuotasManagementPage/></RequireAdmin>
        }
    ]
};

export default mainRoutes;