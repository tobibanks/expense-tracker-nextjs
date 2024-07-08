import type { Metadata } from "next"
import { ClerkProvider } from "@clerk/nextjs"
import { Roboto } from "next/font/google"
import "./globals.css"
import Header from "@/components/Header"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const roboto = Roboto({ weight: "400", subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Expense Tracker App",
  description: "Track your expenses",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={roboto.className}>
          <Header />
          <main className="container">{children}</main>
          <ToastContainer />
        </body>
      </html>
    </ClerkProvider>
  )
}
