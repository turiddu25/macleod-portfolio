import '../tailwind.css'
import { baunk, crenzo } from '../lib/fonts'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${baunk.variable} ${crenzo.variable} ${crenzo.className}`}>
      <body className={`${baunk.variable} ${crenzo.variable} ${crenzo.className}`}>{children}</body>
    </html>
  )
}
