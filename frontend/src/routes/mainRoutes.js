import { lazy } from 'react';

import MainLayout from '../layout/mainLayout'
import Loadable from '../components/Loadable'
import RequireAuth from '../components/RequireAuth'
import RequireAdmin from '../components/RequireAdmin'
import RequireMember from '../components/RequireMember'
import Error from '../Pages/error/Error'
import AnimatedVideo from '../components/AnimatedVideo';
import AnimatedCard from '../components/AnimatedCard';
import RequireNotDeleted from '../components/RequireNotDeleted';

const DashboardDefault = Loadable(lazy(() => import('../Pages/dashboard/DashboardOverviewPage')))
const DashboardAnalytics = Loadable(lazy(() => import('../Pages/dashboard/DashboardAnalyticsPage')))
const AllUsersPage = Loadable(lazy(() => import('../Pages/application/AllUsersPage')))
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
const MyGroupsPage = Loadable(lazy(() => import('../Pages/application/MyGroupsPage')))
const AllGroupsPage = Loadable(lazy(() => import('../Pages/application/AllGroupsPage')))
const GroupPage = Loadable(lazy(() => import('../Pages/application/GroupPage')))

const mainRoutes = {
    path: '/',
    element: <Error><RequireAuth><RequireNotDeleted><AnimatedVideo><MainLayout/></AnimatedVideo></RequireNotDeleted></RequireAuth></Error>,
    children: [
        {
            path: '/dashboard/analytics',
            element: <RequireAdmin><DashboardAnalytics/></RequireAdmin>
        },
        {
            path: '/dashboard/overview',
            element: <DashboardDefault/>
        },
        {
            path: '/application/users',
            element: <RequireAdmin><AllUsersPage/></RequireAdmin>
        },
        {
            path: '/application/members/:id',
            element: <RequireMember><ProfileForker/></RequireMember>
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
            path: '/application/quotas/members/:id',
            element: <RequireMember><MyQuotasPage/></RequireMember>
        },
        {
            path: '/application/events',
            element: <RequireAdmin><AllEventsPage/></RequireAdmin>
        },
        {
            path: '/application/events/members/:id',
            element: <RequireMember><MyEventsPage/></RequireMember>
        },
        {
            path: '/application/sports/members/:id',
            element: <RequireMember><MySportsPage/></RequireMember>
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
            path: '/application/groups/members/:id',
            element: <RequireAdmin><MyGroupsPage/></RequireAdmin>
        },
        {
            path: '/application/groups',
            element: <RequireAdmin><AllGroupsPage/></RequireAdmin>
        },
        {
            path: '/application/groups/:id',
            element: <RequireAdmin><GroupPage/></RequireAdmin>
        },
        {
            path: '/uploadfile',
            element: <RequireAdmin><UploadFilePage/></RequireAdmin>
        },
    ]
};

export default mainRoutes;