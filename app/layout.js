export const metadata = {
  title: 'Admin Dashboard',
  description: 'Dashboard Interface for admins.',
}

export default function RootLayout({ children }) {
 return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
