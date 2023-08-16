/* eslint-disable react/prop-types */
import './globals.css';

export const metadata = {
  title: 'Weshare',
  description: '',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
