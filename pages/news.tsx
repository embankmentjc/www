
import { Page } from "../src/pages"
import React, {ReactNode} from "react";

import {Banner, ParallaxHeader, ParallaxSection1, Section} from "../src/theme";
import moment from "moment/moment";

function NewsletterSubscribe() {
    return (
        <section id="news-section-subscribe" className="section parallax-container context-light" data-parallax-img="images/NEWS-SUBSCRIBE.jpg">
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

type Author = { name: string, src: string, alt?: string }
function Author({ name, src, alt }: Author) {
    return (
        <div className="post-author">
            <div className="post-author-img">
                <img className="rounded-circle" width="45" height="45" src={src} alt={alt} />
            </div>
            <div className="post-author-name text-middle">{name}</div>
        </div>
    )
}

// Post authors
const epc = { name: "Embankment.org", src: "/images/favicon.ico", alt: "Embankment.org logo", }
const change = { name: "Change.org", src: "/images/logo_change.jpg", alt: "change.org logo", }
const jj = { name: "Jersey Journal", src: "/images/logo_jersey.jpg", alt: "nj.com logo", }
const starLedger = { name: "The Star-Ledger", src: "/images/logo_star.jpg", alt: "Star-Ledger logo", }

function ReadArticle({ href, text }: { href: string, text?: string }) {
    return (
        <div className="post-tags group-xs">
            <a className="label-custom label-lg-custom label-rounded-custom label-primary" href={href} target="_blank">{text || "Read Article"}</a>
        </div>
    )
}

type Pretitle = { title: ReactNode, icon: string }
function Pretitle({ title, icon }: Pretitle) {
    if (typeof title === "string") {
        title = <p>{title}</p>
    }
    return (
        <ul className="list-inline">
            <li className="list-inline-item">{title}</li>
            <li className="list-inline-item">
                <div className={`icon icon-xxs text-dark mdi mdi-${icon}`} />
            </li>
        </ul>
    )
}

type NewsItem = {
    title?: ReactNode
    pretitle?: Pretitle
    date: string
    dateStr?: string
    center?: boolean
    href?: string
    src?: string
    alt?: string
    author?: Author
    children?: ReactNode
}
function NewsItem({ title, pretitle, date, dateStr, center, href, src, alt, author = epc, children }: NewsItem) {
    const m = moment(date)
    dateStr = dateStr || m.format('D MMM Y')
    return (<>
        <div className="post-modern-timeline-date text-md-left">
            <time dateTime={date}>{dateStr}</time>
        </div>
        <article className="post post-modern post-modern-timeline post-modern-timeline-left">
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
                {title && <div className="post-title"><h6 className="offset-top-24">{title}</h6></div>}
                {children && <div className="post-body offset-top-20">{children}</div>}
                <Author {...author} />
            </section>
        </article>
    </>)
}

function NewsFeed() {
    const items: NewsItem[] = [
        {
            date: "2022-10-25",
            title: <a href="https://www.eventbrite.com/e/embankment-preservation-coalition-annual-meeting-registration-430408943737">Embankment Preservation Coalition Annual Meeting</a>,
            center: true,
            src: "/images/embankment-annual-mtng-img.jpeg", alt: "Oblique aerial view of the embankment",
            href: "https://www.eventbrite.com/e/embankment-preservation-coalition-annual-meeting-registration-430408943737",
            children: (<>
                <p>Tuesday, October 25, 2022 at 7pm</p>
                <p><a href="https://www.eventbrite.com/e/embankment-preservation-coalition-annual-meeting-registration-430408943737"><strong>Register here</strong> for a link to the online meeting, featuring:</a></p>
                <ul style={{ listStyle: "none", paddingLeft: 0, }}>
                    <li>Guest Speaker:</li>
                    <li>Annisia Cialone, Director of Housing, Economic Development and Commerce,</li>
                    <li>City of Jersey City</li>
                </ul>
                <p>Up-to-the-Minute Embankment Status Updates</p>
                <p>Meet Our New Board Members</p>
            </>)
        },
        {
            date: "2022-11-01", dateStr: "1 Nov – 16 Dec 2022",
            title: <a href="/embankment-on-my-mind"><i>The Embankment On My Mind</i> Exhibition</a>,
            src: "/images/teomm/teomm-banner.jpeg", alt: "The Embankment On My Mind exhibition", href: "/embankment-on-my-mind", children: (<>
                <p><strong>Location:</strong> New Jersey City University Lemmerman and Visual Arts Galleries (<a href="https://goo.gl/maps/Ka1XAeVHwgB2GWEw7">map</a>)</p>
                <p>
                    <a href="/embankment-on-my-mind"><i>The Embankment On My Mind</i></a> exhibits original art inspired by the grassroots preservation initiative that holds the promise of transforming Jersey City's treatment of open space and an emerging trail system. Sixteen artists depicting local flora and fauna join twenty-seven artists with wide-ranging responses to the Harsimus Branch Embankment, the massive stone rail structure in Downtown Jersey City that the Embankment Coalition has been working to preserve.
                </p>
                <ul style={{ listStyle: "none", padding: "0 1rem"}}>
                    <li><strong>Reception:</strong> November 5, 3:00 pm - 6:00 pm (both galleries)</li>
                    <li><strong>Panel Discussion:</strong> November 22, 4:30 pm - 6:30 pm (202 Gothic Lounge, <a href="https://goo.gl/maps/ovbzB9ZjHMS9dEsG8" target="_blank">Hepburn Hall</a> and virtual), “The Embankment on My Mind: Bridging Science and Art”</li>
                    <li><strong>JC Fridays extended hours:</strong> December 2, 11 am – 7 pm</li>
                    <li><strong>Closing Reception:</strong> December 16, 4:00 pm - 6:00 pm (both galleries)</li>
                </ul>
            </>)
        },
        {
            date: "2022-09-07",
            title: <a href="https://us02web.zoom.us/webinar/register/WN_P_MasqhtR0mTH5X30yCkcQ" target="_blank">
                Embankment Redevelopment Plan – Community Meeting
            </a>,
            src: "/images/sept-7-redevelopment-mtng.jpeg", alt: "Embankment community meeting flyer",
            href: "https://us02web.zoom.us/webinar/register/WN_P_MasqhtR0mTH5X30yCkcQ",
            children: (<>
                <p>Support <a href="/vision#design">the Embankment Coalition's <strong>"light touch" vision</strong></a> for treatment of the Harsimus BranchEmbankment at an upcoming Jersey City Planning Department meeting,Wednesday, Sept. 7, 6:30-8:30 pm.  <a href="https://us02web.zoom.us/webinar/register/WN_P_MasqhtR0mTH5X30yCkcQ" target="_blank"><strong>Register here.</strong></a></p>
                <p>City Planners will be rolling out an Embankment Redevelopment Plan focused on the open space of Blocks 2-8 of the Embankment property from the west side of Manila Avenue to beyond Newark Avenue near the Turnpike Extension.  Help ensure that the future for the Embankment is historic preservation, conservation of what has become an ecological corridor, and connectivity of neighborhoods to a regional carbon-free transportation network.</p>
            </>)
        },
        {
            date: "2022-05-18", title: "Embankment Redevelopment Plan – Community Meeting",
            src: "/images/EMBANKMENT%20REDEVELOPMENT%20PLAN%20CITY%20HEARING.jpg", alt: "Embankment community meeting flyer",
            href: "https://us02web.zoom.us/webinar/register/WN_W2Kt62F0Qoe9CIZ8M8YWmA",
            children: (
                <a href="https://us02web.zoom.us/webinar/register/WN_W2Kt62F0Qoe9CIZ8M8YWmA" target="_blank">
                    <p>Give your opinion on development + bulk regulation plans!</p>
                    <p>Jersey City Planning is hosting a community meeting to discuss Embankment redevelopment plans. Register and make your voice heard!</p>
                </a>
            )
        },
        {
            date: "2022-05-11", title: "Check out the new, updated drone flyover video about the Embankment and East Coast Greenway!",
            src: "/images/embankment-annual-mtng-img.jpeg", alt: "Oblique aerial view of the embankment",
            href: "https://youtu.be/qxAHqzLqnoo",
        },
        {
            date: "2022-05-13", dateStr: "29 April + 13 May 2021", title: "Climate Change 2021: Challenges and Solutions (4/29, 5/13)",
            src: "/images/climate-talk.jpeg", href: "https://www.youtube.com/watch?v=TK754w-IPfU", children: (<>
                <p>Join the EPC &amp; other civic orgs for Climate Change 2021: Challenges and Solutions. Dr. D. James Baker will explain the challenges 4/29, 7pm and then solutions &amp; what we can do 5/13, 7pm.</p>
                <p>Watch the recordings: <a href="https://www.youtube.com/watch?v=TK754w-IPfU" target="_blank">part 1</a>, <a href="https://www.youtube.com/watch?v=1rw7wIAgqZY" target="_blank">part 2</a>.</p>
            </>)
        },
        {
            date: "2021-03-17", title: "Rails to Trails Grant Award",
            src: "/images/rails-to-trails-article.jpeg", href: "https://www.railstotrails.org/trailblog/2021/march/15/2021-trail-grants-awardees-support-community-connections-on-and-off-trails/", children: (<>
                <p>The EPC joins nine other recipients of a 2021 <a href="https://www.railstotrails.org/">Rails-to-Trails Conservancy</a> grant to advance trails throughout the country. The Harsimus Branch &amp; Embankment will eventually connect with the Essex-Hudson Greenway, which also garnered a grant for its advocates, the NJ Bike&Walk Coalition.</p>
                <p><a href="https://www.railstotrails.org/trailblog/2021/march/15/2021-trail-grants-awardees-support-community-connections-on-and-off-trails/" target="_blank">Click here to read more.</a></p>
            </>)
        },
        {
            date: "2021-02-02", title: "Essex-Hudson County Greenway presentation",
            src: "/images/essex-hudson-greenway.jpg", href: "https://youtu.be/ciznhv7ZmZM", children: (<>
                <p>In a meeting hosted by the Embankment Coalition and numerous environmental organizations, Deb Kagan of the NJ Bike &amp; Walk Coalition described the proposed Essex-Hudson Greenway.</p>
                <p><a href="https://youtu.be/ciznhv7ZmZM" target="_blank">Click here to watch recording of the event,</a> then <a href="https://www.essexhudsongreenway.org/support/"><strong>sign on to a support letter</strong>.</a></p>
            </>)
        },
        {
            date: "2020-11-18", title: "Mayor Steven Fulop was the Featured Speaker at Coalition Annual Members Meeting",
            src: "/images/HOME-HISTORIC-WALL.jpg", href: "https://youtu.be/6G-ZsU40Uh8", children: (<>
                <p>The Embankment Coalition and Mayor Fulop gave an update on the Vision and an overview of the terms and status of the possible Settlement</p>
                <p><a href="https://youtu.be/6G-ZsU40Uh8" target="_blank"><span className="text-middle">--- Click Here to Watch Recording of the Event ---</span></a></p>
            </>)
        },
        {
            date: "2020-10-03", title: "Embankment Neighborhood Cleanup",
            src: "/images/cleanup.jpg", children: (<>
                <p>The Embankment Coalition organized the Harsimus Cove Neighborhood Cleanup in partnership with Ward E Councilman James Solomon and the nonprofits CleanGreenJersey City and Adopt-a-Block.</p>
            </>)
        },
        {
            date: "2020-09-10", title: <a href="https://prod.stb.gov/news-communications/latest-news/pr-20-11/" target="_blank">STB Draft Supplemental Environmental Assessment Issued</a>,
            children: (<>
                <p>The Surface Transportation Board (STB) is moving ahead with environmental and historic preservation reviews that are part of its federally mandated process when considering a potential permit to abandon a railroad.</p>
                <p>The STB will meet (virtually) in October with previously designated consulting parties, including the Coalition, to discuss potential adverse effects on historic assets if an abandonment permit for the Harsimus Branch is granted. This is a step in a process mandated by the National Historic Preservation Act (NHPA). To fulfill obligations under the National Environmental Protection, the STB also issued a Supplementary Environmental Assessment (EA), to which the Coalition will be responding.</p>
            </>)
        },
        {
            date: "2017-06-04", title: "Coalition Petition to STB Gets 2,588 Signatures",
            pretitle: { title: "Public Movement", icon: "checkbox-marked-circle-outline" },
            src: "/images/NEWS-PETITION.jpg", author: change,
            children: <p>A petition asking the Surface Transportation Board to carry out its preservation obligations received 2,588 signatures before the Embankment Preservation Coalition closed it.</p>,
        },
        {
            date: "2013-10-03", title: <a href="https://www.nj.com/hudson/2013/10/jersey_city_officials_hailing_embankment_ruling_as_clear_win.html" target="_blank">Jersey City Officials Hailing Embankment Ruling as 'Clear Win'</a>,
            pretitle: {
                title: <ReadArticle href={"https://www.nj.com/hudson/2013/10/jersey_city_officials_hailing_embankment_ruling_as_clear_win.html"} />,
                icon: "pen",
            },
            author: jj,
            children: <p>A federal judge last week ruled that the Sixth Street Embankment in Jersey City is indeed a rail line, a decision that city officials believe could lead to the city someday owning the disputed property.</p>,
        },
        {
            date: "2012-06-22", title: <a href="https://blog.nj.com/nj_off-road_biking/2012/06/dont_miss_these_photos_from_the_grand_opening_of_the_ecg_link_between_jersey_city_and_newark.html" target="_blank">Grand Opening of the ECG Link Between Jersey City & Newark</a>,
            pretitle: {
                title: <ReadArticle href={"https://blog.nj.com/nj_off-road_biking/2012/06/dont_miss_these_photos_from_the_grand_opening_of_the_ecg_link_between_jersey_city_and_newark.html"} />,
                icon: "bike",
            },
            src: "/images/NEWS-LINK.jpg", author: starLedger,
            children: <p>On Friday, the East Coast Greenway Alliance held a grand opening and Ribbon Cutting Ceremony at Lincoln Park in Jersey City to celebrate the bridging of the greenway gap between Jersey City and Newark.</p>,
        },
    ]
    return (
        <Section id={"news-section-recent"} title={"News + Press"}>
            <div className="row justify-content-md-center">
                <div className="col-md-10 col-lg-8 col-xl-7">
                    <div className="inset-left-0 inset-lg-right-20">{
                        items.map(item => <NewsItem {...item} />)
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
                    btn1={{ text: "Recent Headline", href: "#news-section-recent", }}
                    btn2={{ text: "Become a Member!", href: "/involved#involved-section-member", }}
                />
            }
        >
            <NewsFeed />
            <NewsletterSubscribe />
            <Banner id={"news-section-connect"} title={"Get in Touch"} icon={"email"} />
            <Connect />
            <ParallaxSection1
                title={<a href="/involved#involved-section-member">Become a Member!</a>}
                img={"images/HOME-SLIDER1.jpg"}
            />
        </Page>
    )
}
