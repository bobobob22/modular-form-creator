import { BannerContent } from './NoticeBanner.styles'

interface NoticeBannerProps {
  children: string
  variant?: 'info' | 'warning'
}

export function NoticeBanner({ children, variant = 'info' }: NoticeBannerProps) {
  return (
    <BannerContent $warning={variant === 'warning'}>{children}</BannerContent>
  )
}
