import { registerUrl } from "./modal";
import { signupId, visionId } from "./ids";
import React, { ReactNode } from "react";
import { MailTo } from "./mailto";

export const change = { name: "Change.org", src: "/images/logo_change.jpg", alt: "change.org logo", }
export const jj = { name: "Jersey Journal", src: "/images/logo_jersey.jpg", alt: "nj.com logo", }
export const starLedger = { name: "The Star-Ledger", src: "/images/logo_star.jpg", alt: "Star-Ledger logo", }

export function ReadArticle({ href, text }: { href: string, text?: string }) {
    return (
        <div className="post-tags group-xs">
            <a className="label-custom label-lg-custom label-rounded-custom label-primary" href={href} target="_blank">{text || "Read Article"}</a>
        </div>
    )
}

export type Author = { name: string, src: string, alt?: string }
export function Author({ name, src, alt }: Author) {
    return (
        <div className="post-author">
            <div className="post-author-img">
                <img className="rounded-circle" width="45" height="45" src={src} alt={alt} />
            </div>
            <div className="post-author-name text-middle">{name}</div>
        </div>
    )
}

export type Pretitle = { title: ReactNode, icon: string }
export function Pretitle({ title, icon }: Pretitle) {
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

export type NewsItem = {
    id: string
    title?: ReactNode
    pretitle?: Pretitle
    description?: ReactNode
    date: string
    dateStr?: string
    center?: boolean
    href?: string
    src?: string
    alt?: string
    author?: Author
    children?: ReactNode
}

export const newsItems: NewsItem[] = [
    {
        id: "cleanup",
        title: "Embankment Cleanup",
        date: "2024-05-11",
        description: "meet at 6th and Jersey Avenue",
        children: "Join the Embankment Coalition and Ward E Councilman James Solomon for a cleanup of the area around the Embankment.",
    },
    {
        id: "jc-and-its-railroads",
        title: "Jersey City and Its Railroads: They Covered the Waterfront and Helped Shape a Nation",
        date: "2024-05-05",
        description: "Grace Church Van Vorst, 39 Erie Street (entrance on 2nd St).",
        children: <>The Embankment Coalition is observing Preservation Month with two presentations on rail and local history by Bennett Levin. Bennett is a retired professional engineer and former Commissioner, Department of Licenses and Inspections for the City of Philadelphia, as well as a former member of the Historic Preservation Commission there, among other pursuits. A rail line preservationist and founder of a company that rebuilds and restores locomotives, Bennett acquired a lifelong interest in all-things-rail through visits to his grandmother's house on 5th Street adjacent to the Harsimus Branch. Reserve a place for this talk, "The Blessings of Geography" by emailing <MailTo to="embankmentjc@gmail.com"/> and specifying May 5th . It will be followed on May 19th by Bennett’s recollections of our neighborhood; see below.</>,
    },
    {
        id: "earth-day",
        title: "Earth Day at Jersey City Lincoln Park",
        date: "2024-04-20",
        description: "West Side Avenue Entrance.",
        children: `Demonstrate your support for environmental protection. Bring the kids for a day of fun and information on how the environment is being addressed in Hudson County. The Embankment Coalition will be tabling with members of the Jersey City Parks Coalition and other environmental groups, at this Hudson County Improvement Authority event. We’ll be rolling out a new "Embankment Now" campaign there.`,
    },
    {
        date: "2023-11-01", id: "2023-annual-mtng",
        title: <strong>Attend the Embankment Coalition's Annual Meeting!</strong>,
        description: "Grace Church Van Vorst",
        center: true,
        src: "/images/embankment-annual-mtng-img.jpeg", alt: "Oblique aerial view of the embankment",
        href: registerUrl,
        children: <>
            <ul style={{ listStyle: "none", paddingLeft: 0 }}>
                <li>Wednesday, November 1, 2023, 7pm</li>
                <li><a target={"_blank"} href={"https://www.gracevanvorst.org/"}>Grace Church Van Vorst</a></li>
                <li><a target={"_blank"} href={"https://maps.app.goo.gl/fJRv7b81QBir98Fm7"}>39 Erie St, Jersey City, NJ (enter on 2nd Street)</a></li>
            </ul>
            <p><a target={"_blank"} href={registerUrl}><strong>Click to email your RSVP to embankmentjc@gmail.com</strong></a></p>
            <ul style={{ listStyle: "none", paddingLeft: 0 }}>
                <li><strong>Updates from EPC Board Members:</strong></li>
                <li>Project Status - Federal and local efforts</li>
                <li>Designing Our Future</li>
                <li>What you can do to help</li>
            </ul>
            <p><a href={`/involved#${signupId}`}><strong>Sign up for our email list</strong></a> to stay informed.</p>
        </>
    },
    {
        date: "2023-09-28", id: "2023-09-28-stb",
        title: <strong>Surface Transportation Board online meeting</strong>,
        description: <p>
            Online Public Meeting re National Historic Preservation Act Section 106 Review of Conrail's Proposed Abandonment of Harsimus Branch (Docket No. AB-167, Sub.no. 1189X), Hosted by Surface Transportation Board Office of Environmental Analysis.
        </p>,
        center: true,
        // src: "",
        // href: registerUrl,
        children: (<>
            <p>
                Thurs, September 28, 2023, 5-9pm; see these docs for guidance on commenting:
            </p>
            <ul style={{listStyle: "none", paddingLeft: 0}}>
                <li><a target={"_blank"} href={"/STB-notice.pdf"}><strong>Embankment Coalition Notice: What to Tell the STB</strong></a></li>
                <li><a target={"_blank"} href={"/STB-comments.pdf"}><strong>Embankment Coalition Guidance on Comments to the STB</strong>.</a></li>
            </ul>
            <p>
                Online Public Meeting re National Historic Preservation Act Section 106 Review of Conrail's Proposed Abandonment of Harsimus Branch (Docket No. AB-167, Sub.no. 1189X), Hosted by Surface Transportation Board Office of Environmental Analysis.
            </p>
            <p>
                The Section 106 process is designed to consider ways to "avoid, minimize, or mitigate" adverse effects to historic resources that are subject to federal permits. To date, in a <a target={"_blank"} href={"/STB-MOA.pdf"}><strong>draft Memorandum of Agreement</strong></a>, OEA is suggesting documentation and signage as mitigation. We are calling for OEA to consider ways to preserve the historic resource, not presume its demolition and memorialize it.
            </p>
            <p>
                The Embankment Coalition has worked tirelessly to preserve the Harsimus Branch & Embankment
                in Jersey City for historically compatible uses of open space, trail, and future light rail. Now we need your help!
            </p>
            <p><a href={`/involved#${signupId}`}><strong>Sign up for our email list</strong></a> to stay informed.</p>
        </>)
    },
    {
        date: "2022-10-25", id: "2022-annual-mtng",
        title: "Embankment Preservation Coalition Annual Meeting",
        description: (
            <ul style={{listStyle: "none", paddingLeft: 0,}}>
                <li>Guest Speaker:</li>
                <li>Annisia Cialone, Director of Housing, Economic Development and Commerce,</li>
                <li>City of Jersey City</li>
            </ul>
        ),
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
        date: "2022-11-01", dateStr: "1 Nov – 16 Dec 2022", id: "2022-teomm",
        title: <span><i>The Embankment On My Mind</i> Exhibition</span>,
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
        date: "2022-09-07", id: "2022-09-07-mtng",
        title: "Embankment Redevelopment Plan – Community Meeting",
        src: "/images/sept-7-redevelopment-mtng.jpeg", alt: "Embankment community meeting flyer",
        href: "https://us02web.zoom.us/webinar/register/WN_P_MasqhtR0mTH5X30yCkcQ",
        children: (<>
            <p>Support <a href={`/vision#${visionId}`}>the Embankment Coalition's <strong>"light touch" vision</strong></a> for treatment of the Harsimus BranchEmbankment at an upcoming Jersey City Planning Department meeting,Wednesday, Sept. 7, 6:30-8:30 pm. <a href="https://us02web.zoom.us/webinar/register/WN_P_MasqhtR0mTH5X30yCkcQ" target="_blank"><strong>Register here.</strong></a></p>
            <p>City Planners will be rolling out an Embankment Redevelopment Plan focused on the open space of Blocks 2-8 of the Embankment property from the west side of Manila Avenue to beyond Newark Avenue near the Turnpike Extension. Help ensure that the future for the Embankment is historic preservation, conservation of what has become an ecological corridor, and connectivity of neighborhoods to a regional carbon-free transportation network.</p>
        </>)
    },
    {
        date: "2022-05-18", id: "2022-05-18-art-walk",
        title: "Embankment Redevelopment Plan – Community Meeting",
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
        date: "2022-05-11", id: "2022-05-11-cleanup",
        title: "Check out the new, updated drone flyover video about the Embankment and East Coast Greenway!",
        src: "/images/embankment-annual-mtng-img.jpeg", alt: "Oblique aerial view of the embankment",
        href: "https://youtu.be/qxAHqzLqnoo",
    },
    {
        date: "2022-05-13", dateStr: "29 April + 13 May 2021", id: "2022-climate-talk",
        title: "Climate Change 2021: Challenges and Solutions (4/29, 5/13)",
        src: "/images/climate-talk.jpeg", href: "https://www.youtube.com/watch?v=TK754w-IPfU", children: (<>
            <p>Join the EPC &amp; other civic orgs for Climate Change 2021: Challenges and Solutions. Dr. D. James Baker will explain the challenges 4/29, 7pm and then solutions &amp; what we can do 5/13, 7pm.</p>
            <p>Watch the recordings: <a href="https://www.youtube.com/watch?v=TK754w-IPfU" target="_blank">part 1</a>, <a href="https://www.youtube.com/watch?v=1rw7wIAgqZY" target="_blank">part 2</a>.</p>
        </>)
    },
    {
        date: "2021-03-17", id: "2021-rails-to-trails",
        title: "Rails to Trails Grant Award",
        src: "/images/rails-to-trails-article.jpeg", href: "https://www.railstotrails.org/trailblog/2021/march/15/2021-trail-grants-awardees-support-community-connections-on-and-off-trails/", children: (<>
            <p>The EPC joins nine other recipients of a 2021 <a href="https://www.railstotrails.org/">Rails-to-Trails Conservancy</a> grant to advance trails throughout the country. The Harsimus Branch &amp; Embankment will eventually connect with the Essex-Hudson Greenway, which also garnered a grant for its advocates, the NJ Bike&Walk Coalition.</p>
            <p><a href="https://www.railstotrails.org/trailblog/2021/march/15/2021-trail-grants-awardees-support-community-connections-on-and-off-trails/" target="_blank">Click here to read more.</a></p>
        </>)
    },
    {
        date: "2021-02-02", id: "2021-02-02-ehg",
        title: "Essex-Hudson County Greenway presentation",
        src: "/images/essex-hudson-greenway.jpg", href: "https://youtu.be/ciznhv7ZmZM", children: (<>
            <p>In a meeting hosted by the Embankment Coalition and numerous environmental organizations, Deb Kagan of the NJ Bike &amp; Walk Coalition described the proposed Essex-Hudson Greenway.</p>
            <p><a href="https://youtu.be/ciznhv7ZmZM" target="_blank">Click here to watch recording of the event,</a> then <a href="https://www.essexhudsongreenway.org/support/"><strong>sign on to a support letter</strong>.</a></p>
        </>)
    },
    {
        date: "2020-11-18", id: "2020-annual-mtng",
        title: "Mayor Steven Fulop was the Featured Speaker at Coalition Annual Members Meeting",
        src: "/images/HOME-HISTORIC-WALL.jpg", href: "https://youtu.be/6G-ZsU40Uh8", children: (<>
            <p>The Embankment Coalition and Mayor Fulop gave an update on the Vision and an overview of the terms and status of the possible Settlement</p>
            <p><a href="https://youtu.be/6G-ZsU40Uh8" target="_blank"><span className="text-middle">--- Click Here to Watch Recording of the Event ---</span></a></p>
        </>)
    },
    {
        date: "2020-10-03", id: "2020-cleanup",
        title: "Embankment Neighborhood Cleanup",
        src: "/images/cleanup.jpg", children: (<>
            <p>The Embankment Coalition organized the Harsimus Cove Neighborhood Cleanup in partnership with Ward E Councilman James Solomon and the nonprofits CleanGreenJersey City and Adopt-a-Block.</p>
        </>)
    },
    {
        date: "2020-09-10", id: "2020-09-10-stb",
        title: "STB Draft Supplemental Environmental Assessment Issued",
        href: "https://prod.stb.gov/news-communications/latest-news/pr-20-11/",
        children: <>
            <p>The Surface Transportation Board (STB) is moving ahead with environmental and historic preservation reviews that are part of its federally mandated process when considering a potential permit to abandon a railroad.</p>
            <p>The STB will meet (virtually) in October with previously designated consulting parties, including the Coalition, to discuss potential adverse effects on historic assets if an abandonment permit for the Harsimus Branch is granted. This is a step in a process mandated by the National Historic Preservation Act (NHPA). To fulfill obligations under the National Environmental Protection, the STB also issued a Supplementary Environmental Assessment (EA), to which the Coalition will be responding.</p>
        </>
    },
    {
        date: "2017-06-04", id: "2017-stb-petition",
        title: "Coalition Petition to STB Gets 2,588 Signatures",
        pretitle: { title: "Public Movement", icon: "checkbox-marked-circle-outline" },
        src: "/images/NEWS-PETITION.jpg", author: change,
        children: <p>A petition asking the Surface Transportation Board to carry out its preservation obligations received 2,588 signatures before the Embankment Preservation Coalition closed it.</p>,
    },
    {
        date: "2013-10-03", id: "2013-10-03-jj",
        title: "Jersey City Officials Hailing Embankment Ruling as 'Clear Win'",
        href: "https://www.nj.com/hudson/2013/10/jersey_city_officials_hailing_embankment_ruling_as_clear_win.html",
        pretitle: {
            title: <ReadArticle href={"https://www.nj.com/hudson/2013/10/jersey_city_officials_hailing_embankment_ruling_as_clear_win.html"} />,
            icon: "pen",
        },
        author: jj,
        children: <p>A federal judge last week ruled that the Sixth Street Embankment in Jersey City is indeed a rail line, a decision that city officials believe could lead to the city someday owning the disputed property.</p>,
    },
    {
        date: "2012-06-22", id: "2012-06-22-ecg",
        title: "Grand Opening of the ECG Link Between Jersey City & Newark",
        pretitle: {
            title: <ReadArticle href={"https://blog.nj.com/nj_off-road_biking/2012/06/dont_miss_these_photos_from_the_grand_opening_of_the_ecg_link_between_jersey_city_and_newark.html"} />,
            icon: "bike",
        },
        href: "https://blog.nj.com/nj_off-road_biking/2012/06/dont_miss_these_photos_from_the_grand_opening_of_the_ecg_link_between_jersey_city_and_newark.html",
        src: "/images/NEWS-LINK.jpg", author: starLedger,
        children: <p>On Friday, the East Coast Greenway Alliance held a grand opening and Ribbon Cutting Ceremony at Lincoln Park in Jersey City to celebrate the bridging of the greenway gap between Jersey City and Newark.</p>,
    },
]
