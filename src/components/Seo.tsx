import React, { useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { SEO_TEXT, buildJsonLd, buildMetaTags } from '../siteData';

// index.html ships the zh tags at build time; this keeps them in sync
// when the visitor switches language.
export const SEO: React.FC = () => {
    const { language } = useLanguage();

    useEffect(() => {
        const seo = SEO_TEXT[language];
        document.title = seo.title;
        document.documentElement.lang = seo.htmlLang;

        for (const [attr, key, value] of buildMetaTags(language)) {
            let el = document.head.querySelector(`meta[${attr}="${key}"]`);
            if (!el) {
                el = document.createElement('meta');
                el.setAttribute(attr, key);
                document.head.appendChild(el);
            }
            el.setAttribute('content', value);
        }

        let script = document.head.querySelector('script[type="application/ld+json"]');
        if (!script) {
            script = document.createElement('script');
            script.setAttribute('type', 'application/ld+json');
            document.head.appendChild(script);
        }
        script.textContent = JSON.stringify(buildJsonLd(language));
    }, [language]);

    return null;
};
