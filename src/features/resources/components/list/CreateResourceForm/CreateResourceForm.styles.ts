import styled from 'styled-components'
import { Card } from '@/design-system'

export const CreateResourceSection = styled.section`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`

export const CreateResourceCard = styled(Card)`
  padding: ${({ theme }) => theme.spacing.lg};
  display: grid;
  gap: ${({ theme }) => theme.spacing.md};
`

export const FormFields = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.md};
`
