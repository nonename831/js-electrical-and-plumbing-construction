// Single source of truth for business info and SEO metadata.
// Kept free of React/icon imports so vite.config.ts can use it at build time
// (static <head> tags, sitemap) while Seo.tsx reuses it on language switch.
import type { Language } from './types';

export const SITE_URL = 'https://nonename831.github.io/js-electrical-and-plumbing-construction/';
export const LOGO_URL = `${SITE_URL}assets/images/logo.png`;
export const OG_IMAGE_URL = `${SITE_URL}assets/images/og-cover.jpg`;

export const BUSINESS_NAME: Record<Language, string> = {
  zh: 'JS 家陞电器水喉工程',
  en: 'JS Electrical & Plumbing Construction',
};

export const CONTACT_INFO = {
  phone: '+6016-763 9639',
  telUrl: 'tel:+60167639639',
  whatsappUrl: 'https://wa.me/60167639639',
  contactName: 'Jason',
  area: 'Johor Bahru',
};

export const OPENING_HOURS = { opens: '08:00', closes: '20:00' };

export const AREAS_SERVED = [
  'Johor Bahru', 'Skudai', 'Mount Austin', 'Bukit Indah',
  'Tebrau', 'Perling', 'Kulai', 'Masai', 'Pasir Gudang',
  'Kempas', 'Permas Jaya', 'Johor Jaya',
];

export const SEO_TEXT: Record<Language, { title: string; description: string; keywords: string; locale: string; htmlLang: string }> = {
  zh: {
    title: 'JS 家陞电器水喉工程 | 新山电工 · 新山水喉 · JB电工水喉维修',
    description: '新山电工、新山水喉师傅，20年经验。电器安装、水管漏水修复、热水器安装、配电箱(DB Box)升级，JB做电做水喉都找我们。服务 Skudai、Mount Austin、Bukit Indah、Perling 等 JB 地区。立即联系 Jason：+6016-763 9639',
    keywords: '新山电工, 新山水喉, JB电工, JB做电, 新山水电工, 新山维修, 柔佛新山拉电, 新山装修拉电, 水喉佬 Johor, 热水器安装, 安装热水器, 换水箱, 跳电维修, JB 跳电维修, 水管漏水, 厕所漏水, 厨房塞, 配电箱升级, 家陞电器, JB Electrician, JB Plumber, Johor Bahru Electrician, water heater installation JB, power trip JB, water leak repair, DB box upgrade, Skudai electrician, Mount Austin plumber, Bukit Indah, Perling, Kulai, Taman Daya, Austin Heights, Eco Botanic, JS Electrical',
    locale: 'zh_MY',
    htmlLang: 'zh-MY',
  },
  en: {
    title: 'JS Electrical & Plumbing | Electrician & Plumber in Johor Bahru',
    description: 'Trusted Electrician & Plumber in Johor Bahru (JB). 20+ years fixing wiring, water leaks, and installing water heaters/fans. Serving Skudai, Mount Austin, Bukit Indah, Perling, Kempas, Permas Jaya & surrounding areas. Call Jason now.',
    keywords: 'Johor Bahru Electrician, JB Plumber, Electrical Wiring JB, Water Heater Installation, JS Electrical, Skudai Electrician, Mount Austin Plumber, Toilet Repair JB, Emergency Electrician Johor, Taman Daya, Austin Heights, Eco Botanic',
    locale: 'en_MY',
    htmlLang: 'en-MY',
  },
};

const NAV_ITEMS: Record<Language, { name: string; description: string; url: string }[]> = {
  zh: [
    { name: '维修项目', description: '查看我们的电器与水喉维修服务项目', url: `${SITE_URL}#services` },
    { name: '工程案例', description: '查看我们的实际工程照片', url: `${SITE_URL}#gallery` },
    { name: '联系我们', description: '获取联系方式与服务区域', url: `${SITE_URL}#contact` },
    { name: 'WhatsApp', description: '立即在线咨询', url: CONTACT_INFO.whatsappUrl },
  ],
  en: [
    { name: 'Services', description: 'View our electrical and plumbing repair services', url: `${SITE_URL}#services` },
    { name: 'Gallery', description: 'View our project photos', url: `${SITE_URL}#gallery` },
    { name: 'Contact', description: 'Get contact details and service areas', url: `${SITE_URL}#contact` },
    { name: 'WhatsApp', description: 'Chat with us on WhatsApp instantly', url: CONTACT_INFO.whatsappUrl },
  ],
};

export function buildJsonLd(language: Language) {
  const other: Language = language === 'zh' ? 'en' : 'zh';
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['HomeAndConstructionBusiness', 'Electrician', 'Plumber'],
        '@id': `${SITE_URL}#localbusiness`,
        name: BUSINESS_NAME[language],
        alternateName: BUSINESS_NAME[other],
        image: [LOGO_URL],
        logo: LOGO_URL,
        description: SEO_TEXT[language].description,
        url: SITE_URL,
        telephone: CONTACT_INFO.phone,
        sameAs: [CONTACT_INFO.whatsappUrl],
        hasMap: `https://www.google.com/maps/search/${encodeURIComponent(`${BUSINESS_NAME.zh} Johor Bahru`)}`,
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Johor Bahru',
          addressRegion: 'Johor',
          addressCountry: 'MY',
        },
        geo: { '@type': 'GeoCoordinates', latitude: '1.4927', longitude: '103.7414' },
        openingHoursSpecification: [{
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          ...OPENING_HOURS,
        }],
        areaServed: AREAS_SERVED.map(name => ({ '@type': 'City', name })),
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}#website`,
        url: SITE_URL,
        name: BUSINESS_NAME[language],
        publisher: { '@id': `${SITE_URL}#localbusiness` },
      },
      {
        '@type': 'ItemList',
        itemListElement: NAV_ITEMS[language].map((item, i) => ({
          '@type': 'SiteNavigationElement',
          position: i + 1,
          ...item,
        })),
      },
    ],
  };
}

// [attribute, key, value] triples for every language-dependent or static meta tag.
export function buildMetaTags(language: Language): [string, string, string][] {
  const seo = SEO_TEXT[language];
  return [
    ['name', 'description', seo.description],
    ['name', 'keywords', seo.keywords],
    ['property', 'og:type', 'website'],
    ['property', 'og:title', seo.title],
    ['property', 'og:description', seo.description],
    ['property', 'og:image', OG_IMAGE_URL],
    ['property', 'og:image:secure_url', OG_IMAGE_URL],
    ['property', 'og:image:type', 'image/jpeg'],
    ['property', 'og:image:width', '1200'],
    ['property', 'og:image:height', '630'],
    ['property', 'og:image:alt', seo.title],
    ['property', 'og:url', SITE_URL],
    ['property', 'og:site_name', BUSINESS_NAME.zh],
    ['property', 'og:locale', seo.locale],
    ['name', 'twitter:card', 'summary_large_image'],
    ['name', 'twitter:title', seo.title],
    ['name', 'twitter:description', seo.description],
    ['name', 'twitter:image', OG_IMAGE_URL],
  ];
}
