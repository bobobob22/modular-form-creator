import styled from 'styled-components'

export const Heading = styled.h2`
  font-family: ${({ theme }) => theme.typography.heading};
  font-size: 1.125rem;
  color: ${({ theme }) => theme.colors.inkStrong};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`
