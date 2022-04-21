import { Routes, Route } from "react-router-dom";
import { lazy } from 'react'
import Loadable from '../components/Loadable'
import RequireAuth from "../components/RequireAuth";

const DashboardOverviewPage = Loadable(lazy(() => import('../Pages/dashboard/DashboardOverviewPage')))
const DashboardAnalyticsPage = Loadable(lazy(() => import('../Pages/dashboard/DashboardAnalyticsPage')))
const SignPage = Loadable(lazy(() => import('../Pages/LoginScreen')))

/**
 * <Route path="/dashboard/charts" element={<DashboardChartsPage />} />
 * <Route path="/application/users" element={<ApplicationUsersPage />} />
          <Route path="/application/users/:id" element={<ApplicationUserByIdPage />} />

          <Route path="/application/events" element={<ApplicationEventsPage />} />
          <Route path="/application/events/:id" element={<ApplicationEventByIdPage />} />

          <Route path="/application/sports" element={<ApplicationSportsPage />} />
          <Route path="/application/sports/:id" element={<ApplicationSportByIdPage />} />

          <Route path="/application/quotas" element={<ApplicationQuotasPage />} />
          <Route path="/application/quotas/companies" element={<ApplicationQuotasCompaniesPage />} />
          <Route path="/application/companies" element={<ApplicationCompaniesPage />} />

          <Route path="/application/quotas/users" element={<ApplicationCompanyByIdPage />} />
 */

export default function ThemeRoutes() {
    return (
      <Routes>
          <Route path="/" element={<RequireAuth><DashboardOverviewPage/></RequireAuth>} />
          <Route path="/dashboard/overview" element={<RequireAuth><DashboardOverviewPage/></RequireAuth>} />
          <Route path="/dashboard/analytics" element={<RequireAuth><DashboardAnalyticsPage/></RequireAuth>} />
          <Route path="/sign" element={<SignPage />} />
      </Routes>
    )
}