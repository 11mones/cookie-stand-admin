import '@/styles/globals.css'
import { Authprovider } from '@/contexts/auth'
export default function App({ Component, pageProps }) {

  return (
    <Authprovider >
      <Component {...pageProps} />
    </Authprovider>)
}
