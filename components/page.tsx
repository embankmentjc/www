import { ReactNode } from "react";

import { Helmet } from 'react-helmet-async'
import Footer from "./footer";
import Nav from "./nav";
import {Modal} from "./modal";

export default function Page({ path, children, headerChildren, navStuck, modal, title, description, ogImage, }: {
    path: string
    children: ReactNode
    headerChildren?: ReactNode
    navStuck?: boolean
    modal?: boolean
    title?: string
    description?: string
    ogImage?: string
}) {
    const siteUrl = import.meta.env.VITE_SITE_URL || 'https://embankment.org'
    const pageTitle = title || "The Embankment - Embankment Preservation Coalition"
    const pageDescription = description || "Preserving and restoring Jersey City's Harsimus Branch Embankment as a green corridor, connecting neighborhoods with nature, history, and the East Coast Greenway."
    const defaultImage = `${siteUrl}/images/HOME-STEP2.jpg`
    const pageImage = ogImage
        ? (ogImage.startsWith('http') ? ogImage : `${siteUrl}${ogImage}`)
        : defaultImage
    const pageUrl = `${siteUrl}${path === 'index' ? '' : `/${path}`}`

    return (<>
        <Helmet>
            <title>{pageTitle}</title>
            <meta charSet="utf-8" />
            <link rel="icon" href="/images/favicon.ico" type="image/x-icon" />
            <meta name="description" content={pageDescription} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={pageUrl} />
            <meta property="og:title" content={pageTitle} />
            <meta property="og:description" content={pageDescription} />
            <meta property="og:image" content={pageImage} />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={pageUrl} />
            <meta property="twitter:title" content={pageTitle} />
            <meta property="twitter:description" content={pageDescription} />
            <meta property="twitter:image" content={pageImage} />
        </Helmet>
        {/*<div className="page-loader page-loader-variant-1">*/}
        {/*    <div>*/}
        {/*        <img className='img-fluid' style={{ marginTop: '-20px', marginLeft: '-18px' }} width='330' height='67' src="/images/logo-bigEPC.png" alt={"Embankment Preservation Coalition logo"} />*/}
        {/*        <div className="offset-top-41 text-center"><div className="spinner" /></div>*/}
        {/*    </div>*/}
        {/*</div>*/}
        <div className="page text-center">
            {modal && <Modal />}
            <header className="page-head slider-menu-position">
                <Nav cur={path} navStuck={navStuck} />
                {headerChildren}
            </header>
            {children}
            <Footer />
        </div>
        <div className="snackbars" id="form-output-global" />
    </>)
}
