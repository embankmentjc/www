import Page from "../components/page"
import css from "./2025-events.module.scss"
import React from "react";
import { H4, H5 } from "@rdub/next-base/heading";
import A from "@rdub/next-base/a";
import { mayoral2025Eventbrite, mayoral2025Form } from "./mayoral-2025";

export function Events2025() {
  return <>
    <div className={css.note}>Note: Please check back for new events and latest details as event dates approach. All events are free and open to the public; some require reservations.</div>
    <div className="col-md-12 col-lg-12" style={{textAlign: "center"}}>
      <div className={css.event}>
        <H4 id={"annual-meeting"}>Embankment Coalition Annual Meeting</H4>
        <div className={css.date}>Sunday, October 12th | 7-9pm</div>
        <div className={css.location}>Grace Church Van Vorst, 39 Erie St (entrance on 2nd St), Jersey City</div>
        <div className={css.sub}><A href={"mailto:embankmentjc@gmail.com?subject=RSVP for Annual Meeting"}>Email your RSVP to embankmentjc@gmail.com</A></div>
        <div className={css.description}>
          <p>Join us for updates on settlement negotiations status, unveiling of new park designs, and preparation for the November City Council meeting.</p>
          <p><strong>Agenda:</strong></p>
          <ul style={{ listStyle: "none", paddingLeft: 0 }}>
            <li>• Update on settlement negotiations status</li>
            <li>• Unveiling of new park designs</li>
            <li>• Preparation for November City Council meeting</li>
            <li>• Discussion of next steps and how you can help</li>
          </ul>
        </div>
      </div>
      <div className={css.event}>
        <H4 id={"council-meeting"}>Critical City Council Meeting on Embankment Settlement</H4>
        <div className={css.date}>Wednesday, November 12th | 6pm</div>
        <div className={css.location}>City Hall, Jersey City</div>
        <div className={css.description}>
          <p>The City Council will vote on ordinances related to the Embankment litigation settlement. This is a critical moment for the future of the Embankment.</p>
          <p><strong>We need community members to attend and speak before the vote.</strong> Your voice matters in preserving this historic resource and creating the green corridor our city needs.</p>
          <p>The potential settlement includes a residential tower, city right-of-way easement, park on Block 2, and other public benefits.</p>
        </div>
      </div>
    </div>
  </>
}

export default function Body() {
  return (
    <Page path="2025-events" navStuck={true}>
      <section className={`section novi-background section-50 section-sm-top-5 ${css.page}`}>
        <div className={css.banner}>
          <h1>Embankment Coalition 2025 Events</h1>
        </div>
        <div className="container">
          <div className="row justify-content-center offset-top-20">
            <div className="col-md-9 col-lg-7 text-center offset-top-34 offset-lg-top-0">
              <Events2025 />
            </div>
          </div>
        </div>
      </section>
    </Page>
  )
}
