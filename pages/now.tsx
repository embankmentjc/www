import Page from "../components/page";
import css from "./now.module.scss";
import React from "react";
import { becomeMemberId, donateId, events2024, signupId } from "../components/ids";
import A from "@rdub/next-base/a";

export default function Body() {
    return (
        <Page path="now" navStuck={true}>
            <section className={`section novi-background section-50 section-sm-top-5 ${css.page}`}>
                <div className={css.logo}>
                    <img src={'/images/now/poster.png'} alt={"Aerial view of the Embankment"} />
                </div>
                <div className={css.text}>
                <div className={css.container}>
                    <div className={css.contents}>
                        <div className={`${css.outline}`}>
                            Join the community effort to protect, restore, and activate the historic Sixth Street Embankment and its urban forest. Below are ways to act NOW to support this beautiful green space for our community!
                            <div>
                            <ul>
                                <li><span className={css.step}>STEP 1:</span> <a href={`/involved#${becomeMemberId}`}>BECOME A MEMBER</a></li>
                                <li><span className={css.step}>STEP 2:</span> <A href={"https://fiscalnote.com/find-your-legislator"}>WRITE YOUR REPRESENTATIVE</A></li>
                                <li><span className={css.step}>STEP 3:</span> <A href={"https://www.instagram.com/jerseycityembankment/"}>SPREAD THE WORD</A></li>
                                <li><span className={css.step}>STEP 4:</span> <a href={`/news#${events2024}`}>GET INVOLVED</a></li>
                                <li><span className={css.step}>STEP 5:</span> <a href={`/involved#${donateId}`}>DONATE</a></li>
                            </ul>
                            </div>
                        </div>
                        <div className={css.steps}>
                            <p><span className={css.bold}>BECOME A MEMBER:</span> Support the cause by becoming a member of the Embankment Preservation Coalition (click <a href={`/involved#${becomeMemberId}`}>here</a> to become a member)</p>
                            <p><span className={css.bold}>WRITE YOUR REPRESENTATIVE:</span> Take action by writing your representatives to advocate for the protection and restoration of the historic Sixth Street Embankment, and to conserve the meadows and forests it sustains (click <A href={"https://fiscalnote.com/find-your-legislator"}>here</A> to find your officials)</p>
                            <p><span className={css.bold}>SPREAD THE WORD:</span> Tell your friends, family and networks about the rail corridor's history and its potential as a community green space (follow us on <A href={"https://www.instagram.com/jerseycityembankment/"}>Instagram</A>, #EmbankmentNow)</p>
                            <p><span className={css.bold}>GET INVOLVED:</span> Participate in upcoming events, sign petitions, and contribute to fundraising efforts to show your support (click <a href={`/news#${events2024}`}>here</a> to view upcoming events)</p>
                            <p><span className={css.bold}>DONATE:</span> Sustain our efforts by making a tax-deductible contribution or by donating your time and talents (click <a href={donateId}>here</a> to make a donation)</p>
                        </div>
                    </div>
                </div>
                </div>
            </section>
        </Page>
    )
}
