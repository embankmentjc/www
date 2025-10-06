import '../public/css/fonts.css'
import '../public/css/rd-navbar.css'
import '../public/css/style.css'
import '../public/css/themepunch/arrows.css'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function App({ Component, pageProps }) {
    const router = useRouter()

    useEffect(() => {
        // Handle anchor scrolling - only on initial page load with hash
        const handleInitialAnchorScroll = () => {
            const hash = window.location.hash
            if (hash) {
                // Wait for images and fonts to load on initial page load
                setTimeout(() => {
                    const element = document.querySelector(hash)
                    if (element) {
                        const offset = 78 // Match RD Navbar offset
                        const elementPosition = element.getBoundingClientRect().top
                        const offsetPosition = elementPosition + window.pageYOffset - offset

                        window.scrollTo({
                            top: offsetPosition,
                            behavior: 'auto' // instant scroll
                        })
                    }
                }, 500)
            }
        }

        // Handle on initial load only
        if (document.readyState === 'complete') {
            handleInitialAnchorScroll()
        } else {
            window.addEventListener('load', handleInitialAnchorScroll)
        }

        return () => {
            window.removeEventListener('load', handleInitialAnchorScroll)
        }
    }, [])

    return <Component {...pageProps} />
}
