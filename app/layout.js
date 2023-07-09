import "@/styles/globals.css";
import { Montserrat } from 'next/font/google'
import Navbar from '@/components/Navbar'
import Provider from "@/components/SessionProvider";

const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata = {
  title: 'The List Project',
  description: 'A wish list.',
}

// flex min-h-screen flex-col items-center justify-between p-24

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Provider>
        <body className={`${montserrat.className}`}>
          <main className='h-full flex flex-col'>
            <Navbar />
            <div className="h-[93%]">
              {children}
            </div>
          </main>
        </body>
      </Provider>
    </html>
  )
}
