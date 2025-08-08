import '../tailwind.css'

import { VisualEditing } from '@sanity/visual-editing/next-pages-router'
import { AppProps } from 'next/app'
import { baunk, crenzo } from '../lib/fonts'

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
    <div className={`${baunk.variable} ${crenzo.variable} ${crenzo.className}`}>
      <Component {...pageProps} />
      {draftMode && <VisualEditing />}
    </div>
  )
}
