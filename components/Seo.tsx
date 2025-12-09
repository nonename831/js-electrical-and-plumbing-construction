import React, { useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { CONTACT_INFO, GOOGLE_ANALYTICS_ID } from '../constants';

// Add type definition for window.dataLayer
declare global {
    interface Window {
        dataLayer: any[];
        gtag: (...args: any[]) => void;
    }
}

export const SEO: React.FC = () => {
    const { t, language } = useLanguage();

    useEffect(() => {
        // 1. Update Document Title
        document.title = t.seo.title;

        // 2. Update <html> lang attribute
        document.documentElement.lang = language === 'zh' ? 'zh-MY' : 'en-MY';

        // 3. Helper function to update or create meta tags
        const updateMeta = (selector: string, attribute: string, value: string) => {
            let element = document.querySelector(selector);
            if (!element) {
                element = document.createElement('meta');

                if (selector.startsWith('meta[name=')) {
                    const name = selector.match(/name="([^"]+)"/)?.[1];
                    if (name) element.setAttribute('name', name);
                } else if (selector.startsWith('meta[property=')) {
                    const property = selector.match(/property="([^"]+)"/)?.[1];
                    if (property) element.setAttribute('property', property);
                }

                document.head.appendChild(element);
            }
            element.setAttribute(attribute, value);
        };

        // 4. Update Meta Tags
        updateMeta('meta[name="description"]', 'content', t.seo.description);
        updateMeta('meta[name="keywords"]', 'content', t.seo.keywords);
        updateMeta('meta[name="robots"]', 'content', 'index, follow');

        // Canonical Link
        let linkCanonical = document.querySelector('link[rel="canonical"]');
        if (!linkCanonical) {
            linkCanonical = document.createElement('link');
            linkCanonical.setAttribute('rel', 'canonical');
            document.head.appendChild(linkCanonical);
        }
        linkCanonical.setAttribute('href', window.location.origin + window.location.pathname);

        // Open Graph / Social
        updateMeta('meta[property="og:title"]', 'content', t.seo.title);
        updateMeta('meta[property="og:description"]', 'content', t.seo.description);
        updateMeta('meta[property="og:url"]', 'content', window.location.href);
        updateMeta('meta[property="og:locale"]', 'content', language === 'zh' ? 'zh_CN' : 'en_US');
        updateMeta('meta[property="og:site_name"]', 'content', 'JS Electrical & Plumbing');
        updateMeta('meta[property="og:type"]', 'content', 'website');

        // Twitter Card
        updateMeta('meta[name="twitter:card"]', 'content', 'summary_large_image');
        updateMeta('meta[name="twitter:title"]', 'content', t.seo.title);
        updateMeta('meta[name="twitter:description"]', 'content', t.seo.description);

        // 5. JSON-LD Structured Data (Advanced Local SEO with Sitelinks)
        const jsonLd = {
            "@context": "https://schema.org",
            "@graph": [
                {
                    "@type": ["HomeAndConstructionBusiness", "Electrician", "Plumber"],
                    "@id": window.location.origin + "/#localbusiness",
                    "name": language === 'zh' ? "JS 家陞电器水喉工程" : "JS Electrical & Plumbing Construction",
                    "image": [
                        window.location.origin + "/logo.png"
                    ],
                    "description": t.seo.description,
                    "address": {
                        "@type": "PostalAddress",
                        "addressLocality": "Johor Bahru",
                        "addressRegion": "Johor",
                        "addressCountry": "MY"
                    },
                    "geo": {
                        "@type": "GeoCoordinates",
                        "latitude": "1.4927",
                        "longitude": "103.7414"
                    },
                    "url": window.location.origin,
                    "telephone": CONTACT_INFO.phone,
                    "priceRange": "RM 80 - RM 1000+",
                    "openingHoursSpecification": [
                        {
                            "@type": "OpeningHoursSpecification",
                            "dayOfWeek": [
                                "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
                            ],
                            "opens": "08:00",
                            "closes": "20:00"
                        }
                    ],
                    "areaServed": [
                        { "@type": "City", "name": "Johor Bahru" },
                        { "@type": "City", "name": "Skudai" },
                        { "@type": "City", "name": "Mount Austin" },
                        { "@type": "City", "name": "Bukit Indah" },
                        { "@type": "City", "name": "Tebrau" },
                        { "@type": "City", "name": "Perling" },
                        { "@type": "City", "name": "Kulai" },
                        { "@type": "City", "name": "Masai" },
                        { "@type": "City", "name": "Pasir Gudang" }
                    ]
                },
                {
                    "@type": "WebSite",
                    "@id": window.location.origin + "/#website",
                    "url": window.location.origin,
                    "name": language === 'zh' ? "JS 家陞电器水喉工程" : "JS Electrical & Plumbing",
                    "publisher": {
                        "@id": window.location.origin + "/#localbusiness"
                    }
                },
                {
                    "@type": "ItemList",
                    "itemListElement": [
                        {
                            "@type": "SiteNavigationElement",
                            "position": 1,
                            "name": t.nav.services,
                            "description": language === 'zh' ? "查看我们的电器与水喉维修服务项目" : "View our electrical and plumbing repair services",
                            "url": window.location.origin + "/#services"
                        },
                        {
                            "@type": "SiteNavigationElement",
                            "position": 2,
                            "name": t.nav.contact,
                            "description": language === 'zh' ? "获取联系方式与服务区域" : "Get contact details and service areas",
                            "url": window.location.origin + "/#contact"
                        },
                        {
                            "@type": "SiteNavigationElement",
                            "position": 3,
                            "name": "WhatsApp",
                            "description": language === 'zh' ? "立即在线咨询" : "Chat with us on WhatsApp instantly",
                            "url": CONTACT_INFO.whatsappUrl
                        }
                    ]
                }
            ]
        };

        // Inject or update JSON-LD script
        let script = document.querySelector('script[type="application/ld+json"]');
        if (!script) {
            script = document.createElement('script');
            script.setAttribute('type', 'application/ld+json');
            document.head.appendChild(script);
        }
        script.textContent = JSON.stringify(jsonLd);

    }, [t, language]);

    // Google Analytics Injection
    useEffect(() => {
        if (GOOGLE_ANALYTICS_ID && !document.getElementById('ga-script')) {
            // 1. Load the script tag
            const script = document.createElement('script');
            script.id = 'ga-script';
            script.async = true;
            script.src = `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}`;
            document.head.appendChild(script);

            // 2. Configure the dataLayer
            window.dataLayer = window.dataLayer || [];
            function gtag(...args: any[]) {
                window.dataLayer.push(args);
            }
            // @ts-ignore
            gtag('js', new Date());
            // @ts-ignore
            gtag('config', GOOGLE_ANALYTICS_ID);
        }
    }, []);

    return null;
};