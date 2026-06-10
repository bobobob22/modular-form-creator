import type { ReactNode } from 'react'
import { LABELS } from '@/shared/constants/labels'
import { NoticeBanner } from '@/shared/components/common/NoticeBanner/NoticeBanner'
import { ResourcePageShell } from '@/shared/components/layout/ResourcePageShell/ResourcePageShell'
import { ModuleFormCard } from './ModuleFormPage.styles'

interface ModuleFormPageProps {
  title: string
  subtitle: string
  loading: boolean
  error: string | null
  overviewPath: string
  notices?: ReactNode
  children: ReactNode
}

export function ModuleFormPage({
  title,
  subtitle,
  loading,
  error,
  overviewPath,
  notices,
  children,
}: ModuleFormPageProps) {
  return (
    <ResourcePageShell
      title={title}
      subtitle={subtitle}
      loading={loading}
      error={error}
      backTo={overviewPath}
      backLabel={LABELS.COMMON.OVERVIEW}
    >
      {notices}
      <ModuleFormCard variant="elevated">{children}</ModuleFormCard>
    </ResourcePageShell>
  )
}

interface CompletedEditNoticeProps {
  show: boolean
}

export function CompletedEditNotice({ show }: CompletedEditNoticeProps) {
  if (!show) {
    return null
  }

  return <NoticeBanner>{LABELS.FORM.BUFFER_NOTICE}</NoticeBanner>
}
