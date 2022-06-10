import { lazy } from 'react';

import MainLayout from '../layout/mainLayout'
import Loadable from '../components/Loadable'
import RequireAuth from '../components/RequireAuth'
import RequireAdmin from '../components/RequireAdmin'
import Error from '../Pages/error/Error'

const DashboardDefault = Loadable(lazy(() => import('../Pages/dashboard/DashboardOverviewPage')))
const DashboardAnalytics = Loadable(lazy(() => import('../Pages/dashboard/DashboardAnalyticsPage')))
const AllMembersPage = Loadable(lazy(() => import('../Pages/application/AllMembersPage')))
const AllSportsPage = Loadable(lazy(() => import('../Pages/application/AllSportsPage')))
const SportPage = Loadable(lazy(() => import('../Pages/application/SportPage')))
const AllQuotasPage = Loadable(lazy(() => import('../Pages/application/AllQuotasPage')))
const AllCandidatesPage = Loadable(lazy(() => import('../Pages/application/AllCandidatesPage')))
const AllCompaniesPage = Loadable(lazy(() => import('../Pages/application/AllCompaniesPage')))
const MyQuotasPage = Loadable(lazy(() => import('../Pages/application/MyQuotasPage')))
const AllEventsPage = Loadable(lazy(() => import('../Pages/application/AllEventsPage')))
const ProfileForker = Loadable(lazy(() => import('../Pages/application/ProfileForker')))
const MySportsPage = Loadable(lazy(() => import('../Pages/application/MySportsPage')))
const QuotasManagementPage = Loadable(lazy(() => import('../Pages/application/QuotasManagementPage')))
const EventPage = Loadable(lazy(() => import('../Pages/application/EventPage')))
const MyEventsPage = Loadable(lazy(() => import('../Pages/application/MyEventsPage')))
const UploadFilePage = Loadable(lazy(() => import('../Pages/UploadFilePage')))

//const DashboardStatistics = Loadable(lazy(() => import('Pages/dashboard/DashboardStatisticsPage')))

const mainRoutes = {
    path: '/',
    element: <Error><RequireAuth><MainLayout/></RequireAuth></Error>,
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
            element: <RequireAdmin><ProfileForker/></RequireAdmin>
        },
        {
            path: '/application/sports',
            element: <AllSportsPage/>
        },
        {
            path: '/application/sports/:id',
            element: <RequireAdmin><SportPage/></RequireAdmin>
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
            path: '/application/member/:id/quotas',
            element: <RequireAdmin><MyQuotasPage/></RequireAdmin>
        },
        {
            path: '/application/events',
            element: <AllEventsPage/>
        },
        {
            path: '/application/events/members/:id',
            element: <MyEventsPage/>
        },
        {
            path: '/application/members/:id/sports',
            element: <RequireAdmin><MySportsPage/></RequireAdmin>
        },
        {
            path: '/application/quotas/management',
            element: <RequireAdmin><QuotasManagementPage/></RequireAdmin>
        },
        {
            path: '/application/events/:id',
            element: <RequireAdmin><EventPage/></RequireAdmin>
        },
        {
            path: '/uploadfile',
            element: <UploadFilePage/>
        }
    ]
};

export default mainRoutes;