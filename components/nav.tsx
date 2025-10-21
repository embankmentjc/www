import { useState, useEffect } from "react";
import navStyles from "./navbar.module.css";
import {Brand} from "./theme";
import { becomeMemberId, donateId, newsId, partnersId, sponsorsId, volunteerId } from "./ids";

export default function Nav({ cur, navStuck }: { cur: string, navStuck?: boolean }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSticky, setIsSticky] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 992);
        };

        const handleScroll = () => {
            setIsSticky(window.scrollY > 1);
        };

        checkMobile();
        handleScroll();

        window.addEventListener('resize', checkMobile);
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('resize', checkMobile);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }, [isMobileMenuOpen]);

    if ((cur == "" || cur) && !cur.startsWith("/")) {
        cur = `/${cur}`
    }

    const MenuItem = ({ path, hash, text }: {
        path: string
        hash: string
        text: string
    }) => {
        let href = path
        if (hash) {
            href += `#${hash}`
        }
        return (
            <li key={href}>
                <a href={href}>
                    <span className="text-middle">{text}</span>
                </a>
            </li>
        );
    }

    const SubMenu = ({ path, text, hash, items }: {
        path: string
        text: string
        hash?: string
        items?: { hash: string, text: string }[]
    }) => {
        const [isOpen, setIsOpen] = useState(false);
        let href = path
        if (hash) {
            href += `#${hash}`
        }

        const handleMouseEnter = () => {
            if (!isMobile && items) {
                setIsOpen(true);
            }
        };

        const handleMouseLeave = () => {
            if (!isMobile && items) {
                setIsOpen(false);
            }
        };

        return (
            <li
                className={isOpen && items ? "rd-navbar--has-dropdown opened" : items ? "rd-navbar--has-dropdown" : ""}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <a href={href} style={isMobile && items ? { position: 'relative' } : undefined}>
                    <span>{text}</span>
                    {isMobile && items && (
                        <button
                            type="button"
                            className="rd-navbar-submenu-toggle"
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setIsOpen(!isOpen);
                            }}
                            aria-label="Toggle submenu"
                        >
                            <span></span>
                        </button>
                    )}
                </a>
                {
                    items &&
                    <ul className="rd-navbar-dropdown" style={{ display: isOpen ? 'block' : 'none' }}>{
                        items.map(({ hash, text }) => <MenuItem key={hash} path={path} hash={hash} text={text} />)
                    }</ul>
                }
            </li>
        )
    }

    const HeaderMenu = () => {
        return (
            <ul className="rd-navbar-nav">
                <SubMenu key="home" path="/" text="HOME" items={[
                    { hash: "home-section-what", text: "What is the Embankment?", },
                    { hash: "home-section-mission", text: "What are the Coalition's Goals?", },
                    { hash: "home-section-steps", text: "What are the Next Steps?", },
                ]} />
                <SubMenu key="about" path="/about" text="ABOUT" items={[
                    { hash: "about-section-history", text: "The History", },
                    { hash: "about-section-coalition", text: "The Coalition", },
                ]} />
                <SubMenu key="vision" path="/vision" text="OUR VISION" items={[
                    { hash: "vision-section-bigpicture", text: "Our Philosophy", },
                    { hash: "vision-section-vision", text: "Harsimus Branch Vision", },
                    { hash: "vision-section-crossroads", text: "Jersey City Greenways", },
                    { hash: "vision-section-art", text: "Art for a Sustainable Future", },
                ]} />
                <SubMenu key="involved" path="/involved" text="GET INVOLVED" items={[
                    { hash: becomeMemberId, text: "Become a Member!", },
                    { hash: volunteerId, text: "Volunteer", },
                    { hash: donateId, text: "Donate", },
                    { hash: partnersId, text: "Our Partners", },
                ]} />
                <SubMenu key="news" path="/news" text="NEWS + EVENTS" items={[
                    { hash: newsId, text: "News + Press", },
                    { hash: "news-section-subscribe", text: "Subscribe", },
                ]} />
                <SubMenu key="donate" path="/involved" hash={donateId} text="DONATE" />
                <SubMenu key="sponsors" path="/involved" hash={sponsorsId} text="SPONSORS" />
            </ul>
        )
    }

    const layoutClass = isMobile ? 'rd-navbar-fixed' : 'rd-navbar-static';
    const stuckClass = (isSticky || navStuck) ? 'rd-navbar--is-stuck' : '';

    return (
        <>
            {isMobileMenuOpen && (
                <div
                    className={navStyles.mobileOverlay}
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}
            <div className={`rd-navbar-wrap ${navStyles.navbarWrap}`}>
                <nav
                    className={`rd-navbar rd-navbar-default rd-atata rd-navbar-transparent ${layoutClass} ${stuckClass} ${navStuck ? navStyles["navbar-force-stuck"] : ""}`}
                >
                    <div className={`rd-navbar-inner ${navStuck ? navStyles["rd-navbar-inner"] : ""}`}>
                        {/* RD Navbar Panel */}
                        <div className="rd-navbar-panel">
                            {/* RD Navbar Toggle */}
                            <button
                                className={`rd-navbar-toggle ${isMobileMenuOpen ? 'active' : ''}`}
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            >
                                <span />
                            </button>
                            {/* Navbar Brand */}
                            <Brand className="rd-navbar-brand" />
                        </div>
                        <div className="rd-navbar-menu-wrap">
                            <div className={`rd-navbar-nav-wrap ${isMobileMenuOpen ? 'active' : ''}`}>
                                <div className="rd-navbar-mobile-scroll">
                                    <Brand className="rd-navbar-mobile-brand" />
                                    <HeaderMenu />
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </>
    );
}
