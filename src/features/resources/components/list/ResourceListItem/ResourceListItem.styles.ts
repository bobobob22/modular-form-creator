import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Card } from '@/design-system'

export const ItemCard = styled(Card)`
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  display: grid;
  gap: ${({ theme }) => theme.spacing.md};
  transition: border-color 0.15s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`

export const ItemTitle = styled(Link)`
  font-family: ${({ theme }) => theme.typography.heading};
  font-size: 1.0625rem;
  color: ${({ theme }) => theme.colors.inkStrong};
  line-height: 1.3;
  text-decoration: none;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`

export const ItemActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
`
