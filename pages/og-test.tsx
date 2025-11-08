import React from "react";
import Page from "../components/page";
import { ogMetadata as homeMetadata } from "./index";
import { ogMetadata as visionMetadata } from "./vision";
import { ogMetadata as aboutMetadata } from "./about";
import { ogMetadata as newsMetadata } from "./news";
import { ogMetadata as involvedMetadata } from "./involved";
import { ogMetadata as nowMetadata } from "./now";

const pages = [
    { path: "/", name: "Home", ...homeMetadata },
    { path: "/vision", name: "Vision", ...visionMetadata },
    { path: "/about", name: "About", ...aboutMetadata },
    { path: "/news", name: "News", ...newsMetadata },
    { path: "/involved", name: "Involved", ...involvedMetadata },
    { path: "/now", name: "Now", ...nowMetadata },
];

function OGPreview({ path, name, title, description, image }: {
    path: string
    name: string
    title: string
    description: string
    image: string
}) {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://embankment.org';
    const fullImageUrl = image.startsWith('http') ? image : `${siteUrl}${image}`;
    const fullPageUrl = `${siteUrl}${path === '/' ? '' : path}`;

    return (
        <div style={{
            border: '1px solid #ddd',
            borderRadius: '8px',
            overflow: 'hidden',
            marginBottom: '30px',
            maxWidth: '600px',
            backgroundColor: '#fff',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        }}>
            <div style={{
                backgroundColor: '#f5f5f5',
                padding: '10px 15px',
                borderBottom: '1px solid #ddd',
                fontFamily: 'monospace',
                fontSize: '14px',
                color: '#666',
            }}>
                <strong><a href={path} style={{ color: 'inherit', textDecoration: 'none' }}>{name}</a></strong> (<a href={fullPageUrl} style={{ color: '#666', textDecoration: 'none' }}>{fullPageUrl}</a>)
            </div>
            <a href={path} style={{ display: 'block', textDecoration: 'none' }}>
                <img
                    src={fullImageUrl}
                    alt={title}
                    style={{
                        width: '100%',
                        display: 'block',
                        aspectRatio: '1200/630',
                        objectFit: 'cover',
                    }}
                />
            </a>
            <div style={{ padding: '15px' }}>
                <h3 style={{
                    margin: '0 0 8px 0',
                    fontSize: '18px',
                    fontWeight: 'bold',
                }}>
                    <a href={path} style={{ color: '#1a0dab', textDecoration: 'none' }}>
                        {title}
                    </a>
                </h3>
                <p style={{
                    margin: '0',
                    fontSize: '14px',
                    color: '#545454',
                    lineHeight: '1.4',
                }}>
                    {description}
                </p>
                <div style={{
                    marginTop: '10px',
                    fontSize: '12px',
                    color: '#999',
                    fontFamily: 'monospace',
                }}>
                    <a href={fullImageUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#999', textDecoration: 'none' }}>
                        {fullImageUrl}
                    </a>
                </div>
            </div>
        </div>
    );
}

export default function OGTestPage() {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://embankment.org';

    return (
        <Page path="og-test" title="OG Metadata Test" navStuck={true}>
            <section className="section section-66 section-sm-top-124 section-sm-bottom-110">
                <div className="container">
                    <h1>Open Graph Metadata Test</h1>
                    <p style={{ marginBottom: '30px', fontSize: '16px', color: '#666' }}>
                        Building for: <strong>{siteUrl}</strong>
                    </p>
                    <p style={{ marginBottom: '30px', fontSize: '14px', color: '#999' }}>
                        These are mock social media previews showing how links will appear when shared on platforms like Signal, WhatsApp, Facebook, Twitter, etc.
                    </p>

                    {pages.map(page => (
                        <OGPreview key={page.path} {...page} />
                    ))}
                </div>
            </section>
        </Page>
    );
}
