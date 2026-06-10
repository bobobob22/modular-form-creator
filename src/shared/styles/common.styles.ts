import styled from 'styled-components'

export const MutedMessage = styled.p`
  color: ${({ theme }) => theme.colors.inkMuted};
`

export const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.colors.warning};
`

export const MetaText = styled.span`
  color: ${({ theme }) => theme.colors.inkMuted};
  font-size: 0.875rem;
`
