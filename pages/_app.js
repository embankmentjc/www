import '../public/css/fonts.css'
import '../public/css/rd-navbar.css'
import '../public/css/style.css'
import '../public/css/themepunch/arrows.css'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function App({ Component, pageProps }) {
    const router = useRouter()

    useEffect(() => {
        // Handle anchor scrolling after page load
        const handleAnchorScroll = () => {
            const hash = window.location.hash
            if (hash) {
                // Wait for all content to load before scrolling
                setTimeout(() => {
                    const element = document.querySelector(hash)
                    if (element) {
                        const offset = 78 // Match RD Navbar offset
                        const elementPosition = element.getBoundingClientRect().top
                        const offsetPosition = elementPosition + window.pageYOffset - offset

                        window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                        })
                    }
                }, 500) // Give time for images and other async content to load
            }
        }

        // Handle on route change
        router.events.on('routeChangeComplete', handleAnchorScroll)

        // Handle on initial load
        if (document.readyState === 'complete') {
            handleAnchorScroll()
        } else {
            window.addEventListener('load', handleAnchorScroll)
        }

        return () => {
            router.events.off('routeChangeComplete', handleAnchorScroll)
            window.removeEventListener('load', handleAnchorScroll)
        }
    }, [router])

    return <Component {...pageProps} />
}
