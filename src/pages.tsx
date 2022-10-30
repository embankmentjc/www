import moment from 'moment'
import { ReactNode } from "react";

import Head from 'next/head'
import Script from 'next/script'

function Brand({ className }: { className: string }) {
    return (
        <div className={className}>
            <a href="/">
                <img style={{ marginTop: '-5px', marginLeft: '-15px' }} width='138' height='31' src="images/logo-lightEPC.png" alt="" />
            </a>
        </div>
    )
}

function Nav({ cur }: { cur: string }) {
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
                    items
                    ? <ul className="rd-navbar-dropdown">
                        {
                            items.map(({ hash, text }) => MenuItem({ path, hash, text }))
                        }
                    </ul>
                    : null
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
                className="rd-navbar rd-navbar-default rd-atata rd-navbar-transparent"
                data-md-device-layout="rd-navbar-fixed"
                data-lg-device-layout="rd-navbar-static"
                data-lg-auto-height="true"
                data-md-layout="rd-navbar-fixed"
                data-lg-layout="rd-navbar-static"
                data-lg-stick-up="true"
            >
                <div className="rd-navbar-inner">
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

function PostWidget({ date, dateStr, href, children, }: {
    date: string
    dateStr?: string
    href?: string
    children: ReactNode
}) {
    const m = moment(date)
    dateStr = dateStr || m.format("M/D/YYYY")
    let body = (
        <div className="unit-body">
            <div className="post-meta"><span className="novi-icon icon-xxs mdi mdi-arrow-right"></span>
                <time className="text-dark" dateTime={m.format("YYYY-MM-DD")}>{dateStr}</time>
            </div>
            <div className="post-title">
                <h6 className="text-regular">
                    {children}
                </h6>
            </div>
        </div>
    )

    if (href) {
        body = <a className="d-block" href={href} target="_blank">{body}</a>
    }

    return (
        <article className="post widget-post text-left text-picton-blue">
            <div className="unit flex-row unit-spacing-xs align-items-center">
                {body}
            </div>
        </article>
    )
}

function FooterBrand() {
    return (
        <div className="col-sm-12 col-xl-3">
            <Brand className="footer-brand" />
            <p className="text-darker offset-top-4">The Future of Green Infrastructure</p>
        </div>
    )
}

function NewsletterSignup() {
    return (
        <div className="col-sm-12 col-md-8 col-lg-5 col-xl-4 text-lg-left">
            <h6 className="text-uppercase text-spacing-60">Newsletter</h6>
            <p>Enter your e-mail and subscribe to our newsletter.</p>
            <div className="offset-top-30">
                <form className="rd-mailform" data-form-output="form-subscribe-footer" data-form-type="subscribe" method="post" action="api/email-signup">
                    <div className="form-group">
                        <div className="input-group input-group-sm">
                            <span className="input-group-prepend">
                                <span className="input-group-text input-group-icon">
                                    <span className="novi-icon mdi mdi-email" />
                                </span>
                            </span>
                            <input className="form-control" placeholder="Type your E-Mail" type="email" name="email" data-constraints="@Required @Email" />
                            <span className="input-group-append">
                                <button className="btn btn-sm btn-primary" type="submit">Subscribe</button>
                            </span>
                        </div>
                    </div>
                    <div className="form-output" id="form-subscribe-footer" />
                </form>
            </div>
        </div>
    )
}

function UsefulLinks() {
    return (
        <div className="col-sm-5 col-lg-3 col-xl-2 text-sm-left">
            <h6 className="text-uppercase text-spacing-60">Useful Links</h6>
            <div className="d-block">
                <div className="d-inline-block">
                    <ul className="list list-marked">
                        <li><a href="/">Home</a></li>
                        <li><a href="about">About</a></li>
                        <li><a href="vision.html">Our Vision</a></li>
                        <li><a href="involved">Get Involved</a></li>
                        <li><a href="news">News + Events</a></li>
                        <li><a href="involved#involved-section-donate">Donate</a></li>
                        <li><a href="mailto:embankmentJC@gmail.com">Contact Us</a></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

function LatestNews() {
    return (
        <div className="col-sm-7 text-sm-left col-lg-4 col-xl-3">
            <a href="news#news-section-recent"><h6 className="text-uppercase text-spacing-60">Latest news</h6></a>

            <PostWidget date="2022-10-25" href="news#news-section-recent">
                Register for the 2022 Embankment Preservation Coalition annual meeting
            </PostWidget>
            <PostWidget date="2022-11-01" dateStr="11/1/2022 – 12/16/2022" href="./embankment-on-my-mind.html">
                <i>The Embankment on My Mind</i> exhibits original art from 43 artists responding to multiple aspects of the Harsimus Branch amp; Embankment, including its history and its promise.
            </PostWidget>
            <PostWidget date="2022-09-07" href="https://us02web.zoom.us/webinar/register/WN_P_MasqhtR0mTH5X30yCkcQ">
                <strong>Another community meeting</strong> on the Embankment Redevelopment Plan! Hosted by Jersey City Planning, register here.
            </PostWidget>
        </div>
    )
}

function Footer() {
    return (
        <footer className="section section-relative section-top-66 section-bottom-34 page-footer bg-black context-dark">
            <div className="container">
                <div className="row justify-content-sm-center text-xl-left grid-group-md">
                    <FooterBrand />
                    <NewsletterSignup />
                    <UsefulLinks />
                    <LatestNews />
                </div>
            </div>
            <div className="container offset-top-50">
                <p className="small text-darker">
                    Embankment Preservation Coalition © <span className="copyright-year" />
                </p>
            </div>
        </footer>
    )
}

export function Page({ path, children, headerChildren, }: {
    path: string
    children: ReactNode
    headerChildren?: ReactNode
}) {
    return (
        <>
            <Head>
                <title>The Embankment</title>
                <meta charSet="utf-8" />
                <link rel="icon" href="../images/favicon.ico" type="image/x-icon" />
            </Head>
            <div className="page-loader page-loader-variant-1">
                <div>
                    <img className='img-fluid' style={{ marginTop: '-20px', marginLeft: '-18px' }} width='330' height='67' src='images/logo-bigEPC.png' alt='' />
                    <div className="offset-top-41 text-center">
                        <div className="spinner" />
                    </div>
                </div>
            </div>
            <div className="page text-center">
                {/* Page Head */}
                <header className="page-head slider-menu-position">
                    {/* RD Navbar Transparent */}
                    <Nav cur={path} />
                    {headerChildren}
                </header>

            {children}

            <Footer />
        </div>
        {/* Global RD Mailform Output */}
        <div className="snackbars" id="form-output-global"></div>
        <Script src="../js/core.min.js" strategy="beforeInteractive"></Script>
        <Script src="../js/script.js"></Script>
        <Script src="../js/revolution.min.js"></Script>
    </>
    )
}
