import { AppProps } from 'next/app'

import '../public/css/fonts.css'
import '../public/css/rd-navbar.css'
import '../public/css/style.css'
import '../public/css/themepunch/arrows.css'

export default function App({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />
}
