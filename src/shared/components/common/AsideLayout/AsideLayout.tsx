import type { ReactNode } from 'react'
import { Aside, Layout, Main } from './AsideLayout.styles'

interface AsideLayoutProps {
  children: ReactNode
  aside: ReactNode
}

export function AsideLayout({ children, aside }: AsideLayoutProps) {
  return (
    <Layout>
      <Main>{children}</Main>
      <Aside>{aside}</Aside>
    </Layout>
  )
}
