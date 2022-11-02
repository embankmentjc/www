import {ReactNode} from "react";
import moment from "moment/moment";
import {Brand} from "./theme";

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
            <div className="post-meta"><span className="icon-xxs mdi mdi-arrow-right"></span>
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
                <form className="rd-mailform" data-form-output="form-subscribe-footer" data-form-type="subscribe" method="post" action="/bat/rd-mailform.php">
                    <div className="form-group">
                        <div className="input-group input-group-sm">
                            <span className="input-group-prepend">
                                <span className="input-group-text input-group-icon">
                                    <span className="mdi mdi-email" />
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
                        <li><a href="/about">About</a></li>
                        <li><a href="/vision">Our Vision</a></li>
                        <li><a href="/involved">Get Involved</a></li>
                        <li><a href="/news">News + Events</a></li>
                        <li><a href="/involved#involved-section-donate">Donate</a></li>
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
            <h6 className="text-uppercase text-spacing-60"><a href="/news#news-section-recent">Latest news</a></h6>
            <PostWidget date="2022-11-01" dateStr="11/1/2022 – 12/16/2022" href="embankment-on-my-mind">
                <i>The Embankment on My Mind</i> exhibits original art from 43 artists responding to multiple aspects of the Harsimus Branch amp; Embankment, including its history and its promise.
            </PostWidget>
            <PostWidget date="2022-10-25" href="news#news-section-recent">
                Register for the 2022 Embankment Preservation Coalition annual meeting
            </PostWidget>
            <PostWidget date="2022-09-07" href="https://us02web.zoom.us/webinar/register/WN_P_MasqhtR0mTH5X30yCkcQ">
                <strong>Another community meeting</strong> on the Embankment Redevelopment Plan! Hosted by Jersey City Planning, register here.
            </PostWidget>
        </div>
    )
}

export function Footer() {
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
