import navStyles from "./navbar.module.css";
import {Brand} from "./theme";
import { becomeMemberId, donateId, newsId, partnersId, sponsorsId, volunteerId } from "./ids";

export default function Nav({ cur, navStuck }: { cur: string, navStuck?: boolean }) {
    if ((cur == "" || cur) && !cur.startsWith("/")) {
        cur = `/${cur}`
    }
    function MenuItem({ path, hash, text, }: {
        path: string
        hash: string
        text: string
    }) {
        let href = path
        if (hash) {
            href += `#${hash}`
        }
        return <li key={href}><a href={href}><span className="text-middle">{text}</span></a></li>
    }

    function SubMenu({ path, text, hash, items }: {
        path: string
        text: string
        hash?: string
        items?: { hash: string, text: string }[]
    }) {
        let href = path
        if (hash) {
            href += `#${hash}`
        }
        return (
            <li>
                <a href={href}><span>{text}</span></a>
                {
                    items &&
                    <ul className="rd-navbar-dropdown">{
                        items.map(({ hash, text }) => MenuItem({ path, hash, text }))
                    }</ul>
                }
            </li>
        )
    }

    function HeaderMenu() {
        return (
            <ul className="rd-navbar-nav">
                <SubMenu path="/" text="HOME" items={[
                    { hash: "home-section-what", text: "What is the Embankment?", },
                    { hash: "home-section-mission", text: "What are the Coalition's Goals?", },
                    { hash: "home-section-steps", text: "What are the Next Steps?", },
                ]} />
                <SubMenu path="/about" text="ABOUT" items={[
                    { hash: "about-section-history", text: "The History", },
                    { hash: "about-section-coalition", text: "The Coalition", },
                ]} />
                <SubMenu path="/vision" text="OUR VISION" items={[
                    { hash: "vision-section-bigpicture", text: "Our Philosophy", },
                    { hash: "vision-section-vision", text: "Harsimus Branch Vision", },
                    { hash: "vision-section-crossroads", text: "Jersey City Greenways", },
                    { hash: "vision-section-art", text: "Art for a Sustainable Future", },
                ]} />
                <SubMenu path="/involved" text="GET INVOLVED" items={[
                    { hash: becomeMemberId, text: "Become a Member!", },
                    { hash: volunteerId, text: "Volunteer", },
                    { hash: donateId, text: "Donate", },
                    { hash: partnersId, text: "Our Partners", },
                ]} />
                <SubMenu path="/news" text="NEWS + EVENTS" items={[
                    { hash: newsId, text: "News + Press", },
                    { hash: "news-section-subscribe", text: "Subscribe", },
                ]} />
                <SubMenu path="/involved" hash={donateId} text="DONATE" />
                <SubMenu path="/involved" hash={sponsorsId} text="SPONSORS" />
            </ul>
        )
    }

    return (
        <div className="rd-navbar-wrap">
            <nav
                className={`rd-navbar rd-navbar-default rd-atata rd-navbar-transparent ${navStuck ? navStyles["navbar-force-stuck"] : ""}`}
                data-md-device-layout="rd-navbar-fixed"
                data-lg-device-layout="rd-navbar-static"
                data-lg-auto-height="true"
                data-md-layout="rd-navbar-fixed"
                data-lg-layout="rd-navbar-static"
                data-lg-stick-up="true"
            >
                <div className={`rd-navbar-inner ${navStuck ? navStyles["rd-navbar-inner"] : ""}`}>
                    {/* RD Navbar Panel */}
                    <div className="rd-navbar-panel">
                        {/* RD Navbar Toggle */}
                        <button className="rd-navbar-toggle" data-rd-navbar-toggle=".rd-navbar, .rd-navbar-nav-wrap"><span /></button>
                        {/* Navbar Brand */}
                        <Brand className="rd-navbar-brand" />
                    </div>
                    <div className="rd-navbar-menu-wrap">
                        <div className="rd-navbar-nav-wrap">
                            <div className="rd-navbar-mobile-scroll">
                                <Brand className="rd-navbar-mobile-brand" />
                                <HeaderMenu />
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
}
