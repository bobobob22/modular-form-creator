import styled from 'styled-components'
import { Card } from '@/design-system'

export const ModuleFormCard = styled(Card)`
  padding: ${({ theme }) => theme.spacing.lg};
  display: grid;
  gap: ${({ theme }) => theme.spacing.md};
`
