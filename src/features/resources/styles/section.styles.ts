import styled, { css } from 'styled-components'
import { Card } from '@/design-system'

export const SectionCard = styled(Card)`
  padding: ${({ theme }) => theme.spacing.lg};
  display: grid;
  gap: ${({ theme }) => theme.spacing.md};
`

export const ProgressCard = styled(Card)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.lg};
`

const sectionHeadingBase = css`
  font-family: ${({ theme }) => theme.typography.heading};
  color: ${({ theme }) => theme.colors.inkStrong};
`

export const SectionTitle = styled.h2`
  ${sectionHeadingBase}
  font-size: 1.125rem;
`

export const CardTitle = styled(SectionTitle)`
  font-size: 1.25rem;
  line-height: 1.3;
`

export const SectionTitleSmall = styled.h3`
  ${sectionHeadingBase}
  font-size: 1.125rem;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`

export const SectionDescription = styled.p`
  color: ${({ theme }) => theme.colors.inkMuted};
`

export const ModuleGrid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`

export const DetailsGrid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.lg};
`

export const FieldList = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.md};
`

export const CardDescription = styled.p`
  color: ${({ theme }) => theme.colors.inkMuted};
`
