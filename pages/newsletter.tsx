import { useEffect } from "react"
import Page from "../components/page"
import { Section } from "../components/theme";

export default function Newsletter() {
    useEffect(() => {
        // Load Constant Contact archive script
        const script = document.createElement('script')
        script.src = "https://static.ctctcdn.com/js/archive-static/current/archive-static.min.js"
        script.async = true
        document.body.appendChild(script)
        return () => {
            document.body.removeChild(script)
        }
    }, [])

    return (
        <Page path="/newsletter" navStuck={true}>
            <Section id="newsletter-archive" title="Newsletter Archive" h1={true}>
                <div className="row justify-content-sm-center">
                    <div className="col-md-10 col-xl-8">
                        <p>Browse past issues of the Embankment Preservation Coalition newsletter.</p>
                        <div id="archiveList" data-archive-count="10" data-m="a07e1z6n5o90"></div>
                    </div>
                </div>
            </Section>
        </Page>
    )
}
