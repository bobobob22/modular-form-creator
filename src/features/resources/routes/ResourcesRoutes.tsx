import { Navigate, Route, Routes } from 'react-router-dom'
import { ROUTE_PATTERNS, ROUTES } from '@/shared/constants/routes'
import { BasicInfoPage } from '../pages/BasicInfoPage'
import { ProjectDetailsPage } from '../pages/ProjectDetailsPage'
import { ResourceDetailsPage } from '../pages/ResourceDetailsPage'
import { ResourceOverviewPage } from '../pages/ResourceOverviewPage'
import { ResourcesListPage } from '../pages/ResourcesListPage'

export function ResourcesRoutes() {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<Navigate to={ROUTES.RESOURCES_LIST} replace />} />
      <Route path={ROUTES.RESOURCES_LIST} element={<ResourcesListPage />} />
      <Route path={ROUTE_PATTERNS.RESOURCE_OVERVIEW} element={<ResourceOverviewPage />} />
      <Route path={ROUTE_PATTERNS.RESOURCE_DETAILS} element={<ResourceDetailsPage />} />
      <Route path={ROUTE_PATTERNS.RESOURCE_BASIC_INFO} element={<BasicInfoPage />} />
      <Route path={ROUTE_PATTERNS.RESOURCE_PROJECT_DETAILS} element={<ProjectDetailsPage />} />
      <Route path="*" element={<Navigate to={ROUTES.RESOURCES_LIST} replace />} />
    </Routes>
  )
}
