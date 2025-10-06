import Page from "../components/page"
import Script from 'next/script'
import { Section } from "../components/theme";

export async function getStaticProps(context: any) {
    return {
        props: {},
    }
}

export default function Newsletter() {
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
            <Script
                id="archiveScript"
                src="https://static.ctctcdn.com/js/archive-static/current/archive-static.min.js"
                strategy="afterInteractive"
            />
        </Page>
    )
}
