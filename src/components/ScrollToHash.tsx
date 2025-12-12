import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Scrolls to hash fragment on navigation and initial load.
 */
export default function ScrollToHash() {
  const { pathname, hash } = useLocation()
  const prevPathname = useRef(pathname)

  useEffect(() => {
    const isNewPage = pathname !== prevPathname.current
    prevPathname.current = pathname

    if (hash) {
      // Scroll to hash - use delay only on new page loads
      const delay = isNewPage ? 50 : 0
      setTimeout(() => {
        const id = hash.replace('#', '')
        const element = document.getElementById(id)
        if (element) {
          element.scrollIntoView({ behavior: 'auto' })
        }
      }, delay)
    } else if (isNewPage) {
      // No hash + new page - scroll to top
      window.scrollTo(0, 0)
    }
  }, [pathname, hash])

  return null
}
