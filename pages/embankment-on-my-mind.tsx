import Page from "../components/page"
import {Figure} from "../components/theme";
import styles from "./embankment-on-my-mind.module.css"

export default function Body() {
    return (
        <Page path="embankment-on-my-mind" navStuck={true}>
            <section className="section section-50 section-sm-top-5">
                <img src="/images/teomm/teomm-banner.jpeg" style={{ maxWidth: "100%" }}/>
                <div className="container">
                    <div className="row justify-content-center offset-top-20">
                        <h2>
                            <span style={{ fontWeight: "bold", fontStyle: "italic" }}>The Embankment on My Mind</span>{' '}
                            <span style={{ fontWeight: "normal" }}>Exhibition</span>
                        </h2>
                        <div className="col-md-12 col-lg-12" style={{ textAlign: "center" }}>
                            <ul style={{ listStyle: "none", paddingLeft: 0 }}>
                                <li><strong>November 1 - December 16, 2022</strong></li>
                                <li>The Visual Arts Gallery and the Harold B. Lemmerman Gallery</li>
                                <li>New Jersey City University (<a href="https://goo.gl/maps/Ka1XAeVHwgB2GWEw7">map</a>)</li>
                                <li><strong>Regular Hours Monday - Friday 11 am – 5 pm</strong></li>
                                <li><strong>Extended Hours Below and By Appointment</strong></li>
                            </ul>
                        </div>
                        <div className="row offset-top-20">
                            <header className="post-media">
                                <Figure
                                    src={"/images/teomm/teomm-night-shot.jpeg"}
                                    alt={"Photograph of the Embankment at night"}
                                    caption={"Kay Kenny, Moonwalk, Archival inkjet print of digital photographic montage, 20” x 24” (framed)"}
                                />
                            </header>
                        </div>
                        <div className="col-md-9 col-lg-7 text-md-left offset-top-34 offset-lg-top-0">
                            <div className="container">
                                <div className="row offset-top-20">
                                    <blockquote className="font-italic">
                                        “Imagine the full moon, wild flowers, native plants all in bloom as we walk the Embankment trail on a summer night. My image is futuristic, created digitally, and montaged to reflect possibilities.” -Kay Kenny
                                    </blockquote>
                                </div>
                            </div>
                            <hr/>
                            <div className="row offset-top-20">
                                <ul style={{ listStyle: "none", padding: "0 1rem" }}>
                                    <li><strong>Reception:</strong> November 5, 3:00 pm - 6:00 pm (both galleries)</li>
                                    <li><strong>Panel Discussion:</strong> November 22, 4:30 pm - 6:30 pm (Visual Arts Building Auditorium @ <a href="https://goo.gl/maps/PCwEEqLZhXDJJsw18" target="_blank">100 Culver Avenue</a>, and virtual), “The Embankment on My Mind: Bridging Science and Art”</li>
                                    <li><strong>JC Fridays extended hours:</strong> December 2, 11 am – 7 pm</li>
                                    <li><strong>Closing Reception:</strong> December 16, 4:00 pm - 6:00 pm (both galleries)</li>
                                </ul>
                            </div>
                            <div className="row offset-top-20">
                                <p>
                                    Curated by Peter Delman and Midori Yoshimoto, organized by Maureen Crowley and Katy Lyness, <a href="https://embankment.org">Embankment Preservation Coalition</a>
                                </p>
                            </div>
                            <hr/>
                            <div className="row offset-top-20">
                                <p>
                                    <i>The Embankment On My Mind</i> exhibits original art inspired by the grassroots preservation initiative that holds the promise of transforming Jersey City's treatment of open space and an emerging trail system. Sixteen artists depicting local flora and fauna join twenty-seven artists with wide-ranging responses to the Harsimus Branch Embankment, the massive stone rail structure in Downtown Jersey City that the Embankment Coalition has been working to preserve.
                                </p>
                                <p>
                                    Participating artists working in varied media:
                                    {' '}<a href="http://www.anondabell.com/home.html">Anonda Bell</a>,
                                    {' '}<a href="https://www.booneartlife.org/#meltdown-tour">Anthony Boone</a>,
                                    {' '}<a href="https://jkrausechapeau.com/">Jennifer Krause Chapeau</a>,
                                    {' '}<a href="http://paulchingbor.com/">Paul Ching-Bor</a>,
                                    {' '}<a href="https://nancymcohen.com/">Nancy Cohen</a>,
                                    {' '}<a href="http://www.santiagocohen.com/">Santiago Cohen</a>,
                                    {' '}<a href="https://instagram.com/kimcorrero">Kim Correro</a>,
                                    {' '}<a href="https://www.bethdary.com/">Beth Dary</a>,
                                    {' '}<a href="http://www.katedodd.com/">Kate Dodd</a>,
                                    {' '}<a href="https://www.edwardfausty.com/">Edward Fausty</a>,
                                    {' '}<a href="https://www.eileenferara.com/">Eileen Ferara</a>,
                                    {' '}<a href="https://www.jazgraf.com/home">Jaz Graf</a>,
                                    {' '}<a href="https://ellieirons.com/">Ellie Irons</a>,
                                    {' '}<a href="https://deirdrekennedysumie.com/">Deirdre Kennedy</a>,
                                    {' '}<a href="http://www.kaykenny.com/">Kay Kenny</a>,
                                    {' '}<a href="https://zoekeramea.com/">Zoe Keramea</a>,
                                    {' '}<a href="https://www.kerrykolenut.com/index.html">Kerry Kolenut</a>,
                                    {' '}<a href="https://www.robertflach.com/">Robert Lach</a>,
                                    {' '}<a href="https://www.candylesueur.com/">Candy Le Sueur</a>,
                                    {' '}<a href="http://www.novadogallery.com/gallery-artists#/anne-novado">Anne Novado</a>,
                                    {' '}<a href="http://www.williamaortega.com/">William Ortega</a>,
                                    {' '}<a href="http://annepercoco.com/">Anne Percoco</a>,
                                    {' '}<a href="https://www.mayumisarai.net/">Mayumi Sarai</a>,
                                    {' '}<a href="https://www.instagram.com/artbarbart/">Barbara Seddon</a>,
                                    {' '}<a href="http://www.lstreicher.com/home">Linda Streicher</a>,
                                    {' '}<a href="https://www.mjtyson.com/">MJ Tyson</a>,
                                    {' '}<a href="https://www.louravandermeule.com/">Loura van der Meule</a>.
                                </p>
                                <p>
                                    Artists depicting flora and fauna along the Harsimus Branch:
                                    {' '}<a href="https://www.nicolechristianco.com/">Nicole Christian</a>,
                                    {' '}<a href="https://karienglehardt.net/">Kari Englehardt</a>,
                                    {' '}Christiane Fashek,
                                    {' '}<a href="https://www.science-art.com/member/?id=25040#.Yzmkp-zMJUc">Margaret G. Garrison</a>,
                                    {' '}<a href="http://www.rjamesartgarden.com/Home.html">Rose Marie James</a>,
                                    {' '}<a href="https://www.corinnelapincohen.com/">Corinne Lapin-Cohen</a>,
                                    {' '}<a href="https://asba-art.org/content.aspx?page_id=1024&club_id=92618&item_id=7442813">Katy Lyness</a>,
                                    {' '}<a href="https://www.tammysmcenteeartist.com/">Tammy S. McEntee</a>,
                                    {' '}<a href="https://www.donnamiskend.com/">Donna Miskend</a>,
                                    {' '}<a href="https://asba-art.org/content.aspx?page_id=1020&club_id=92618">Dick Rauh</a>,
                                    {' '}<a href="http://www.monicarayartist.com/">Monica Ray</a>,
                                    {' '}<a href="https://www.botanicgirl.com/">Jeanne Reiner</a>,
                                    {' '}<a href="https://www.laughinggullstudio.com/">Clara L. Richardson</a>,
                                    {' '}<a href="https://asba-art.org/content.aspx?page_id=1020&club_id=92618">Meryl Sheetz</a>,
                                    {' '}<a href="https://www.92ny.org/instructor/elizabeth-white-pultz">Elizabeth White-Pultz</a>,
                                    {' '}Sarah Yu.
                                </p>
                            </div>
                            <hr />
                            <div className="row offset-top-20">
                                <p> This project is made possible by a grant from the <a href="https://nj.gov/state/njsca/index.html">New Jersey State Council on the Arts</a>, a division of the Department of State, and administered by <a href="https://hudsoncountyculturalaffairs.org/">the Hudson County Office of Cultural & Heritage Affairs</a>, Thomas A. DeGise, Hudson County Executive & the Hudson County Board of County Commissioners.</p>
                                <p>Supported by public funds from <a href="https://www.jerseycityculture.org/programs/arts-and-culture-trust-fund//">the Jersey City Arts and Culture Trust Fund</a>.</p>
                            </div>
                            <div className="row justify-content-center offset-top-20" />
                            <hr/>
                            <div className="row justify-content-center offset-top-40" >
                                <div className="col-sm-7 col-md-3 col-lg-3">
                                    <a href="https://hudsoncountyculturalaffairs.org/">
                                        <img src="/images/teomm/teomm-njhc-logo.jpeg" alt="New Jersey Hudson County logo" className={styles.logo} />
                                    </a>
                                </div>
                                <div className="col-sm-6 col-md-3 col-lg-3">
                                    <a href="https://www.jerseycityculture.org/programs/arts-and-culture-trust-fund//">
                                        <img src="/images/teomm/teomm-jcac-logo.jpeg" alt="Jersey City Arts & Culture Trust Fund logo" className={styles.logo} />
                                    </a>
                                </div>
                            </div>
                            <div className="row justify-content-center offset-top-20" >
                                <div className="col-sm-10 col-md-5 col-lg-5">
                                    <a href="https://www.njcu.edu/">
                                        <img src="/images/teomm/teomm-njcu-logo.png" alt="New Jersey City University logo" className={styles.logo} />
                                    </a>
                                </div>
                            </div>
                            <div className="row justify-content-center offset-top-20" >
                                <div className="col-sm-10 col-md-5 col-lg-5">
                                    <a href="https://embankment.org">
                                        <img src="/images/teomm/teomm-epc-logo.jpg" alt="Embankment Preservation Coalition logo" className={styles.logo} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Page>
    )
}
