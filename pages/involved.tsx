import Page from "../components/page"
import {Banner, ParallaxHeader, ParallaxSection1, Section} from "../components/theme";
import React, {CSSProperties} from "react";

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
                        <form className="rd-mailform text-left" data-form-output="form-output-global" data-form-type="contact" method="post" action="/bat/rd-mailform.php">
                            <div className="row justify-content-sm-center">
                                {
                                    [
                                        { label: "First name", },
                                        { label: "Last name", },
                                        { label: "Phone", },
                                        { label: "Email", },
                                        { label: "Background", id: "message", cols: 12, },
                                    ].map(field => <Field key={field.label} {...field} />)
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
                            <img alt={"Paypal tracking pixel"} src="https://www.paypal.com/en_US/i/scr/pixel.gif" width="1" height="1" />
                        </form>
                    </div>
                </div>
            </div>
        </Section>
    )
}

type Sponsor = {
    alt: string
    src: string
    href: string
    width?: number | string
    height?: number | string
    className?: string
}
type SponsorRow = {
    colClass?: string
    sponsors: Sponsor[]
    colStyle?: CSSProperties
}

function SponsorsList(
    { title, colsClass, colsStyle, sponsorRows }: {
        title: string,
        colsClass?: string
        colsStyle?: CSSProperties
        sponsorRows: SponsorRow[]
    }
) {
    return (<>
        <h3 className="font-weight-bold">{title}</h3>
        <hr className="divider bg-mantis" />
        <div className="row justify-content-sm-center align-items-xl-center offset-top-66" style={{ marginTop: 0, }}>
            <div className="col-md-10 col-lg-9 col-xl-12">{
                sponsorRows.map(({ colClass, sponsors, colStyle, }, idx) =>
                    <div className="row justify-content-center align-items-center" style={{ marginTop: "0", }} key={`row-${idx}`}>{
                        sponsors.map(
                            ({alt, src, href, width, height, className, }) =>
                                <div key={alt} className={className || colClass || colsClass} style={{ marginTop: "1em", marginBottom: "1em", ...(colStyle || {}), ...(colsStyle || {}) }}>
                                    <a href={href} target="_blank">
                                        <img style={{maxWidth: "100%", /*maxHeight: "100%",*/ verticalAlign: "middle",}}
                                             alt={alt}
                                             src={src}
                                             width={width || "100%"}
                                             height={height}
                                        />
                                    </a>
                                </div>
                        )
                    }</div>
                )
            }</div>
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
                colsClass={"col-sm-6 col-md-4"}
                sponsorRows={[
                    {
                        sponsors: [
                            { width: "95%", alt: "Two Boots Pizza", src: "/images/sponsors/two%20boots.png", href: "https://twoboots.com/locations/jersey-city", },
                            { width: "65%", alt: "Jersey City Times", src: "/images/sponsors/jersey%20city%20times.jpg", href: "https://jcitytimes.com/", },
                            { width: "95%", alt: "Key Foods", src: "/images/sponsors/KEYFOOD_LOGO.png", href: "https://keyfoodstores.keyfood.com/store/keyFood/en/store/1666?distance=0.00%20mile&query=574%20Jersey%20Ave%20Jersey%20City,%20NJ%2007302%20United%20States&radius=5&services=&all=", },
                            { width: "65%", alt: "Skinner's Loft", src: "/images/sponsors/skinner_logo.png", href: "https://www.skinnersloft.com/", },
                            { width: "70%", alt: "Bouquets & Baskets", src: "/images/sponsors/BOUQUETS_LOGO.png", href: "https://bouquetsbaskets.net/", },
                            { width: "70%", alt: "Darke Pines", src: "/images/sponsors/darkepines_logovertical.jpg", href: "https://www.darkepines.com/", },
                            { width: "75%", alt: "Hair is Happiness", src: "/images/sponsors/hair-is-happiness.png", href: "http://hairishappiness.com/", },
                            { width: "70%", alt: "Irene Barnaby Group", src: "/images/sponsors/IBG_SecondaryLogo_Black.png", href: "https://www.compass.com/concierge/irene-barnaby/", },
                            { width: "70%", alt: "Scandinavian School of Jersey City", src: "/images/sponsors/scandischool.png", href: "https://www.scandischool.com/", },
                        ]}
                ]}
            />
            <SponsorsList
                title={"Silver Level"}
                colsStyle={{ marginTop: 0, }}
                colsClass={"col-sm-4 col-md-3"}
                sponsorRows={[
                    {
                        sponsors: [
                            { width: "100%", alt: "PostNet", src: "/images/sponsors/POST_LOGO.png", href: "https://locations.postnet.com/nj/jersey-city/344-grove-st", },
                            { width: "100%", alt: "Carmine's Pizza", src: "/images/sponsors/CARMINE_LOGO.png", href: "https://www.mycarminespizza.com/", },
                            { width: "100%", alt: "Newport Pharmacy", src: "/images/sponsors/NEWPORT_LOGO.png", href: "https://goo.gl/maps/W6dWQvseMSkuXo3HA", },
                        ]
                    },
                    {
                        sponsors: [
                            { width: "100%", alt: "Boutique Realty", src: "/images/sponsors/Boutique Realty.png", href: "http://boutiquerealty.com/jersey-city/", },
                            { width: "100%", alt: "Thirsty Quaker", src: "/images/sponsors/Thirsty Quaker Color.png", href: "https://thirstyquaker.com/", },
                        ]
                    },
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
                    <li key={name}>{href ? <a href={href} target="_blank">{name}</a> : name}</li>
            )}
        </ul>
    </>)
}

function Supporters() {
    return (
        <Section id="involved-section-endorsements" title={"Supporters"} style={{ paddingTop: 0 }}>
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

function MembershipOption({ name, price, src, value }: { name: string, price: number, src: string, value: string, }) {
    const duration = name == "Life" ? "one-time" : "annual"
    return (
        <div key={name} className="col-12 col-md-6 isotope-item" data-filter="Gallery 1">
            <div className="product-image">
                <img className="img-fluid product-image-area" src={src} alt={`${name} membership: ${price} ${duration}`} />
            </div>
            <div className="product-block-hover">
                <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
                    <input type="hidden" name="cmd" value="_s-xclick" />
                    <input type="hidden" name="hosted_button_id" value={value} />
                    <input type="image" src="/images/selectmembership.jpg" name="submit" alt={`Purchase ${price} ${duration} \"${name}\" membership with PayPal`} />
                    <img alt={"Paypal tracking pixel"} src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1" />
                </form>
            </div>
        </div>
    )
}

function MembershipOptions() {
    return (
        <Section id="involved-section-member" title={<h1> Become a Member!</h1>}>
            <p>Members are the bedrock of the Coalition. Please join us today.</p>
            <p>Select a membership level below or if you prefer to mail your membership paperwork <a href="/images/membership2019.pdf" target="_blank"><span className="font-weight-bold">Click Here</span></a>.</p>
            <div className="row">
                <div className="col-xl-12 offset-top-34">
                    <div className="isotope" data-isotope-layout="fitRows" data-isotope-group="gallery">
                        <div className="row grid-group-sm" data-lightgallery="group">
                            <MembershipOption name={"Student / Senior"} price={10} src={"/images/bees2.jpg"} value={"TD673N8N5Q4HA"} />
                            <MembershipOption name={"Individual"} price={25} src={"/images/individual2.jpg"} value={"RYLN4DQ2N5HAS"} />
                            <MembershipOption name={"Family"} price={40} src={"/images/family2.jpg"} value={"7492YV58QXSZW"} />
                            <MembershipOption name={"Friend"} price={100} src={"/images/friend2.jpg"} value={"GSJLC7A9PVUF4"} />
                            <MembershipOption name={"Benefactor"} price={250} src={"/images/benefactor2.jpg"} value={"YZ5XMHDA75V2L"} />
                            <MembershipOption name={"Life"} price={1000} src={"/images/life2.jpg"} value={"HW6BR6ER4RXTA"} />
                        </div>
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
                <ParallaxHeader
                    title={"GET INVOLVED"}
                    subtitle={"Join the community effort to realize our vision for the Harsimus Branch."}
                    img={"/images/INVOLVED-BANNER2.jpg"}
                    btn1={{ text: "Become a Member!", href: "#involved-section-member", }}
                    btn2={{ text: "Donate", href: "#involved-section-donate", }}
                />
            }
        >
            <MembershipOptions />
            <ParallaxSection1 id={"involved-section-volunteer"} title={"Volunteer"} img={"/images/INVOLVED_VOLUNTEER.jpg"}>
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
            <ParallaxSection1 title={<a href="/vision">Explore Our Vision</a>} img={"/images/HOME-SLIDER2.jpg"} />
        </Page>
    )
}
