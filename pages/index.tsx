import React, {ReactNode} from "react"
import Page from "../components/page"
import {
    ConceptSection,
    GradientHeader, IconBox2,
    IconBoxesSection,
    ParallaxSection1, Section
} from "../components/theme";
import {becomeMemberId} from "./involved";


export async function getStaticProps(context: any) {
    return {
        props: {}, // will be passed to the page component as props
    }
}

function Btn({ href, text, primary, }: {
    href: string
    text: string
    primary: boolean
}) {
    const cls = primary ? "btn-primary" : "btn-default"
    return (
        <a
            className={`btn ${cls} btn-lg btn-anis-effect`}
            data-caption-animate="fadeInUp"
            data-caption-delay="1200"
            href={href}
        >
            <span className="btn-text">
                {text}
            </span>
        </a>
    )
}

function BannerSlide({ img, alt, title, subtitle, btn1, btn2, }: {
    img: string
    alt: string
    title: string
    subtitle: string
    btn1: { href: string, text: string }
    btn2: { href: string, text: string }
}) {
    return (
        <li data-transition="crossfade">
            <img
                className="rev-slidebg"
                data-bgposition="center center"
                data-bgfit="cover"
                data-bgrepeat="no-repeat"
                data-bgparallax="15"
                src={img}
                alt={alt}
            />
            <div
                className="tp-caption"
                data-y="['center','center','center','center']"
                data-x="['center','center','center','center']"
                data-height="100%"
                data-type="row"
                data-columnbreak="2"
                data-basealign="slide"
                data-responsive_offset="on"
                data-responsive="off"
                data-frames="[{&quot;delay&quot;:10,&quot;speed&quot;:400,&quot;frame&quot;:&quot;0&quot;,&quot;from&quot;:&quot;opacity:0;&quot;,&quot;to&quot;:&quot;o:1;&quot;,&quot;ease&quot;:&quot;Power3.easeInOut&quot;},{&quot;delay&quot;:&quot;wait&quot;,&quot;speed&quot;:400,&quot;frame&quot;:&quot;999&quot;,&quot;to&quot;:&quot;opacity:0;&quot;,&quot;ease&quot;:&quot;Power3.easeInOut&quot;}]"
                data-margintop="[0,0,0,0]"
                data-marginright="[0,0,0,0]"
                data-marginbottom="[0,0,0,0]"
                data-marginleft="[0,0,0,0]"
                data-textalign="['inherit','inherit','inherit','inherit']"
                style= {{ zIndex: 9, whiteSpace: 'nowrap', fontSize: '20px', lineHeight: '22px', fontWeight: 400, color: 'rgba(255, 255, 255, 1.00)' }}
            >
                <div
                    className="tp-caption"
                    data-y="['center','center','center','center']"
                    data-x="['center','center','center','center']"
                    data-type="column"
                    data-frames="[{&quot;delay&quot;:&quot;+0&quot;,&quot;speed&quot;:400,&quot;frame&quot;:&quot;0&quot;,&quot;from&quot;:&quot;opacity:0;&quot;,&quot;to&quot;:&quot;opacity:1;&quot;,&quot;ease&quot;:&quot;Power3.easeInOut&quot;},{&quot;delay&quot;:&quot;wait&quot;,&quot;speed&quot;:400,&quot;frame&quot;:&quot;999&quot;,&quot;to&quot;:&quot;opacity:0;&quot;,&quot;ease&quot;:&quot;Power3.easeInOut&quot;}]"
                >
                    <div className="container">
                        <div className="row justify-content-sm-center align-items-sm-center">
                            <div className="col-xl-10">
                                <div
                                    className="tp-caption"
                                    data-fontsize="['62', '48', '36', '28']"
                                    data-type="text"
                                    data-lineheight="['68', '44', '42', '34']"
                                    data-y="['center','center','center','center']"
                                    data-x="['center','center','center','center']"
                                    data-frames="[{&quot;delay&quot;:&quot;+400&quot;,&quot;speed&quot;:1700,&quot;frame&quot;:&quot;0&quot;,&quot;from&quot;:&quot;y:250px;opacity:0;fb:50px;&quot;,&quot;to&quot;:&quot;o:1;fb:0;&quot;,&quot;ease&quot;:&quot;Power4.easeOut&quot;},{&quot;delay&quot;:&quot;wait&quot;,&quot;speed&quot;:400,&quot;frame&quot;:&quot;999&quot;,&quot;to&quot;:&quot;opacity:0;fb:0;&quot;,&quot;ease&quot;:&quot;Power3.easeInOut&quot;}]"
                                >
                                    <h1><span className="big text-uppercase">{title}</span></h1>
                                </div>
                                <div
                                    className="d-none d-md-block offset-top-30 tp-caption"
                                    data-visibility="['on', 'on', 'off', 'off']"
                                    data-type="text"
                                    data-y="['center','center','center','center']"
                                    data-x="['center','center','center','center']"
                                    data-frames="[{&quot;delay&quot;:&quot;+490&quot;,&quot;speed&quot;:2000,&quot;frame&quot;:&quot;0&quot;,&quot;from&quot;:&quot;y:250px;opacity:0;fb:50px;&quot;,&quot;to&quot;:&quot;o:1;fb:0;&quot;,&quot;ease&quot;:&quot;Power4.easeOut&quot;},{&quot;delay&quot;:&quot;wait&quot;,&quot;speed&quot;:400,&quot;frame&quot;:&quot;999&quot;,&quot;to&quot;:&quot;opacity:0;fb:0;&quot;,&quot;ease&quot;:&quot;Power3.easeInOut&quot;}]"
                                >
                                    <h4 className="text-bold">{subtitle}</h4>
                                </div>
                                <div
                                    className="tp-caption"
                                    data-whitespace="['normal', 'normal', 'nowrap', 'normal']"
                                    data-type="text"
                                    data-fontsize="['inherit', 'inherit', 'inherit', 'inherit']"
                                    data-lineheight="['inherit', 'inherit', 'inherit', 'inherit']"
                                    data-y="['center','center','center','center']"
                                    data-x="['center','center','center','center']"
                                    data-frames="[{&quot;delay&quot;:&quot;+550&quot;,&quot;speed&quot;:2000,&quot;frame&quot;:&quot;0&quot;,&quot;from&quot;:&quot;y:250px;opacity:0;fb:50px;&quot;,&quot;to&quot;:&quot;o:1;fb:0;&quot;,&quot;ease&quot;:&quot;Power4.easeOut&quot;},{&quot;delay&quot;:&quot;wait&quot;,&quot;speed&quot;:400,&quot;frame&quot;:&quot;999&quot;,&quot;to&quot;:&quot;opacity:0;fb:0;&quot;,&quot;ease&quot;:&quot;Power3.easeInOut&quot;}]"
                                >
                                    <div className="group group-xl offset-top-20 offset-sm-top-50">
                                        {Btn({ ...btn1, primary: true })}
                                        {Btn({ ...btn2, primary: false })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    )
}


function BannerSlides() {
    return (
        <div className="rev_slider_wrapper--holder">
            <div className="rev_slider_wrapper fullscreen-container context-dark">
                {/* the ID here will be used in the JavaScript below to initialize the slider */}
                <div className="rev_slider fullscreenbanner" id="rev_slider_1" style={{ display: 'none', }}>
                    {/* BEGIN MAIN SLIDE LIST */}
                    <ul>
                        <BannerSlide
                            img="/images/HOME-SLIDER1.jpg"
                            alt="TODO"
                            title="Welcome to the Harsimus Branch and Embankment"
                            subtitle="The Future of Green Infrastructure in Jersey City"
                            btn1={{ href: "/vision", text: "Explore Our Vision", }}
                            btn2={{ href: "https://youtu.be/qxAHqzLqnoo", text: "Watch Video", }}
                        />
                        <BannerSlide
                            img="/images/HOME-SLIDER2.jpg"
                            alt="TODO"
                            title="Historic Structure and a Natural Forest"
                            subtitle="A Green Corridor Unique to Jersey City"
                            btn1={{ href: "#home-section-what", text: "Learn More", }}
                            btn2={{ href: "/involved#involved-section-donate", text: "Donate", }}
                        />
                        <BannerSlide
                            img="/images/HOME-SLIDER3.jpg"
                            alt="TODO"
                            title="Our Vision"
                            subtitle="Preserve, Restore, Activate"
                            btn1={{ href: "https://youtu.be/qxAHqzLqnoo", text: "Watch Video", }}
                            btn2={{ href: `/involved#${becomeMemberId}`, text: "Become a Member", }}
                        />
                    </ul>
                </div>
            </div>
        </div>
    )
}

function IntroSectionWhat() {
    return (
        <Section id="home-section-what" title={"What is the Harsimus Branch and Embankment?"} h1={true}>
            <div className="row justify-content-sm-center">
                <div className="col-md-9 col-xl-8">
                    <p>The Harsimus Branch is a rail corridor running for about a mile in Jersey City. Its Embankment is a massive, segmented stone structure with lush green meadows and forest on top that developed naturally when freight service ended. </p>
                    <p><strong><a href="https://youtu.be/qxAHqzLqnoo">Check out the "EMBANKMENT AND EAST COAST GREENWAY VISION" video for more info (and some drone flyovers!)</a></strong></p>
                </div>
            </div>
            <div className="row justify-content-sm-center offset-top-0">{
                [{
                    title: "Historic Site", icon: "city",
                    blurb: "The Harsimus Branch was the Pennsylvania Railroad’s (PRR) freight way into New York Harbor. It shaped Jersey City neighborhoods and contributed to the growth of the Port of New York. The Branch is now a historic right-of-way eligible for the National Register of Historic Places. The Branch’s stone Embankment is a landmark on city, state, and federal levels and contributes to the Hamilton Park, Harsimus Cove, and PRR New York-to-Philadelphia Historic Districts.",
                }, {
                    title: "Green Infrastructure", icon: "recycle",
                    blurb: "Natural meadows and forest, unimpeded by human activity on streets below, sprang up on top of the Embankment stone segments as freight service slowed and then ended in the 1990s. This ecological infrastructure cleans air, absorbs heat, and reduces stormwater flowing into Jersey City’s overburdened sewers at lower cost than engineered solutions. The forest will be a public oasis in a busy city. A trail will provide carbon-free transportation options.",
                }, {
                    title: "Community Connector", icon: "share-variant",
                    blurb: "The Harsimus Branch and associated corridors connect Jersey City neighborhoods, historic sites, and open space from the Hudson to the Hackensack River. The Hudson River Waterfront Walkway, the Branch, and the Bergen Arches are county segments of the off-road East Coast Greenway, a walking and biking trail being stitched together from Maine to Florida. Additional regional trails will use the Greenway and interconnect with local paths in a trail network.",
                }].map(
                    icon =>
                        <IconBox2
                            key={icon.title}
                            {...icon}
                            classes={"col-md-8 col-lg-4"}
                            iconClasses={"icon-mantis-filled icon-circle"}
                            titleClasses={"offset-top-20"}
                        />
                )
            }</div>
        </Section>
    )
}

function ConceptSections() {
    return (<>
        <ConceptSection id="home-section-historic" title={"The Historic Embankment"} src={"/images/HOME-AERIAL.jpg"} figure={false}>
            <p>The Harsimus Branch Embankment is the sturdy vestige of a rail economy and landscape that once dominated Jersey City. The masonry and earth structure possesses a remarkable physical integrity and during construction the journalistic accounts stressed its monumental qualities. Landscape historian John Stilgoe writes of the structure as having “the everlasting solidity of Egyptian pyramids and Inca roads” (Stilgoe, 1998, p. 42).</p>
            <p>Designed by James J. Ferris, a prominent civil engineer and politician in Jersey City, the Embankment was erected from 1901-1905 to replace an existing iron and timber elevated rail line that was deemed too low and unstable. The Embankment stone structure ranged from 27 feet  to 13 feet  in height with each stone weighing nearly a ton. At this scale, the stone and earth structure not only resolved the instability of the existing structure but also better absorbed the vibrations and noises from the constant industrial traffic moving through the Jersey City community - creating a safer and healthier urban environment. </p>
        </ConceptSection>
        <ConceptSection id="home-section-forest" title={"The Natural Urban Meadow and Forest"} src={"/images/HOME-STEP2.jpg"} figure={false}>
            <p>When rail activities on the Harsimus Branch slowed, nature moved in to colonize the deep soils of the Embankment. Inaccessible from street level, the stone islands were a protected environment. Meadows and a natural forest established themselves within a densely built out urban context. Birds and butterflies found niches in the center of hardscape—an expanded habitat.</p>
            <p>A community of plants has established itself without human intervention. Though stewardship of the historic site may require some removal of trees with roots disturbing the stones, the current ecology is self-sufficient and needs no maintenance to survive. Preserving the green corridor will set precedent for cities around the world, demonstrating that a healthy ecology and urban infrastructure are compatible, not competitors.</p>
        </ConceptSection>
        <ConceptSection id="home-section-eastcoast" title={"The East Coast Greenway"} src={"/images/HOME-EASTCOAST.jpg"} figure={false}>
            <p>The East Coast Greenway connects 15 states and 450 cities and towns via 3,000 miles of people-powered trails from Maine to Florida. A collaborative effort led by the East Coast Greenway Alliance partnering with nonprofits, businesses, and governments, the Greenway represents a commitment to public health, environmental sustainability, economic development, and civic engagement by communities along its length. The goal: a largely off-road trail offering a safe place for people of all ages and abilities to exercise, commute, and visit new destinations.</p>
            <p>About 60% of the permanent Greenway route is in place in New Jersey but only a small portion is complete in Hudson County.  We aim to change that! An interim on-road route exists but, for safety reasons, is not recommended. The permanent, largely off-road route will enter Jersey City from New York via ferry or the Hudson River Waterfront Walkway from the George Washington Bridge. It will continue along Sixth Street over the Embankment and through the Bergen Arches, and use other corridors to Jersey City’s West Side and on to Secaucus.</p>
        </ConceptSection>
    </>)
}

function NextStep({ side, step, title, src, first, children, }: { side: "left" | "right", step: string, title: string, src: string, first?: boolean, children: ReactNode, }) {
    const justify = side == "left" ? "start" : "end"
    const aside = side == "left" ? "right" : "left"
    const insetClass = side == "left" ? "inset-md-right-30" : "inset-md-left-50"
    return (
        <div className={`row justify-content-sm-center justify-content-md-${justify} ${first ? "" : "offset-sm-top-0"}`}>
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

function NextSteps() {
    const nextSteps = [{
        title: "Planning for Reuse", src: "/images/HOME-STEP1.jpg",
        children: <>
            <p>If Jersey City acquires the Harsimus Branch, as we expect, it will follow the typical land use public process for the Branch and Embankment. An Area in Need Study, redevelopment plans, and site plans must be reviewed by various land use boards and approved for the project to move forward.</p>
            <p>During this process, the City is expected to consult with state and federal agencies and organizations, among them New Jersey Department of Environmental Protection offices, including its Historic Preservation Office; the federal Surface Transportation Board; and the federal Advisory Council on Historic Preservation. The Embankment Coalition will encourage public participation.</p>
        </>,
    }, {
        title: "Community Engagement", src: "/images/HOME-STEP3B.jpg",
        children: <>
            <p>In civic activism spearheaded by the Embankment Coalition, thousands of individuals and dozens of local, state, regional, and national organizations rallied over two decades to save the historic Harsimus Branch right-of-way and its elevated stone Embankment for 21st-century uses. </p>
            <p>The Coalition will continue to engage this steadfast and informed public to advance an ecological vision for the Branch compatible with historic preservation, passive recreation, muscle-powered transportation, and a commitment to community and democratic ideals. We aim to build a chain of stewards for segments of the East Coast Greenway as it moves its way through Hudson County.</p>
        </>,
    }, {
        title: "Concept Development", src: "/images/HOME-STEP4.jpg",
        children: <>
            <p>From its inception in 1999, the Embankment Coalition has advocated for historically compatible reuses as historic site, rail, trail, and open space. Since 2004 the East Coast Greenway off-road trail over the Embankment has been supported by Jersey City and Hudson County resolutions and planning documents. We are now enlisting support for a broad ecological vision and a public process that will result in an inspirational design for the Embankment, the Branch, and associated resources.</p>
            <p>The Harsimus Branch design must be responsive to its historic status. The Embankment is listed in the State Register of Historic Places (1999), eligible for the National Register of Historic Places (2000), and a Municipal Landmark (2006). The longer right-of-way is also eligible for the National Register (2018). It runs through national historic districts and past other historic sites. The treatment of these resources must therefore follow U.S. Department of Interior guidelines.</p>
        </>,
    }, {
        title: "Securing the Future", src: "/images/HOME-SLIDER2.jpg",
        children: <>
            <p>When Jersey City acquires the Harsimus Branch and Embankment, the Coalition will expand and strengthen its board. We aim to partner with the City to raise funds for park and trail development and maintenance. We will organize educational and cultural programming.</p>
            <p>The Coalition will encourage local organizations along the Jersey City segments of the East Coast Greenway to become stewards of their segments. We will explore relationships with other organizations and local and state agencies to advance best land use practices along the Branch and its connections.</p>
        </>,
    }]
    const children = nextSteps.map(
        (nextStep, idx) => {
            const side = (idx % 2 == 0) ? "left" : "right"
            const step = `Step 0${idx + 1}`
            return <NextStep key={step} side={side} step={step} {...nextStep} first={idx == 0} />
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

export default function Body() {
    return (
        <Page
            path="/"
            headerChildren={<BannerSlides />}
            // modal={true}
        >
            <IntroSectionWhat />
            <ConceptSections />
            <ParallaxSection1 id={"home-section-now"} img={"/images/HOME-BOTTOM.jpg"} />
            <IconBoxesSection
                id={"home-section-mission"}
                title={"Our Goals"}
                src={"/images/HOME-MISSION2.jpg"}
                boxes={[ {
                    icon: "checkbox-marked-circle",
                    title: "Preserve",
                    blurb: "To preserve the historic Pennsylvania Railroad Harsimus Branch, its Embankment, and associated rail structures, and conserve th, meadows and forests these sustain.",
                }, {
                    icon: "tree",
                    title: "Restore",
                    blurb: "To restore the stone walls of the Embankment and rehabilitate the longer transportation corridor.",
                }, {
                    icon: "run",
                    title: "Activate",
                    blurb: "To activate for the public, in environmentally sustainable ways, a network of local and regional pedestrian and biking trails, linked to the East Coast Greenway.",
                } ]}
            />
            <GradientHeader id={"home-section-steps"} title={"Next Steps"} />
            <NextSteps />
            <ParallaxSection1 title={<a href="/vision">Explore Our Vision</a>} img={"/images/HOME-SLIDER3.jpg"}/>
        </Page>
    )
}
