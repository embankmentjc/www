import { ReactNode } from "react";

import Head from 'next/head'
import Script from 'next/script'
import Footer from "./footer";
import Nav from "./nav";

export default function Page({ path, children, headerChildren, scripts, navStuck, }: {
    path: string
    children: ReactNode
    headerChildren?: ReactNode
    scripts?: string[]
    navStuck?: boolean
}) {
    return (<>
        <Head>
            <title>The Embankment</title>
            <meta charSet="utf-8" />
            <link rel="icon" href="/images/favicon.ico" type="image/x-icon" />
        </Head>
        <div className="page-loader page-loader-variant-1">
            <div>
                <img className='img-fluid' style={{ marginTop: '-20px', marginLeft: '-18px' }} width='330' height='67' src="/images/logo-bigEPC.png" alt='' />
                <div className="offset-top-41 text-center"><div className="spinner" /></div>
            </div>
        </div>
        <div className="page text-center">
            <header className="page-head slider-menu-position">
                <Nav cur={path} navStuck={navStuck} />
                {headerChildren}
            </header>
            {children}
            <Footer />
        </div>
        <div className="snackbars" id="form-output-global" />
        <Script src="/js/core.min.js" strategy="beforeInteractive" />
        <Script src="/js/script.js" />
        <Script src="/js/revolution.min.js" />
        {scripts?.map(src => <Script key={src} src={src} />)}
    </>)
}
