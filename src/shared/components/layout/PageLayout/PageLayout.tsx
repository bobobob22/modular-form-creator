import type { ReactNode } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { IconButton } from '@/design-system'
import { LABELS } from '@/shared/constants/labels'
import { StatusBadge } from '@/shared/components/common/StatusBadge/StatusBadge'
import type { ResourceStatus } from '@/shared/types/resource'
import {
  Actions,
  BackRow,
  BackLabel,
  Container,
  Header,
  HeaderAside,
  HeaderMeta,
  HeaderText,
  Shell,
  Subtitle,
  Title,
} from './PageLayout.styles'

interface PageLayoutProps {
  title: string
  subtitle?: string
  resourceStatus?: ResourceStatus
  headerMeta?: ReactNode
  backTo?: string
  backLabel?: string
  actions?: ReactNode
  children: ReactNode
}

export function PageLayout({
  title,
  subtitle,
  resourceStatus,
  headerMeta,
  backTo,
  backLabel = LABELS.COMMON.BACK,
  actions,
  children,
}: PageLayoutProps) {
  const navigate = useNavigate()

  return (
    <Shell>
      <Container>
        {backTo ? (
          <BackRow>
            <IconButton
              type="button"
              variant="ghost"
              size="small"
              aria-label={backLabel}
              onClick={() => navigate(backTo)}
            >
              ←
            </IconButton>
            <BackLabel as={Link} to={backTo}>{backLabel}</BackLabel>
          </BackRow>
        ) : null}
        <Header>
          <HeaderText>
            <Title>{title}</Title>
            {subtitle ? <Subtitle>{subtitle}</Subtitle> : null}
            {headerMeta ? <HeaderMeta>{headerMeta}</HeaderMeta> : null}
          </HeaderText>
          {resourceStatus || actions ? (
            <HeaderAside>
              {resourceStatus ? <StatusBadge status={resourceStatus} /> : null}
              {actions ? <Actions>{actions}</Actions> : null}
            </HeaderAside>
          ) : null}
        </Header>
        {children}
      </Container>
    </Shell>
  )
}
