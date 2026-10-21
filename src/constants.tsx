import { Lightbulb, Wrench, Droplets, Zap } from 'lucide-react';
import { ServiceItem } from './types';
import { OPENING_HOURS } from './siteData';

export { CONTACT_INFO } from './siteData';

const HOURS = `${OPENING_HOURS.opens} – ${OPENING_HOURS.closes}`;

export const TRANSLATIONS = {
  zh: {
    nav: {
      services: "维修项目",
      gallery: "工程案例",
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
    services: {
      sectionTitle: "我们的服务",
      mainTitle: "住家与店屋维修安装",
      description: "身为新山电工与水喉团队，我们承接所有住家与店屋的电力维修和水喉工程，提供安全、可靠的解决方案。",
      items: [
        { title: "电力维修", description: "若电箱容量不足，我们提供更换与升级配电箱 (DB Box) 服务。", icon: Zap },
        { title: "电器配件安装", description: "安装各类风扇、插头 (Socket)、更换开关 (Switch)、以及住家与店屋的灯具照明安装。", icon: Lightbulb },
        { title: "水喉管道工程", description: "全屋基本水喉维修，走/安装水管 (Piping)，更换蓄水箱 (Tangki)，以及解决水压和漏水问题。", icon: Wrench },
        { title: "卫浴设备安装", description: "安装马桶、洗手盆 (Basin)、热水器 (Water Heater)，确保安装稳固且不漏水。", icon: Droplets }
      ] as ServiceItem[]
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
    contact: {
      title: "联系我们",
      subtitle: "准备开始您的工程或需要维修？",
      callOrWhatsapp: "致电或 WhatsApp",
      serviceArea: "服务范围",
      covering: "主要覆盖区域",
      chatButton: "WhatsApp 联系我们",
      hours: `营业时间：每天 ${HOURS}`,
      response: "营业时间内保证快速回复"
    },
    whatsappMessage: "你好，我想咨询电工/水喉服务。",
    footer: { rights: "版权所有。" },
    floating: { chat: "立即咨询", ariaLabel: "WhatsApp 咨询" }
  },
  en: {
    nav: {
      services: "Services",
      gallery: "Gallery",
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
    services: {
      sectionTitle: "What We Do",
      mainTitle: "Residential & Commercial Services",
      description: "We undertake all electrical repair and plumbing works for homes and shop lots, providing reliable solutions.",
      items: [
        { title: "Electrical Repair", description: "We upgrade Distribution Boards (DB Box) and fix circuit breakers.", icon: Zap },
        { title: "Electrical Installations", description: "Professional installation of ceiling fans, water heaters, wall sockets, switches, and LED lighting fixtures for homes and offices.", icon: Lightbulb },
        { title: "Plumbing & Piping Works", description: "Complete plumbing solutions: Leak detection, pipe installation/re-piping, poly pipe replacement, and water tank (Tangki) services.", icon: Wrench },
        { title: "Sanitary & Bathroom Installation", description: "Installation of toilets (WC), wash basins, bidets, sinks, and instant/storage water heaters with safety checks.", icon: Droplets }
      ] as ServiceItem[]
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
    contact: {
      title: "Get In Touch",
      subtitle: "Ready to start your project or need a repair?",
      callOrWhatsapp: "Call or WhatsApp",
      serviceArea: "Service Area",
      covering: "Covering major areas in",
      chatButton: "Chat on WhatsApp",
      hours: `Open daily ${HOURS}`,
      response: "Fast response guaranteed during business hours"
    },
    whatsappMessage: "Hi, I'd like to enquire about electrical/plumbing services.",
    footer: { rights: "All rights reserved." },
    floating: { chat: "Chat Now", ariaLabel: "Chat on WhatsApp" }
  }
};
