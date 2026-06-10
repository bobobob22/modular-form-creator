import type { ReactNode } from 'react'
import {
  FieldList,
  SectionCard,
  SectionTitleSmall,
} from '@/features/resources/styles/section.styles'

interface DetailSectionProps {
  title: string
  children: ReactNode
}

export function DetailSection({ title, children }: DetailSectionProps) {
  return (
    <SectionCard variant="outline">
      <SectionTitleSmall>{title}</SectionTitleSmall>
      <FieldList>{children}</FieldList>
    </SectionCard>
  )
}
