import styled from 'styled-components'

export const PaginationBar = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.md};
`

export const PaginationActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
`
