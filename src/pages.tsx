import { ReactNode } from "react";

import Head from 'next/head'
import Script from 'next/script'
import {Footer} from "./footer";
import {Brand} from "./theme";
import navStyles from "../components/navbar.module.css";

function Nav({ cur, navStuck }: { cur: string, navStuck?: boolean }) {
    function MenuItem({ path, hash, text, }: {
        path: string
        hash: string
        text: string
    }) {
        let href = (path == cur) ? "" : path
        if (hash) {
            href += `#${hash}`
        }
        return <li key={href}><a href={href}><span className="text-middle">{text}</span></a></li>
    }

    function SubMenu({ path, text, hash, items }: {
        path: string
        text: string
        hash?: string
        items?: { hash: string, text: string }[]
    }) {
        let href = (path == cur) ? "" : path
        if (hash) {
            href += `#${hash}`
        }
        if (!href) {
            href = path
        }
        return (
            <li>
                <a href={href}><span>{text}</span></a>
                {
                    items &&
                    <ul className="rd-navbar-dropdown">{
                        items.map(({ hash, text }) => MenuItem({ path, hash, text }))
                    }</ul>
                }
            </li>
        )
    }

    function HeaderMenu() {
        return (
            <ul className="rd-navbar-nav">
                <SubMenu path="/" text="HOME" items={[
                    { hash: "home-section-what", text: "What is the Embankment?", },
                    { hash: "home-section-mission", text: "What are the Coalition's Goals?", },
                    { hash: "home-section-steps", text: "What are the Next Steps?", },
                ]} />
                <SubMenu path="about" text="ABOUT" items={[
                    { hash: "about-section-history", text: "The History", },
                    { hash: "about-section-coalition", text: "The Coalition", },
                ]} />
                <SubMenu path="vision" text="OUR VISION" items={[
                    { hash: "vision-section-bigpicture", text: "Our Philosophy", },
                    { hash: "vision-section-vision", text: "Harsimus Branch Vision", },
                    { hash: "vision-section-crossroads", text: "Jersey City Greenways", },
                    { hash: "vision-section-art", text: "Art for a Sustainable Future", },
                ]} />
                <SubMenu path="involved" text="GET INVOLVED" items={[
                    { hash: "involved-section-member", text: "Become a Member!", },
                    { hash: "involved-section-volunteer", text: "Volunteer", },
                    { hash: "involved-section-donate", text: "Donate", },
                    { hash: "involved-section-partners", text: "Our Partners", },
                ]} />
                <SubMenu path="news" text="NEWS + EVENTS" items={[
                    { hash: "news-section-recent", text: "News + Press", },
                    { hash: "news-section-subscribe", text: "Subscribe", },
                    { hash: "news-section-event", text: "Event Calendar", },
                ]} />
                <SubMenu path="involved" hash="involved-section-donate" text="DONATE" />
                <SubMenu path="involved" hash="involved-section-sponsors" text="SPONSORS" />
            </ul>
        )
    }

    return (
        <div className="rd-navbar-wrap">
            <nav
                className={`rd-navbar rd-navbar-default rd-atata rd-navbar-transparent ${navStuck ? navStyles["navbar-force-stuck"] : ""}`}
                data-md-device-layout="rd-navbar-fixed"
                data-lg-device-layout="rd-navbar-static"
                data-lg-auto-height="true"
                data-md-layout="rd-navbar-fixed"
                data-lg-layout="rd-navbar-static"
                data-lg-stick-up="true"
            >
                <div className={`rd-navbar-inner ${navStuck ? navStyles["rd-navbar-inner"] : ""}`}>
                    {/* RD Navbar Panel */}
                    <div className="rd-navbar-panel">
                        {/* RD Navbar Toggle */}
                        <button className="rd-navbar-toggle" data-rd-navbar-toggle=".rd-navbar, .rd-navbar-nav-wrap"><span /></button>
                        {/* Navbar Brand */}
                        <Brand className="rd-navbar-brand" />
                    </div>
                    <div className="rd-navbar-menu-wrap">
                        <div className="rd-navbar-nav-wrap">
                            <div className="rd-navbar-mobile-scroll">
                                <Brand className="rd-navbar-mobile-brand" />
                                <HeaderMenu />
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export function Page({ path, children, headerChildren, scripts, navStuck, }: {
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
