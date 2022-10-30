import { Page } from "../src/pages"
import {Banner, ParallaxSection1, Section} from "../src/theme";
import React from "react";

type Field = {
    label: string
    id?: string
    cols?: number
}
function Field({ label, id, cols = 6 }: Field) {
    id = id || label.replace(" ", "-").toLowerCase()
    const name = id.replace('-', '')
    const Elem = cols == 12 ? "textarea" : "input"
    return (
        <div className={`col-md-${cols}`}>
            <div className="form-group offset-md-top-30">
                <label className="form-label" htmlFor={`git-3-mailform-${id}`}>{label}</label>
                <Elem className="form-control bg-default" id={`git-3-mailform-${id}`} type="text" name={name} data-constraints="@Required" />
            </div>
        </div>
    )
}

function SignupForm() {
    return (
        <Section title={"Sign Up Here"}>
            <div className="offset-md-top-36">
                <div className="row justify-content-sm-center">
                    <div className="col-sm-10 col-lg-8">
                        {/* RD Mailform */}
                        <form className="rd-mailform text-left" data-form-output="form-output-global" data-form-type="contact" method="post" action="api/email-signup">
                            <div className="row justify-content-sm-center">
                                {
                                    [
                                        { label: "First name", },
                                        { label: "Last name", },
                                        { label: "Phone", },
                                        { label: "Email", },
                                        { label: "Background", id: "message", cols: 12, },
                                    ].map(field => <Field {...field} />)
                                }
                            </div>
                            <div className="offset-top-24 text-center">
                                <button className="btn btn-primary" type="submit">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Section>
    )
}

function Donate() {
    return (
        <Section id={"involved-section-donate"} >
            <div className="row justify-content-sm-center offset-top-10">
                <div className="col-sm-10">
                    {/* Bootstrap jumbotron */}
                    <div className="jumbotron shadow-drop-lg context-dark text-left">
                        <h2><span className="big">Donate Today</span></h2>
                        <p>Your generous contribution is vital to Embankment Coalition operations. <span className="font-weight-bold bold">Please donate!</span> </p>
                        <p>The Embankment Preservation Coalition is a nonprofit, tax-exempt charitable organization under Section 501(c)(3) of the Internal Revenue Code.</p>
                        <p>Your contribution is 100% tax-deductible to the fullest extent of the law.</p>
                        <br />
                        <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
                            <input type="hidden" name="cmd" value="_s-xclick" />
                            <input type="hidden" name="hosted_button_id" value="Q63S34XYKEG9N" />
                            <input type="image" src="/images/secure.jpg" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button" />
                            <img alt="" src="https://www.paypal.com/en_US/i/scr/pixel.gif" width="1" height="1" />
                        </form>
                    </div>
                </div>
            </div>
        </Section>
    )
}

function SponsorsList(
    { title, sponsors }: {
        title: string,
        sponsors: ({ alt: string, src: string, href: string, width?: number, height?: number, }[])
    }
) {
    return (<>
        <h3 className="font-weight-bold">{title}</h3>
        <hr className="divider bg-mantis" />
        <div className="row justify-content-sm-center align-items-xl-center offset-top-66">
            <div className="col-md-10 col-lg-9 col-xl-12">
                <div className="row">
                    {
                        sponsors.map(
                            ({ alt, src, href, width, height, }) =>
                                <div className="col-md-4 col-xl-2 offset-top-41 offset-xl-top-0">
                                    <a href={href} target="_blank">
                                        <img className="" alt={alt} src={src} width={width || 150} height={height || 70} />
                                    </a>
                                </div>
                        )
                    }
                </div>
            </div>
        </div>
    </>)
}

function Sponsors() {
    return (
        <Section
            id={"involved-section-sponsors"}
            title={"Sponsors"}
            pretitle={<p>Local, regional, and national organizations and businesses support the Embankment Preservation Coalition in numerous ways. </p>}
        >
            <p>Sponsors are businesses and organizations that provide financial support to the Embankment Coalition. Please support those that make our work possible!</p>
            <p>To become a sponsor of the Harsimus Branch and Embankment, please <a href="mailto:embankmentJC@gmail.com" target="_blank"><span className="font-weight-bold">Click Here (embankmentJC@gmail.com)</span></a>.</p>
            <SponsorsList
                title={"Gold Level"}
                sponsors={[
                    { alt: "Community Compost Company", src: "/images/sponsors/community compost company.jpg", href: "https://www.communitycompostco.com/", },
                    { alt: "Two Boots Pizza", src: "/images/sponsors/two%20boots.png", href: "https://twoboots.com/locations/jersey-city", },
                    { alt: "Jersey City Times", src: "/images/sponsors/jersey%20city%20times.jpg", href: "https://jcitytimes.com/", },
                    { alt: "Keller Williams Realty", src: "/images/sponsors/KW_LOGO.png", href: "https://stephengucciardo.kw.com/", },
                    { alt: "Skinner's Loft", src: "/images/sponsors/SKINNER2_LOGO.png", href: "https://www.skinnersloft.com/", height: 150, },
                    { alt: "Key Foods", src: "images/sponsors//KEYFOOD_LOGO.png", href: "https://keyfoodstores.keyfood.com/store/keyFood/en/store/1666?distance=0.00%20mile&query=574%20Jersey%20Ave%20Jersey%20City,%20NJ%2007302%20United%20States&radius=5&services=&all=", },
                    { alt: "Bouquets & Baskets", src: "/images/sponsors/BOUQUETS_LOGO.png", href: "https://bouquetsbaskets.net/", },
                    { alt: "Madame Claude", src: "/images/sponsors/MADAME_LOGO.png", href: "http://www.madameclaudejc.com/", },
                    { alt: "Madame Claude Wine", src: "/images/sponsors/MADAMEWINE_LOGO.png", href: "https://www.madameclaudewine.com/", },
                    { alt: "Warren G Curtin Realty", src: "/images/sponsors/WARREN_LOGO.jpg", href: "http://www.wgcrealty.com/team/9b459cb0-7fb9-4260-860a-9e2a3cc2c08a/21704/18", width: 200, height: 110, },
                ]}
            />
            <SponsorsList
                title={"Silver Level"}
                sponsors={[
                    { alt: "PostNet", src: "images/sponsors/POST_LOGO.png", href: "https://locations.postnet.com/nj/jersey-city/344-grove-st", height: 75, },
                    { alt: "Delenio", src: "images/sponsors/DELENIO_LOGO.png", href: "https://www.deleniojc.com/", height: 75, },
                    { alt: "Carmine's Pizza", src: "images/sponsors/CARMINE_LOGO.png", href: "https://www.mycarminespizza.com/", height: 65, },
                    { alt: "Newport Pharmacy", src: "images/sponsors/NEWPORT_LOGO.png", href: "https://goo.gl/maps/W6dWQvseMSkuXo3HA", height: 50, },
                    { alt: "Mastrolia Pharmacy", src: "images/sponsors/MASTROLIA_LOGO.jpg", href: "https://goo.gl/maps/wR2UT9jEn2NC2Ffp6", height: 75, },
                ]}
            />
        </Section>
    )
}

function SupportersList({ title, supporters }: { title: string, supporters: ({ name: string, href?: string }[]) }) {
    return (<>
        <h3>{title}</h3>
        <ul style={{ listStyle: "none", paddingInlineStart: 0, }} className={"p"}>
            {supporters.map(
                ({ name, href }) =>
                    href
                        ? <li><a href={href} target="_blank">{name}</a></li>
                        : <li>{name}</li>

            )}
        </ul>
    </>)
}

function Supporters() {
    return (
        <Section id="involved-section-endorsements" title={"Supporters"}>
            <p>If your organization would like to endorse the Coalition's goals, please <a href="mailto:embankmentJC@gmail.com" target="_blank"><span className="font-weight-bold">Click Here (embankmentJC@gmail.com)</span></a>.</p>
            <div className="row justify-content-sm-center align-items-xl-center offset-top-6">
                <div className="col-md-10 col-lg-9 col-xl-12">
                    <div className="container">
                        <SupportersList
                            title={"Neighborhood Associations"}
                            supporters={[
                                { name: "Downtown Coalition of Neighborhood Associations" },
                                { name: "Hamilton Park Neighborhood Association", href: "http://hpnajc.org" },
                                { name: "Harsimus Cove Association", href: "http://harsimuscove.org" },
                                { name: "Heights Hope Neighborhood Association", href: "http://heightshope.webs.com/" },
                                { name: "Historic Paulus Hook Association", href: "http://paulushook.org" },
                                { name: "Madison Avenue Block Association", href: "https://www.facebook.com/MadisonAveBlockAssc" },
                                { name: "Powerhouse Arts District Neighborhood Association", href: "http://padnajc.org" },
                                { name: "Riverview Neighborhood Association", href: "http://riverviewneighborhood.org/" },
                                { name: "Sgt. Anthony Park Neighborhood Association", href: "http://sgtanthonypark.com/" },
                                { name: "Sherman Place Block Association" },
                                { name: "Van Vorst Park Association", href: "https://vvpajc.org/" },
                                { name: "Village Neighborhood Association", href: "http://www.jcvillage.org/" },
                            ]}
                        />
                        <SupportersList
                            title={"Citywide Organizations"}
                            supporters={[
                                { name: "Bergen Arches Preservation Alliance", href: "https://www.bergenarches.com/", },
                                { name: "Enos Jones Park Association", href: "https://www.jonespark.org/", },
                                { name: "Jersey City Family Initiative", href: "http://groups.yahoo.com/group/JerseyCityFamilyInitiative/", },
                                { name: "Jersey City Landmarks Conservancy", href: "http://jclandmarks.org", },
                                { name: "Jersey City Parks Coalition", href: "http://jcparks.org", },
                                { name: "Jersey City Reservoir Preservation Alliance", href: "http://www.jcreservoir.org", },
                                { name: "Jersey City Trees Committee", },
                                { name: "Journal Square Community Association", href: "https://www.jsqca.com/", },
                                { name: "Pershing Field Garden Friends", href: "http://www.pershingfield.org/", },
                                { name: "Pro Arts", href: "http://www.proartsjerseycity.org/", },
                                { name: "Sustainable JC", href: "http://sustainablejc.org", },
                            ]}
                        />
                        <SupportersList
                            title={"Regional and National Organizations"}
                            supporters={[
                                { name: "Conservation Resources, Inc.", href: "http://conservationresources.org", },
                                { name: "East Coast Greenway Alliance", href: "http://www.greenway.org", },
                                { name: "Hudson County Sierra Club ", href: "https://https://www.facebook.com/HudsonCountySierraClub/", },
                                { name: "Friends of the High Line", href: "http://www.thehighline.org", },
                                { name: "Friends of Liberty State Park", href: "http://www.folsp.org/", },
                                { name: "Hudson River Waterfront Walkway Conservancy", href: "http://www.hudsonriverwaterfront.org", },
                                { name: "Metropolitan Waterfront Alliance", href: "http://www.waterfrontalliance.org/", },
                                { name: "National Trust for Historic Preservation", href: "http://www.preservationnation.org", },
                                { name: "New Jersey Conservation Foundation", href: "http://www.njconservation.org", },
                                { name: "NY/NJ Baykeeper", href: "http://nynjbaykeeper.org/", },
                                { name: "Preservation NJ", href: "http://www.preservationnj.org/site/ExpEng/", },
                                { name: "Rails to Trails Conservancy", href: "http://www.railstotrails.org", },
                                { name: "Sierra Club of New Jersey", href: "http://newjersey.sierraclub.org", },
                                { name: "Skyway Park Conservancy", href: "http://skywaypark.org/", },
                                { name: "Trust for Public Land", href: "http://www.tpl.org", },
                            ]}
                        />
                    </div>
                </div>
            </div>
        </Section>
    )
}

export default function Body() {
    return (
        <Page
            path="involved"
            headerChildren={
                <section className="section parallax-container bg-black" data-parallax-img="images/INVOLVED-BANNER2.jpg">
                    <div className="parallax-content context-dark">
                        <div className="container">
                            <div className="row align-items-sm-center justify-content-sm-center section-cover section-98 section-sm-110 text-lg-left context-dark">
                                <div className="col-sm-12">
                                    <div className="offset-top-4 offset-xl-top-0">
                                        <h1 className="text-capitalize"><span className="big">GET INVOLVED</span></h1>
                                    </div>
                                    <div>
                                        <h2 className="font-default font-italic text-regular">Join the community effort to realize our vision for the Harsimus Branch.</h2>
                                    </div>
                                    <div className="group group-xl offset-top-30"><a className="btn btn-primary btn-lg btn-anis-effect" href="#involved-section-member">Become a Member!</a>
                                        <a className="btn btn-default btn-lg btn-anis-effect" data-caption-animate="fadeInUp" data-caption-delay="1200" href="#involved-section-donate"><span className="btn-text">Donate</span></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            }
        >
            {/* Become a Membership Options */}
            <section id="involved-section-member" className="section section-98 section-sm-110">
                <div className="container">
                    <div><h1> Become a Member!</h1></div>
                    <div className="divider bg-mantis"></div>
                    <div>
                        <p>Members are the bedrock of the Coalition. Please join us today.</p>
                    </div>
                    <div>
                        <p></p>
                        <p>Select a membership level below or if you prefer to mail your membership paperwork <a href="images/membership2019.pdf" target="_blank"><span className="font-weight-bold">Click Here</span></a>.</p>
                    </div>
                    <div className="row">
                        {/* Membership Options  */}
                        <div className="col-xl-12 offset-top-34">
                            <div className="isotope" data-isotope-layout="fitRows" data-isotope-group="gallery">
                                <div className="row grid-group-sm" data-lightgallery="group">

                                    {/* STUDENT / SENIOR  */}
                                    <div className="col-12 col-md-6 isotope-item" data-filter="Gallery 1">
                                        {/* Product Image */}
                                        <div className="product-image">
                                            <img className="img-fluid product-image-area" src="images/bees2.jpg" alt="" />
                                        </div>
                                        <div className="product-block-hover">
                                            {/* Product Add To cart */}
                                            <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
                                                <input type="hidden" name="cmd" value="_s-xclick" />
                                                <input type="hidden" name="hosted_button_id" value="TD673N8N5Q4HA" />
                                                <input type="image" src="http://www.embankment.org/embankment/images/selectmembership.jpg" name="submit" alt="PayPal - The safer, easier way to pay online!" />
                                                <img alt="" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1" />
                                            </form>
                                        </div>
                                    </div>

                                    {/* INDIVIDUAL  */}
                                    <div className="col-12 col-md-6 isotope-item" data-filter="Gallery 1">
                                        {/* Product Image */}
                                        <div className="product-image">
                                            <img className="img-fluid product-image-area" src="images/individual2.jpg" alt="" />
                                        </div>
                                        <div className="product-block-hover">
                                            {/* Product Add To cart */}
                                            <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
                                                <input type="hidden" name="cmd" value="_s-xclick" />
                                                <input type="hidden" name="hosted_button_id" value="RYLN4DQ2N5HAS" />
                                                <input type="image" src="http://www.embankment.org/embankment/images/selectmembership.jpg" name="submit" alt="PayPal - The safer, easier way to pay online!" />
                                                <img alt="" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1" />
                                            </form>
                                        </div>
                                    </div>

                                    {/* FAMILY  */}
                                    <div className="col-12 col-md-6 isotope-item" data-filter="Gallery 1">
                                        {/* Product Image */}
                                        <div className="product-image">
                                            <img className="img-fluid product-image-area" src="images/family2.jpg" alt="" />
                                        </div>
                                        <div className="product-block-hover">
                                            {/* Product Add To cart */}
                                            <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
                                                <input type="hidden" name="cmd" value="_s-xclick" />
                                                <input type="hidden" name="hosted_button_id" value="7492YV58QXSZW" />
                                                <input type="image" src="http://www.embankment.org/embankment/images/selectmembership.jpg" name="submit" alt="PayPal - The safer, easier way to pay online!" />
                                                <img alt="" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1" />
                                            </form>
                                        </div>
                                    </div>

                                    {/* FRIEND  */}
                                    <div className="col-12 col-md-6 isotope-item" data-filter="Gallery 1">
                                        {/* Product Image */}
                                        <div className="product-image">
                                            <img className="img-fluid product-image-area" src="images/friend2.jpg" alt="" />
                                        </div>
                                        <div className="product-block-hover">
                                            {/* Product Add To cart */}
                                            <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
                                                <input type="hidden" name="cmd" value="_s-xclick" />
                                                <input type="hidden" name="hosted_button_id" value="GSJLC7A9PVUF4" />
                                                <input type="image" src="http://www.embankment.org/embankment/images/selectmembership.jpg" name="submit" alt="PayPal - The safer, easier way to pay online!" />
                                                <img alt="" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1" />
                                            </form>
                                        </div>
                                    </div>

                                    {/* BENEFACTOR  */}
                                    <div className="col-12 col-md-6 isotope-item" data-filter="Gallery 1">
                                        {/* Product Image */}
                                        <div className="product-image">
                                            <img className="img-fluid product-image-area" src="images/benefactor2.jpg" alt="" />
                                        </div>
                                        <div className="product-block-hover">
                                            {/* Product Add To cart */}
                                            <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
                                                <input type="hidden" name="cmd" value="_s-xclick" />
                                                <input type="hidden" name="hosted_button_id" value="YZ5XMHDA75V2L" />
                                                <input type="image" src="http://www.embankment.org/embankment/images/selectmembership.jpg" name="submit" alt="PayPal - The safer, easier way to pay online!" />
                                                <img alt="" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1" />
                                            </form>
                                        </div>
                                    </div>

                                    {/* LIFE  */}
                                    <div className="col-12 col-md-6 isotope-item" data-filter="Gallery 1">
                                        {/* Product Image */}
                                        <div className="product-image">
                                            <img className="img-fluid product-image-area" src="images/life2.jpg" alt="" />
                                        </div>
                                        <div className="product-block-hover">
                                            {/* Product Add To cart */}
                                            <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
                                                <input type="hidden" name="cmd" value="_s-xclick" />
                                                <input type="hidden" name="hosted_button_id" value="HW6BR6ER4RXTA" />
                                                <input type="image" src="http://embankment.org/embankment/images/selectmembership.jpg" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button" />
                                                <img alt="" src="https://www.paypal.com/en_US/i/scr/pixel.gif" width="1" height="1" />
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <ParallaxSection1 id={"involved-section-volunteer"} title={"Volunteer"} img={"images/INVOLVED_VOLUNTEER.jpg"}>
                <p>The Embankment Preservation Coalition operates with an all-volunteer board and volunteers from the community.</p>
                <p>Volunteers staff our outreach table at local fairs and festivals; organize events; distribute information to the neighborhoods; consult on historic preservation and the environment; lend their professional expertise for architectural renderings, web site design, art, and photography; and help us forge alliances with supportive local and regional organizations.</p>
                <p>We can put people with all sorts of background and skills to work, for as little as an hour or for a long-term commitment. Volunteer! <span className="font-weight-bold bold"> Volunteer!</span> </p>
            </ParallaxSection1>

            <SignupForm />

            <Donate />

            <Banner id={"involved-section-partners"} title={"Our Partners"} icon={"drag-horizontal"} >
                <ul className="list-inline list-inline-dashed p">
                    <li className="list-inline-item"><a href="#involved-section-sponsors">Sponsors</a></li>
                    <li className="list-inline-item"><a href="#involved-section-endorsements">Supporters</a></li>
                </ul>
            </Banner>

            <Sponsors />

            <Supporters />

            <ParallaxSection1 title={<a href="vision.html">Explore Our Vision</a>} img={"images/HOME-SLIDER2.jpg"} />
        </Page>
    )
}
