import { Head, Html, Main, NextScript } from 'next/document'
import { crenzo } from '../lib/fonts'

export default function Document() {
  return (
    <Html lang="en" className={`${crenzo.variable} ${crenzo.className}`}>
      <Head>
        <title>Davor MacLeod</title>
        <meta name="description" content="Music Producer & Engineer" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* No favicon links - keeping it empty as requested */}
      </Head>
      <body className={`${crenzo.variable} ${crenzo.className}`}>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
