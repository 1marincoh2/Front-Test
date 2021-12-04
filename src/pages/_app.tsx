import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/layout/layout'
import Navbar from '../components/layout/navbar'

function MyApp({ Component, pageProps }: AppProps) {
  return <Navbar> <Component {...pageProps} /></Navbar>
}

export default MyApp
