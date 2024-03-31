import Page from "../components/page"
import css from "./2024-events.module.scss"
import React from "react";

export const MailTo = ({ to }: { to: string }) => <a href={`mailto:${to}`}>{to}</a>

export function Title({ id, children }: { id: string, children: React.ReactNode })
{
    return <h4 className={css.title}>
        <span className={css.anchor} id={id}></span>
        <a href={`#${id}`} >{children}</a>
    </h4>
}

export function Events2024() {
    return <>
        <div className={css.note}>Note: Please check back for new events and latest details as event dates approach. All events are free and open to the public; some require reservations.</div>
        <div className="col-md-12 col-lg-12" style={{textAlign: "center"}}>
            <div className={css.event}>
                <Title id={"earth-day"}>Earth Day at Jersey City Lincoln Park</Title>
                <div className={css.date}>Saturday, April 20, 11 am-3 pm</div>
                <div className={css.location}>West Side Avenue Entrance.</div>
                <div className={css.description}>
                    Demonstrate your support for environmental protection. Bring the kids for a day of fun and information on how the environment is being addressed in Hudson County. The Embankment Coalition will be tabling with members of the Jersey City Parks Coalition and other environmental groups, at this Hudson County Improvement Authority event. We’ll be rolling out a new "Embankment Now" campaign there.
                </div>
            </div>
            <div className={css.event}>
                <Title id={"jc-and-its-railroads"}>"Jersey City and Its Railroads: They Covered the Waterfront and Helped Shape a Nation"</Title>
                <div className={css.date}>Sunday, May 5, 7-8:30 pm</div>
                <div className={css.location}>Grace Church Van Vorst, 39 Erie Street (entrance on Coles).</div>
                <div className={css.description}>
                    The Embankment Coalition is observing Preservation Month with two presentations on rail and local history by Bennett Levin. Bennett is a retired professional engineer and former Commissioner, Department of Licenses and Inspections for the City of Philadelphia, as well as a former member of the Historic Preservation Commission there, among other pursuits. A rail line preservationist and founder of a company that rebuilds and restores locomotives, Bennett acquired a lifelong interest in all-things-rail through visits to his grandmother's house on 5th Street adjacent to the Harsimus Branch. Reserve a place for this talk, "The Blessings of Geography" by emailing <MailTo to="embankmentjc@gmail.com"/> and specifying May 5th . It will be followed on May 19th by Bennett’s recollections of our neighborhood; see below.
                </div>
            </div>
            <div className={css.event}>
                <Title id={"cleanup"}>Embankment Cleanup.</Title>
                <div className={css.date}>Saturday, May 11, 11 am-1 pm</div>
                <div className={css.location}>meet at 6th and Jersey Avenue</div>
                <div className={css.description}>
                    Join the Embankment Coalition and Ward E Councilman James Solomon for a cleanup of the area around the Embankment.
                </div>
            </div>
            <div className={css.event}>
                <Title id={"bot-art-walk"}>Children’s Botanical Art Walk.</Title>
                <div className={css.date}>Saturday, May 18, 11 am</div>
                <div className={css.description}>
                    Jessica Costantine, educator and Embankment Coalition board member, will lead a walk along the Embankment to identify and draw plants that thrive in this urban landscape. We’ll end up in the Brunswick Community Garden for a special activity. Limit: 20 children, ages 5-12, each accompanied by an adult. Email <MailTo to={"jessicacostantine@gmail.com"}/> to reserve your place; be sure to give your name, email address, child’s name and age, and a phone number we can reach you at if there are last-minute changes.
                </div>
            </div>
            <div className={css.event}>
                <Title id={"a-look-back"}>"A Look Back at Our Downtown Neighborhood and Railroad Operations on the Embankment"</Title>
                <div className={css.date}>Sunday, May 19, 7-8:30 pm</div>
                <div className={css.location}>Grace Church Van Vorst, 39 Erie St (entrance on 2nd St).</div>
                <div className={css.description}>
                    Bennett Levin, our May 5 presenter (see above), will return on May 19th to share his memories of Downtown Jersey City neighborhoods during World War II, with a focus on the Pennsylvania Railroad Harsimus Branch and Embankment. Reserve a place by emailing <MailTo to="embankmentjc@gmail.com"/> and specifying the May 19th talk.
                </div>
            </div>
            <div className={css.event}>
                <Title id={"nj-preservation-conference"}>NJ State History/Historic Preservation Conference</Title>
                <div className={css.date}>Day One: Wednesday June 5, noon – 7 pm</div>
                <div className={css.description}>
                    Workshops, Workshop, tours, and Conference Welcoming Event, at Central Railroad of New Jersey (CRRNJ)Terminal, Liberty State Park.
                </div>
            </div>
            <div className={css.event}>
                <div className={css.date}>Day Two: Thursday, June 6, 8 am- 7 pm</div>
                <div className={css.description}>
                    Conference Sessions, Keynote, Displays, including Embankment Coalition presentation below, at New Jersey City University (NJCU). Details to come.
                </div>
            </div>
            <div className={css.event}>
                <Title id={"rails-to-trails"}>"Rails to Trails: Preserving the Past and Creating a Sustainable Future"</Title>
                <div className={css.date}>Thursday, June 6, 8 am</div>
                <div className={css.description}>
                    A presentation on Day 2 of the NJ State History/Historic Preservation Conference, NJCU. The Embankment Coalition joins Rails to Trails Conservancy, Union County Connects, and Friends of the Rail Park to discuss aspects of rails-to-trails projects, including historic preservation, sustainable trail ecology, and community engagement, as exemplified by the Rahway Valley Railroad trail, the Harsimus Branch in Jersey City, and the Philadelphia Rail Park. Rails to Trails, a sponsor of the conference, will have a table, shared by its co-presenters. Details to come.
                </div>
            </div>
            <div className={css.event}>
                <Title id={"annual-mtng"}>Embankment Preservation Coalition Annual Members Meeting</Title>
                <div className={css.date}>October 20th, 7 - 9 pm</div>
                <div className={css.location}>Grace Church Van Vorst Sanctuary, 39 Erie St, Jersey City; entrance on 2nd Street.</div>
                <div className={css.description}>
                    Presentation, status report, refreshments. Featured Talk: "Old Rails/New Life: Functional Ecology on the Embankment." Rutgers Associate Professor Frank Gallagher will report on doctoral research he supervised that was based on drone footage commissioned by the Embankment Coalition. Frank is Director of Environmental Planning in the Department of Landscape Architecture at Rutgers School of Environmental & Biological Sciences. Details to come.
                </div>
            </div>
        </div>
    </>
}

export default function Body() {
    return (
        <Page path="2024-events" navStuck={true}>
            <section className={`section novi-background section-50 section-sm-top-5 ${css.page}`}>
                <div className={css.banner}>
                    <h1>Embankment Coalition 2024 Events</h1>
                </div>
                <div className="container">
                    <div className="row justify-content-center offset-top-20">
                        <div className="col-md-9 col-lg-7 text-center offset-top-34 offset-lg-top-0">
                            <Events2024 />
                        </div>
                    </div>
                </div>
            </section>
        </Page>
    )
}
