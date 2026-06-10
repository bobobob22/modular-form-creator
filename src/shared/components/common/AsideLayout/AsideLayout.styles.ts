import styled from 'styled-components'

export const Layout = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.md};
  width: 100%;
`

export const Main = styled.div`
  flex: 1;
  min-width: 0;
  display: grid;
  gap: ${({ theme }) => theme.spacing.xs};
`

export const Aside = styled.div`
  flex-shrink: 0;
  align-self: flex-start;
`
