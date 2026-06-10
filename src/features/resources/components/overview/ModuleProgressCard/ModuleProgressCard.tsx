import { Link } from 'react-router-dom'
import { Badge, Button } from '@/design-system'
import { LABELS } from '@/shared/constants/labels'
import { AsideLayout } from '@/shared/components/common/AsideLayout/AsideLayout'
import {
  CardDescription,
  CardTitle,
  ProgressCard,
} from '@/features/resources/styles/section.styles'
import { ModuleCompletionBadge } from '../ModuleCompletionBadge/ModuleCompletionBadge'

interface ModuleProgressCardProps {
  title: string
  description: string
  isComplete: boolean
  isAvailable: boolean
  editPath: string
  unavailableReason?: string
}

export function ModuleProgressCard({
  title,
  description,
  isComplete,
  isAvailable,
  editPath,
  unavailableReason,
}: ModuleProgressCardProps) {
  const actionLabel = isComplete ? LABELS.MODULE.REVIEW_EDIT : LABELS.MODULE.CONTINUE

  return (
    <ProgressCard variant="elevated">
      <AsideLayout aside={<ModuleCompletionBadge isComplete={isComplete} />}>
        <CardTitle>{title}</CardTitle>
      </AsideLayout>
      <CardDescription>{description}</CardDescription>
      {!isAvailable && unavailableReason ? (
        <Badge variant="warning">{unavailableReason}</Badge>
      ) : null}
      {isAvailable ? (
        <Link to={editPath}>
          <Button variant="secondary">{actionLabel}</Button>
        </Link>
      ) : (
        <Button variant="secondary" state="locked" disabled>
          {LABELS.MODULE.LOCKED}
        </Button>
      )}
    </ProgressCard>
  )
}
