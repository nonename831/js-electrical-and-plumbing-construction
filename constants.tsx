import { Lightbulb, Wrench, Droplets, Zap } from 'lucide-react';
import { ServiceItem, PricingItem } from './types';

// ==========================================
// CONFIGURATION
// ==========================================

// 1. Go to analytics.google.com
// 2. Create an account and get your "Measurement ID" (starts with G-)
// 3. Paste it below. Example: "G-123456789"
export const GOOGLE_ANALYTICS_ID = "G-JM8LSQLCNK";

export const CONTACT_INFO = {
  phone: "+6016-763 9639",
  whatsappUrl: "https://wa.me/60167639639",
  contactName: "Jason",
  area: "Johor Bahru"
};

export const TRANSLATIONS = {
  zh: {
    seo: {
      title: "JS 家陞电器水喉工程 | 新山 JB 电器与水喉维修服务",
      description: "新山(Johor Bahru)电器与水喉维修专家。安装风扇热水器、水管漏水维修与通阻塞服务。服务范围：Skudai, Mount Austin, Bukit Indah, Perling, Kempas, Permas Jaya, Johor Jaya。立即联系 Jason。",
      keywords: "新山维修, 新山水电工, JB plumber, JB electrician, 柔佛新山拉电, 换水箱, 安装热水器, JB 跳电维修, 家陞电器, 水喉佬 Johor, 厕所漏水, 厨房塞, 新山装修拉电, Taman Daya, Austin Heights, Eco Botanic"
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
      description: "我们承接所有住家与店屋的电力维修和水喉工程，提供安全、可靠的解决方案。",
      items: [
        {
          title: "电力维修",
          description: "若电箱容量不足，我们提供更换与升级配电箱 (DB Box) 服务。",
          icon: Zap
        },
        {
          title: "电器配件安装",
          description: "安装各类风扇、插头 (Socket)、更换开关 (Switch)、以及住家与店屋的灯具照明安装。",
          icon: Lightbulb
        },
        {
          title: "水喉管道工程",
          description: "全屋基本水喉维修，走/安装水管 (Piping)，更换蓄水箱 (Tangki)，以及解决水压和漏水问题。",
          icon: Wrench
        },
        {
          title: "卫浴设备安装",
          description: "安装马桶、洗手盆 (Basin)、热水器 (Water Heater)，确保安装稳固且不漏水。",
          icon: Droplets
        }
      ] as ServiceItem[]
    },
    pricing: {
      sectionTitle: "服务价格",
      description: "透明公正的收费标准，为您提供物超所值的专业服务。",
      from: "起",
      professional: "专业认证",
      items: [
        {
          title: "基本维修与检查",
          description: "上门检查电力故障、跳电问题、或简单的水喉维修。",
          price: "RM 80",
          isStartingPrice: true
        },
        {
          title: "标准安装服务",
          description: "安装风扇、热水器、灯具、或者是更换插座开关。",
          price: "RM 120",
          isStartingPrice: true
        },
        {
          title: "大型工程与装修",
          description: "整间屋子拉电、重新安装水管、或配电箱升级服务。",
          price: "免费报价",
          isStartingPrice: false
        }
      ] as PricingItem[]
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
    footer: {
      rights: "版权所有。"
    },
    floating: {
      chat: "立即咨询"
    }
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
        {
          title: "Electrical Repair",
          description: "We upgrade Distribution Boards (DB Box) and fix circuit breakers.",
          icon: Zap
        },
        {
          title: "Electrical Installations",
          description: "Professional installation of ceiling fans, water heaters, wall sockets, switches, and LED lighting fixtures for homes and offices.",
          icon: Lightbulb
        },
        {
          title: "Plumbing & Piping Works",
          description: "Complete plumbing solutions: Leak detection, pipe installation/re-piping, poly pipe replacement, and water tank (Tangki) services.",
          icon: Wrench
        },
        {
          title: "Sanitary & Bathroom Installation",
          description: "Installation of toilets (WC), wash basins, bidets, sinks, and instant/storage water heaters with safety checks.",
          icon: Droplets
        }
      ] as ServiceItem[]
    },
    pricing: {
      sectionTitle: "Transparent Pricing",
      description: "Competitive rates with no hidden charges. Professional service you can trust.",
      from: "from",
      professional: "Professional",
      items: [
        {
          title: "Basic Repair & Inspection",
          description: "On-site troubleshooting for power trips, electrical faults, or minor plumbing repairs.",
          price: "RM 80",
          isStartingPrice: true
        },
        {
          title: "Standard Installation",
          description: "Installation of ceiling fans, water heaters, lights, or replacing sockets/switches.",
          price: "RM 120",
          isStartingPrice: true
        },
        {
          title: "Major Works & Renovation",
          description: "Full house wiring, re-piping works, DB box upgrades, or renovation projects.",
          price: "Free Quote",
          isStartingPrice: false
        }
      ] as PricingItem[]
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
    footer: {
      rights: "All rights reserved."
    },
    floating: {
      chat: "Chat Now"
    }
  }
};