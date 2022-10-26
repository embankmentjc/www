import React from "react"
import { Page } from "../src/pages"


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
                            img="images/HOME-SLIDER1.jpg"
                            alt="TODO"
                            title="Welcome to the Harsimus Branch and Embankment"
                            subtitle="The Future of Green Infrastructure in Jersey City"
                            btn1={{ href: "vision.html", text: "Explore Our Vision", }}
                            btn2={{ href: "https://youtu.be/qxAHqzLqnoo", text: "Watch Video", }}
                        />
                        <BannerSlide
                            img="images/HOME-SLIDER2.jpg"
                            alt="TODO"
                            title="Historic Structure and a Natural Forest"
                            subtitle="A Green Corridor Unique to Jersey City"
                            btn1={{ href: "#home-section-what", text: "Learn More", }}
                            btn2={{ href: "involved#involved-section-donate", text: "Donate", }}
                        />
                        <BannerSlide
                            img="images/HOME-SLIDER3.jpg"
                            alt="TODO"
                            title="Our Vision"
                            subtitle="Preserve, Restore, Activate"
                            btn1={{ href: "https://youtu.be/qxAHqzLqnoo", text: "Watch Video", }}
                            btn2={{ href: "involved#involved-section-member", text: "Become a Member", }}
                        />
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default function Body() {
    return (
        <Page
            path="/"
            headerChildren={<BannerSlides />}
        >
            {/* What is the Embankment Section */}
            <section id="home-section-what" className="section-98 section-sm-110 bg-white-lilac">
                <div className="container">
                    <h1>What is the Harsimus Branch and Embankment?</h1>
                    <hr className="divider divider-lg bg-mantis" />
                    <div className="row justify-content-sm-center">
                        <div className="col-md-9 col-xl-8">
                            <p>The Harsimus Branch is a rail corridor running for about a mile in Jersey City. Its Embankment is a massive, segmented stone structure with lush green meadows and forest on top that developed naturally when freight service ended. </p>
                            <p><strong><a href="https://youtu.be/qxAHqzLqnoo">Check out the "EMBANKMENT AND EAST COAST GREENWAY VISION" video for more info (and some drone flyovers!)</a></strong></p>
                        </div>
                    </div>
                    <div className="row justify-content-sm-center offset-top-66">
                        <div className="col-md-8 col-lg-4">
                            {/* Icon Box Type 2 */}
                            <div className="unit unit-sm flex-md-row text-md-left">
                                <div className="unit-left"><span className="icon novi-icon icon mdi mdi-city icon-mantis-filled icon-circle"></span></div>
                                <div className="unit-body">
                                    <h4 className="font-weight-bold offset-top-20">Historic Site</h4>
                                    <p>The Harsimus Branch was the Pennsylvania Railroad’s (PRR) freight way into New York Harbor. It shaped Jersey City neighborhoods and contributed to the growth of the Port of New York. The Branch is now a historic right-of-way eligible for the National Register of Historic Places. The Branch’s stone Embankment is a landmark on city, state, and federal levels and contributes to the Hamilton Park, Harsimus Cove, and PRR New York-to-Philadelphia Historic Districts.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8 col-lg-4 offset-top-66 offset-lg-top-0">
                            {/* Icon Box Type 2 */}
                            <div className="unit unit-sm flex-md-row text-md-left">
                                <div className="unit-left"><span className="icon novi-icon icon mdi mdi-recycle icon-mantis-filled icon-circle"></span></div>
                                <div className="unit-body">
                                    <h4 className="font-weight-bold offset-top-20">Green Infrastructure</h4>
                                    <p>Natural meadows and forest, unimpeded by human activity on streets below, sprang up on top of the Embankment stone segments as freight service slowed and then ended in the 1990s. This ecological infrastructure cleans air, absorbs heat, and reduces stormwater flowing into Jersey City’s overburdened sewers at lower cost than engineered solutions. The forest will be a public oasis in a busy city. A trail will provide carbon-free transportation options.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8 col-lg-4 offset-top-66 offset-lg-top-0">
                            {/* Icon Box Type 2 */}
                            <div className="unit unit-sm flex-md-row text-md-left">
                                <div className="unit-left"><span className="icon novi-icon icon mdi mdi-share-variant icon-mantis-filled icon-circle"></span></div>
                                <div className="unit-body">
                                    <h4 className="font-weight-bold offset-top-20">Community Connector</h4>
                                    <p>The Harsimus Branch and associated corridors connect Jersey City neighborhoods, historic sites, and open space from the Hudson to the Hackensack River. The Hudson River Waterfront Walkway, the Branch, and the Bergen Arches are county segments of the off-road East Coast Greenway, a walking and biking trail being stitched together from Maine to Florida. Additional regional trails will use the Greenway and interconnect with local paths in a trail network.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Historic Walls  */}
            <section id="home-section-historic" className="section novi-background section-50 section-sm-top-5">
                <div className="container">
                    <div className="row justify-content-md-center offset-top-20">
                        {/* Simple quote Slider */}
                        <div className="col-md-8 col-lg-8 inset-lg-right-80">
                            <div><img className="img-fluid element-fullwidth" src="images/HOME-AERIAL.jpg" width="716" height="404" alt="" /></div>
                        </div>
                        <div className="col-md-8 col-lg-4 text-md-left offset-top-34 offset-lg-top-0">
                            <h3>The Historic Embankment</h3>
                            <p>The Harsimus Branch Embankment is the sturdy vestige of a rail economy and landscape that once dominated Jersey City. The masonry and earth structure possesses a remarkable physical integrity and during construction the journalistic accounts stressed its monumental qualities. Landscape historian John Stilgoe writes of the structure as having “the everlasting solidity of Egyptian pyramids and Inca roads” (Stilgoe, 1998, p. 42).</p>
                            <div className="offset-top-20">
                                <p>Designed by James J. Ferris, a prominent civil engineer and politician in Jersey City, the Embankment was erected from 1901-1905 to replace an existing iron and timber elevated rail line that was deemed too low and unstable. The Embankment stone structure ranged from 27 feet  to 13 feet  in height with each stone weighing nearly a ton. At this scale, the stone and earth structure not only resolved the instability of the existing structure but also better absorbed the vibrations and noises from the constant industrial traffic moving through the Jersey City community - creating a safer and healthier urban environment. </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Urban Forest  */}
            <section id="home-section-forest" className="section novi-background section-50 section-sm-top-5">
                <div className="container">
                    <div className="row justify-content-md-center offset-top-20">
                        {/* Simple quote Slider */}
                        <div className="col-md-8 col-lg-8 inset-lg-right-80">
                            <div><img className="img-fluid element-fullwidth" src="images/HOME-STEP2.jpg" width="716" height="404" alt="" /></div>
                        </div>
                        <div className="col-md-8 col-lg-4 text-md-left offset-top-34 offset-lg-top-0">
                            <h3>The Natural Urban Meadow and Forest</h3>
                            <p>When rail activities on the Harsimus Branch slowed, nature moved in to colonize the deep soils of the Embankment. Inaccessible from street level, the stone islands were a protected environment. Meadows and a natural forest established themselves within a densely built out urban context. Birds and butterflies found niches in the center of hardscape—an expanded habitat.</p>
                            <div className="offset-top-20">
                                <p>A community of plants has established itself without human intervention. Though stewardship of the historic site may require some removal of trees with roots disturbing the stones, the current ecology is self-sufficient and needs no maintenance to survive. Preserving the green corridor will set precedent for cities around the world, demonstrating that a healthy ecology and urban infrastructure are compatible, not competitors.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* East Coast Greenway  */}
            <section id="home-section-eastcoast" className="section novi-background section-50 section-sm-top-5">
                <div className="container">
                    <div className="row justify-content-md-center offset-top-20">
                        {/* Simple quote Slider */}
                        <div className="col-md-8 col-lg-8 inset-lg-right-80">
                            <div><img className="img-fluid element-fullwidth" src="images/HOME-EASTCOAST.jpg" width="716" height="404" alt="" /></div>
                        </div>
                        <div className="col-md-8 col-lg-4 text-md-left offset-top-34 offset-lg-top-0">
                            <h3>The East Coast Greenway</h3>
                            <p>The East Coast Greenway connects 15 states and 450 cities and towns via 3,000 miles of people-powered trails from Maine to Florida. A collaborative effort led by the East Coast Greenway Alliance partnering with nonprofits, businesses, and governments, the Greenway represents a commitment to public health, environmental
                                sustainability, economic development, and civic engagement by communities along its length. The goal: a largely off-road trail offering a safe place for people of all ages and abilities to exercise, commute, and visit new destinations.
                            </p>
                            <div className="offset-top-20">
                                <p>About 60% of the permanent Greenway route is in place in New Jersey but only a small portion is complete in Hudson County.  We aim to change that! An interim on-road route exists but, for safety reasons, is not recommended. The permanent, largely off-road route will enter Jersey City from
                                    New York via ferry or the Hudson River Waterfront Walkway from the George Washington Bridge. It will continue along Sixth Street over the Embankment and through the Bergen Arches,
                                    and use other corridors to Jersey City’s West Side and on to Secaucus.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="home-section-now" className="section parallax-container" data-parallax-img="images/HOME-BOTTOM.jpg">
                <div className="parallax-content section-98 section-sm-124 bg-overlay-white">
                    <div className="container">
                        <div className="row justify-content-md-center">
                            <div className="col-md-10">

                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Goals  */}
            <section id="home-section-mission" className="section novi-background section-top-98 section-sm-top-110 section-sm-bottom-110 section-lg-top-66 section-bottom-98 section-lg-bottom-0 ">
                <div className="container">
                    <div className="row justify-content-md-center align-items-lg-center">
                        <div className="col-xl-5 d-none d-xl-inline-block"><img className="img-fluid" width="470" height="770" src="images/HOME-MISSION2.jpg" alt="" /></div>
                        <div className="col-md-10 col-xl-5 section-lg-bottom-50">
                            <h1>Our Goals</h1>
                            <hr className="divider bg-mantis" />
                            <ul className="list-inline list-inline-dashed p">
                            </ul>
                            <div className="offset-top-66 offset-xl-top-50">
                                {/* Icon Box Type 2 */}
                                <div className="unit unit-sm flex-md-row text-md-left">
                                    <div className="unit-left"><span className="icon novi-icon text-gray mdi mdi-checkbox-marked-circle"></span></div>
                                    <div className="unit-body">
                                        <h4 className="font-weight-bold text-mantis offset-md-top-14">Preserve</h4>
                                        <p>To preserve the historic Pennsylvania Railroad Harsimus Branch, its Embankment, and associated rail structures, and conserve the meadows and forests these sustain.</p>
                                    </div>
                                </div>
                                <div className="offset-top-66 offset-xl-top-34">
                                    {/* Icon Box Type 2 */}
                                    <div className="unit unit-sm flex-md-row text-md-left">
                                        <div className="unit-left"><span className="icon novi-icon text-gray mdi mdi-tree"></span></div>
                                        <div className="unit-body">
                                            <h4 className="font-weight-bold text-mantis offset-md-top-14">Restore</h4>
                                            <p>To restore the stone walls of the Embankment and rehabilitate the longer transportation corridor.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="offset-top-66 offset-xl-top-34">
                                    {/* Icon Box Type 2 */}
                                    <div className="unit unit-sm flex-md-row text-md-left">
                                        <div className="unit-left"><span className="icon novi-icon text-gray mdi mdi-run"></span></div>
                                        <div className="unit-body">
                                            <h4 className="font-weight-bold text-mantis offset-md-top-14">Activate</h4>
                                            <p>To activate for the public, in environmentally sustainable ways, a network of local and regional pedestrian and biking trails, linked to the East Coast Greenway.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Next Steps */}
            <section id="home-section-steps" className="section novi-background section-66 section-top-50 bg-mantis section-triangle section-triangle-bottom context-dark">
                <div className="container">
                    <div className="row justify-content-md-center">
                        <h2><span className="big">Next Steps</span></h2>
                        <div className="col-lg-8">
                        </div>
                    </div>
                </div>
                <svg className="svg-triangle-bottom" xmlns="http://www.w3.org/2000/svg" version="1.1">
                    <defs>
                        <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" style={{ stopColor: 'rgb(99,189,98)', stopOpacity: 1 }}></stop>
                            <stop offset="100%" style={{ stopColor: 'rgb(99,189,98)', stopOpacity: 1 }}></stop>
                        </linearGradient>
                    </defs>
                    <polyline points="0,0 60,0 29,29" fill="url(#grad2)"></polyline>
                </svg>
            </section>

            <section className="section novi-background section-66 section-sm-0">
                <div className="container">
                    <div className="row justify-content-sm-center justify-content-md-start">
                        <div className="col-sm-10 col-md-6 section-image-aside section-image-aside-right text-left">
                            <div className="section-image-aside-img d-none d-md-block" style={{ backgroundImage: "url(images/HOME-STEP1.jpg)" }}></div>
                            <div className="section-image-aside-body section-sm-66 inset-md-right-30">
                                <div>
                                    <h3 className="text-picton-blue">Step 01</h3>
                                </div>
                                <div className="offset-top-10">
                                    <h2>Planning for Reuse</h2>
                                </div>
                                <div className="offset-top-20">
                                    <p>If Jersey City acquires the Harsimus Branch, as we expect, it will follow the typical land use public process for the Branch and Embankment. An Area in Need Study, redevelopment plans, and site plans must be reviewed by various land use boards and approved for the project to move forward.</p>

                                    <p>During this process, the City is expected to consult with state and federal agencies and organizations, among them New Jersey Department of Environmental Protection offices, including its Historic Preservation Office; the federal Surface Transportation Board; and the federal Advisory Council on Historic Preservation. The Embankment Coalition will encourage public participation.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-sm-center justify-content-md-end offset-top-0">
                        <div className="col-sm-10 col-md-6 section-image-aside section-image-aside-left text-left">
                            <div className="section-image-aside-img d-none d-md-block" style={{ backgroundImage: "url(images/HOME-STEP3B.jpg)" }}></div>
                            <div className="section-image-aside-body offset-top-41 offset-md-top-0 section-sm-66 inset-md-left-50">
                                <div>
                                    <h3 className="text-picton-blue">Step 02</h3>
                                </div>
                                <div className="offset-top-10">
                                    <h2>Community Engagement</h2>
                                </div>
                                <div className="offset-top-20">
                                    <p>In civic activism spearheaded by the Embankment Coalition, thousands of individuals and dozens of local, state, regional, and national organizations rallied over two decades to save the historic Harsimus Branch right-of-way and its elevated stone Embankment for 21st-century uses. </p>

                                    <p>The Coalition will continue to engage this steadfast and informed public to advance an ecological vision for the Branch compatible with historic preservation, passive recreation, muscle-powered transportation, and a commitment to community and democratic ideals. We aim to build a chain of stewards for segments of the East Coast Greenway as it moves its way through Hudson County.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-sm-center justify-content-md-start offset-top-0">
                        <div className="col-sm-10 col-md-6 section-image-aside section-image-aside-right text-left">
                            <div className="section-image-aside-img d-none d-md-block" style={{ backgroundImage: "url(images/HOME-STEP4.jpg)" }}></div>
                            <div className="section-image-aside-body offset-top-41 offset-md-top-0 section-sm-66 inset-md-right-30">
                                <div>
                                    <h3 className="text-picton-blue">Step 03</h3>
                                </div>
                                <div className="offset-top-10">
                                    <h2>Concept Development</h2>
                                </div>
                                <div className="offset-top-20">
                                    <p>From its inception in 1999, the Embankment Coalition has advocated for historically compatible reuses as historic site, rail, trail, and open space. Since 2004 the East Coast Greenway off-road trail over the Embankment has been supported by Jersey City and Hudson County resolutions and planning documents. We are now enlisting support for a broad ecological vision and a public process that will result in an inspirational design for the Embankment, the Branch, and associated resources. </p>

                                    <p>The Harsimus Branch design must be responsive to its historic status. The Embankment is listed in the State Register of Historic Places (1999), eligible for the National Register of Historic Places (2000), and a Municipal Landmark (2006). The longer right-of-way is also eligible for the National Register (2018).
                                        It runs through national historic districts and past other historic sites. The treatment of these resources must therefore follow U.S. Department of Interior guidelines. </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-sm-center justify-content-md-end offset-top-0">
                        <div className="col-sm-10 col-md-6 section-image-aside section-image-aside-left text-left">
                            <div className="section-image-aside-img d-none d-md-block" style={{ backgroundImage: "url(images/HOME-SLIDER2.jpg)" }}></div>
                            <div className="section-image-aside-body offset-top-41 offset-md-top-0 section-sm-66 inset-md-left-50">
                                <div>
                                    <h3 className="text-picton-blue">Step 04</h3>
                                </div>
                                <div className="offset-top-10">
                                    <h2>Securing the Future</h2>
                                </div>
                                <div className="offset-top-20">
                                    <p>When Jersey City acquires the Harsimus Branch and Embankment, the Coalition will expand and strengthen its board. We aim to partner with the City to raise funds for park and trail development and maintenance. We will organize educational and cultural programming. </p>

                                    <p>The Coalition will encourage local organizations along the Jersey City segments of the East Coast Greenway to become stewards of their segments. We will explore relationships with other organizations and local and state agencies to advance best land use practices along the Branch and its connections.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Explore Section */}
            <section className="section parallax-container" data-parallax-img="images/HOME-SLIDER3.jpg">
                <div className="parallax-content section-98 section-sm-124 bg-overlay-white">
                    <div className="container">
                        <div className="row justify-content-md-center">
                            <div className="col-md-10">
                                <h1><a href="vision.html">Explore Our Vision</a></h1>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Page>
    )
}
