import { Page } from "../src/pages"
import {
    ArtistSection,
    BigPicture,
    CarouselButton,
    ConceptSection, ParallaxHeader,
    ParallaxSection1,
    ParallaxSection2
} from "../src/theme";
import React from "react";

export default function Body() {
    return (
        <Page
            path="vision"
            headerChildren={
                <ParallaxHeader
                    title={"Our Vision"}
                    embed={
                        <div className="offset-top-4 offset-xl-top-0" style={{ padding: "20px 0" }}>
                            <iframe
                                id="vision-video-embed" style={{ margin: "auto", width: "100%" }}
                                src="https://www.youtube.com/embed/qxAHqzLqnoo" title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen={true}
                            />
                        </div>
                    }
                    subtitle={"\"When we see land as a community to which we belong, we may begin to use it with love and respect.\" - Aldo Leopold"}
                    img={"images/NEWS-BANNER.jpg"}
                    btn1={{ text: "Concept", href: "#vision-section-concept", }}
                    btn2={{ text: "Become a Member!", href: "/involved.html#involved-section-member", }}
                />
            }
            scripts={["/js/vision.js"]}
        >
            <BigPicture title={"Our Philosophy"} id={"vision-section-bigpicture"}>
                <p>Conservationist Aldo Leopold coined the term “land ethic” to describe the valuing of soil, water, plants, and animals – “the land” – as members of a community of living organisms, with humans, the thinking members, fostering the community’s evolving relationships.</p>
                <p>When the land atop Jersey City’s Harsimus Embankment opens to people for the first time in more than a century, Leopold’s land ethic is a way to look at the Harsimus Branch and connecting corridors. The public, whose preservation efforts have been sustained now for two decades, are its stewards.</p>
                <p>With study, consideration of many ideas, and thoughtful decisions, Jersey City can restore degraded soil, support organisms that have found niches in a hardscape, re-introduce native species extinguished by industrial uses, sequester carbon, control stormwater, and provide transportation and recreation options easy on fellow life forms. Following Leopold’s belief that direct experience is necessary for people to develop a land ethic, we can reconnect our children with nature.</p>
                <p>These thoughts underlie our philosophy for the entire Harsimus Branch and associated rail structures and land.</p>
            </BigPicture>

            <ParallaxSection1 title={"Living with the Land"} id={"vision-section-vision"} img="images/HOME-STEP2.jpg">
                <p className="offset-md-top-66">Care for the environment is this century’s greatest challenge – and Jersey City’s greatest opportunity. Thoughtful treatment of the Harsimus Branch can set a precedent for cities around the world, demonstrating that a healthy ecology and infrastructure are compatible, not competitors.</p>
                <p>The meadows and forest that took root decades ago on the historic Embankment rail structure, in the midst of downtown Jersey City, is unique to our city. We know of no other city in the world that has a self-seeded forest running through its downtown. This upland forest is thriving, its habitat part of a wildlife corridor from the Hudson River to the Hackensack.</p>
                <p>The Embankment Coalition vision for the Harsimus Branch and its Embankment preserves much of this forest and opens it to Jersey City residents for sensitive reuse. While part of the corridor is reserved for possible future light rail, residents can enjoy, on foot and by bike, a naturally occurring wilderness in their own backyards.</p>
            </ParallaxSection1>

            <ConceptSection id={"vision-section-concept"} title={"Light Touch"} src={"images/HOME-STEP4.jpg"} pre={<>
                <h1>Design Concept</h1>
                <hr className="divider bg-mantis" />
            </>}>
                <p>A “light touch” should inform design strategy for the Harsimus Branch from start to finish. Design choices, guided by Secretary of the Interior standards, should preserve the integrity of the historic Embankment structure. A light touch will also contain injury to current habitat and development and maintenance costs.</p>
                <p>All elements proposed for the Harsimus Branch should be consistent with a design language that speaks to the identity of the Branch’s various segments. Design must consider potential future light rail use and not preclude that addition.</p>
            </ConceptSection>

            <ConceptSection title={"Continuous Corridor"} src={"images/VISION-MASTERPLAN.jpg"}>
                <p>The Harsimus Branch is a rail right-of-way  (ROW) from Marin Boulevard in Downtown Jersey City to Waldo Avenue in the Hilltop area.  Loosely parallel to it is the old Erie Railroad ROW through the Bergen Arches.  A third ROW, the River Line trestle over Newark Avenue, could be used to join the two in a continuous corridor. The Coalition vision relies on the preservation of this – now green – infrastructure for future economic and environmental resilience for Jersey City.</p>
                <p>Together, these segments create a continuous corridor for the East Coast Greenway to run off-road through our densely built-out city. The Greenway will run from Marin Boulevard to Brunswick Street over the Embankment, continue across Newark Avenue and along Mary Benson Park on existing stanchions, and turn north on the River Line Connector, to bring pedestrians and bicyclists to the Bergen Arches. Additional trails will connect to this spine.</p>
            </ConceptSection>

            <ConceptSection title={"Stepping Stone Landscapes"} src={"images/VISION-LIGHT-TOUCH.jpg"}>
                <p>Ill-considered land use policies and practices, exacerbated by climate change, are fragmenting natural habitats around the world, resulting in species extinction and an exponential decrease in biodiversity. Stepping stone landscapes, or patches of habitat close enough together to lessen the impact of fragmentation, can connect larger habitat areas in a region, allowing species to move between them for food and refuge. </p>
                <p>Former rail rights-of-way provide excellent opportunities for  wildlife corridors. The challenge for the Harsimus Branch is that it will serve multiple purposes, including some development, recreation, and habitat.  The Coalition believes that landscaping of development on the easternmost Embankment block should be integrated with passive recreation on the next block, forest on the next three blocks, and passive recreation on the last elevated segment.  Pocket landscapes, or stepping stones, would mitigate active uses. Creatures as large as red tail hawks and as small as the monarch butterfly, which relies on habitat along its migratory route from Canada to Mexico, will benefit, as will their stewards. </p>
            </ConceptSection>

            <ConceptSection title={"Fade to Forest"} src="images/VISION-FADE.jpg">
                <p>The Coalition vision for Harsimus Embankment design is to slowly draw pedestrians and bicyclists in from city streets through narrow passages of green that widen into lush green meadows and then build up into woods where urban sights and sounds drop away. The forest will  transport its visitors to a world removed from typical city stressors.</p>
                <p>Meadows at each end of the forest will be "active" landscapes that serve as community gathering spaces and incorporate areas for recreation and children's play. The forest is a "passive landscape" where wanderers can explore a path through woods, pause at spots of interest, and contemplate light, birdsong, and the movement of rustling trees - respite from busy urban life.</p>
            </ConceptSection>

            <ConceptSection title={"Blocks 1+7: Land Bridges"} src="images/VISION-LANDBRIDGE.jpg">
                <p>The Coalition envisions broad welcoming access to the eastern Embankment block. A grand staircase set back from the corner of Marin Boulevard and 6th Street would bring the public up into a 30-foot-wide public right-of-way. An ADA-compliant elevator would provide alternative access.</p>
                <p>The ROW would combine permeable hardscape and landscape areas that could act as habitat stepping stones.  This "land bridge" would introduce visitors to the lusher meadows they will encounter when they cross a bridge into the public park on Block 2, Manila Avenue to Erie Street.</p>
            </ConceptSection>

            <ConceptSection title={"Blocks 2+6: Meadows"} src="images/VISION-MEADOW.jpg">
                <p>The Coalition envisions Blocks 2 and 6 as “active landscapes” for community recreation. Because preliminary soil testing indicated some contaminants, we anticipate that Block 2 will be remediated and capped with residential soil. Our goal is to see a new landscape compatible with a conserved landscape on other blocks. On the eastern side of Block 2, for example, we see meadows that “fade” into a forest at the west end of the Block.</p>
                <p>This constructed landscape and any amenities like playgrounds should be in the spirit of national park design, “harmonious with park resources, compatible with natural processes, aesthetically pleasing, functional, energy- and water-efficient, cost-effective, universally designed, and as welcoming as possible to all segments of the population.”</p>
            </ConceptSection>

            <ConceptSection title={"Blocks 3,4+5: Forest"} src="images/VISION-FOREST.jpg">
                <p>As envisioned by the Coalition, Harsimus Embankment Blocks 3, 4, and 5 are largely "passive landscapes" that conserve the forest. A trail located on the north side of the blocks will branch into narrower paths that venture into the woods.</p>
                <p>These meandering paths will contain places of interest (“moments”) along them. The intention is to provide a diversity of experiences - educational, inspiring, or peaceful - for those who amble along them. Soil remediation mapping will guide the routing design.</p>
            </ConceptSection>

            <ParallaxSection2
                title={"A Green Network"} id="vision-section-crossroads" img="images/VISION-JERSEYCITY.jpg"
                blurb={"Jersey City and Hudson County Master Plans call for the development of an off-road route for the East Coast Greenway Maine-to-Florida trail.  Developing the Harsimus Branch will significantly advance that route through Hudson County, linking historic sites, parks, and other open spaces.  The Greenway will serve as a spine for a trail system."}>
                <div className="col-sm-12">
                    <div className="offset-top-50 offset-xl-top-66">
                        {/* owl carousel; TODO: doesn't work? */}
                        <div className="owl-carousel owl-carousel-default owl-carousel-class-light veil-owl-nav" data-loop="false" data-items="1" data-sm-items="2" data-dots="true" data-mouse-drag="false" data-lg-items="4" data-nav="false">
                            <CarouselButton href="https://www.essexhudsongreenway.org/" text="Essex-Hudson Greenway" />
                            <CarouselButton href="https://www.bergenarches.com" text="Bergen Arches" />
                            <CarouselButton href="https://www.jcreservoir.com/" text="Resevoir #3" />
                            <CarouselButton href="https://jonespark.org/" text="Enos Jones Park" />
                            <CarouselButton href="http://www.jcvillage.org/101-2/mary-benson-park/" text="Mary Benson Park" />
                            <CarouselButton href="https://www.google.com/maps/place/Gateway+Park/@40.7182864,-74.05672,18z/data=!4m12!1m6!3m5!1s0x0:0x75118676d1527f46!2sGateway+Field!8m2!3d40.7181949!4d-74.0567307!3m4!1s0x0:0x766e6d41dedc6b94!8m2!3d40.7192591!4d-74.056447" text="Gateway Park" />
                            <CarouselButton href="https://www.folsp.org" text="Liberty State Park" />
                            <CarouselButton href="http://www.hudsonriverwaterfront.org/" text="Hudson River Waterfront" />
                        </div>
                    </div>
                </div>
            </ParallaxSection2>

            <ConceptSection title={"East Coast Greenway Route in Jersey City"} src={"images/VISION-JC-EASTCOAST.jpg"}>
                <p>The East Coast Greenway (ECG) connects 15 states and 450 cities and towns from Maine to Florida via 3,000 miles of people-powered trails. It is the country's longest biking and walking route. Hudson County, the most densely populated county along the way, has an interim ECG route but its use is not recommended, for safety reasons.</p>
                <p>From the west, the largely off-road ECG route will enter Jersey City from Secaucus, use the Bergen Arches/Erie Cut through the Palisades, turn south on the River Line Connector, and continue east through Downtown on the Harsimus Branch and its Embankment on Sixth Street to the Hudson River Waterfront Walkway. The main route continues to Exchange Place and then to Battery Park in Manhattan by ferry.  An alternate ECG route uses the Hudson River Waterfront Walkway to the George Washington Bridge and upper Manhattan.</p>
            </ConceptSection>

            <ConceptSection title={"Crossroads"} src={"images/VISION-JCTRAILS.jpg"}>
                <p>The East Coast Greenway will serve when built as a "spine" for a grand network of Hudson County trails - existing, planned, and proposed.</p>
                <p>This network is referred to as Crossroads, a local initiative with the goal of connecting existing industrial rights of way as new walking and biking corridors.  This trail system will allow Jersey City residents and visitors to walk or bike safely around the entire city from every neighborhood along public greenways.  Longer trips will be possible through New Jersey or even to Maine and Florida without the necessity for planes, trains, or automobiles.</p>
            </ConceptSection>

            <ConceptSection title={"Harsimus Branch and Embankment Public Access"} src={"images/VISION-ACCESS.jpg"}>
                <p>The Coalition is currently in a conceptual design phase for the Harsimus Branch, and many options for public access points will be proposed for public consideration.</p>
                <p>The goal is to provide, at a minimum, an ADA access point to this public greenway at each neighborhood it borders. There will be a more grand ramp entrance for bikes at each end of the Harsimus Branch and Embankment to continue the East Coast Greeway route to the Hudson River Waterfront Walkway and Bergen Arches. </p>
            </ConceptSection>

            <ParallaxSection2
                title={"Creating Our Sustainable Future with the Harsimus Branch"} id="vision-section-art" img="images/VISION-JERSEYCITY.jpg"
                blurb={"Artists have long been integral to the Jersey City community. Our Embankment vision embraces their creativity and weaves their vision and voices into the project, helping each of us to see and learn in new ways."}>
            </ParallaxSection2>

            <ArtistSection
                title={"Kerry Kolenut: A Journey Through History"}
                src="images/kerrykolenut_embankment_12.jpg"
                alt="Photograph of plant labeled with chalk growing on Embankment stones, by Kerry Kolenut"
                caption="Photograph by Kerry Kolenut"
                figCols={6}
                bullets={[
                    "geologic history",
                    "people & places",
                    "prehistoric record",
                    "immigrants & churches",
                    "railroads & industry",
                    "architectural styles",
                    "historic sites & districts",
                    "politics & economics",
                ]}
                fig={{
                    src: "images/SciAm_1888_trestles_24171.jpg",
                    caption: "Scientific American, Jan 21, 1988",
                    border: "0.5em solid #615c5d",
                }}
            >
                <div className="row offset-top-20">
                    Kerry Kolenut is a New Jersey based artist. Drawing inspiration from where she grew up, her work is photo based and focuses on themes relating to identities, structures, and memories within different types of communities. The Embankment is a structure that reflects its history. The visible layers of its life, the green growing along it, and the engagement of the community around it is what makes it inspirational and such an important part of the neighborhood.
                </div>
                <h4><a href="https://www.kerrykolenut.com/">Read more about Kerry Kolenut.</a></h4>
            </ArtistSection>

            <ArtistSection
                title={"Eileen Ferara: A Green Network"}
                src="images/Eileen_Ferara_EC2.jpg"
                caption="Artwork by Eileen Ferara (photo by Ed Fausty)"
                figCols={6}
                bullets={[
                    "people-powered transport",
                    "forest & meadow",
                    "species niches",
                    "heat & carbon sink",
                    "stormwater control",
                    "health & well-being",
                ]}
                fig={{
                    src: "images/IMG_2466.jpg",
                    caption: "Drawing by Sean Gallagher",
                    border: "0.5em solid #86bf67",
                }}
            >
                <div className="row offset-top-20">
                    Eileen Ferara is a multidisciplinary artist whose work explores our relationship to the environment. Spending time observing urban wildlife, she creates images which combine her research with memories of place. Ferara’s work is a contemplation of interrelated ecosystems and the role that humans play in shaping the world. The transformation of the Embankment into a wild green space in Jersey City is a source of inspiration for her work.
                </div>
                <h4><a href="https://www.eileenferara.com/">Read more about Eileen Ferara</a></h4>
                <p>…or <a href="https://instagram.com/eileenferarastudio">visit her Instagram: <b>@eileenferarastudio</b></a></p>
            </ArtistSection>

            {/* Donate / Volunteer / Sponsor buttons  */}
            <section>
                <div className="container">
                    <div className="row justify-content-center">
                        {/* owl carousel */}
                        <div className="col-lg-6 col-md-6 owl-carousel owl-carousel-default owl-carousel-class-light veil-owl-nav" data-loop="false" data-items="3" data-sm-items="3" data-dots="false" data-mouse-drag="false" data-lg-items="3" data-nav="false">
                            <a href="/involved.html#involved-section-donate">
                                <button className="btn btn-primary" type="button">Donate</button>
                            </a>
                            <a href="/involved.html#involved-section-volunteer">
                                <button className="btn btn-primary" type="button">Volunteer</button>
                            </a>
                            <a href="/involved.html#involved-section-sponsors">
                                <button className="btn btn-primary" type="button">Sponsor</button>
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <ParallaxSection1 title={<a href="/about.html">Explore Our History</a>} img="images/VISION-HISTORY.jpg" />
        </Page>
    )
}
