import Page from "../components/page"
import css from "./2024-events.module.scss"
import React from "react";
import { H4, H5 } from "@rdub/next-base/heading";
import { MailTo } from "../components/mailto";

export function Events2024() {
    return <>
        <div className={css.note}>Note: Please check back for new events and latest details as event dates approach. All events are free and open to the public; some require reservations.</div>
        <div className="col-md-12 col-lg-12" style={{textAlign: "center"}}>
            <div className={css.event}>
                <H4 id={"bot-art-walk"}>Children’s Botanical Art Walk.</H4>
                <div className={css.date}>Saturday, May 18, 11 am</div>
                <div className={css.description}>
                    Jessica Costantine, educator and Embankment Coalition board member, will lead a walk along the Embankment to identify and draw plants that thrive in this urban landscape. We’ll end up in the Brunswick Community Garden for a special activity. Limit: 20 children, ages 5-12, each accompanied by an adult. Email <MailTo to={"jessicacostantine@gmail.com"}/> to reserve your place; be sure to give your name, email address, child’s name and age, and a phone number we can reach you at if there are last-minute changes.
                </div>
            </div>
            <div className={css.event}>
                <H4 id={"a-look-back"}>"A Look Back at Our Downtown Neighborhood and Railroad Operations on the Embankment"</H4>
                <div className={css.date}>Sunday, May 19, 7-8:30 pm</div>
                <div className={css.location}>Grace Church Van Vorst, 39 Erie St (entrance on 2nd St).</div>
                <div className={css.description}>
                    Bennett Levin, our May 5 presenter (see above), will return on May 19th to share his memories of Downtown Jersey City neighborhoods during World War II, with a focus on the Pennsylvania Railroad Harsimus Branch and Embankment. Reserve a place by emailing <MailTo to="embankmentjc@gmail.com"/> and specifying the May 19th talk.
                </div>
            </div>
            <div className={css.event}>
                <H4 id={"nj-preservation-conference"}>NJ State History/Historic Preservation Conference</H4>
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
                <H5 id={"rails-to-trails"}>"Rails to Trails: Preserving the Past and Creating a Sustainable Future"</H5>
                <div className={css.date}>Thursday, June 6, 8 am</div>
                <div className={css.description}>
                    A presentation on Day 2 of the NJ State History/Historic Preservation Conference, NJCU. The Embankment Coalition joins Rails to Trails Conservancy, Union County Connects, and Friends of the Rail Park to discuss aspects of rails-to-trails projects, including historic preservation, sustainable trail ecology, and community engagement, as exemplified by the Rahway Valley Railroad trail, the Harsimus Branch in Jersey City, and the Philadelphia Rail Park. Rails to Trails, a sponsor of the conference, will have a table, shared by its co-presenters. Details to come.
                </div>
            </div>
            <div className={css.event}>
                <H4 id={"annual-mtng"}>Embankment Preservation Coalition Annual Members Meeting</H4>
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
