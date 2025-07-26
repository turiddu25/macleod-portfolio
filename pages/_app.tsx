import '../tailwind.css'

import { VisualEditing } from '@sanity/visual-editing/next-pages-router'
import { AppProps } from 'next/app'
import { chillax } from '../lib/fonts'

export interface SharedPageProps {
  draftMode: boolean
  token: string
}

export default function App({
  Component,
  pageProps,
}: AppProps<SharedPageProps>) {
  const { draftMode } = pageProps
  return (
    <div className={`${chillax.variable} ${chillax.className}`}>
      <Component {...pageProps} />
      {draftMode && <VisualEditing />}
    </div>
  )
}
