
import { Page } from "../src/pages"

export default function Body() {
    return (
        <Page
            path="news"
            headerChildren={
                <section className="section parallax-container bg-black" data-parallax-img="images/NEWS-BANNER.jpg">
                <div className="parallax-content context-dark">
                    <div className="container">
                    <div className="row align-items-sm-center justify-content-sm-center section-cover section-98 section-sm-110 text-lg-left context-dark">
                        <div className="col-sm-12">
                        <div className="offset-top-4 offset-xl-top-0">
                            <h1 className="text-capitalize">
                            <span className="big">News + Events</span>
                            </h1>
                        </div>
                        <div>
                            <h2 className="font-default font-italic text-regular">Get up to date on the Harsimus Branch and Embankment news and events - then help us write the next chapter! </h2>
                        </div>
                        <div className="group group-xl offset-top-30">
                            <a className="btn btn-primary btn-lg btn-anis-effect" href="#news-section-recent">Recent Headline</a>
                            <a className="btn btn-default btn-lg btn-anis-effect" data-caption-animate="fadeInUp" data-caption-delay="1200" href="involved.html#involved-section-member">
                            <span className="btn-text">Become a Member!</span>
                            </a>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </section>
            }
        >
            {/* Section News */}
            <section id="news-section-recent" className="section novi-background section-98 section-sm-top-110 section-sm-bottom-124">
                <div className="container">
                    <h2 className="font-weight-bold">News + Press</h2>
                    <hr className="divider bg-mantis" />
                    <div className="row justify-content-md-center justify-content-xl-end">
                        <div className="col-md-10 col-lg-8 col-xl-7">
                            <div className="inset-left-0 inset-lg-right-20">
                                {/* Section Blog Modern */}
                                <section>
                                    <div className="post-modern-timeline-date text-md-left">
                                        <time dateTime="2022-05-11">11 May 2022</time>
                                    </div>
                                    {/* Post Modern */}
                                    <article className="post post-modern post-modern-timeline post-modern-timeline-left">
                                        {/* Post media */}
                                        <header className="post-media">
                                            <a href="https://youtu.be/qxAHqzLqnoo" target="_blank">
                                                <img className="img-fluid img-cover" width="570" height="321" src="images/embankment-annual-mtng-img.jpeg" alt="" />
                                            </a>
                                        </header>
                                        {/* Post content */}
                                        <section className="post-content text-left">
                                            {/* Post Body */}
                                            <div className="post-body offset-top-20">
                                                <a href="https://youtu.be/qxAHqzLqnoo" target="_blank">
                                                    <p>Check out the newest drone flyover video about the Embankment and East Coast Greenway!</p>
                                                </a>
                                            </div>
                                            <div className="post-author">
                                                <div className="post-author-img"><img className="rounded-circle" width="45" height="45" src="images/favicon.ico" alt="Embankment.org logo" /></div>
                                                <div className="post-author-name text-middle">Embankment.org</div>
                                            </div>
                                        </section>
                                    </article>

                                    <div className="post-modern-timeline-date text-md-left">
                                        <time dateTime="2021-05-13">29 April + 13 May 2021</time>
                                    </div>
                                    {/* Post Modern */}
                                    <article className="post post-modern post-modern-timeline post-modern-timeline-left">
                                        {/* Post media */}
                                        <header className="post-media">
                                            <a href="https://www.youtube.com/watch?v=TK754w-IPfU" target="_blank">
                                                <img className="img-fluid img-cover" width="570" height="321" src="images/climate-talk.jpeg" alt="" />
                                            </a>
                                        </header>
                                        {/* Post content */}
                                        <section className="post-content text-left">
                                        {/* Post Title */}
                                        <div className="post-title">
                                            <h6 className="offset-top-24">Climate Change 2021: Challenges and Solutions (4/29, 5/13)</h6>
                                        </div>
                                        {/* Post Body */}
                                        <div className="post-body offset-top-20">
                                            <p>Join the EPC &amp; other civic orgs for Climate Change 2021: Challenges and Solutions. Dr. D. James Baker will explain the challenges 4/29, 7pm and then solutions &amp; what we can do 5/13, 7pm.</p>
                                            <p>Watch the recordings: <a href="https://www.youtube.com/watch?v=TK754w-IPfU" target="_blank">part 1</a>, <a href="https://www.youtube.com/watch?v=1rw7wIAgqZY" target="_blank">part 2</a>.</p>
                                        </div>
                                        <div className="post-author">
                                            <div className="post-author-img"><img className="rounded-circle" width="45" height="45" src="images/favicon.ico" alt="Embankment.org logo" /></div>
                                            <div className="post-author-name text-middle">Embankment.org</div>
                                        </div>
                                        </section>
                                    </article>

                                    <div className="post-modern-timeline-date text-md-left">
                                        <time dateTime="2021-03-17">17 March 2021</time>
                                    </div>
                                    {/* Post Modern */}
                                    <article className="post post-modern post-modern-timeline post-modern-timeline-left">
                                        {/* Post media */}
                                        <header className="post-media">
                                        <a href="https://www.railstotrails.org/trailblog/2021/march/15/2021-trail-grants-awardees-support-community-connections-on-and-off-trails/" target="_blank"><img className="img-fluid img-cover" width="570" height="321" src="images/rails-to-trails-article.jpeg" alt="" /></a>
                                        </header>
                                        {/* Post content */}
                                        <section className="post-content text-left">
                                        {/* Post Title */}
                                        <div className="post-title">
                                            <h6 className="offset-top-24">Rails to Trails Grant Award</h6>
                                        </div>
                                        {/* Post Body */}
                                        <div className="post-body offset-top-20">
                                            <p>The EPC joins nine other recipients of a 2021 <a href="https://www.railstotrails.org/">Rails-to-Trails Conservancy</a> grant to advance trails throughout the country. The Harsimus Branch &amp; Embankment will eventually
                                            connect with the Essex-Hudson Greenway, which also garnered a grant for its advocates, the NJ Bike&Walk Coalition.</p>
                                            <p><a href="https://www.railstotrails.org/trailblog/2021/march/15/2021-trail-grants-awardees-support-community-connections-on-and-off-trails/" target="_blank">Click here to read more.</a></p>
                                        </div>
                                        <div className="post-author">
                                            <div className="post-author-img"><img className="rounded-circle" width="45" height="45" src="images/favicon.ico" alt="Embankment.org logo" /></div>
                                            <div className="post-author-name text-middle">Embankment.org</div>
                                        </div>
                                        </section>
                                    </article>

                                    <div className="post-modern-timeline-date text-md-left">
                                        <time dateTime="2021-02-02">2 Feb 2021</time>
                                    </div>
                                    {/* Post Modern */}
                                    <article className="post post-modern post-modern-timeline post-modern-timeline-left">
                                        {/* Post media */}
                                        <header className="post-media">
                                        <a href="https://youtu.be/ciznhv7ZmZM" target="_blank"><img className="img-fluid img-cover" width="570" height="321" src="images/essex-hudson-greenway.jpg" alt="" /></a>
                                        </header>
                                        {/* Post content */}
                                        <section className="post-content text-left">
                                        {/* Post Title */}
                                        <div className="post-title">
                                            <h6 className="offset-top-24">Essex-Hudson County Greenway presentation</h6>
                                        </div>
                                        {/* Post Body */}
                                        <div className="post-body offset-top-20">
                                            <p>In a meeting hosted by the Embankment Coalition and numerous environmental organizations, Deb Kagan of the NJ Bike &amp; Walk Coalition described the proposed Essex-Hudson Greenway.</p>
                                            <p><a href="https://youtu.be/ciznhv7ZmZM" target="_blank">Click here to watch recording of the event,</a> then <a href="https://www.essexhudsongreenway.org/support/"><strong>sign on to a support letter</strong>.</a></p>
                                        </div>
                                        <div className="post-author">
                                            <div className="post-author-img"><img className="rounded-circle" width="45" height="45" src="images/favicon.ico" alt="Embankment.org logo" /></div>
                                            <div className="post-author-name text-middle">Embankment.org</div>
                                        </div>
                                        </section>
                                    </article>

                                    <div className="post-modern-timeline-date text-md-left">
                                        <time dateTime="2020-11-18">18 Nov 2020</time>
                                    </div>
                                    {/* Post Modern */}
                                    <article className="post post-modern post-modern-timeline post-modern-timeline-left">
                                        {/* Post media */}
                                        <header className="post-media">
                                        <a href="https://youtu.be/6G-ZsU40Uh8" target="_blank"><img className="img-fluid img-cover" width="570" height="321" src="images/HOME-HISTORIC-WALL.jpg" alt="" /></a>
                                        </header>
                                        {/* Post content */}
                                        <section className="post-content text-left">
                                        {/* Post Title */}
                                        <div className="post-title">
                                            <h6 className="offset-top-24">Mayor Steven Fulop was the Featured Speaker at Coalition Annual Members Meeting</h6>
                                        </div>
                                        {/* Post Body */}
                                        <div className="post-body offset-top-20">
                                            <p>The Embankment Coalition and Mayor Fulop gave an update on the Vision and an overview of the terms and status of the possible Settlement</p>
                                            <p><a href="https://youtu.be/6G-ZsU40Uh8" target="_blank"><span className="text-middle">--- Click Here to Watch Recording of the Event ---</span></a></p>
                                        </div>
                                        <div className="post-author">
                                            <div className="post-author-img"><img className="rounded-circle" width="45" height="45" src="images/favicon.ico" alt="embankment.org logo" /></div>
                                            <div className="post-author-name text-middle">Embankment.org</div>
                                        </div>
                                        </section>
                                    </article>

                                    <div className="post-modern-timeline-date text-md-left">
                                        <time dateTime="2020-10-03">03 Oct 2020</time>
                                    </div>
                                    <article className="post post-modern post-modern-timeline post-modern-timeline-left">
                                        {/* Post media */}
                                        <header className="post-media"><img className="img-fluid img-cover" width="570" height="321" src="images/cleanup.jpg" alt="" />
                                        </header>
                                        {/* Post content */}
                                        <section className="post-content text-left">
                                        {/* Post Title */}
                                        <div className="post-title">
                                            <h6 className="offset-top-24">Embankment Neighborhood Cleanup</h6>
                                        </div>
                                        {/* Post Body */}
                                        <div className="post-body offset-top-20">
                                            <p>The Embankment Coalition organized the Harsimus Cove Neighborhood Cleanup in partnership with Ward E Councilman James Solomon and the nonprofits CleanGreenJersey City and Adopt-a-Block.</p>
                                            <p/>
                                        </div>
                                        <div className="post-author">
                                            <div className="post-author-img"><img className="rounded-circle" width="45" height="45" src="images/favicon.ico" alt="embankment.org logo" /></div>
                                            <div className="post-author-name text-middle">Embankment.org</div>
                                        </div>
                                        </section>
                                    </article>

                                    <div className="post-modern-timeline-date text-md-left">
                                        <time dateTime="2019-01-01">10 Sept 2020</time>
                                    </div>
                                    {/* Post Modern */}
                                    <article className="post post-modern post-modern-timeline post-modern-timeline-left">
                                        {/* Post media */}
                                        {/* Post content */}
                                        <section className="post-content text-left">
                                        {/* Post Title */}
                                        <div className="post-title">
                                            <h6 className="offset-top-24"><a href="https://prod.stb.gov/news-communications/latest-news/pr-20-11/" target="_blank">STB Draft Supplemental Environmental Assessment Issued
                                            </a></h6>
                                        </div>
                                        {/* Post Body */}
                                        <div className="post-body offset-top-20">
                                            <p>The Surface Transportation Board (STB) is moving ahead with environmental and historic preservation reviews that are part of its federally mandated process when considering a potential permit to abandon a railroad.</p>
                                            <p/>
                                            <p>The STB will meet (virtually) in October with previously designated consulting parties, including the Coalition, to discuss potential adverse effects on historic assets if an abandonment permit for the Harsimus
                                            Branch is granted. This is a step in a process mandated by the National Historic Preservation Act (NHPA). To fulfill obligations under the National Environmental Protection, the STB also issued a Supplementary
                                            Environmental Assessment (EA), to which the Coalition will be responding.</p>
                                        </div>
                                        <div className="post-author">
                                            <div className="post-author-img"><img className="rounded-circle" width="45" height="45" src="images/favicon.ico" alt="embankment.org logo" /></div>
                                            <div className="post-author-name text-middle">Embankment.org</div>
                                        </div>
                                        </section>
                                    </article>

                                    <div className="post-modern-timeline-date text-md-left">
                                        <time dateTime="2017-06-04">04 Jun 2017</time>
                                    </div>

                                    {/* Post Modern */}
                                    <article className="post post-modern post-modern-timeline post-modern-timeline-left">
                                        {/* Post media */}
                                        <header className="post-media"><img className="img-fluid img-cover" width="570" height="321" src="images/NEWS-PETITION.jpg" alt="" />
                                        </header>
                                        {/* Post content */}
                                        <section className="post-content text-left">
                                        <ul className="list-inline">
                                            <li className="list-inline-item">
                                            <p>Public Movement</p>
                                            </li>
                                            <li className="list-inline-item">
                                            <div className="icon novi-icon icon-xxs text-dark mdi mdi-checkbox-marked-circle-outline"></div>
                                            </li>
                                        </ul>
                                        {/* Post Title */}
                                        <div className="post-title">
                                            <h6 className="offset-top-24">Coalition Petition to STB Gets 2,588 Signatures</h6>
                                        </div>
                                        {/* Post Body */}
                                        <div className="post-body offset-top-20">
                                            <p>A petition asking the Surface Transportation Board to carry out its preservation obligations received 2,588 signatures before the Embankment Preservation Coalition closed it.</p>
                                        </div>
                                        <div className="post-author">
                                            <div className="post-author-img"><img className="rounded-circle" width="45" height="45" src="images/logo_change.jpg" alt="change.org logo" /></div>
                                            <div className="post-author-name text-middle">Change.org</div>
                                        </div>
                                        </section>
                                    </article>

                                    <div className="post-modern-timeline-date text-md-left">
                                        <time dateTime="2013-10-03">03 Oct 2013</time>
                                    </div>
                                    {/* Post Modern */}
                                    <article className="post post-modern post-modern-timeline post-modern-timeline-left">
                                        {/* Post media */}
                                        {/* Post content */}
                                        <section className="post-content text-left">
                                        <ul className="list-inline">
                                            <li className="list-inline-item">
                                            <div className="post-tags group-xs"><a className="label-custom label-lg-custom label-rounded-custom label-primary" href="https://www.nj.com/hudson/2013/10/jersey_city_officials_hailing_embankment_ruling_as_clear_win.html" target="_blank">Read Article</a>
                                            </div>
                                            </li>
                                            <li className="list-inline-item">
                                            <div className="icon novi-icon icon-xxs text-dark mdi mdi-pen"></div>
                                            </li>
                                        </ul>
                                        {/* Post Title */}
                                        <div className="post-title">
                                            <h6 className="offset-top-24"><a href="https://www.nj.com/hudson/2013/10/jersey_city_officials_hailing_embankment_ruling_as_clear_win.html" target="_blank">Jersey City Officials Hailing Embankment Ruling as 'Clear Win'</a></h6>
                                        </div>
                                        {/* Post Body */}
                                        <div className="post-body offset-top-20">
                                            <p>A federal judge last week ruled that the Sixth Street Embankment in Jersey City is indeed a rail line, a decision that city officials believe could lead to the city someday owning the disputed property.</p>
                                        </div>
                                        <div className="post-author">
                                            <div className="post-author-img"><img className="rounded-circle" width="45" height="45" src="images/logo_jersey.jpg" alt="nj.com logo" /></div>
                                            <div className="post-author-name text-middle">Jersey Journal</div>
                                        </div>
                                        </section>
                                    </article>
                                    <div className="post-modern-timeline-date text-md-left">
                                        <time dateTime="2019-01-01">22 Jun 2012</time>
                                    </div>
                                    {/* Post Modern */}
                                    <article className="post post-modern post-modern-timeline post-modern-timeline-left">
                                        {/* Post media */}
                                        <header className="post-media">
                                            <img className="img-fluid img-cover" width="570" height="321" src="images/NEWS-LINK.jpg" alt="" />
                                        </header>
                                        {/* Post content */}
                                        <section className="post-content text-left">
                                        <ul className="list-inline">
                                            <li className="list-inline-item">
                                            <div className="post-tags group-xs">
                                                <a
                                                    className="label-custom label-lg-custom label-rounded-custom label-primary"
                                                    href="http://blog.nj.com/nj_off-road_biking/2012/06/dont_miss_these_photos_from_the_grand_opening_of_the_ecg_link_between_jersey_city_and_newark.html"
                                                    target="_blank"
                                                >
                                                    Read Article
                                                </a>
                                            </div>
                                            </li>
                                            <li className="list-inline-item">
                                            <div className="icon novi-icon icon-xxs text-dark mdi mdi-bike"></div>
                                            </li>
                                        </ul>
                                        {/* Post Title */}
                                        <div className="post-title">
                                            <h6 className="offset-top-24"><a href="http://blog.nj.com/nj_off-road_biking/2012/06/dont_miss_these_photos_from_the_grand_opening_of_the_ecg_link_between_jersey_city_and_newark.html" target="_blank">Grand Opening of the ECG Link Between Jersey City &amp; Newark</a></h6>
                                        </div>
                                        {/* Post Body */}
                                        <div className="post-body offset-top-20">
                                            <p>On Friday, the East Coast Greenway Alliance held a grand opening and Ribbon Cutting Ceremony at Lincoln Park in Jersey City to celebrate the bridging of the greenway gap between Jersey City and Newark.</p>
                                        </div>
                                        <div className="post-author">
                                            <div className="post-author-img"><img className="rounded-circle" width="45" height="45" src="images/logo_star.jpg" alt="Star-Ledger logo" /></div>
                                            <div className="post-author-name text-middle">The Star-Ledger</div>
                                        </div>
                                        </section>
                                    </article>
                                </section>
                            </div>
                        </div>
                        <div className="col-lg-3 col-xl-3 offset-top-66 offset-lg-top-0">
                            {/* Section Blog Modern */}
                        </div>
                    </div>
                </div>
            </section>

            {/* Newsletter Subscribe */}
            <section id="news-section-subscribe" className="section parallax-container context-light" data-parallax-img="images/NEWS-SUBSCRIBE.jpg">
                <div className="parallax-content section-98 section-md-110 bg-overlay-white">
                    <div className="container">
                        <h1>Subscribe to Our Newsletter</h1>
                        <hr className="divider bg-mantis" />
                        <div className="row justify-content-sm-center offset-top-20">
                            <div className="col-sm-10 col-xl-6">
                                <p>Stay informed about the Harsimus Branch and events sponsored by the Embankment Preservation Coalition and other preservation and conservation allies by subscribing to our newsletter. You will receive the Coalition online newsletter
                                and occasional alerts and notices. We do not share your contact information with others, and we promise not to inundate you with email. You can also unsubscribe at any time.</p>
                                {/* Call to action type 1 */}
                                <form className="rd-mailform" data-form-output="form-subscribe-footer" data-form-type="subscribe" method="post" action="api/email-signup">
                                    <div className="form-group">
                                        <div className="input-group input-group-sm">
                                            <span className="input-group-prepend">
                                                <span className="input-group-text input-group-icon">
                                                    <span className="novi-icon mdi mdi-email" />
                                                </span>
                                            </span>
                                            <input className="form-control" placeholder="Type your E-Mail" type="email" name="email" data-constraints="@Required @Email" />
                                            <span className="input-group-append">
                                                <button className="btn btn-sm btn-primary" type="submit">Subscribe</button>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="form-output" id="form-subscribe-footer" />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Events  */}
            <section id="news-section-event" className="section novi-background breadcrumb-classic">
                <div className="container section-34 section-sm-50">
                    <div className="row align-items-xl-center">
                        <div className="col-xl-5 d-none d-xl-block text-xl-left">
                        <h2><span className="big">Calendar</span></h2>
                        </div>
                        <div className="col-xl-2 d-none d-md-block"><span className="icon icon-white mdi mdi-calendar"></span></div>
                        <div className="offset-top-0 offset-md-top-10 col-xl-5 offset-xl-top-0 small text-xl-right">
                            <ul className="list-inline list-inline-dashed p" />
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

            <section className="section novi-background section-98 section-sm-110">
                <div className="container">
                    <h2 className="font-weight-bold">Events</h2>
                    <hr className="divider bg-mantis" />
                    <div className="row justify-content-sm-center">
                        <div className="col-lg-8">
                            <div className="inset-lg-right-20">
                                {/* Blog Default Single */}
                                <section>
                                    <hr className="offset-top-66" />

                                    {/* Post Event */}
                                    <article className="post post-event">
                                        {/* Post media */}
                                        <header className="post-media">
                                        <div data-lightgallery="group">
                                            <a className="thumbnail-classic" data-lightgallery="item" href="images/HOME-HISTORIC-WALL.jpg">
                                                <figure>
                                                    <img width="570" height="321" src="images/NEW_JANE.jpg" alt="" />
                                                </figure>
                                            </a>
                                        </div>
                                        </header>
                                        {/* Post content */}
                                        <section className="post-content text-left offset-top-41">
                                            {/* Post Title */}
                                            <h3 className="offset-top-10"><a href="https://youtu.be/6G-ZsU40Uh8" target="_blank">Study Group Discussion</a></h3>
                                            <h6 className="offset-top-5">Location: Zoom Meeting | Time: 7:00-8:00pm</h6>
                                            {/* Post Body */}
                                            <div className="post-body">
                                                <p>Study Group Discussion of the Jane Jacobs classic: 'The Death and Life of Great American Cities.'</p>

                                                <footer className="offset-top-50 text-md-center clearfix" />
                                            </div>
                                            {/* Post meta */}
                                            <div className="post-meta context-dark">
                                                <time dateTime="2019-01-01"><span className="post-meta-day">Sun</span><span className="big text-uppercase post-meta-month">Jan. 31</span></time>
                                            </div>
                                        </section>
                                    </article>

                                    <hr className="offset-top-66" />

                                    {/* Post Event */}
                                    <article className="post post-event">
                                        {/* Post media */}
                                        <header className="post-media">
                                        <div data-lightgallery="group">
                                            <a className="thumbnail-classic" data-lightgallery="item" href="images/ESSEX.jpg">
                                                <figure>
                                                    <img width="570" height="321" src="images/ESSEX.jpg" alt="" />
                                                </figure>
                                            </a>
                                        </div>
                                        </header>
                                        {/* Post content */}
                                        <section className="post-content text-left offset-top-41">
                                            {/* Post Title */}
                                            <h3 className="offset-top-10"><a href="https://youtu.be/6G-ZsU40Uh8" target="_blank">Proposed Essex-Hudson Greenway in JC</a></h3>
                                            <h6 className="offset-top-5">Location: Zoom Meeting | Time: 7:00-8:00pm</h6>
                                            {/* Post Body */}
                                            <div className="post-body">
                                                <p>Essex &amp; Hudson Counties may acquire nine miles of old rail line for a linear park and trail. Debra Kagan &amp; Lauren Rushing from the NJ Bike &amp; Walk Coalition (NJBWC) will explain the project at a meeting hosted
                                                by the Embankment Coalition on Feb 2 at 7pm. </p>

                                                <p><a href="https://t.co/5UbYUWU9hF?amp=1" target="_blank"><span className="text-middle">--- Click Here to Join Zoom Event ---</span></a></p>

                                                <footer className="offset-top-50 text-md-center clearfix" />
                                            </div>
                                            {/* Post meta */}
                                            <div className="post-meta context-dark">
                                                <time dateTime="2019-01-01"><span className="post-meta-day">Sun</span><span className="big text-uppercase post-meta-month">Feb. 02 </span></time>
                                            </div>
                                        </section>
                                    </article>

                                    <hr className="offset-top-66" />

                                    {/* Post Event */}
                                    <article className="post post-event">
                                        {/* Post media */}
                                        <header className="post-media">
                                        <div data-lightgallery="group">
                                            <a className="thumbnail-classic" data-lightgallery="item" href="images/ABOUT-6TH.jpg">
                                            <figure>
                                                <img width="570" height="321" src="images/ABOUT-6TH.jpg" alt="" />
                                            </figure>
                                            </a>
                                        </div>
                                        </header>
                                        {/* Post content */}
                                        <section className="post-content text-left offset-top-41">
                                            {/* Post Title */}
                                            <h3 className="offset-top-10"><a href="#">Only Connect! Request a Presentation</a></h3>
                                            {/* Post Body */}
                                            <div className="post-body">
                                                <p>The Embankment Preservation Coalition can tailor a presentation to your organization's interests, whether it's Harsimus Branch and Embankment railroad history, our ecological vision for park and trail design,
                                                or our advocacy for a trail system throughout the City that would enable every resident to be within ten minutes of a safe, off-road walking and biking trail. </p>
                                                <p>Our work is all about making connections - so, with apologies to E.M. Forster, only connect with us! To request a presentation, email the Coalition with your proposal and, if you can, give us several options
                                                for dates and times.</p>
                                                <footer className="offset-top-50 text-md-center clearfix">
                                                    <div className="group">
                                                        <a className="btn btn-danger btn-icon btn-icon-left" href="mailto:embankmentJC@gmail.com">
                                                            <span className="novi-icon icon icon-xs mdi mdi-check"></span>Make Request
                                                        </a>
                                                    </div>
                                                </footer>
                                            </div>
                                            {/* Post meta */}
                                            <div className="post-meta context-dark">
                                                <time dateTime="2019-01-01"><span className="post-meta-day">*</span><span className="big text-uppercase post-meta-month">----</span></time>
                                            </div>
                                        </section>
                                    </article>
                                </section>
                            </div>
                        </div>
                        <div className="col-lg-4 col-xl-3 offset-top-66 offset-lg-top-0">
                            {/* Section Blog Events */}
                            <aside className="text-left">
                                <div className="row">
                                    <div className="col-md-6 col-lg-12 offset-md-top-41 offset-lg-top-0">
                                        {/* RD calendar */}
                                        <div className="rd-calendar">
                                            <div className="rdc-panel">
                                                <a className="rdc-next"></a>
                                                <a className="rdc-prev"></a>
                                                <div className="rdc-month"></div>
                                                <div className="rdc-fullyear"></div>
                                            </div>
                                            <div className="rdc-table"></div>
                                            <div className="rdc-events text-left">
                                                <a className="rdc-events_close"></a>
                                                <ul>
                                                <li className="rdc-event" data-date="06/12/2018">
                                                    <div className="rdc-event-wrap">
                                                    <article className="post widget-event">
                                                        <div className="post-meta"><span className="icon novi-icon icon-xxs text-picton-blue mdi mdi-clock"></span>
                                                        <time className="text-white" dateTime="2019-01-01">8:00 AM</time>
                                                        </div>
                                                        <div className="post-title">
                                                        <h6 className="text-regular"><a href="#">Pitae augue vitae matt</a></h6>
                                                        </div>
                                                    </article>
                                                    </div>
                                                </li>
                                                <li className="rdc-event" data-date="06/13/2018">
                                                    <div className="rdc-event-wrap">
                                                    <article className="post widget-event">
                                                        <div className="post-meta"><span className="icon novi-icon icon-xxs text-picton-blue mdi mdi-clock"></span>
                                                        <time className="text-white" dateTime="2019-01-01">9:00 AM</time>
                                                        </div>
                                                        <div className="post-title">
                                                        <h6 className="text-regular"><a href="#">Pitae augue vitae matt</a></h6>
                                                        </div>
                                                    </article>
                                                    </div>
                                                </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Recent Events */}
                                    <div className="col-md-6 col-lg-12 offset-top-41">
                                        <h6 className="text-uppercase text-spacing-60">Recent Events</h6>
                                        <div className="text-subline"></div>
                                        <div className="offset-top-34">
                                        {/* Event Widget */}
                                        <article className="post widget-event text-left">
                                            <a href="https://hudsonreporter.com/2019/03/14/hudson-county-community-college-presents-urban-crossroads/" target="_blank">
                                            <div className="unit flex-row unit-spacing-xs align-items-center">
                                                <div className="unit-left"><img className="rounded-circle" width="46" height="46" src="images/logo_jersey-city-arts.jpg" alt="" /></div>
                                                <div className="unit-body">
                                                <div className="post-meta">
                                                    <ul className="list-inline list-inline-sm">
                                                    <li className="list-inline-item"><span className="icon-xxs novi-icon text-picton-blue mdi mdi-calendar"></span>
                                                        <time className="text-dark" dateTime="2019-01-01">04/18/2019</time>
                                                    </li>
                                                    <li className="list-inline-item"><span className="icon-xxs novi-icon text-picton-blue mdi mdi-clock"></span>
                                                        <time className="text-dark" dateTime="2019-01-01">6:30 PM</time>
                                                    </li>
                                                    </ul>
                                                </div>
                                                <div className="post-title">
                                                    <h6 className="text-regular">Crossroads Gallery Show &amp; Panel Discussion</h6>
                                                </div>
                                                </div>
                                            </div>
                                            </a>
                                        </article>
                                        </div>
                                        <div className="offset-top-30">
                                        {/* Event Widget */}
                                        <article className="post widget-event text-left">
                                            <a href="https://www.sustainablejc.org/events/2019/2/green-infrastructure-part2-march-monthly-meeting-h" target="_blank">
                                            <div className="unit flex-row unit-spacing-xs align-items-center">
                                                <div className="unit-left"><img className="rounded-circle" width="46" height="46" src="images/logo_sustainable.jpg" alt="" /></div>
                                                <div className="unit-body">
                                                <div className="post-meta">
                                                    <ul className="list-inline list-inline-sm">
                                                    <li className="list-inline-item"><span className="icon-xxs novi-icon text-picton-blue mdi mdi-calendar"></span>
                                                        <time className="text-dark" dateTime="2019-01-01">03/05/2018</time>
                                                    </li>
                                                    <li className="list-inline-item"><span className="icon-xxs novi-icon text-picton-blue mdi mdi-clock"></span>
                                                        <time className="text-dark" dateTime="2019-01-01">6:30 PM</time>
                                                    </li>
                                                    </ul>
                                                </div>
                                                <div className="post-title">
                                                    <h6 className="text-regular">Sustainable Jersey City Presentation</h6>
                                                </div>
                                                </div>
                                            </div>
                                            </a>
                                        </article>
                                        </div>
                                        <div className="offset-top-30">
                                        {/* Event Widget */}
                                        <article className="post widget-event text-left">
                                            <a href="https://njbwc.org/nj-summits/" target="_blank">
                                            <div className="unit flex-row unit-spacing-xs align-items-center">
                                                <div className="unit-left"><img className="rounded-circle" width="46" height="46" src="images/logo_bike.jpg" alt="" /></div>
                                                <div className="unit-body">
                                                <div className="post-meta">
                                                    <ul className="list-inline list-inline-sm">
                                                    <li className="list-inline-item"><span className="icon-xxs novi-icon text-picton-blue mdi mdi-calendar"></span>
                                                        <time className="text-dark" dateTime="2019-01-01">02/23/2019</time>
                                                    </li>
                                                    <li className="list-inline-item"><span className="icon-xxs novi-icon text-picton-blue mdi mdi-clock"></span>
                                                        <time className="text-dark" dateTime="2019-01-01">8:00 PM</time>
                                                    </li>
                                                    </ul>
                                                </div>
                                                <div className="post-title">
                                                    <h6 className="text-regular">New Jersey Bike &amp; Walk Summit Presentation</h6>
                                                </div>
                                                </div>
                                            </div>
                                            </a>
                                        </article>
                                        </div>
                                    </div>
                                </div>
                            </aside>
                        </div>
                    </div>
                </div>
            </section>

            {/* Explore Section */}
            <section className="section parallax-container" data-parallax-img="images/HOME-SLIDER1.jpg">
                <div className="parallax-content section-98 section-sm-124 bg-overlay-white">
                    <div className="container">
                        <div className="row justify-content-md-center">
                            <div className="col-md-10">
                                <h1><a href="involved.html#involved-section-member">Become a Member!</a></h1>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Page>
    )
}
