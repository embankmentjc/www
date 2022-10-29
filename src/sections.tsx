import React, {ReactNode} from "react";

export function CarouselButton({ text, href }: { text: string, href: string, }) {
    return (
        <a href={href} target="_blank"><button className="btn btn-primary" type="button">{text}</button></a>
    )
}

export function BigPicture({ title, id, children }: { title: string, id?: string, children: ReactNode }) {
    return (
        <section id={id} className="section-98 section-sm-110 bg-white-lilac">
            <div className="container">
                <h1>{title}</h1>
                <hr className="divider divider-lg bg-mantis" />
                <div className="row justify-content-sm-center">
                    <div className="col-md-9 col-xl-8">
                        {children}
                    </div>
                </div>
            </div>
        </section>
    )
}

export type Figure = {
    src: string
    alt?: string
    caption?: string
    border?: string
    //style?: { [k: string]: any }
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

export type ConceptSectionBody = {
    figCols?: number
    children: ReactNode
} & Figure
export function ConceptSectionBody({ figCols = 8, children, ...figure }: ConceptSectionBody) {
    return (
        <>
            <div className="row justify-content-md-center offset-top-20">
                <div className={`col-md-${figCols} col-lg-${figCols} inset-lg-right-80`}>
                    <header className="post-media">
                        <Figure {...figure} />
                    </header>
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
    pre?: ReactNode
} & ConceptSectionBody

export function ConceptSection({ title, pre, children, ...rest }: ConceptSection) {
    return (
        <section className="section novi-background section-50 section-sm-top-5">
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

export function ParallaxSection1({ id, title, img, children }: { id?: string, title: ReactNode, img: string, children?: ReactNode, }) {
    return (
        <section id={id} className="section parallax-container" data-parallax-img={img}>
            <div className="parallax-content section-98 section-sm-124 bg-overlay-white">
                <div className="container">
                    <div className="row justify-content-md-center">
                        <div className="col-md-10">
                            <h1>{title}</h1>
                            {children && <hr className="divider bg-mantis" />}
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
        <section id={id} className="section novi-background section-66 section-top-50 bg-mantis section-triangle section-triangle-bottom context-dark">
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
