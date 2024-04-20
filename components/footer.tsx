import {ReactNode} from "react"
import moment from "moment/moment"
import {Brand} from "./theme"
import { newsItems } from "./news"
import A from "@rdub/next-base/a";
import { donateId, newsId } from "../components/ids";

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
        body = <A className="d-block" href={href}>{body}</A>
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
                        <li><a href="/now">Embankment NOW</a></li>
                        <li><a href="/vision">Our Vision</a></li>
                        <li><a href="/involved">Get Involved</a></li>
                        <li><a href="/news">News + Events</a></li>
                        <li><a href={`/involved#${donateId}`}>Donate</a></li>
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
            <h6 className="text-uppercase text-spacing-60"><a href={`/news#${newsId}`}>Latest news</a></h6>
            {
                newsItems.slice(0, 3).map((item, i) => (
                    <PostWidget key={i} date={item.date}>
                        <A href={`/news#${item.id}`}>{item.title}</A>
                        {
                            item.description &&
                            <div>{item.description}</div>
                        }
                    </PostWidget>
                ))
            }
        </div>
    )
}

export default function Footer() {
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
