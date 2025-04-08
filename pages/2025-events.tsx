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
        <H4 id={"6th-st-cleanup"}>6th Street Embankment Cleanup</H4>
        <div className={css.date}>Saturday, April 19th | 11am - 2pm</div>
        <div className={css.location}>Corner of 6th Street & Jersey Avenue, Jersey City</div>
        <div className={css.description}>Join neighbors and friends and celebrate Spring at our yearly clean-up.</div>
      </div>
      <div className={css.event}>
        <H4 id={"earth-day"}>Earth Day 2025</H4>
        <div className={css.date}>Saturday, April 26th | 11am - 3pm</div>
        <div className={css.location}>Lincoln Park – West Side Ave Entrance – Jersey City</div>
        <div className={css.description}>
          Celebrate Earth Day with the Embankment Coalition at the Hudson County Improvement Authority's annual event. Stop by for free family fun and to learn more about organizations supporting a cleaner, more sustainable future. This year’s theme is Protecting Wildlife Through Eco-Friendly Living. The outdoor event will take place in the Fountain Lawn Area at Lincoln Park. Learn more at <A href={"https://www.hcia.org/"}>the HCIA web site</A>.
        </div>
      </div>
      <div className={css.event}>
        <H4 id={"mayoral-forum"}>Mayoral Candidates Forum on Historic Preservation and the Environment</H4>
        <div className={css.date}>Sunday, May 4th | 3-5:30 PM (Doors open 3 PM; Program starts at 3:30 sharp)</div>
        <div className={css.location}>Grace Church Van Vorst, 39 Erie St (entrance on 2nd St), Jersey City</div>
        <div className={css.sub}><A href={mayoral2025Eventbrite}>Reserve seating here</A></div>
        <div className={css.sub}><A href={mayoral2025Form}>Submit questions here</A>; we will draw upon these for the Q&A session</div>
        <div className={css.sub}>Sponsors: Embankment Preservation Coalition and Jersey City Landmarks Conservancy</div>
        <div className={css.description}>
          Five of six candidates for mayor of Jersey City have accepted our invitation to this forum, focused on historic preservation and environmental issues. They are Mussab Ali, Flash Gordon, Jim McGreevey, Bill O'Dea, and James Solomon. (Joyce Watterman has a schedule conflict.)
        </div>
        <div>
          Margaret Schmidt, former editor of <i>The Jersey Journal</i>, will moderate a question-and-answer session.  A reception will follow the program.
        </div>
      </div>
      <div className={css.event}>
        <H5 id={"bot-walk"}>Children’s Botanical Nature Walk</H5>
        <div className={css.date}>Saturday, May 17th | 11am</div>
        <div className={css.sub}><A href={"https://docs.google.com/forms/d/e/1FAIpQLSdAo6MfQFEiCvu_KiHP4u10-BdfzFX5SGQQ6ue4TDGZZgHMEQ/viewform"}>Register here</A></div>
        <div>Meeting Place to be supplied upon confirmation of registration</div>
        <div className={css.description}>
          Join Embankment Coalition board member and educator Jessica Costantine on a walk along the Embankment to identify plants and animals that live there. The event is open to children, ages 5-12, accompanied by an adult. Space is limited; please register using the link above.
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
