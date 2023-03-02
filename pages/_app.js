import '@/styles/globals.css'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Navbar from '@/components/Navbar'
import installDevtools from '@edgio/devtools/install'

const MyApp = ({ Component, pageProps }) => {
  const router = useRouter()
  useEffect(() => {
    // Enable devtools manually, instead of relying on defaults by Edgio
    installDevtools()
  }, [])
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-[#9a1ab1] via-[#004966] to-[#01B18D]">
      <Navbar />
      <Component key={router.asPath} {...pageProps} />
    </div>
  )
}

export default MyApp
