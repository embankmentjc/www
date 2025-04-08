import Page from "../components/page";
import css from "./mayoral-2025.module.scss";
import React from "react";
import { ParallaxHeader } from "../components/theme";
import A from "@rdub/next-base/a";

export const mayoral2025Eventbrite = `https://www.eventbrite.com/e/jersey-city-mayoral-candidates-forum-on-historic-preservation-environment-tickets-1274084112879`
export const mayoral2025Form = "https://docs.google.com/forms/d/1s-0nYBkfwFlXvZHuFsGflFp1wpP7JJBid3RFnGa22qw/edit"

export default function Body() {
  return (
    <Page
      path="news"
      headerChildren={
        <ParallaxHeader
          title={"Mayoral Candidates Forum on Historic Preservation and the Environment"}
          subtitleChildren={<div className={css.subtitle}>
            <p className={css.bold}>Sunday, May 4, 3-5:30 pm</p>
            <p>(Doors open at 3 pm / Program begins at 3:30 pm sharp)</p>
            <p className={css.bold}><A href={"https://www.gracevanvorst.org/"}>Grace Church Van Vorst</A></p>
            <p><A href={"https://maps.app.goo.gl/dAzrTzsQQBrgkind7"}>39 Erie Street (entrance on 2nd Street), Jersey City NJ 07302</A></p>
            <div className={css.banner}>
              <A href={mayoral2025Eventbrite}><img src={"/images/mayor-forum-2025/candidates.avif"} /></A>
            </div>
          </div>}
          className={css.header}
          btnsCls={css.btns}
          img={"/images/NEWS-BANNER.jpg"}
          btn1={{ text: "RSVP", href: mayoral2025Eventbrite, }}
          btn2={{ text: "Contribute Questions", href: mayoral2025Form, }}
        />
      }
    >
      <div className={css.body}>
        <p>
          The <strong>Jersey City Landmarks Conservancy</strong> and the <strong>Embankment Preservation Coalition</strong> are sponsoring this Mayoral Candidates Forum, which will focus on two related subjects important to residents and central to quality of life in Jersey City: historic preservation and the environment.
        </p>
        <p>
          As of March, six Jersey City residents have publicly declared their intention to run for mayor in the November 2025 election, and the first five below have agreed to participate in the forum:
        </p>
        <ul className={css.candidates}>
          <li><A href={"https://www.ali2025.com/"}>Mussab Ali</A></li>
          <li><A href={"Flash Gordon"}>Flash Gordon</A></li>
          <li><A href={"https://jim2025.com/"}>Jim McGreevey</A></li>
          <li><A href={"https://www.billodeajc.com/"}>Bill O’Dea</A></li>
          <li><A href={"https://solomonforjc.com/"}>James Solomon</A></li>
          <li><A href={"https://www.joyceforjc.com/"}>Joyce Watterman</A></li>
        </ul>
        <p>
          The forum features a question-and-answer session moderated by Margaret Schmidt, former editor of <i>The Jersey Journal</i>. An opportunity for social interaction with the candidates will follow. The Q&A session will be recorded and made accessible to the public.
        </p>
        <hr/>
        <h1>How You Can Contribute to the Forum</h1>
        <p>
          You can help us make this forum mutually informative for the candidates and the public. <strong>Using the form at this <A href={"https://docs.google.com/forms/d/1s-0nYBkfwFlXvZHuFsGflFp1wpP7JJBid3RFnGa22qw/edit"}>link</A></strong>, send us your thoughtful questions or let us know your concerns in the areas of historic preservation and the environment. We will draw from your contributions as we formulate questions for the candidates.
        </p>
        <p>
          As the City grapples locally with human-caused climate change, the legacy of industrialization, and the effects of current rapid redevelopment on historic resources and local character, consider this overriding question: <i><strong>What would you like the next mayor of Jersey City to do in the areas of historic preservation and the environment?</strong></i>
        </p>
        <p>
          Examples of more detailed questions you may want to ask:
        </p>
        <ul>
          <li>What environmental or historic preservation issues affect your neighborhood?</li>
          <li>Are there specific historic properties you would like to see protected?</li>
          <li>
            What should the next mayor do in the areas, for example, of
            <ul>
              <li>air and water quality</li>
              <li>environmental health</li>
              <li>animal control and wildlife protection</li>
              <li>stormwater retention and flooding</li>
              <li>sanitation and recycling</li>
              <li>open space needs</li>
              <li>non-polluting transportation options?</li>
            </ul>
          </li>
          <li>Should City services in these areas or others be improved or initiated?</li>
        </ul>
        <p><strong>Note:</strong> The Embankment Preservation Coalition and the Jersey City Landmarks Conservancy are nonprofit charitable organizations and do not endorse candidates for public office.</p>
        <img className={css.footerBanner} src={"/images/mayor-forum-2025/epc-jclc-diptych.avif"} />
        <hr/>
        <h2>
          Moderator
        </h2>
          <img src={"/images/mayor-forum-2025/Margaret Schmidt headshot.jpg"} className={css.moderator} />
        <p>
          Margaret Schmidt was born and raised in Jersey City and worked at her hometown newspaper, <i>The Jersey Journal</i>, from 1980 until its closure in February 2025. As a reporter, she covered general assignment news and features, the federal court in Newark, and the Hoboken beat. As the Hudson Life editor, she led several JJ-sponsored events, including the Jersey City and Hoboken Artists Studio Tours. She later served as Managing Editor and Editor, just the second woman to hold that position in the paper's 157-year history. For the paper's final few years, she was Editor-at-Large, responsible for the paper's Opinion pages and freelance columns, receiving the NY/NJ Baykeeper's inaugural Truth to Power Award in 2024 for her editorial writing. A former adjunct professor of Journalism at Felician University in Rutherford, she also served on the boards of trustees of WomenRising Inc. and St. Dominic Academy in Jersey City. She's a graduate of Fordham University in the Bronx and holds a Master's Degree in Journalism from New York University.
        </p>
      </div>
    </Page>
  )
}
