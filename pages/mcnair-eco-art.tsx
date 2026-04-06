import Page from "../components/page"
import { ParallaxHeader } from "../components/theme"
import css from "./mcnair-eco-art.module.scss"
import A from "../src/components/A"

const submissionForm = "https://tinyurl.com/youth-art-comp"

export const ogMetadata = {
    title: "McNair x Embankment Youth Eco-Art Competition",
    description: "Jersey City youth eco-art competition by McNair Environmental Club and the Embankment Preservation Coalition. Digital submissions open through April 30, 2025.",
    image: "/images/og/now.jpg",
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
                <h2>Who Can Enter</h2>
                <p>Any Jersey City school student in 1st&ndash;12th grade. Public, private, and homeschooled students are all welcome. One submission per student.</p>
                <h2>Accepted Mediums</h2>
                <p>Traditional drawings and paintings, digital art, sculptures, textiles, 2D and 3D modeling/animation, and photography. <strong>No AI-generated art.</strong></p>
                <h2>How to Submit</h2>
                <p><A href={submissionForm}>Submit digitally via Google Form</A> by <strong>April 30, 2025 at 11:59 PM EST</strong>. Physical drop-off instructions TBA.</p>
                <h2>Showcase</h2>
                <p>Artists may have their work showcased at the NJCU Visual Arts Gallery (pending confirmation). More details about the in-person reception coming soon!</p>
                <hr />
                <h2>Downloads</h2>
                <ul>
                    <li><a href="/pdf/eco-art-flyer.pdf">Competition Flyer (PDF)</a></li>
                    <li><a href="/pdf/eco-art-overview.pdf">Competition Overview (PDF)</a></li>
                </ul>
                <hr />
                <p className={css.contact}>
                    Questions? Email <A href="mailto:mcnairenvironmtalclub@gmail.com">mcnairenvironmtalclub@gmail.com</A>
                </p>
            </div>
        </Page>
    )
}
