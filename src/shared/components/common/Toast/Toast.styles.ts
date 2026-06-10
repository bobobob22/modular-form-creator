import styled from 'styled-components'
import { Card } from '@/design-system'

export const Stack = styled.div`
  position: fixed;
  right: ${({ theme }) => theme.spacing.lg};
  bottom: ${({ theme }) => theme.spacing.lg};
  z-index: 50;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  width: min(22rem, calc(100vw - ${({ theme }) => theme.spacing.xl}));
  pointer-events: none;
`

export const ToastCard = styled(Card)`
  pointer-events: auto;
  padding: ${({ theme }) => theme.spacing.md};
  display: grid;
  gap: ${({ theme }) => theme.spacing.sm};
  box-shadow: ${({ theme }) => theme.shadows.raised};
  animation: toast-enter 0.25s ease;

  @keyframes toast-enter {
    from {
      opacity: 0;
      transform: translateY(0.5rem);
    }

    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`

export const ToastHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.sm};
`

export const ToastMessage = styled.p`
  color: ${({ theme }) => theme.colors.ink};
  line-height: 1.5;
  font-size: 0.9375rem;
`
