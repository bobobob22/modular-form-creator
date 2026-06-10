import styled from 'styled-components'

export const ListSection = styled.section`
  display: grid;
  gap: ${({ theme }) => theme.spacing.md};
`

export const FilterRow = styled.div`
  padding-bottom: ${({ theme }) => theme.spacing.sm};
`

export const List = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.sm};
`
