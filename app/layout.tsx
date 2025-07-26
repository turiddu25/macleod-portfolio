import '../tailwind.css'
import { chillax } from '../lib/fonts'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${chillax.variable} ${chillax.className}`}>
      <body className={`${chillax.variable} ${chillax.className}`}>{children}</body>
    </html>
  )
}
