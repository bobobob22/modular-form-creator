import type { ReactNode } from 'react'
import { LABELS } from '@/shared/constants/labels'
import { ROUTES } from '@/shared/constants/routes'
import type { ResourceStatus } from '@/shared/types/resource'
import { ErrorMessage, MutedMessage } from '@/shared/styles/common.styles'
import { PageLayout } from '../PageLayout/PageLayout'

interface ResourcePageShellProps {
  title: string
  subtitle?: string
  resourceStatus?: ResourceStatus
  headerMeta?: ReactNode
  loading: boolean
  error: string | null
  backTo?: string
  backLabel?: string
  actions?: ReactNode
  children: ReactNode
}

export function ResourcePageShell({
  title,
  subtitle,
  resourceStatus,
  headerMeta,
  loading,
  error,
  backTo = ROUTES.RESOURCES_LIST,
  backLabel = LABELS.COMMON.ALL_RESOURCES,
  actions,
  children,
}: ResourcePageShellProps) {
  if (loading) {
    return (
      <PageLayout title={title} backTo={backTo} backLabel={backLabel}>
        <MutedMessage>{LABELS.COMMON.LOADING}</MutedMessage>
      </PageLayout>
    )
  }

  if (error) {
    return (
      <PageLayout title={title} backTo={backTo} backLabel={backLabel}>
        <ErrorMessage>{error}</ErrorMessage>
      </PageLayout>
    )
  }

  return (
    <PageLayout
      title={title}
      subtitle={subtitle}
      resourceStatus={resourceStatus}
      headerMeta={headerMeta}
      backTo={backTo}
      backLabel={backLabel}
      actions={actions}
    >
      {children}
    </PageLayout>
  )
}
