import '../styles/globals.css'
import { Connector } from 'mqtt-react-hooks'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
