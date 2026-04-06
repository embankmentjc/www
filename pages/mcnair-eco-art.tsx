import Page from "../components/page"
import { ParallaxHeader } from "../components/theme"
import css from "./mcnair-eco-art.module.scss"
import A from "../src/components/A"

const submissionForm = "https://forms.gle/Rgy6wHbuAjJskmdz8"
const faqDoc = "https://docs.google.com/document/d/1EKC5E-86BKO0EFBTVFtNFpg2G7PPTwZ9ObqnAlY9YmE/edit?usp=sharing"
const mcnairWebsite = "https://sites.google.com/view/mcnairembankmentyac/home"

export const ogMetadata = {
    title: "McNair x Embankment Youth Eco-Art Competition",
    description: "Jersey City youth eco-art competition by McNair Environmental Club and the Embankment Preservation Coalition. Digital submissions open through April 30, 2025.",
    image: "/images/og/mcnair-eco-art.jpg",
}

export default function McNairEcoArt() {
    return (
        <Page
            path="mcnair-eco-art"
            title={ogMetadata.title}
            description={ogMetadata.description}
            ogImage={ogMetadata.image}
            headerChildren={
                <ParallaxHeader
                    title={"McNair x Embankment Youth Eco-Art Competition"}
                    subtitleChildren={<div className={css.subtitle}>
                        <p>Create an original work based on the environment of Jersey City or the Embankment</p>
                        <p className={css.bold}>Digital Submissions Open Through April 30, 2025</p>
                    </div>}
                    className={css.header}
                    btnsCls={css.btns}
                    img={"/images/NEWS-BANNER.jpg"}
                    btn1={{ text: "Submit Your Art", href: submissionForm }}
                    btn2={{ text: "Download Flyer", href: "/pdf/eco-art-flyer.pdf" }}
                />
            }
        >
            <div className={css.body}>
                <div className={css.flyerWrap}>
                    <a href="/pdf/eco-art-flyer.pdf">
                        <img src="/images/eco-art-flyer.jpg" alt="McNair x Embankment Eco-Art Competition flyer" className={css.flyer} />
                    </a>
                </div>
                <p>
                    The <strong>McNair Environmental Club</strong> and the <em>Embankment Preservation Coalition</em> present an eco-art competition designed for Jersey City's youth!
                </p>
                <h2>Prizes</h2>
                <ul className={css.prizes}>
                    <li><strong>$50</strong> &mdash; Grand Prize</li>
                    <li><strong>$50</strong> &mdash; Best Representation of Embankment</li>
                    <li><strong>$30</strong> &mdash; Age Group Top Prize</li>
                </ul>
                <h2>Artwork &amp; Submission Requirements</h2>
                <ol>
                    <li>We accept any of the following mediums (<strong>No AI-generated art will be accepted</strong>):
                        <ul>
                            <li>Traditional drawings and paintings</li>
                            <li>Digital drawings and art</li>
                            <li>Sculptures</li>
                            <li>Textiles</li>
                            <li>2D and 3D modeling/animation</li>
                            <li>Photography</li>
                        </ul>
                    </li>
                    <li>One submission per student.</li>
                    <li>Submitter must be a Jersey City school student (public, private, and homeschooled students welcome), in 1st&ndash;12th grade.</li>
                    <li><A href={submissionForm}>Digital submission via Google Form</A>. Physical drop-off instructions TBA.</li>
                </ol>
                <p className={css.contact}><A href={faqDoc}>Detailed FAQ here</A></p>
                <h2>Key Dates</h2>
                <ul className={css.prizes}>
                    <li><strong>Digital Submission Deadline:</strong> April 30, 2025, 11:59 PM EST</li>
                    <li><strong>Physical Drop-Off Deadline:</strong> TBA</li>
                </ul>
                <h2>Showcase</h2>
                <p>Artists may have their work showcased at the NJCU Visual Arts Gallery (pending confirmation). More information about the in-person reception will be announced soon!</p>
                <hr />
                <h2>Downloads</h2>
                <ul className={css.downloads}>
                    <li><a href="/pdf/eco-art-flyer.pdf">Competition Flyer (PDF)</a></li>
                    <li><a href="/pdf/eco-art-overview.pdf">Competition Overview (PDF)</a></li>
                </ul>
                <hr />
                <p className={css.contact}>
                    <A href={mcnairWebsite}>Learn more through the McNair Environmental Club website</A>
                </p>
                <p className={css.contact}>
                    Questions? Email <A href="mailto:mcnairenvironmtalclub@gmail.com">mcnairenvironmtalclub@gmail.com</A>
                </p>
            </div>
        </Page>
    )
}
