import Page from "../components/page"
import {
  ArtistSection,
  BigPicture,
  CarouselButton,
  ConceptSection, ParallaxHeader,
  ParallaxSection1,
  ParallaxSection2
} from "../components/theme";
import React from "react";
import { becomeMemberId, donateId, sponsorsId, visionId, volunteerId } from "../components/ids";
import { H1 } from "@rdub/base/heading";

export const ogMetadata = {
  title: "Our Vision - The Embankment",
  description: "Discover our vision for Jersey City's Harsimus Branch: a light-touch design preserving forest and meadows, creating stepping-stone landscapes, and connecting the East Coast Greenway through a continuous green corridor.",
  image: "/images/2025-renders/50p/2025.11.05_Updated_Site Axon_Vignettes_50p.jpg",
}

export default function Body() {
  return (
    <Page
      path="vision"
      title={ogMetadata.title}
      description={ogMetadata.description}
      ogImage={ogMetadata.image}
      headerChildren={
        <ParallaxHeader
          title={"Our Vision"}
          embed={
            <div className="offset-top-4 offset-xl-top-0" style={{ padding: "20px 0" }}>
              <iframe
                style={{ margin: "auto", width: "100%", aspectRatio: "16/9" }}
                src="https://www.youtube.com/embed/qxAHqzLqnoo"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen={true}
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
          }
          subtitle={"\"When we see land as a community to which we belong, we may begin to use it with love and respect.\" - Aldo Leopold"}
          img={"/images/NEWS-BANNER.jpg"}
          btn1={{ text: "Concept", href: "#vision-section-concept", }}
          btn2={{ text: "Become a Member!", href: `/involved#${becomeMemberId}`, }}
        />
      }
    >
      <BigPicture title={"Our Philosophy"} id={"vision-section-bigpicture"}>
        <p>Conservationist Aldo Leopold coined the term “land ethic” to describe the valuing of soil, water, plants, and animals – “the land” – as members of a community of living organisms, with humans, the thinking members, fostering the community’s evolving relationships.</p>
        <p>When the land atop Jersey City’s Harsimus Embankment opens to people for the first time in more than a century, Leopold’s land ethic is a way to look at the Harsimus Branch and connecting corridors. The public, whose preservation efforts have been sustained now for two decades, are its stewards.</p>
        <p>With study, consideration of many ideas, and thoughtful decisions, Jersey City can restore degraded soil, support organisms that have found niches in a hardscape, re-introduce native species extinguished by industrial uses, sequester carbon, control stormwater, and provide transportation and recreation options easy on fellow life forms. Following Leopold’s belief that direct experience is necessary for people to develop a land ethic, we can reconnect our children with nature.</p>
        <p>These thoughts underlie our philosophy for the entire Harsimus Branch and associated rail structures and land.</p>
      </BigPicture>

      <ParallaxSection1 title={"Living with the Land"} id={visionId} img="/images/HOME-STEP2.jpg">
        <p className="offset-md-top-66">Care for the environment is this century’s greatest challenge – and Jersey City’s greatest opportunity. Thoughtful treatment of the Harsimus Branch can set a precedent for cities around the world, demonstrating that a healthy ecology and infrastructure are compatible, not competitors.</p>
        <p>The meadows and forest that took root decades ago on the historic Embankment rail structure, in the midst of downtown Jersey City, is unique to our city. We know of no other city in the world that has a self-seeded forest running through its downtown. This upland forest is thriving, its habitat part of a wildlife corridor from the Hudson River to the Hackensack.</p>
        <p>The Embankment Coalition vision for the Harsimus Branch and its Embankment preserves much of this forest and opens it to Jersey City residents for sensitive reuse. While part of the corridor is reserved for possible future light rail, residents can enjoy, on foot and by bike, a naturally occurring wilderness in their own backyards.</p>
      </ParallaxSection1>

      <ConceptSection id={"vision-section-concept"} title={"Light Touch"} src={"/images/homepage-slides/50p/forest-view.jpeg"} caption={"Credit: Sean A. Gallagher"} pre={<>
        <H1 id="design-concept">Design Concept</H1>
        <hr className="divider bg-mantis" />
      </>}>
        <p>A “light touch” should guide the design of the Harsimus Branch from beginning to end. Design decisions, informed by Secretary of the Interior standards, should preserve the historic integrity of the Embankment while minimizing disturbance to thriving ecosystems. By carefully routing trails and amenities, a light-touch approach reduces damage to existing habitat, limits long-term maintenance needs, and contains development costs—allowing nature and human use to coexist harmoniously.</p>
      </ConceptSection>

      <ConceptSection title={"Continuous Corridor"} src={"/images/VISION-MASTERPLAN.jpg"} caption={"Credit: Sean A. Gallagher"}>
        <p>Continuous rail rights-of-way are essential to creating resilient urban green corridors—linking neighborhoods, ecosystems, and transit routes while supporting both environmental and economic vitality. In Jersey City, several historic rail alignments offer a rare opportunity to realize such continuity.</p>
        <p>The Harsimus Branch, a former rail right-of-way stretching from Marin Boulevard in Downtown to Waldo Avenue in the Hilltop area, forms a vital segment of this potential network. Running roughly parallel is the old Erie Railroad right-of-way through the Bergen Arches. A third connection, the River Line trestle over Newark Avenue, could link the two, establishing an uninterrupted corridor across the city.</p>
        <p>The Coalition’s vision depends on preserving this green infrastructure as a foundation for long-term resilience. Together, these connected segments would enable the East Coast Greenway to pass entirely off-road through Jersey City—traveling from Marin Boulevard across the Embankment to Brunswick Street, continuing over Newark Avenue and along Mary Benson Park via existing stanchions, and turning north on the River Line Connector toward the Bergen Arches. Additional trails would branch from this spine, expanding access across the city.</p>
      </ConceptSection>

      <ConceptSection title={"Stepping Stone Landscapes"} src={"/images/VISION-LIGHT-TOUCH.jpg"} caption={"Credit: Sean A. Gallagher"}>
        <p>Ill-considered land use policies, intensified by climate change, are fragmenting natural habitats worldwide—driving species extinction and accelerating biodiversity loss. Stepping-stone landscapes—small habitat patches positioned close enough to bridge larger ecosystems—help counter this fragmentation by enabling species to move between areas for food, shelter, and migration.</p>
        <p>Former rail corridors offer exceptional opportunities for such wildlife connections. The Harsimus Branch presents a unique challenge and opportunity: it must accommodate development, recreation, and habitat restoration. The Coalition envisions the landscape as a continuous ecological gradient—from development on the easternmost block, to passive recreation, to forest across the central blocks, and again to passive recreation on the western end. Pocket landscapes, acting as ecological stepping stones, will soften the transitions between these uses. This connected network will support species ranging from red-tailed hawks to monarch butterflies—along with the people who care for them.</p>
      </ConceptSection>

      <ConceptSection title={"Ecological Path"} images={[
        { src: "/images/2025-renders/50p/2025.10.19_Embankment_Plan_Blocks_50p.jpeg", alt: "Embankment plan showing blocks", caption: "Credit: Jake Lefeber and Aaron Teves" },
        { src: "/images/2025-renders/50p/2025.11.05_Updated_Site Axon_Vignettes_50p.jpg", alt: "Embankment plan showing ecological zones", caption: "Credit: Jake Lefeber and Aaron Teves" },
      ]}>
        <p>The Coalition’s design concept is grounded in research. In partnership with Rutgers University and the Meadowlands Research Institute, the Embankment’s natural ecology has been studied using advanced imaging technologies from both the ground and air. Rutgers’ analysis maps the productivity of the meadows and forests in detail. Pathways are planned through lower-productivity zones to preserve the ecological health of higher-productivity areas. These paths and observation platforms are designed not only for access but also to help restore surrounding ecosystems—demonstrating a balanced relationship between human infrastructure and natural wilderness.</p>
        <p>Years of research have deepened the Coalition’s understanding of how the Embankment’s vegetation functions as vital green infrastructure. The meadows and forests currently sequester about 120 tons of CO₂ each year while producing 88 tons of oxygen. They also absorb roughly 8.6 million gallons of stormwater annually, easing the burden on city sewers, and reduce local heat island temperatures by 2 to 5 degrees. Removing this vegetation would eliminate these essential ecological services, increasing air pollution, flooding, and heat stress for nearby residents.</p>
      </ConceptSection>

      <ConceptSection title={"Blocks 2+6: Meadows"} images={[
        { src: "/images/2025-renders/30p/2025.10.18_Block_2_Active_Landscape_Aerial_30p.jpeg", lightboxSrc: "/images/2025-renders/50p/2025.10.18_Block_2_Active_Landscape_Aerial_50p.jpeg", alt: "Block 2 active landscape aerial view", caption: "Credit: Jake Lefeber and Aaron Teves" },
        { src: "/images/2025-renders/30p/2025.10.18_Block_2_Active_Landscape_Interior_30p.jpeg", lightboxSrc: "/images/2025-renders/50p/2025.10.18_Block_2_Active_Landscape_Interior_50p.jpeg", alt: "Block 2 active landscape interior view", caption: "Credit: Jake Lefeber and Aaron Teves" },
      ]}>
        <p>The Coalition envisions Blocks 2 and 6 as active landscapes—community gathering spaces that integrate recreation and children’s play within a natural setting. On Block 2, meadows on the eastern side gradually transition into forest at the western edge, creating a seamless ecological gradient. All landscape features and amenities, including playgrounds, will follow the principles of national park design: harmonious with natural resources, compatible with ecological processes, aesthetically pleasing, functional, energy- and water-efficient, cost-effective, universally accessible, and welcoming to all.</p>
      </ConceptSection>

      <ConceptSection title={"Blocks 3,4+5: Forest"} images={[
        { src: "/images/2025-renders/30p/2025.10.18_Block_5_Passive_Landscape_Aerial_30p.jpeg", lightboxSrc: "/images/2025-renders/50p/2025.10.18_Block_5_Passive_Landscape_Aerial_50p.jpeg", alt: "Block 5 passive landscape aerial view", caption: "Credit: Jake Lefeber and Aaron Teves" },
        { src: "/images/2025-renders/30p/2025.10.18_Block_5_Passive_Landscape_30p.jpeg", lightboxSrc: "/images/2025-renders/50p/2025.10.18_Block_5_Passive_Landscape_50p.jpeg", alt: "Block 5 passive landscape view", caption: "Credit: Jake Lefeber and Aaron Teves" },
      ]}>
        <p>The Coalition envisions Harsimus Embankment Blocks 3, 4, and 5 as passive landscapes dedicated to conserving the forest. Visitors will be able to walk along a path that winds through the woods, pause at points of interest, and experience the light, birdsong, and rustling canopy—a refuge from urban life. Soil remediation mapping will guide the trail’s route through lower-productivity vegetation zones, with smaller spurs extending into the core of the protected ecosystem. Along these spurs, visitors will encounter curated “moments” designed to offer diverse experiences—educational, reflective, and restorative.</p>
      </ConceptSection>

      <ConceptSection title={"All Blocks: Land Bridges"} images={[
        { src: "/images/2025-renders/30p/2025.10.19_Bridge_Aerial_30p.jpeg", lightboxSrc: "/images/2025-renders/50p/2025.10.19_Bridge_Aerial_50p.jpeg", alt: "Bridge aerial view", caption: "Credit: Jake Lefeber and Aaron Teves" },
        { src: "/images/2025-renders/30p/EPC_BRIDGE_STREETVIEW_JLAT_30p.JPG", lightboxSrc: "/images/2025-renders/50p/EPC_BRIDGE_STREETVIEW_JLAT_50p.JPG", alt: "Bridge street view", caption: "Credit: Jake Lefeber and Aaron Teves" },
        { src: "/images/2025-renders/30p/2025.11.05_Bridge_Perspective_30p.jpg", lightboxSrc: "/images/2025-renders/50p/2025.11.05_Bridge_Perspective_50p.jpg", alt: "Bridge ramp access", caption: "Credit: Jake Lefeber and Aaron Teves" },
      ]}>
        <p>We must prioritize building with natural materials that contribute to healthier communities. New pathways, observation decks, playgrounds, and bridges should use sustainable materials and aim for carbon neutrality. Nowhere is this more important than in the design of bridges. Mass timber structures are carbon-negative and evoke the character of the surrounding forest. When properly designed and maintained, mass timber bridges can outlast comparable steel or concrete structures.</p>
        <p>The Coalition envisions mass timber bridges that incorporate vegetation, creating stepping-stone landscapes that allow both people and wildlife to cross safely. Viewed from street level, these pedestrian bridges will stand as visible symbols of the resilience, beauty, and durability of green infrastructure—demonstrating the potential for sustainable design to shape the cities of the future.</p>
      </ConceptSection>

      <ParallaxSection2
        title={"A Green Network"} id="vision-section-crossroads" img="/images/VISION-JERSEYCITY.jpg"
        blurb={"Jersey City and Hudson County Master Plans call for the development of an off-road route for the East Coast Greenway Maine-to-Florida trail.  Developing the Harsimus Branch will significantly advance that route through Hudson County, linking historic sites, parks, and other open spaces.  The Greenway will serve as a spine for a trail system."}>
        <div className="col-sm-12">
          <div className="offset-top-50 offset-xl-top-66">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', justifyContent: 'center' }}>
              <CarouselButton href="https://www.essexhudsongreenway.org/" text="Essex-Hudson Greenway" />
              <CarouselButton href="https://www.bergenarches.com" text="Bergen Arches" />
              <CarouselButton href="https://www.jcreservoir.com/" text="Resevoir #3" />
              <CarouselButton href="https://jonespark.org/" text="Enos Jones Park" />
              <CarouselButton href="http://www.jcvillage.org/101-2/mary-benson-park/" text="Mary Benson Park" />
              <CarouselButton href="https://www.google.com/maps/place/Gateway+Park/@40.7182864,-74.05672,18z/data=!4m12!1m6!3m5!1s0x0:0x75118676d1527f46!2sGateway+Field!8m2!3d40.7181949!4d-74.0567307!3m4!1s0x0:0x766e6d41dedc6b94!8m2!3d40.7192591!4d-74.056447" text="Gateway Park" />
              <CarouselButton href="https://www.folsp.org" text="Liberty State Park" />
              <CarouselButton href="https://www.hudsonriverwaterfront.org/" text="Hudson River Waterfront" />
            </div>
          </div>
        </div>
      </ParallaxSection2>

      <ConceptSection title={"East Coast Greenway Route in Jersey City"} src={"/images/VISION-JC-EASTCOAST.jpg"}>
        <p>The East Coast Greenway (ECG) connects 15 states and 450 cities and towns from Maine to Florida via 3,000 miles of people-powered trails. It is the country's longest biking and walking route. Hudson County, the most densely populated county along the way, has an interim ECG route but its use is not recommended, for safety reasons.</p>
        <p>From the west, the largely off-road ECG route will enter Jersey City from Secaucus, use the Bergen Arches/Erie Cut through the Palisades, turn south on the River Line Connector, and continue east through Downtown on the Harsimus Branch and its Embankment on Sixth Street to the Hudson River Waterfront Walkway. The main route continues to Exchange Place and then to Battery Park in Manhattan by ferry.  An alternate ECG route uses the Hudson River Waterfront Walkway to the George Washington Bridge and upper Manhattan.</p>
      </ConceptSection>

      <ConceptSection title={"Crossroads"} src={"/images/VISION-JCTRAILS.jpg"}>
        <p>The East Coast Greenway will serve when built as a "spine" for a grand network of Hudson County trails - existing, planned, and proposed.</p>
        <p>This network is referred to as Crossroads, a local initiative with the goal of connecting existing industrial rights of way as new walking and biking corridors.  This trail system will allow Jersey City residents and visitors to walk or bike safely around the entire city from every neighborhood along public greenways.  Longer trips will be possible through New Jersey or even to Maine and Florida without the necessity for planes, trains, or automobiles.</p>
      </ConceptSection>

      <ConceptSection title={"Harsimus Branch and Embankment Public Access"} src={"/images/VISION-ACCESS.jpg"}>
        <p>The Coalition is currently in a conceptual design phase for the Harsimus Branch, and many options for public access points will be proposed for public consideration.</p>
        <p>The goal is to provide, at a minimum, an ADA access point to this public greenway at each neighborhood it borders. There will be a more grand ramp entrance for bikes at each end of the Harsimus Branch and Embankment to continue the East Coast Greeway route to the Hudson River Waterfront Walkway and Bergen Arches. </p>
      </ConceptSection>

      <ParallaxSection2
        title={"Creating Our Sustainable Future with the Harsimus Branch"} id="vision-section-art" img="/images/VISION-JERSEYCITY.jpg"
        blurb={"Artists have long been integral to the Jersey City community. Our Embankment vision embraces their creativity and weaves their vision and voices into the project, helping each of us to see and learn in new ways."}>
      </ParallaxSection2>

      <ArtistSection
        title={"Kerry Kolenut: A Journey Through History"}
        src="/images/kerrykolenut_embankment_12.jpg"
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
          src: "/images/SciAm_1888_trestles_24171.jpg",
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
        src="/images/Eileen_Ferara_EC2.jpg"
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
          src: "/images/IMG_2466.jpg",
          caption: "Drawing by Sean A. Gallagher",
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
      <section className="section section-66 section-sm-98">
        <div className="container">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', justifyContent: 'center' }}>
            <a className="btn btn-primary btn-lg" href={`/involved#${donateId}`}>Donate</a>
            <a className="btn btn-primary btn-lg" href={`/involved#${volunteerId}`}>Volunteer</a>
            <a className="btn btn-primary btn-lg" href={`/involved#${sponsorsId}`}>Sponsor</a>
          </div>
        </div>
      </section>

      <ParallaxSection1 title={<a href="/about">Explore Our History</a>} img="/images/VISION-HISTORY.jpg" />
    </Page>
  )
}
