import styled from 'styled-components'

export const BannerContent = styled.div<{ $warning?: boolean }>`
  margin-bottom: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ $warning, theme }) =>
    $warning ? theme.colors.surfaceAlt : theme.colors.accentSoft};
  color: ${({ $warning, theme }) =>
    $warning ? theme.colors.warning : theme.colors.ink};
  line-height: 1.5;
`
