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

        // 5. JSON-LD Structured Data (Advanced Local SEO)
        const jsonLd = {
            "@context": "https://schema.org",
            "@type": ["HomeAndConstructionBusiness", "Electrician", "Plumber"],
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
                        "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
                    ],
                    "opens": "09:00",
                    "closes": "17:00"
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
            ],
            "knowsAbout": [
                "Electrical Wiring",
                "Power Trip Repair",
                "Water Heater Installation",
                "Plumbing Leak Repair",
                "Ceiling Fan Installation"
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

    return null;
};