import { Page } from "../src/pages"

export default function Body() {
    return (
        <Page path="bot-drawing" navStuck={true}>
            <section className="section novi-background section-50 section-sm-top-5">
                <img src="/images/bot-drawing/clementine.png" style={{ width: "100%", paddingTop: "6px" }}/>
                <div className="container">
                    <div className="row justify-content-center offset-top-20">
                        <div className="col-md-9 col-lg-7 text-center offset-top-34 offset-lg-top-0">
                            <h2>Botanical Drawing with the Embankment Coalition</h2>
                            <h4>Instructor: Katy Lyness</h4>
                            <div className="col-md-12 col-lg-12" style={{ textAlign: "center" }}>
                                <ul style={{ listStyle: "none", paddingLeft: 0 }}>
                                    <li><strong>Four Saturday Virtual Classes</strong>, 1 - 4 pm each, November 5, 12, December 3, 10 (all virtual)</li>
                                    <li style={{ color: "green", fontWeight: "bold", fontStyle: "italic" }}>Plus</li>
                                    <li><strong>Optional Critique and In-Person Visit to <i>The Embankment on My Mind</i></strong>, Sunday, December 11, 1-4 pm (Lemmerman Gallery, New Jersey City University)</li>
                                    <li><strong>Minimum Number of Registrants to Run Course: 6</strong></li>
                                    <li><strong>Registration Limit: 20</strong></li>
                                    <li style={{ color: "green", fontWeight: "bold", fontStyle: "italic" }}>First come, first served, with registration cutoff November 1</li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-9 col-lg-7 text-md-left offset-top-34 offset-lg-top-0">
                            <p>What better way to appreciate the flora that finds niches in our urban landscape than to closely observe plants and learn techniques to draw them? This series of virtual classes aims to teach time-honored techniques of botanical drawing and encourage appreciation for Jersey City’s urban natural ecology.</p>
                            <p>The classes are among programs and activities organized by the Embankment PreservationCoalition and associated with <a href="/embankment-on-my-mind"><i>The Embankment on My Mind</i></a>, an art exhibition at New Jersey City University Galleries.</p>
                            <p><strong>PLEASE NOTE: Carefully read the following information and then register for the course below.</strong></p>
                            <p><a href="https://docs.google.com/document/d/12qGTwQu8OqjMHVf_bSARFIZ5HKHPqCEg/edit?usp=sharing&ouid=113315672036581348329&rtpof=true&sd=true"><strong>DetailedDescription of Course</strong></a> - Includes topics covered in each class.</p>
                            <p><a href="https://docs.google.com/document/d/1q-c21AsZKICgNmbHS3FKqCa4u_bi4Wth/edit?usp=sharing&ouid=113315672036581348329&rtpof=true&sd=true"><strong>MaterialsList</strong></a> - Recommends materials for participants, noting the bare minimum,and provides estimated prices and places from which these can be obtained.</p>
                            <p><strong>Register by sending an email to <a href="mailto:embankmentjc@gmail.com">embankmentjc@gmail.com</a></strong> with your name, address, and telephone number, and subject: "Botanical Drawing class" (or <a href="mailto:embankmentjc@gmail.com?subject=Botanical%20Drawing%20Registration&body=I%20am%20registering%20for%20the%20Botanical%20Drawing%20with%20the%20Embankment%20Coalition%20course.%20%20I%20understand%20I%20will%20receive%20an%20email%20from%0Aembankmentjc%40gmail.com%20on%20November%202%20confirming%20whether%20the%20course%20has%20the%20required%20number%20of%20participants%20to%20run%20%20and%0Amore%20details%20about%20the%20suggested%20donation%20and%20Zoom%20link.%20The%20first%20class%20is%20November%205.%0A%0AI%20am%20including%20basic%20information%20below%20%5BThe%20Embankment%20Coalition%20does%20not%20share%20this%20information%20with%20other%20organizations%5D%3A%0A%0ARegistrant%20Name%3A%0AEmail%3A%0AStreet%20Address%3A%0APhone%3A"><strong>click here</strong> for a pre-filled email</a>). On November 1, the cutoff date for registration, we will determine if there are enough participants to run the course. If so, we will notify registrants by email and request a donation to cover costs for the course [see next item].</p>
                            <p><strong>Suggested donation for series of 4 Virtual Classes</strong>: $80 Note: Donations are nonrefundable. You can wait to make yours until November 1, the cutoff for registrations, when the Embankment Coalition will notify you whether the course will run and give you information on writing a check or using Paypal to make your donation.</p>
                            <p><strong>Zoom link</strong>: We will include a Zoom link for the classes in the November 1 email confirming that the course will be run.</p>
                            <p><strong>Bonus Critique and Visit to <a href="/embankment-on-my-mind"><i>The Embankment on My Mind</i> exhibition</a></strong>. Participants are invited to bring their completed work from the classes, or other botanical art they have done, to New Jersey City University’s Lemmerman Gallery, Hepburn Hall, Room 323, 2039 Kennedy Blvd., Jersey City, NJ 07305 on December 11 from 1-4 for a critique by the instructor, Katy Lyness, and a special tour of the gallery just for class participants. This Gallery includes, among other works, botanical drawings by 16 members of the Tri-State Botanical Artists Association, including a work by the instructor, of flora along Jersey City’s Harsimus Branch. We will send registrants details closer to the event.</p>
                        </div>
                    </div>
                </div>
            </section>
        </Page>
    )
}
