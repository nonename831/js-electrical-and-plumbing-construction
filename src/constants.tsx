import { Lightbulb, Wrench, Droplets, Zap } from 'lucide-react';
import { ServiceItem } from './types';

export const CONTACT_INFO = {
  phone: "+6016-763 9639",
  whatsappUrl: "https://wa.me/60167639639",
  contactName: "Jason",
  area: "Johor Bahru"
};

export const TRANSLATIONS = {
  zh: {
    seo: {
      title: "JS 家陞电器水喉工程 | 新山电工 · 新山水喉 · JB电工水喉维修",
      description: "新山电工、新山水喉师傅，20年经验。电器安装、水管漏水修复、热水器安装、配电箱(DB Box)升级，JB做电做水喉都找我们。服务 Skudai、Mount Austin、Bukit Indah、Perling 等 JB 地区。立即联系 Jason：+6016-763 9639",
      keywords: "新山电工, 新山水喉, JB电工, JB做电, 新山维修, 新山水电工, JB plumber, JB electrician, 柔佛新山拉电, 换水箱, 安装热水器, JB 跳电维修, 家陞电器, 水喉佬 Johor, 厕所漏水, 厨房塞, 新山装修拉电, Taman Daya, Austin Heights, Eco Botanic"
    },
    nav: {
      services: "维修项目",
      contact: "联系我们"
    },
    header: {
      titleLine1: "JS 家陞电器水喉工程",
      titleLine2: "",
      taglinePrefix: "拥有20年以上经验的",
      taglineSuffix: "维修服务",
      badgeExperience: "20年以上经验",
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
    contact: {
      title: "联系我们",
      subtitle: "准备开始您的工程或需要维修？",
      callOrWhatsapp: "致电或 WhatsApp",
      serviceArea: "服务范围",
      covering: "主要覆盖区域",
      chatButton: "WhatsApp 联系我们",
      response: "营业时间内保证快速回复"
    },
    footer: { rights: "版权所有。" },
    floating: { chat: "立即咨询" }
  },
  en: {
    seo: {
      title: "JS Electrical & Plumbing | Electrician & Plumber in Johor Bahru",
      description: "Trusted Electrician & Plumber in Johor Bahru (JB). 20+ years fixing wiring, water leaks, and installing water heaters/fans. Serving Skudai, Mount Austin, Bukit Indah, Perling, Kempas, Permas Jaya & surrounding areas. Call Jason now.",
      keywords: "Johor Bahru Electrician, JB Plumber, Electrical Wiring JB, Water Heater Installation, JS Electrical, Skudai Electrician, Mount Austin Plumber, Toilet Repair JB, Emergency Electrician Johor, Taman Daya, Austin Heights, Eco Botanic"
    },
    nav: {
      services: "Services",
      contact: "Contact"
    },
    header: {
      titleLine1: "JS Electrical & Plumbing",
      titleLine2: "Construction",
      taglinePrefix: "With over 20 years of experience in",
      taglineSuffix: "Repair Services",
      badgeExperience: "20+ Years Experience",
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
    contact: {
      title: "Get In Touch",
      subtitle: "Ready to start your project or need a repair?",
      callOrWhatsapp: "Call or WhatsApp",
      serviceArea: "Service Area",
      covering: "Covering major areas in",
      chatButton: "Chat on WhatsApp",
      response: "Fast response guaranteed during business hours"
    },
    footer: { rights: "All rights reserved." },
    floating: { chat: "Chat Now" }
  }
};