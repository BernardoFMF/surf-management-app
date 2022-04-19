import { Routes, Route } from "react-router-dom";
import { lazy } from 'react'
import Loadable from '../components/Loadable'

const DashboardOverviewPage = Loadable(lazy(() => import('../pages/dashboard/DashboardOverviewPage')))
const DashboardAnalyticsPage = Loadable(lazy(() => import('../pages/dashboard/DashboardAnalyticsPage')))
const SignPage = Loadable(lazy(() => import('../pages/LoginScreen')))

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
          <Route path="/dashboard/overview" element={<DashboardOverviewPage />} />
          <Route path="/dashboard/analytics" element={<DashboardAnalyticsPage />} />
          

          <Route path="/sign" element={<SignPage />} />
      </Routes>
    )
}