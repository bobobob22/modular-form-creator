import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const Shell = styled.main`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.surfaceAlt};
  padding: ${({ theme }) => theme.spacing.xl};
`

export const Container = styled.div`
  max-width: 960px;
  margin: 0 auto;
`

export const BackRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`

export const BackLabel = styled(Link)`
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  font-weight: 600;

  &:hover {
    color: ${({ theme }) => theme.colors.primaryStrong};
  }
`

export const Header = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`

export const HeaderText = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`

export const Title = styled.h1`
  font-family: ${({ theme }) => theme.typography.heading};
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.inkStrong};
`

export const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.inkMuted};
  max-width: 640px;
`

export const HeaderAside = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: ${({ theme }) => theme.spacing.sm};
  flex-shrink: 0;
`

export const HeaderMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`

export const Actions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  flex-shrink: 0;
`
