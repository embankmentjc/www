import React, {CSSProperties, ReactNode, useState} from "react";
import { H1, H2, H3 } from "@rdub/base/heading";
import A from "@rdub/next-base/a";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { Parallax } from 'react-scroll-parallax';

export function Brand({ className }: { className: string }) {
    return (
        <div className={className}>
            <a href="/">
                <img style={{ marginTop: '-5px', marginLeft: '-15px' }} width='138' height='31' src="/images/logo-lightEPC.png" alt={"Embankment Preservation Coalition logo"} />
            </a>
        </div>
    )
}

export function CarouselButton({ text, href }: { text: string, href: string, }) {
    return (
        <a href={href} target="_blank" rel="noopener noreferrer"><button className="btn btn-primary" type="button">{text}</button></a>
    )
}

export type Figure = {
    src: string
    alt?: string
    caption?: string
    border?: string
    lightboxSrc?: string
}
export function Figure({ src, alt, caption, border, lightboxSrc }: Figure) {
    const [open, setOpen] = useState(false)
    const imgClassName = caption ? "figure-img img-fluid" : undefined
    const figcaption = caption ? (
        <figcaption
            className="figure-caption"
            style={{
                position: 'static',
                transform: 'none',
                padding: '0.5rem 0 0 0',
                fontSize: '0.875rem',
                color: '#6c757d'
            }}
        >
            {caption}
        </figcaption>
    ) : null

    return (
        <>
            <div onClick={() => setOpen(true)} style={{ cursor: 'pointer' }}>
                <div className="thumbnail-classic">
                    <figure className="figure" style={{ marginBottom: '1rem' }}>
                        <img className={imgClassName} src={src} alt={alt} style={{ border, width: '100%', height: 'auto' }} />
                        {figcaption}
                    </figure>
                </div>
            </div>
            <Lightbox
                open={open}
                close={() => setOpen(false)}
                slides={[{ src: lightboxSrc || src, alt: alt || caption }]}
                controller={{ closeOnBackdropClick: true }}
            />
        </>
    )
}

export function Section({ id, h1, top = "-3em", title, pretitle, style, className, children }: {
    id?: string
    h1?: boolean
    top?: string
    title?: ReactNode
    pretitle?: ReactNode
    style?: CSSProperties
    className?: string
    children: ReactNode
}) {
    let sectionId = id
    if (typeof title === "string") {
        sectionId = undefined
        if (h1) {
            if (id) {
                title = <H1 id={id} top={top}>{title}</H1>
            } else {
                title = <h1>{title}</h1>
            }
        } else {
            if (id) {
                title = <H2 id={id} top={top} className="font-weight-bold">{title}</H2>
            } else {
                title = <h2 className="font-weight-bold">{title}</h2>
            }
        }
    }
    return (
        <section id={sectionId} className={`section section-98 section-sm-110 ${className ?? ""}`} style={style || {}}>
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
    images?: Figure[]
} & Partial<Figure>
export function ConceptSectionBody({ figCols = 8, figure, children, images, ...figProps }: ConceptSectionBody) {
    const imagesToRender = images || (figProps.src ? [figProps as Figure] : [])
    return (
        <>
            <div className="row justify-content-md-center offset-top-20">
                <div className={`col-md-${figCols} col-lg-${figCols} inset-lg-right-50`}>
                    {imagesToRender.map((img, idx) => (
                        <div key={idx} style={{ marginBottom: idx < imagesToRender.length - 1 ? '20px' : '0' }}>
                            {
                                (figure === false)
                                    ? <img className={"img-fluid element-fullwidth"} src={img.src} alt={img.alt} style={{ width: '100%', height: 'auto' }} />
                                    : <header className="post-media">
                                        <Figure {...img} />
                                    </header>
                            }
                        </div>
                    ))}
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
    const headingId = id || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
    return (
        <section className="section section-50 section-sm-top-5">
            <div className="container">
                {pre}
                <ConceptSectionBody {...rest}>
                    <H3 id={headingId}>{title}</H3>
                    {children}
                </ConceptSectionBody>
            </div>
        </section>
    )
}

export type ArtistSection = {
    bullets: string[]
    fig: Figure
} & ConceptSection

export function ArtistSection({ bullets, fig, alt, caption, children, ...rest}: ArtistSection) {
    return (
        <ConceptSection caption={caption} alt={alt || caption} {...rest}>
            <div className="container">
                <div className="row offset-top-20">
                    <div className="col-md-6 col-lg-6" style={{ textAlign: "center" }}>
                        <ul className="list-unstyled" style={{ listStyleType: "disc", textAlign: "left", display: "inline-block" }}>{
                            bullets.map(bullet => <li key={bullet}>{bullet}</li>)
                        }</ul>
                    </div>
                    <div className="col-md-6 col-lg-6 text-center">
                        <Figure {...fig} />
                    </div>
                </div>
                {children}
            </div>
        </ConceptSection>
    )
}

type HeaderButton = { href: string, text: string }
export function ParallaxHeader({ title, embed, subtitle, subtitleChildren, img, btn1, btn2, className, btnsCls, }: {
    title: ReactNode
    embed?: ReactNode
    subtitle?: ReactNode
    subtitleChildren?: ReactNode
    img: string
    btn1: HeaderButton
    btn2: HeaderButton
    className?: string
    btnsCls?: string
}) {
    if (typeof title === 'string') {
        title = <h1 className="text-capitalize"><span className="big">{title}</span></h1>
    }
    return (
        <section className={`section parallax-container bg-black ${className || ""}`} style={{ backgroundImage: `url(${img})`, backgroundAttachment: 'fixed', backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="parallax-content context-dark">
                <div className="container">
                    <div className="row align-items-sm-center justify-content-sm-center section-cover section-98 section-sm-110 text-lg-left context-dark">
                        <div className="col-sm-12">
                            <div className="offset-top-4 offset-xl-top-0">
                                {title}
                            </div>
                            {embed}
                            <div>
                                {subtitle ? <h2 className="font-default font-italic text-regular">{subtitle}</h2> : null}
                                {subtitleChildren}
                            </div>
                            <div className={`group group-xl offset-top-30 ${btnsCls || ""}`}>
                                <A href={btn1.href} className="btn btn-primary btn-lg btn-anis-effect">{btn1.text}</A>
                                <A href={btn2.href} className="btn btn-default btn-lg btn-anis-effect"><span className="btn-text">{btn2.text}</span></A>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export function ParallaxSection1({ id, top = "-5em", title, img, children }: { id?: string, top?: string, title?: ReactNode, img: string, children?: ReactNode, }) {
    const headingId = id || (typeof title === 'string' ? title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') : undefined)
    const isStringTitle = typeof title === 'string'
    return (
        <section className="section parallax-container" style={{ backgroundImage: `url(${img})`, backgroundAttachment: 'fixed', backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="parallax-content section-98 section-sm-124 bg-overlay-white">
                <div className="container">
                    <div className="row justify-content-md-center">
                        <div className="col-md-10">
                            {title && isStringTitle && (
                                <H1 id={headingId} style={{ position: "relative" }}>
                                    {title}
                                </H1>
                            )}
                            {title && !isStringTitle && (
                                <h1 style={{ position: "relative" }}>
                                    {id && <span id={id} style={{ position: "absolute", top }} />}
                                    {title}
                                </h1>
                            )}
                            {title && children && <hr className="divider bg-mantis" />}
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export function ParallaxSection2({ title, id, top = "-5em", blurb, img, children, }: { title: string, id?: string, top?: string, blurb: ReactNode, img: string, children?: ReactNode, }) {
    if (typeof blurb === 'string') {
        blurb = <p>{blurb}</p>
    }
    const headingId = id || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
    return (
        <section className="section parallax-container bg-black" style={{ backgroundImage: `url(${img})`, backgroundAttachment: 'fixed', backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="parallax-content section-98 section-sm-110 context-light">
                <div className="container">
                    <H2 id={headingId} style={{ position: "relative" }}>
                        <span className="big">{title}</span>
                    </H2>
                    <hr className="divider divider-lg bg-mantis" />
                    <div className="row justify-content-center offset-top-24">
                        <div className="col-sm-10 col-xl-8">{blurb}</div>
                        {children}
                    </div>
                </div>
            </div>
        </section>
    )
}

export function GradientHeader({ id, top = "-5em", title, className = "", chevron = true, children, }: {
    id?: string
    top?: string
    title: ReactNode
    className?: string
    chevron?: boolean
    children?: ReactNode
}) {
    return (
        <section className={`section section-66 section-top-50 bg-mantis section-triangle section-triangle-bottom context-dark ${className}`}>
            <div className="container">
                <div className="row justify-content-center">
                    <h2 style={{ position: "relative" }}>
                        {id && <span id={id} style={{ position: "absolute", top }} />}
                        <span className="big">{title}</span>
                    </h2>
                    <div className={`col-lg-8`}>{children}</div>
                </div>
            </div>
            {
                chevron &&
                <svg className="svg-triangle-bottom" xmlns="http://www.w3.org/2000/svg" version="1.1">
                    <defs>
                        <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" style={{ stopColor: "rgb(99,189,98)", stopOpacity: 1 }}></stop>
                            <stop offset="100%" style={{ stopColor: "rgb(99,189,98)", stopOpacity: 1 }}></stop>
                        </linearGradient>
                    </defs>
                    <polyline points="0,0 60,0 29,29" fill="url(#grad2)"></polyline>
                </svg>
            }
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
    blurb: ReactNode
    icon: string
}

export function IconBox2(
    { title, blurb, icon, classes, iconClasses, titleClasses }: IconBox & {
        classes?: string
        iconClasses?: string
        titleClasses?: string
    }) {
    if (typeof blurb === 'string') {
        blurb = <p>{blurb}</p>
    }
    return (
        <div className={`offset-top-66 ${classes || ""}`}>
            <div className="unit unit-sm flex-md-row text-md-left">
                <div className="unit-left">
                    <span className={`icon mdi mdi-${icon} ${iconClasses || ""}`} />
                </div>
                <div className="unit-body">
                    <h4 className={`font-weight-bold ${titleClasses || ""}`}>{title}</h4>
                    {blurb}
                </div>
            </div>
        </div>
    )
}

export function IconBoxesSection(
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
                                <IconBox2
                                    key={box.title}
                                    {...box}
                                    classes={`offset-xl-top-${idx ? 34 : 50}`}
                                    iconClasses={"text-gray"}
                                    titleClasses={`text-mantis offset-md-top-${titleOffset}`}
                                />
                            )
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}

export function Banner({ id, top = "-5em", title, icon, children, }: { id?: string, top?: string, title: string, icon: string, children?: ReactNode, }) {
    return (
        <section className="section breadcrumb-classic">
            {id && <span id={id} style={{ position: "absolute", top }} />}
            <div className="container section-34 section-sm-50">
                <div className="row align-items-xl-center">
                    <div className="col-12 col-xl-5 text-center text-xl-left">
                        <h2>
                            <span className="big">{title}</span>
                        </h2>
                    </div>
                    <div className="col-xl-2 d-none d-xl-block text-center"><span className={`icon icon-white mdi mdi-${icon}`}></span></div>
                    <div className="col-12 offset-top-10 col-xl-5 offset-xl-top-0 small text-center text-xl-right">
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
