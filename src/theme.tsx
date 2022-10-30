import React, {ReactNode} from "react";

export function CarouselButton({ text, href }: { text: string, href: string, }) {
    return (
        <a href={href} target="_blank"><button className="btn btn-primary" type="button">{text}</button></a>
    )
}

export type Figure = {
    src: string
    alt?: string
    caption?: string
    border?: string
}
export function Figure({ src, alt, caption, border, }: Figure) {
    const { thumbnail, img, figcaption }: any = caption ? {
        img: { className: "figure-img img-fluid" },
        figcaption: <figcaption className="figure-caption">{caption}</figcaption>,
    } : {
        thumbnail: { className: "thumbnail-classic" },
    }
    return (
        <div data-lightgallery="group">
            <a {...thumbnail} data-lightgallery="item" href={src}>
                <figure className="figure">
                    <img {...img} width="570" height="321" src={src} alt={alt} style={{ border }} />
                    {figcaption}
                </figure>
            </a>
        </div>
    )
}

export function Section({ id, h1, title, pretitle, children }: {
    id?: string
    h1?: boolean
    title?: ReactNode
    pretitle?: ReactNode
    children: ReactNode
}) {
    if (typeof title === "string") {
        if (h1) {
            title = <h1>{title}</h1>
        } else {
            title = <h2 className="font-weight-bold">{title}</h2>
        }
    }
    return (
        <section id={id} className="section section-98 section-sm-110">
            <div className="container">
                {pretitle}
                {title}
                {title && <hr className={`divider ${h1 ? "divider-lg" : ""} bg-mantis`} />}
                {children}
            </div>
        </section>
    )
}

export function BigPicture({ title, id, children }: { title: string, id?: string, children: ReactNode }) {
    return (
        <Section id={id} title={title} h1={true}>
            <div className="row justify-content-sm-center">
                <div className="col-md-9 col-xl-8">
                    {children}
                </div>
            </div>
        </Section>
    )
}

export type ConceptSectionBody = {
    figCols?: number
    figure?: boolean
    children: ReactNode
} & Figure
export function ConceptSectionBody({ figCols = 8, figure, children, ...figProps }: ConceptSectionBody) {
    return (
        <>
            <div className="row justify-content-md-center offset-top-20">
                <div className={`col-md-${figCols} col-lg-${figCols} inset-lg-right-80`}>
                    {
                        (figure === false)
                            ? <img className={"img-fluid element-fullwidth"} src={figProps.src} alt={figProps.alt} width="716" height="404" />
                            : <header className="post-media">
                                <Figure {...figProps} />
                            </header>
                    }
                </div>
                <div className={`col-md-${12 - figCols} col-lg-${12 - figCols} text-md-left offset-top-34 offset-lg-top-0`}>
                    {children}
                </div>
            </div>
        </>
    )
}

export type ConceptSection = {
    title: string
    id?: string
    pre?: ReactNode
} & ConceptSectionBody

export function ConceptSection({ id, title, pre, children, ...rest }: ConceptSection) {
    return (
        <section id={id} className="section section-50 section-sm-top-5">
            <div className="container">
                {pre}
                <ConceptSectionBody {...rest}>
                    <h3>{title}</h3>
                    {children}
                </ConceptSectionBody>
            </div>
        </section>
    )
}

export type ArtistSection = {
    bullets: string[]
    figure: Figure
} & ConceptSection

export function ArtistSection({ bullets, figure, alt, caption, children, ...rest}: ArtistSection) {
    return (
        <ConceptSection caption={caption} alt={alt || caption} {...rest}>
            <div className="container">
                <div className="row offset-top-20">
                    <div className="col-md-6 col-lg-6" style={{ textAlign: "center" }}>
                        <ul className="list-unstyled" style={{ listStyleType: "disc", textAlign: "left", display: "inline-block" }}>{
                            bullets.map(bullet => <li key={"bullet"}>{bullet}</li>)
                        }</ul>
                    </div>
                    <div className="col-md-6 col-lg-6 text-center">
                        <Figure {...figure} />
                    </div>
                </div>
                {children}
            </div>
        </ConceptSection>
    )
}

export function ParallaxSection1({ id, title, img, children }: { id?: string, title?: ReactNode, img: string, children?: ReactNode, }) {
    return (
        <section id={id} className="section parallax-container" data-parallax-img={img}>
            <div className="parallax-content section-98 section-sm-124 bg-overlay-white">
                <div className="container">
                    <div className="row justify-content-md-center">
                        <div className="col-md-10">
                            {title && <h1>{title}</h1>}
                            {title && children && <hr className="divider bg-mantis" />}
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export function ParallaxSection2({ title, id, blurb, img, children, }: { title: string, id: string, blurb: ReactNode, img: string, children?: ReactNode, }) {
    return (
        <section id={id} className="section parallax-container bg-black" data-parallax-img={img}>
            <div className="parallax-content section-98 section-sm-110 context-light">
                <div className="container">
                    <div>
                        <h2><span className="big">{title}</span></h2>
                    </div>
                    <hr className="divider divider-lg bg-mantis" />
                    <div className="row justify-content-sm-center offset-top-24">
                        <div className="col-sm-10 col-xl-8">
                            <p>{blurb}</p>
                        </div>
                        {children}
                    </div>
                </div>
            </div>
        </section>
    )
}

export function GradientHeader({ id, title }: { id?: string, title: string, }) {
    return (
        <section id={id} className="section section-66 section-top-50 bg-mantis section-triangle section-triangle-bottom context-dark">
            <div className="container">
                <div className="row justify-content-md-center">
                    <h2><span className="big">{title}</span></h2>
                    <div className="col-lg-8" />
                </div>
            </div>
            <svg className="svg-triangle-bottom" xmlns="http://www.w3.org/2000/svg" version="1.1">
                <defs>
                    <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" style={{ stopColor: "rgb(99,189,98)", stopOpacity: 1 }}></stop>
                        <stop offset="100%" style={{ stopColor: "rgb(99,189,98)", stopOpacity: 1 }}></stop>
                    </linearGradient>
                </defs>
                <polyline points="0,0 60,0 29,29" fill="url(#grad2)"></polyline>
            </svg>
        </section>
    )
}

export function Paragraphs({ id, title, children }: { id?: string, title?: string, children: ReactNode }) {
    return (
        <section id={id} className="section-98 section-sm-110 bg-white-lilac">
            <div className="container">
                {
                    title &&
                    <>
                        <h1>{title}</h1>
                        <hr className="divider divider-lg bg-mantis" />
                    </>
                }
                <div className="row justify-content-sm-center">
                    <div className="col-md-9 col-xl-8">
                        {children}
                    </div>
                </div>
            </div>
        </section>
    )
}

type IconBox = {
    title: string
    key?: string
    blurb: ReactNode
    icon: string
}

export function IconBox2(
    { title, titleOffset, key, blurb, icon, offset = 34 }: IconBox & {
        titleOffset: number
        offset?: number
    }) {
    if (typeof blurb === 'string') {
        blurb = <p>{blurb}</p>
    }
    return (
        <div key={key || title} className={`offset-top-66 offset-xl-top-${offset}`}>
            <div className="unit unit-sm flex-md-row text-md-left">
                <div className="unit-left">
                    <span className={`icon novi-icon text-gray mdi mdi-${icon}`} />
                </div>
                <div className="unit-body">
                    <h4 className={`font-weight-bold text-mantis offset-md-top-${titleOffset}`}>{title}</h4>
                    {blurb}
                </div>
            </div>
        </div>
    )
}

export function IconBoxes(
    { id, title, titleOffset = 5, src, alt, boxes, }: {
        id?: string
        title?: string
        titleOffset?: number
        src: string
        alt?: string
        boxes: IconBox[]
    }
) {
    return (
        <section id={id} className="section section-top-98 section-sm-top-110 section-sm-bottom-110 section-lg-top-66 section-bottom-98 section-lg-bottom-0">
            <div className="container">
                <div className="row justify-content-md-center align-items-lg-center">
                    <div className="col-xl-5 d-none d-xl-inline-block">
                        <img className="img-fluid" width="470" height="770" src={src} alt={alt} />
                    </div>
                    <div className="col-md-10 col-xl-5 section-lg-bottom-50">
                        {
                            title && <>
                                <h1>{title}</h1>
                                <hr className="divider bg-mantis" />
                            </>
                        }
                        {
                            boxes.map((box, idx) =>
                                <IconBox2 {...box} titleOffset={titleOffset} {...(idx ? {} : {offset: 50})} />
                            )
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}

export function NextStep({ side, step, title, src, first, children, }: { side: "left" | "right", step: string, title: string, src: string, first?: boolean, children: ReactNode, }) {
    const justify = side == "left" ? "start" : "end"
    const aside = side == "left" ? "right" : "left"
    const insetClass = side == "left" ? "inset-md-right-30" : "inset-md-left-50"
    return (
        <div className={`row justify-content-sm-center justify-content-md-${justify} ${first ? "" : "offset-top-0"}`}>
            <div className={`col-sm-10 col-md-6 section-image-aside section-image-aside-${aside} text-left`}>
                <div className="section-image-aside-img d-none d-md-block" style={{ backgroundImage: `url(${src})` }}></div>
                <div className={`section-image-aside-body section-sm-66 ${insetClass}`}>
                    <div><h3 className="text-picton-blue">{step}</h3></div>
                    <div className="offset-top-10"><h2>{title}</h2></div>
                    <div className="offset-top-20">{children}</div>
                </div>
            </div>
        </div>
    )
}

export function NextSteps() {
    const nextSteps = [{
        title: "Planning for Reuse",
        src: "images/HOME-STEP1.jpg",
        children: <>
            <p>If Jersey City acquires the Harsimus Branch, as we expect, it will follow the typical land use public process for the Branch and Embankment. An Area in Need Study, redevelopment plans, and site plans must be reviewed by various land use boards and approved for the project to move forward.</p>
            <p>During this process, the City is expected to consult with state and federal agencies and organizations, among them New Jersey Department of Environmental Protection offices, including its Historic Preservation Office; the federal Surface Transportation Board; and the federal Advisory Council on Historic Preservation. The Embankment Coalition will encourage public participation.</p>
        </>,
    }, {
        title: "Community Engagement",
        src: "images/HOME-STEP3B.jpg",
        children: <>
            <p>In civic activism spearheaded by the Embankment Coalition, thousands of individuals and dozens of local, state, regional, and national organizations rallied over two decades to save the historic Harsimus Branch right-of-way and its elevated stone Embankment for 21st-century uses. </p>
            <p>The Coalition will continue to engage this steadfast and informed public to advance an ecological vision for the Branch compatible with historic preservation, passive recreation, muscle-powered transportation, and a commitment to community and democratic ideals. We aim to build a chain of stewards for segments of the East Coast Greenway as it moves its way through Hudson County.</p>
        </>,
    }, {
        title: "Concept Development",
        src: "images/HOME-STEP4.jpg",
        children: <>
            <p>From its inception in 1999, the Embankment Coalition has advocated for historically compatible reuses as historic site, rail, trail, and open space. Since 2004 the East Coast Greenway off-road trail over the Embankment has been supported by Jersey City and Hudson County resolutions and planning documents. We are now enlisting support for a broad ecological vision and a public process that will result in an inspirational design for the Embankment, the Branch, and associated resources.</p>
            <p>The Harsimus Branch design must be responsive to its historic status. The Embankment is listed in the State Register of Historic Places (1999), eligible for the National Register of Historic Places (2000), and a Municipal Landmark (2006). The longer right-of-way is also eligible for the National Register (2018). It runs through national historic districts and past other historic sites. The treatment of these resources must therefore follow U.S. Department of Interior guidelines.</p>
        </>,
    }, {
        title: "Securing the Future",
        src: "images/HOME-SLIDER2.jpg",
        children: <>
            <p>When Jersey City acquires the Harsimus Branch and Embankment, the Coalition will expand and strengthen its board. We aim to partner with the City to raise funds for park and trail development and maintenance. We will organize educational and cultural programming.</p>
            <p>The Coalition will encourage local organizations along the Jersey City segments of the East Coast Greenway to become stewards of their segments. We will explore relationships with other organizations and local and state agencies to advance best land use practices along the Branch and its connections.</p>
        </>,
    }]
    const children = nextSteps.map(
        (nextStep, idx) => {
            const side = (idx % 2 == 0) ? "left" : "right"
            const step = `Step 0${idx + 1}`
            return <NextStep side={side} step={step} {...nextStep} first={idx == 0} />
        }
    )
    return (
        <section className="section section-66 section-sm-0">
            <div className="container">
                {children}
            </div>
        </section>
    )
}

export function Banner({ id, title, icon, children, }: { id?: string, title: string, icon: string, children?: ReactNode, }) {
    return (
        <section id={id} className="section breadcrumb-classic">
            <div className="container section-34 section-sm-50">
                <div className="row align-items-xl-center">
                    <div className="col-xl-5 d-none d-xl-block text-xl-left">
                        <h2><span className="big">{title}</span></h2>
                    </div>
                    <div className="col-xl-2 d-none d-md-block"><span className={`icon icon-white mdi mdi-${icon}`}></span></div>
                    <div className="offset-top-0 offset-md-top-10 col-xl-5 offset-xl-top-0 small text-xl-right">
                        {children}
                    </div>
                </div>
            </div>
            <svg className="svg-triangle-bottom" xmlns="http://www.w3.org/2000/svg" version="1.1">
                <defs>
                    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" style={{ stopColor: "rgb(110,192,161)", stopOpacity: 1 }}></stop>
                        <stop offset="100%" style={{ stopColor: "rgb(111,193,156)", stopOpacity: 1 }}></stop>
                    </linearGradient>
                </defs>
                <polyline points="0,0 60,0 29,29" fill="url(#grad1)"></polyline>
            </svg>
        </section>
    )
}
