
import Page from "../components/page"
import React, {ReactNode} from "react";

import {Banner, ParallaxHeader, ParallaxSection1, Section} from "../components/theme";
import moment from "moment/moment";
import { becomeMemberId, events2024, events2025, newsId } from "../components/ids";
import css from "./2024-events.module.scss";
import A from "@rdub/next-base/a";
import { Author, newsItems, Pretitle, NewsItem, } from "../components/news";
import { Events2025 } from "./2025-events";

function NewsletterSubscribe() {
    return (
        <section id="news-section-subscribe" className="section parallax-container context-light" data-parallax-img="/images/NEWS-SUBSCRIBE.jpg">
            <div className="parallax-content section-98 section-md-110 bg-overlay-white">
                <div className="container">
                    <h1>Subscribe to Our Newsletter</h1>
                    <hr className="divider bg-mantis" />
                    <div className="row justify-content-sm-center offset-top-20">
                        <div className="col-sm-10 col-xl-6">
                            <p>Stay informed about the Harsimus Branch and events sponsored by the Embankment Preservation Coalition and other preservation and conservation allies by subscribing to our newsletter. You will receive the Coalition online newsletter
                                and occasional alerts and notices. We do not share your contact information with others, and we promise not to inundate you with email. You can also unsubscribe at any time.</p>
                            {/* Call to action type 1 */}
                            <form className="rd-mailform" data-form-output="form-subscribe-footer" data-form-type="subscribe" method="post" action="bat/rd-mailform.php">
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
                </div>
            </div>
        </section>
    )
}

type Img = { src: string, alt: string }

function ConnectItem({ title, href, id, subtitle, img, footer, children, }: {
    title: string
    href?: string
    id: string
    subtitle?: string
    img?: Img
    footer?: ReactNode
    children: ReactNode
}) {
    return <>
        <hr />
        <article className="post post-event">
            {
                img &&
                <header className="post-media">
                    <div data-lightgallery="group">
                        <a className="thumbnail-classic" data-lightgallery="item" href={img.src}>
                            <figure>
                                <img width="570" height="321" src={img.src} alt={img.alt} />
                            </figure>
                        </a>
                    </div>
                </header>
            }
            <section className="post-content text-left offset-top-41">
                <h3 className="offset-top-10"><a id={id} href={href} target="_blank">{title}</a></h3>
                {subtitle && <h6 className="offset-top-5">{subtitle}</h6>}
                <div className="post-body">
                    {children}
                    <footer className="offset-top-50 text-md-center clearfix">{footer}</footer>
                </div>
            </section>
        </article>
    </>
}

// Post authors
const epc = { name: "Embankment.org", src: "/images/favicon.ico", alt: "Embankment.org logo", }

function UpcomingEvents() {
    return <>
        <Section id={events2025} title={"2025 Events"} className={css.section}>
            <div className={`row justify-content-md-center ${css.row}`}>
                <div className="col-md-10 col-lg-8 col-xl-7">
                    <div className="inset-left-0 inset-lg-right-20">
                        <Events2025 />
                    </div>
                </div>
            </div>
        </Section>
    </>
}

function NewsItem({ id, title, pretitle, date, dateStr, center, href, src, alt, author = epc, children }: NewsItem) {
    const m = moment(date)
    dateStr = dateStr || m.format('D MMM Y')
    return (<>
        <div className="post-modern-timeline-date text-md-left" style={{position: "relative",}}>
            {<span id={id} style={{ position: "absolute", top: "-5em", }}></span>}
            <a href={`#${id}`}><time dateTime={date}>{dateStr}</time></a>
        </div>
        <article className={`post post-modern post-modern-timeline post-modern-timeline-left ${css.newsItem}`}>
            {
                src &&
                <header className="post-media">
                    <a href={href} target="_blank">
                        <img className="img-fluid img-cover" width="570" height="321" src={src} alt={alt}/>
                    </a>
                </header>
            }
            <section className={`post-content text-${center ? "center" : "left"}`}>
                {pretitle && <Pretitle {...pretitle} />}
                {
                    title &&
                    <div className="post-title">
                        <h6 className={`offset-top-24 ${css.title}`}>{
                            href ? <A href={href}>{title}</A> : title
                        }</h6>
                    </div>
                }
                {children && <div className="post-body offset-top-20">{children}</div>}
                <Author {...author} />
            </section>
        </article>
    </>)
}

function NewsFeed() {
    return (
        <Section id={newsId} title={"News + Press"}>
            <div className="row justify-content-md-center">
                <div className="col-md-10 col-lg-8 col-xl-7">
                    <div className="inset-left-0 inset-lg-right-20">{
                        newsItems.map((item, idx) => <NewsItem key={idx} {...item} />)
                    }</div>
                </div>
            </div>
        </Section>
    )
}

function Connect() {
    return (
        <Section>
            <div className="row justify-content-sm-center">
                <div className="col-lg-8">
                    <div className="inset-lg-right-20">
                        <ConnectItem
                            title={"Request a Presentation"}
                            href={"mailto:embankmentJC@gmail.com"}
                            id={"connect"}
                            subtitle={"Location: Zoom Meeting | Time: 7:00-8:00pm"}
                            img={{ src: "/images/ABOUT-6TH.jpg", alt: "Old aerial photo of Jersey City, 6th St. highlighted", }}
                            footer={
                                <div className="group">
                                    <a className="btn btn-danger btn-icon btn-icon-left" href="mailto:embankmentJC@gmail.com">
                                        <span className="icon icon-xs mdi mdi-check"></span>Make Request
                                    </a>
                                </div>
                            }
                        >
                            <p>The Embankment Preservation Coalition can tailor a presentation to your organization's interests, whether it's Harsimus Branch and Embankment railroad history, our ecological vision for park and trail design, or our advocacy for a trail system throughout the City that would enable every resident to be within ten minutes of a safe, off-road walking and biking trail.</p>
                            <p>Our work is all about making connections - so, with apologies to E.M. Forster, only connect with us! To request a presentation, email the Coalition with your proposal and, if you can, give us several options for dates and times.</p>
                        </ConnectItem>
                        <ConnectItem
                            title={"Accessibility / Special Requests"}
                            id={"accessibility"}
                        >
                            <p>The Embankment Coalition seeks to accommodate at our events people of varied abilities, within the limits of our resources.  If you require special accommodations, please contact us at least two weeks in advance of an event at embankmentjc@gmail.com or call 201-963-0232 and leave a message.  Please include your contact information and the best ways and times to contact you. Suggestions on how to make our events more accessible are also welcomed!  Thank you.</p>
                        </ConnectItem>
                    </div>
                </div>
            </div>
        </Section>
    )
}

export default function Body() {
    return (
        <Page
            path="news"
            headerChildren={
                <ParallaxHeader
                    title={"News + Events"}
                    subtitle={"Get up to date on the Harsimus Branch and Embankment news and events - then help us write the next chapter!"}
                    img={"/images/NEWS-BANNER.jpg"}
                    btn1={{ text: "Upcoming Events", href: `#${events2025}`, }}
                    btn2={{ text: "Become a Member!", href: `/involved#${becomeMemberId}`, }}
                />
            }
        >
            <UpcomingEvents />
            <NewsFeed />
            <NewsletterSubscribe />
            <Banner id={"news-section-connect"} title={"Get in Touch"} icon={"email"} />
            <Connect />
            <ParallaxSection1
                title={<a href={`/involved#${becomeMemberId}`}>Become a Member!</a>}
                img={"/images/HOME-SLIDER1.jpg"}
            />
        </Page>
    )
}
