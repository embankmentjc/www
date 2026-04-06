import { Link } from 'react-router-dom'
import { AnchorHTMLAttributes, ReactNode } from 'react'

export type AProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string
  children?: ReactNode
}

/**
 * Smart link component that uses react-router Link for internal paths
 * and regular <a> tags for external URLs.
 */
export default function A({ href, children, ...props }: AProps) {
  const isExternal = href.startsWith('http://') || href.startsWith('https://') || href.startsWith('//')
  const isAnchor = href.startsWith('#')
  const isMailto = href.startsWith('mailto:')

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    )
  }

  const isFile = /\.\w+$/.test(href)

  if (isAnchor || isMailto || isFile) {
    return <a href={href} {...props}>{children}</a>
  }

  // Internal link - use react-router
  return <Link to={href} {...props}>{children}</Link>
}
