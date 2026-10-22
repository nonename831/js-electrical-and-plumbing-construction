import { Lightbulb, Wrench, Droplets, Zap } from 'lucide-react';
import { ServiceItem } from './types';
import { OPENING_HOURS } from './siteData';

export { CONTACT_INFO } from './siteData';

// Non-breaking spaces keep "08:00 – 20:00" on one line when the text wraps
const NBSP = String.fromCharCode(160);
const HOURS = `${OPENING_HOURS.opens}${NBSP}–${NBSP}${OPENING_HOURS.closes}`;

export const TRANSLATIONS = {
  zh: {
    nav: {
      services: "维修项目",
      gallery: "工程案例",
      faq: "常见问题",
      contact: "联系我们",
      openMenu: "打开菜单",
      closeMenu: "关闭菜单",
      switchLanguage: "Switch to English",
      logoAlt: "JS 家陞电器水喉工程 Logo"
    },
    header: {
      titleLine1: "JS 家陞电器水喉工程",
      titleLine2: "",
      taglinePrefix: "拥有20年以上经验的",
      taglineSuffix: "维修服务",
      badgeExperience: "20年以上经验",
      badgeExperienceShort: "20年以上经验",
      badgeElectrical: "电力维修",
      badgePlumbing: "水喉工程",
      callUs: "立即致电"
    },
    // Facts only (no invented job counts) for the strip under the hero
    trust: [
      { value: "20+", label: "年维修经验" },
      { value: "新山", label: "主要服务地区" },
      { value: "周一至六", label: HOURS },
      { value: "电工 + 水喉", label: "一站式服务" }
    ],
    services: {
      sectionTitle: "我们的服务",
      viewWork: "查看案例",
      mainTitle: "住家与店屋维修安装",
      description: "身为新山电工与水喉团队，我们承接所有住家与店屋的电力维修和水喉工程，提供安全、可靠的解决方案。",
      items: [
        { title: "电力维修", description: "若电箱容量不足，我们提供更换与升级配电箱 (DB Box) 服务。", icon: Zap },
        { title: "电器配件安装", description: "安装各类风扇、插头 (Socket)、更换开关 (Switch)、以及住家与店屋的灯具照明安装。", icon: Lightbulb },
        { title: "水喉管道工程", description: "全屋基本水喉维修，走/安装水管 (Piping)，更换蓄水箱 (Tangki)，以及解决水压和漏水问题。", icon: Wrench },
        { title: "卫浴设备安装", description: "安装马桶、洗手盆 (Basin)、热水器 (Water Heater)，确保安装稳固且不漏水。", icon: Droplets }
      ] as ServiceItem[]
    },
    process: {
      eyebrow: "服务流程",
      title: "怎么找我们维修？",
      steps: [
        { title: "WhatsApp 联系", text: "说明问题，可以附上照片" },
        { title: "报价 + 约时间", text: "确认价格和上门时间" },
        { title: "上门施工", text: "准时上门，完工后测试" }
      ],
      cta: "WhatsApp 联系我们"
    },
    gallery: {
      eyebrow: "工程案例",
      title: "实际工程照片",
      subtitle: "真实施工记录，品质有目共睹",
      tabElectrical: "电力工程",
      tabPlumbing: "水喉工程",
      tabElectricalShort: "电力工程",
      tabPlumbingShort: "水喉工程",
      empty: "照片即将上传",
      close: "关闭",
      prev: "上一张",
      next: "下一张"
    },
    faq: {
      eyebrow: "常见问题",
      title: "维修前，你可能想知道",
      more: "还有其他问题？",
      ask: "WhatsApp 问我们",
      items: [
        { q: "周日有开工吗？", a: `周日休息。营业时间是周一至周六 ${HOURS}。` },
        { q: "你们服务哪些地区？", a: "主要在新山（Johor Bahru），包括 Skudai、Mount Austin、Bukit Indah、Tebrau、Perling 等地区。" },
        { q: "可以先发照片报价吗？", a: "可以。WhatsApp 发照片和说明问题，我们会先给你一个大概的价钱，确认后再约时间上门。" },
        { q: "上门看要收费吗？", a: "小问题通常不另收上门费，具体可以先 WhatsApp 问我们。" }
      ]
    },
    contact: {
      title: "联系我们",
      subtitle: "准备开始您的工程或需要维修？",
      callOrWhatsapp: "致电或 WhatsApp",
      serviceArea: "服务范围",
      covering: "主要覆盖区域",
      chatButton: "WhatsApp 联系我们",
      hours: `营业时间：周一至周六 ${HOURS}`,
      response: "营业时间内保证快速回复"
    },
    whatsappMessage: "你好，我想咨询电工/水喉服务。",
    phoneCopy: { copied: "号码已复制：", fallback: "请拨打 " },
    footer: { rights: "版权所有。", links: "快速链接", contact: "联系方式" },
    floating: { chat: "立即咨询", ariaLabel: "WhatsApp 咨询" }
  },
  en: {
    nav: {
      services: "Services",
      gallery: "Gallery",
      faq: "FAQ",
      contact: "Contact",
      openMenu: "Open menu",
      closeMenu: "Close menu",
      switchLanguage: "切换到中文",
      logoAlt: "JS Electrical & Plumbing Logo"
    },
    header: {
      titleLine1: "JS Electrical & Plumbing",
      titleLine2: "Construction",
      taglinePrefix: "With over 20 years of experience in",
      taglineSuffix: "Repair Services",
      badgeExperience: "20+ Years Experience",
      badgeExperienceShort: "20+ Years",
      badgeElectrical: "Electrical",
      badgePlumbing: "Plumbing",
      callUs: "Call Us Today"
    },
    trust: [
      { value: "20+", label: "years experience" },
      { value: "Johor Bahru", label: "main service area" },
      { value: "Mon – Sat", label: HOURS },
      { value: "One-stop", label: "electrical + plumbing" }
    ],
    services: {
      sectionTitle: "What We Do",
      viewWork: "See our work",
      mainTitle: "Residential & Commercial Services",
      description: "We undertake all electrical repair and plumbing works for homes and shop lots, providing reliable solutions.",
      items: [
        { title: "Electrical Repair", description: "We upgrade Distribution Boards (DB Box) and fix circuit breakers.", icon: Zap },
        { title: "Electrical Installations", description: "Professional installation of ceiling fans, water heaters, wall sockets, switches, and LED lighting fixtures for homes and offices.", icon: Lightbulb },
        { title: "Plumbing & Piping Works", description: "Complete plumbing solutions: Leak detection, pipe installation/re-piping, poly pipe replacement, and water tank (Tangki) services.", icon: Wrench },
        { title: "Sanitary & Bathroom Installation", description: "Installation of toilets (WC), wash basins, bidets, sinks, and instant/storage water heaters with safety checks.", icon: Droplets }
      ] as ServiceItem[]
    },
    process: {
      eyebrow: "How It Works",
      title: "How to get it fixed",
      steps: [
        { title: "WhatsApp us", text: "Describe the problem, photos welcome" },
        { title: "Quote + schedule", text: "Agree on price and visit time" },
        { title: "On-site job", text: "We arrive on time and test after" }
      ],
      cta: "Chat on WhatsApp"
    },
    gallery: {
      eyebrow: "Our Work",
      title: "Project Gallery",
      subtitle: "Real work, real quality",
      tabElectrical: "Electrical Works",
      tabPlumbing: "Plumbing Works",
      tabElectricalShort: "Electrical",
      tabPlumbingShort: "Plumbing",
      empty: "Photos coming soon",
      close: "Close",
      prev: "Previous image",
      next: "Next image"
    },
    faq: {
      eyebrow: "FAQ",
      title: "Good to know before we come",
      more: "Still have a question?",
      ask: "Ask us on WhatsApp",
      items: [
        { q: "Do you work on Sundays?", a: `We're closed on Sundays. Opening hours are Mon – Sat ${HOURS}.` },
        { q: "Which areas do you cover?", a: "Mainly Johor Bahru, including Skudai, Mount Austin, Bukit Indah, Tebrau, Perling and nearby areas." },
        { q: "Can I send photos for a quote first?", a: "Yes. WhatsApp us photos and a short description, we'll give you a rough price first, then book a visit." },
        { q: "Is there a call-out fee?", a: "Small jobs usually have no separate call-out fee. WhatsApp us for details." }
      ]
    },
    contact: {
      title: "Get In Touch",
      subtitle: "Ready to start your project or need a repair?",
      callOrWhatsapp: "Call or WhatsApp",
      serviceArea: "Service Area",
      covering: "Covering major areas in",
      chatButton: "Chat on WhatsApp",
      hours: `Open Mon – Sat ${HOURS}`,
      response: "Fast response guaranteed during business hours"
    },
    whatsappMessage: "Hi, I'd like to enquire about electrical/plumbing services.",
    phoneCopy: { copied: "Number copied: ", fallback: "Please call " },
    footer: { rights: "All rights reserved.", links: "Quick links", contact: "Contact" },
    floating: { chat: "Chat Now", ariaLabel: "Chat on WhatsApp" }
  }
};
