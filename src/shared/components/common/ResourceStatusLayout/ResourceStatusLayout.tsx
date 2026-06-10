import type { ReactNode } from 'react'
import type { ResourceStatus } from '@/shared/types/resource'
import { AsideLayout } from '../AsideLayout/AsideLayout'
import { StatusBadge } from '../StatusBadge/StatusBadge'

interface ResourceStatusLayoutProps {
  status: ResourceStatus
  children: ReactNode
}

export function ResourceStatusLayout({ status, children }: ResourceStatusLayoutProps) {
  return (
    <AsideLayout aside={<StatusBadge status={status} />}>
      {children}
    </AsideLayout>
  )
}
