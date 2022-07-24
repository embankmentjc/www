import moment from 'moment'
import { ReactNode } from "react";

import Head from 'next/head'
import Script from 'next/script'

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

    return (
        <div className="rd-navbar-wrap">
            <nav className="rd-navbar rd-navbar-default rd-atata rd-navbar-transparent" data-md-device-layout="rd-navbar-fixed" data-lg-device-layout="rd-navbar-static" data-lg-auto-height="true" data-md-layout="rd-navbar-fixed" data-lg-layout="rd-navbar-static" data-lg-stick-up="true">
                <div className="rd-navbar-inner">
                    {/* RD Navbar Panel */}
                    <div className="rd-navbar-panel">
                        {/* RD Navbar Toggle */}
                        <button className="rd-navbar-toggle" data-rd-navbar-toggle=".rd-navbar, .rd-navbar-nav-wrap"><span></span></button>
                        {/* Navbar Brand */}
                        <div className="rd-navbar-brand"><a href="/"><img style={{ marginTop: '-5px', marginLeft: '-15px' }} width='138' height='31' src='images/logo-lightEPC.png' alt='' /></a></div>
                    </div>
                    <div className="rd-navbar-menu-wrap">
                        <div className="rd-navbar-nav-wrap">
                            <div className="rd-navbar-mobile-scroll">
                                {/* Navbar Brand Mobile */}
                                <div className="rd-navbar-mobile-brand"><a href="embankment/index"><img style={{ marginTop: '-5px', marginLeft: '-15px' }} width='138' height='31' src='images/logo-lightEPC.png' alt='' /></a></div>
                                <div className="form-search-wrap">
                                    {/* RD Search Form */}
                                    <form className="form-search rd-search" action="search-results.html" method="GET">
                                        <div className="form-group">
                                            <label className="form-label form-search-label form-label-sm" htmlFor="rd-navbar-form-search-widget">Search</label>
                                            <input className="form-search-input input-sm form-control form-control-gray-lightest input-sm" id="rd-navbar-form-search-widget" type="text" name="s" autoComplete="off"/>
                                        </div>
                                        <button className="form-search-submit" type="submit"><span className="novi-icon mdi mdi-magnify"></span></button>
                                    </form>
                                </div>
                                {/* RD Navbar Nav */}
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
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
}

function PostWidget({ date, href, children, }: {
    date: string
    href?: string
    children: ReactNode
}) {
    const m = moment(date)
    let body = (
        <div className="unit-body">
            <div className="post-meta"><span className="novi-icon icon-xxs mdi mdi-arrow-right"></span>
                <time className="text-dark" dateTime={m.format("YYYY-MM-DD")}>{m.format("M/D/YYYY")}</time>
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

function Footer() {
    return (
        <footer className="section novi-background section-relative section-top-66 section-bottom-34 page-footer bg-black context-dark">
            <div className="container">
                <div className="row justify-content-sm-center text-xl-left grid-group-md">
                    <div className="col-sm-12 col-xl-3">
                        {/* Footer brand */}
                        <div className="footer-brand"><a href="/"><img style={{ marginTop: '-5px', marginLeft: '-15px' }} width='138' height='31' src='images/logo-lightEPC.png' alt=''/></a></div>
                        <p className="text-darker offset-top-4">The Future of Green Infrastructure</p>
                    </div>
                    <div className="col-sm-12 col-md-8 col-lg-5 col-xl-4 text-lg-left">
                        <h6 className="text-uppercase text-spacing-60">Newsletter</h6>
                        <p>Enter your e-mail and subscribe to our newsletter.</p>
                        <div className="offset-top-30">
                            <form className="rd-mailform" data-form-output="form-subscribe-footer" data-form-type="subscribe" method="post" action="api/email-signup">
                                <div className="form-group">
                                    <div className="input-group input-group-sm"><span className="input-group-prepend"><span className="input-group-text input-group-icon"><span className="novi-icon mdi mdi-email"></span></span></span>
                                        <input className="form-control" placeholder="Type your E-Mail" type="email" name="email" data-constraints="@Required @Email">
                                        </input>
                                        <span className="input-group-append">
                                    <button className="btn btn-sm btn-primary" type="submit">Subscribe</button>
                                </span>
                                    </div>
                                </div>
                                <div className="form-output" id="form-subscribe-footer"></div>
                            </form>
                        </div>
                    </div>
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
                    <div className="col-sm-7 text-sm-left col-lg-4 col-xl-3">
                        <a href="news#news-section-recent"><h6 className="text-uppercase text-spacing-60">Latest news</h6></a>

                        <PostWidget date="2022-05-18" href="https://us02web.zoom.us/webinar/register/WN_W2Kt62F0Qoe9CIZ8M8YWmA">
                            Register for a community meeting on the Embankment Redevelopment Plan, hosted by Jersey City Planning
                        </PostWidget>
                        <PostWidget date="2022-05-11" href="https://youtu.be/qxAHqzLqnoo">
                            Check out the new, updated Embankment Coalition video, including drone flyovers
                        </PostWidget>
                        <PostWidget date="2021-05-13">
                            Climate Change 2021: Challenges and Solutions (recordings: <a href="https://www.youtube.com/watch?v=TK754w-IPfU" target="_blank">part 1</a>,
                            <a href="https://www.youtube.com/watch?v=1rw7wIAgqZY" target="_blank">part 2</a>)
                        </PostWidget>
                    </div>
                </div>
            </div>
            <div className="container offset-top-50">
                <p className="small text-darker">Embankment Preservation Coalition &copy; <span className="copyright-year"></span>  {/* <a href="privacy.html">Privacy Policy</a>  */}
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
            <div><img className='img-fluid' style={{ marginTop: '-20px', marginLeft: '-18px' }} width='330' height='67' src='images/logo-bigEPC.png' alt='' />
                <div className="offset-top-41 text-center">
                    <div className="spinner"></div>
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

            {/* Page Footer */}
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
