import { useState } from "react"
import Lightbox from "yet-another-react-lightbox"
import "yet-another-react-lightbox/styles.css"
import Page from "../components/page"
import { ParallaxHeader } from "../components/theme"
import css from "./mcnair-eco-art.module.scss"

const dir = "/images/eco-art"

export const ogMetadata = {
    title: "McNair x Embankment Jersey City Eco-Youth Art Exhibition",
    description: "More than 80 Jersey City students, grades 1–12, made art inspired by the Embankment and the city's ecosystems. Exhibited at the New Jersey City University Visual Arts Gallery, June 1–6, 2026.",
    image: "/images/og/mcnair-eco-art.jpg",
}

type Work = {
    slug: string
    artist: string
    title: string
}
type AwardGroup = {
    category: string
    works: Work[]
}

const awards: AwardGroup[] = [
    {
        category: "Best in Show",
        works: [
            { slug: "best-in-show-chougule-beneath-the-lilies", artist: "Avani Chougule", title: "Beneath the Lilies" },
            { slug: "best-in-show-syers-fabulous-friends", artist: "Kennedy Syers", title: "Fabulous Friends of the Embankment" },
        ],
    },
    {
        category: "Best Depiction of the Embankment",
        works: [
            { slug: "best-embankment-ho-i-love-the-embankment", artist: "Winston Ho", title: "I Love the Embankment" },
        ],
    },
    {
        category: "Grades 1–3 First Prizes",
        works: [
            { slug: "g1-3-felusme-great-laurel-flower", artist: "Jalynn Felusme", title: "Great Laurel Flower" },
            { slug: "g1-3-divina-monarch-butterfly", artist: "Olivia Divina", title: "Monarch Butterfly" },
        ],
    },
    {
        category: "Grades 4–5 First Prize",
        works: [
            { slug: "g4-5-chougule-flight-at-the-embankment", artist: "Avani Chougule", title: "The Flight at the Embankment" },
        ],
    },
    {
        category: "Grades 6–8 First Prizes",
        works: [
            { slug: "g6-8-djebbar-untitled", artist: "Samia Djebbar", title: "Untitled" },
            { slug: "g6-8-medina-world-without-humans", artist: "Allison Medina", title: "The World without Humans" },
        ],
    },
    {
        category: "Grades 9–12 First Prize",
        works: [
            { slug: "g9-12-bhosale-duck-in-pond", artist: "Anandi Bhosale", title: "Duck in Pond" },
        ],
    },
]

const honorableMentions: AwardGroup[] = [
    {
        category: "Best Depiction of the Embankment",
        works: [
            { slug: "hm-embankment-johnson-embankment-cola", artist: "Camille Johnson", title: "Embankment Cola" },
        ],
    },
    {
        category: "Grades 1–3",
        works: [
            { slug: "hm-g1-3-desalazar-kozinska-flower-power", artist: "Arielle Desalazar-Kozinska", title: "Flower Power" },
        ],
    },
    {
        category: "Grades 4–5",
        works: [
            { slug: "hm-g4-5-prasad-stretchy", artist: "Vihaan Prasad", title: "Dedicated to “Stretchy” — Earthworm at Hamilton Park" },
        ],
    },
    {
        category: "Grades 6–8",
        works: [
            { slug: "hm-g6-8-ibrahim-buzzing-the-bloom", artist: "Vivian Ibrahim", title: "Buzzing the Bloom" },
        ],
    },
    {
        category: "Grades 9–12",
        works: [
            { slug: "hm-g9-12-khan-leaf", artist: "Sanaya Khan", title: "Leaf" },
        ],
    },
]

const students = [
    "Fedia Abdalla", "Caroline Abel", "Aavana Alkees", "Camren Alvarez", "Eshal Ansari", "Maira Ansari",
    "Kaylee Arroyo", "Chloe Auguste", "Praneeth Shyam Suresh Babu", "Amaira Bajaj", "Saira Bakhda",
    "Zakaria Belouad", "Journeyy Belton", "Anandi Bhosale", "Arianny Santana Brown", "Daniel Capobianco",
    "Maira Cheema", "Yi-Hsuan Chen", "Avani Chougule", "Ajax Colburn-Lowery", "Miranda Isabeau Conner-Vega",
    "Mira Dalvi", "Hameer Das", "Srishti Dasgupta", "Arielle Desalazar-Kozinska", "Jocelyn Dimase",
    "Olivia Divina", "Samia Djebbar", "Arianna Doga", "Basmala Elshahat", "Jalynn Felusme",
    "Nathaniel Figuero", "Sydney Gallagher", "Aanya Girish", "Tara Guntupalli", "Vikram Guntupalli",
    "Kashvi Gupta", "Ami Guzman", "Theo Haav", "Quinn Harvey", "Jayden Hernandez", "Winston Ho",
    "Emilia Ho", "Maureen Ibrahim", "Vivian Ibrahim", "Juliette Jacob", "Camille Johnson", "Ananya Jonna",
    "Merwin Joe Justin", "Selma Kassalow", "Sanaya Khan", "Mohamed Knani", "Sophia Kowaliw", "Zoya Kowaliw",
    "Ishaan Kumar", "Wallis L’Heureux", "Shirley Lin", "Phoebe Long", "Londyn Maldonado",
    "Jahnvi Mandalaywala", "Allison Medina", "Rawan Mohamed", "Takshvi Mohil", "Catherine Monahan",
    "Dhruvika Parkar", "Ansh Patel", "Dhyani Patel", "Luciana Petrangeli", "Simone Pienciak",
    "Vihaan Prasad", "Rishika Praveen", "Kira Rappaport", "Zuri Rodriguez", "Deva Darshan Tamilselvan Roshiya",
    "Vishnu Geethan Tamilselvan Roshiya", "Ryann Ross", "Elana Rugova", "Kyra Sahgal", "Aaryan Sahu",
    "Miranda Hiraldo Santos", "Zorid Shahbaz", "Kennedy Syers", "Norsang Tamang", "Juliette Tider-Johansson",
    "Astrid Tider-Johansson", "Pauleen Toong", "Nahema Anne Wangai", "Sophie Zatorski",
]

const teachers = "585 Studios, Maddy Bell, Nina Bell, Riya Bhanja, Ana Chawla, Melissa Cuccinello, Dr. Francis J. Dooley, Beth Federico, Hamilton Park Neighborhood Association, Tony Nogueira, Jersey City Free Public Library, Michael Markman, Dr. Bessie McAdams, Lina Pitelli, Hope Taylor, Wendy Reed"

const artCount = 49
const receptionCount = 26

const pad = (n: number) => n < 10 ? `0${n}` : `${n}`

type Slide = {
    src: string
    thumb: string
    alt: string
}

function Gallery({ slides, className }: { slides: Slide[], className?: string }) {
    const [index, setIndex] = useState(-1)
    return (
        <>
            <div className={`${css.gallery} ${className || ""}`}>
                {slides.map(({ thumb, alt }, idx) =>
                    <button key={thumb} className={css.tile} onClick={() => setIndex(idx)} aria-label={`Open image: ${alt}`}>
                        <img src={thumb} alt={alt} loading="lazy" />
                    </button>
                )}
            </div>
            <Lightbox
                open={index >= 0}
                index={index < 0 ? 0 : index}
                close={() => setIndex(-1)}
                slides={slides.map(({ src, alt }) => ({ src, alt }))}
                controller={{ closeOnBackdropClick: true }}
            />
        </>
    )
}

function AwardWork({ slug, artist, title }: Work) {
    const [open, setOpen] = useState(false)
    const alt = `${title}, by ${artist}`
    return (
        <figure className={css.award}>
            <button className={css.awardImg} onClick={() => setOpen(true)} aria-label={`Open image: ${alt}`}>
                <img src={`${dir}/awards/${slug}-thumb.jpg`} alt={alt} loading="lazy" />
            </button>
            <figcaption>
                <span className={css.artist}>{artist}</span>
                <span className={css.workTitle}>{title}</span>
            </figcaption>
            <Lightbox
                open={open}
                close={() => setOpen(false)}
                slides={[{ src: `${dir}/awards/${slug}.jpg`, alt }]}
                controller={{ closeOnBackdropClick: true }}
            />
        </figure>
    )
}

function AwardGroups({ groups }: { groups: AwardGroup[] }) {
    return <>{groups.map(({ category, works }) =>
        <div className={css.awardGroup} key={category}>
            <h3>{category}</h3>
            <div className={css.awardRow}>
                {works.map(work => <AwardWork key={work.slug} {...work} />)}
            </div>
        </div>
    )}</>
}

export default function McNairEcoArt() {
    const [wallTextOpen, setWallTextOpen] = useState(false)
    const artSlides: Slide[] = Array.from({ length: artCount }, (_, i) => {
        const n = pad(i + 1)
        return { src: `${dir}/art/${n}.jpg`, thumb: `${dir}/art/${n}.jpg`, alt: `Student artwork from the exhibition (${i + 1} of ${artCount})` }
    })
    const receptionSlides: Slide[] = Array.from({ length: receptionCount }, (_, i) => {
        const n = pad(i + 1)
        return { src: `${dir}/reception/${n}.jpg`, thumb: `${dir}/reception/${n}-thumb.jpg`, alt: `Photo from the June 6, 2026 reception (${i + 1} of ${receptionCount})` }
    })
    return (
        <Page
            path="mcnair-eco-art"
            title={ogMetadata.title}
            description={ogMetadata.description}
            ogImage={ogMetadata.image}
            headerChildren={
                <ParallaxHeader
                    title={"McNair x Embankment Jersey City Eco-Youth Art Exhibition"}
                    subtitleChildren={<div className={css.subtitle}>
                        <p className={css.bold}>New Jersey City University Visual Arts Gallery</p>
                        <p>June 1–6, 2026</p>
                    </div>}
                    className={css.header}
                    img={"/images/NEWS-BANNER.jpg"}
                />
            }
        >
            <div className={css.body}>
                <p>
                    The <strong>McNair Academic High School Environmental Club</strong> and the <strong>Embankment Preservation Coalition</strong> collaborated to organize an environmental art competition. More than 80 students submitted their work. These students ranged from grade 1 to grade 12 and represented perspectives from across Jersey City. Their creations showcased an impressive breadth of mediums &mdash; from paintings to sculptures to drawings.
                </p>
                <p>
                    With imagination and skill, these young artists highlighted the beauty of our natural world. Their work drew inspiration from Jersey City&rsquo;s many unique ecosystems&mdash;from the Embankment, the massive rail structure on Sixth Street that now supports a &ldquo;floating forest,&rdquo; to the waterfront that surrounds most of Jersey City, to the City&rsquo;s numerous parks&mdash;and underscores the importance of protecting these spaces for the next generation.
                </p>
                <p>
                    An exhibition at New Jersey City University exhibited 60 of the students&rsquo; work. A reception was held on June 6, 2026. Fourteen young artists were awarded special recognition.
                </p>

                <h2>Awards</h2>
                <AwardGroups groups={awards} />

                <h2>Honorable Mentions</h2>
                <AwardGroups groups={honorableMentions} />
            </div>

            <div className={css.wide}>
                <h2>Art from the Exhibition</h2>
                <Gallery slides={artSlides} className={css.artGallery} />

                <h2>Images from the Reception</h2>
                <Gallery slides={receptionSlides} />
            </div>

            <div className={css.body}>
                <h2>Participating Students</h2>
                <ul className={css.students}>
                    {students.map(name => <li key={name}>{name}</li>)}
                </ul>

                <h2>Teachers and Facilitators</h2>
                <p className={css.credits}>{teachers}</p>

                <h2>Organizers</h2>
                <p className={css.credits}>
                    <strong>McNair Academic High School Environmental Club</strong><br />
                    Liam Wong, Surabhi Sharma, James Dunckley, Shelley Ma, Shasha Justin, Maria Nolau (Faculty Advisor)
                </p>
                <p className={css.credits}>
                    <strong>Embankment Preservation Coalition</strong><br />
                    Katy Lyness, Betty Bodman, Maureen Crowley, Peter Delman, Jennifer Meyer, Jessica Constantine
                </p>
                <p className={css.credits}>
                    <strong>Competition Judges</strong><br />
                    Peter Delman, Katy Lyness
                </p>
                <p className={css.credits}>
                    Thank you to New Jersey City University Galleries for contributing the space and support for this exhibition, and to Midori Yoshimoto, Director of the Art Galleries, for her generous guidance and assistance.
                </p>

                <div className={css.wallTextWrap}>
                    <button className={css.wallText} onClick={() => setWallTextOpen(true)} aria-label="Open the exhibition wall text at full size">
                        <img src={`${dir}/wall-text-thumb.jpg`} alt="Illustrated exhibition wall text listing the participating artists, teachers, and organizers" loading="lazy" />
                    </button>
                    <p className={css.caption}>Exhibition wall text (click to enlarge)</p>
                </div>
                <Lightbox
                    open={wallTextOpen}
                    close={() => setWallTextOpen(false)}
                    slides={[{ src: `${dir}/wall-text.jpg`, alt: "Illustrated exhibition wall text listing the participating artists, teachers, and organizers" }]}
                    controller={{ closeOnBackdropClick: true }}
                />
            </div>
        </Page>
    )
}
