import { Head, Html, Main, NextScript } from 'next/document'
import { chillax } from '../lib/fonts'

export default function Document() {
  return (
    <Html lang="en" className={`${chillax.variable} ${chillax.className}`}>
      <Head>
        <title>Davor MacLeod</title>
        <meta name="description" content="Music Producer & Engineer" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* No favicon links - keeping it empty as requested */}
      </Head>
      <body className={`${chillax.variable} ${chillax.className}`}>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
