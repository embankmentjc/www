import Page from "../components/page"
import css from "./2025-events.module.scss"
import React from "react";
import { H4 } from "@rdub/base/heading";
import A from "../src/components/A";

export function Events2026() {
  return <>
    <div className={css.note}>Note: Please check back for new events and latest details as event dates approach. All events are free and open to the public; some require reservations.</div>
    <div className="col-md-12 col-lg-12" style={{textAlign: "center"}}>
      <div className={css.event}>
        <H4 id={"imur-exhibition"}>From Vision to Reality: The Embankment Now</H4>
        <div className={css.date}>April 11&ndash;26, 2026</div>
        <div className={css.location}><A href="https://www.google.com/maps/search/67+Greene+Street+Jersey+City+NJ+07302">IMUR Gallery, 67 Greene Street, Jersey City 07302</A></div>
        <div className={css.description}>
          <p>IMUR Gallery and the Embankment Coalition present an exhibition of designs for the two easternmost blocks of the Harsimus Branch Embankment, accompanied by original art inspired by the site. Exhibition Director: Ivy Huang. Curated by Embankment Coalition.</p>
          <p><strong>Opening Reception:</strong> Saturday, April 11, 3&ndash;7 PM (free and open to the public)</p>
        </div>
      </div>
      <div className={css.event}>
        <H4 id={"imur-lunch"}>Communal Lunch &amp; Gallery Preview</H4>
        <div className={css.date}>Saturday, April 11 | Noon&ndash;2:30 PM</div>
        <div className={css.location}>Rumi Turkish Grill / IMUR Gallery, 67 Greene Street, Jersey City 07302</div>
        <div className={css.description}>
          <p>Join the Embankment Coalition and IMUR Gallery for a communal lunch and gallery preview of <em>From Vision to Reality: The Embankment Now</em>. Presentation by Stephen Gucciardo (President, Embankment Coalition), Jake Lefeber and Aaron Teves (Architectural Designers and Coalition Volunteers).</p>
          <p><strong>$101</strong> &middot; Casual dress &middot; <A href="https://docs.google.com/forms/d/e/1FAIpQLSd_XKkNQh4OMGOQ2vbwAVrhXCNGMUZ_viChzBgK0ODViY1A8Q/viewform">Reserve Now</A> &mdash; Seating is limited</p>
        </div>
      </div>
      <div className={css.event}>
        <H4 id={"eco-art"}>McNair x Embankment Youth Eco-Art Competition</H4>
        <div className={css.date}>Submissions open now through April 30, 2026</div>
        <div className={css.description}>
          <p>The McNair Environmental Club and the Embankment Preservation Coalition present an eco-art competition for Jersey City youth (1st&ndash;12th grade). Create an original work based on the environment of Jersey City or the Embankment.</p>
          <p><strong>Prizes:</strong> $50 Grand Prize, $50 Best Representation of Embankment, $30 Age Group Top Prize</p>
          <p><A href="/mcnair-eco-art">Full details and submission info</A></p>
        </div>
      </div>
    </div>
  </>
}

export default function Body() {
  return (
    <Page path="2026-events" navStuck={true}>
      <section className={`section novi-background section-50 section-sm-top-5 ${css.page}`}>
        <div className={css.banner}>
          <h1>Embankment Coalition 2026 Events</h1>
        </div>
        <div className="container">
          <div className="row justify-content-center offset-top-20">
            <div className="col-md-9 col-lg-7 text-center offset-top-34 offset-lg-top-0">
              <Events2026 />
            </div>
          </div>
        </div>
      </section>
    </Page>
  )
}
