import React, { useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { CONTACT_INFO } from '../constants';

declare global {
    interface Window {
        dataLayer: any[];
        gtag: (...args: any[]) => void;
    }
}

const SITE_URL = 'https://nonename831.github.io/js-electrical-and-plumbing-construction/assets/images';
const LOGO_URL = `${SITE_URL}/logo.png`;

export const SEO: React.FC = () => {
    const { t, language } = useLanguage();

    useEffect(() => {
        // --- Helper ---
        const updateMeta = (selector: string, attribute: string, value: string) => {
            let el = document.querySelector(selector);
            if (!el) {
                el = document.createElement('meta');
                if (selector.startsWith('meta[name=')) {
                    const name = selector.match(/name="([^"]+)"/)?.[1];
                    if (name) el.setAttribute('name', name);
                } else if (selector.startsWith('meta[property=')) {
                    const prop = selector.match(/property="([^"]+)"/)?.[1];
                    if (prop) el.setAttribute('property', prop);
                }
                document.head.appendChild(el);
            }
            el.setAttribute(attribute, value);
        };

        // --- Document ---
        document.title = t.seo.title;
        document.documentElement.lang = language === 'zh' ? 'zh-MY' : 'en-MY';

        // --- Core Meta ---
        updateMeta('meta[name="description"]', 'content', t.seo.description);
        updateMeta('meta[name="keywords"]', 'content', t.seo.keywords);
        updateMeta('meta[name="robots"]', 'content', 'index, follow');
        updateMeta('meta[name="format-detection"]', 'content', 'telephone=yes');

        // --- Canonical ---
        let canonical = document.querySelector('link[rel="canonical"]');
        if (!canonical) {
            canonical = document.createElement('link');
            canonical.setAttribute('rel', 'canonical');
            document.head.appendChild(canonical);
        }
        canonical.setAttribute('href', SITE_URL + '/');

        // --- Open Graph ---
        // ✅ 修复：zh_MY 而不是 zh_CN
        const ogLocale = language === 'zh' ? 'zh_MY' : 'en_MY';
        updateMeta('meta[property="og:title"]', 'content', t.seo.title);
        updateMeta('meta[property="og:description"]', 'content', t.seo.description);
        updateMeta('meta[property="og:url"]', 'content', SITE_URL + '/');
        updateMeta('meta[property="og:locale"]', 'content', ogLocale);
        updateMeta('meta[property="og:site_name"]', 'content', 'JS 家陞电器水喉工程');
        updateMeta('meta[property="og:type"]', 'content', 'website');
        updateMeta('meta[property="og:image"]', 'content', LOGO_URL);
        updateMeta('meta[property="og:image:width"]', 'content', '512');
        updateMeta('meta[property="og:image:height"]', 'content', '512');
        updateMeta('meta[property="og:image:alt"]', 'content', t.seo.title);

        // --- Twitter ---
        updateMeta('meta[name="twitter:card"]', 'content', 'summary_large_image');
        updateMeta('meta[name="twitter:title"]', 'content', t.seo.title);
        updateMeta('meta[name="twitter:description"]', 'content', t.seo.description);
        updateMeta('meta[name="twitter:image"]', 'content', LOGO_URL);

        // --- JSON-LD ---
        const businessName = language === 'zh'
            ? 'JS 家陞电器水喉工程'
            : 'JS Electrical & Plumbing Construction';

        const jsonLd = {
            '@context': 'https://schema.org',
            '@graph': [
                {
                    '@type': ['HomeAndConstructionBusiness', 'Electrician', 'Plumber'],
                    '@id': SITE_URL + '/#localbusiness',
                    'name': businessName,
                    'alternateName': language === 'zh'
                        ? 'JS Electrical & Plumbing Construction'
                        : 'JS 家陞电器水喉工程',
                    'image': [LOGO_URL],
                    'logo': LOGO_URL,
                    'description': t.seo.description,
                    'url': SITE_URL + '/',
                    'telephone': CONTACT_INFO.phone,
                    'priceRange': 'RM 80 - RM 1000+',
                    'sameAs': [CONTACT_INFO.whatsappUrl],
                    'hasMap': 'https://www.google.com/maps/search/JS+家陞电器水喉工程+Johor+Bahru',
                    'address': {
                        '@type': 'PostalAddress',
                        'addressLocality': 'Johor Bahru',
                        'addressRegion': 'Johor',
                        'addressCountry': 'MY',
                    },
                    'geo': {
                        '@type': 'GeoCoordinates',
                        'latitude': '1.4927',
                        'longitude': '103.7414',
                    },
                    'openingHoursSpecification': [{
                        '@type': 'OpeningHoursSpecification',
                        'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                        'opens': '08:00',
                        'closes': '20:00',
                    }],
                    'areaServed': [
                        'Johor Bahru', 'Skudai', 'Mount Austin', 'Bukit Indah',
                        'Tebrau', 'Perling', 'Kulai', 'Masai', 'Pasir Gudang',
                        'Kempas', 'Permas Jaya', 'Johor Jaya',
                    ].map(name => ({ '@type': 'City', name })),
                },
                {
                    '@type': 'WebSite',
                    '@id': SITE_URL + '/#website',
                    'url': SITE_URL + '/',
                    'name': businessName,
                    'publisher': { '@id': SITE_URL + '/#localbusiness' },
                },
                {
                    '@type': 'ItemList',
                    'itemListElement': [
                        {
                            '@type': 'SiteNavigationElement',
                            'position': 1,
                            'name': t.nav.services,
                            'description': language === 'zh'
                                ? '查看我们的电器与水喉维修服务项目'
                                : 'View our electrical and plumbing repair services',
                            'url': SITE_URL + '/#services',
                        },
                        {
                            '@type': 'SiteNavigationElement',
                            'position': 2,
                            'name': t.nav.contact,
                            'description': language === 'zh'
                                ? '获取联系方式与服务区域'
                                : 'Get contact details and service areas',
                            'url': SITE_URL + '/#contact',
                        },
                        {
                            '@type': 'SiteNavigationElement',
                            'position': 3,
                            'name': 'WhatsApp',
                            'description': language === 'zh'
                                ? '立即在线咨询'
                                : 'Chat with us on WhatsApp instantly',
                            'url': CONTACT_INFO.whatsappUrl,
                        },
                    ],
                },
            ],
        };

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
