import styled from 'styled-components'

export const Field = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.xs};
`

export const Label = styled.span`
  font-size: 0.9rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.inkStrong};
`

export const CheckboxList = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.sm};
`
