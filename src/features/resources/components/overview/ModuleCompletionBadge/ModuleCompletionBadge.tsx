import { LABELS } from '@/shared/constants/labels'
import { Badge } from '@/design-system'

interface ModuleCompletionBadgeProps {
  isComplete: boolean
  prefix?: string
}

export function ModuleCompletionBadge({ isComplete, prefix }: ModuleCompletionBadgeProps) {
  const statusLabel = isComplete ? LABELS.STATUS.COMPLETE : LABELS.STATUS.INCOMPLETE
  const label = prefix ? `${prefix}: ${statusLabel}` : statusLabel

  return (
    <Badge variant={isComplete ? 'success' : 'neutral'}>
      {label}
    </Badge>
  )
}
