/*
  site.js — central content for the Monday marketing site.
  Imported by sections (Hero, Process, Results, AuditForm), pages, Navbar,
  Footer and the AdMarquee. Keep all user facing copy free of dashes.
  No data files / no schemas. Instruction: build the Monday agency marketing site.
*/

export const SITE = {
  name: "Monday",
  fullName: "Scale with Monday",
  email: "help@scalewithmonday.com",
  location: "Vilnius, Lithuania",
  url: "https://scalewithmonday.com",
};

export const NAV_LINKS = [
  { to: "/", label: "Home", end: true },
  { to: "/about", label: "About" },
  { to: "/contacts", label: "Contacts" },
];

export const FOOTER_COLUMNS = [
  {
    title: "Company",
    links: [
      { label: "About", to: "/about" },
      { label: "Contacts", to: "/contacts" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", to: "/privacy" },
      { label: "Terms of Service", to: "/terms" },
      { label: "Refund Policy", to: "/refund" },
    ],
  },
  {
    title: "More",
    links: [
      { label: "Careers", to: "/careers" },
      { label: "Become an Affiliate", to: "/affiliate" },
    ],
  },
];

export const PROCESS_STEPS = [
  {
    n: "01",
    title: "Strategy, handled",
    body: "Your dedicated growth lead who connects the dots across every channel and owns the number.",
    tags: ["Channel planning", "Owned KPIs", "Weekly reviews"],
  },
  {
    n: "02",
    title: "Media buying, optimized",
    body: "A numbers game built on great creative. Tight feedback loops between buyers and the creative team.",
    tags: ["Meta ads", "Scaling", "ROAS focus"],
  },
  {
    n: "03",
    title: "Creatives, produced",
    body: "Forget scripting, briefing, and revisions. We handle the entire creative pipeline end to end.",
    tags: ["Concepts", "Production", "Iteration"],
  },
];

// `num` drives the scroll into view count up; `v` is the exact display fallback.
export const KPIS = [
  { v: "8.21", l: "peak average ROAS", num: { value: 8.21, decimals: 2 } },
  { v: "74k+", l: "extra revenue generated", num: { value: 74, suffix: "k+" } },
  { v: "2,404", l: "tracked purchases", num: { value: 2404, group: true } },
  {
    v: "€13.58",
    l: "blended cost per result",
    num: { value: 13.58, prefix: "€", decimals: 2 },
  },
];

export const RESULTS_TABLE_A = {
  title: "Recent paid social performance",
  caption:
    "One brand, seven scaling windows. Spend climbs while cost per result stays controlled.",
  columns: [
    "Amount spent",
    "Purchase ROAS",
    "Conversion value",
    "Results",
    "Cost per result",
  ],
  rows: [
    ["€1,957.31", "1.33", "€2,603.22", "94", "€20.82"],
    ["€2,072.97", "2.03", "€4,208.13", "150", "€13.82"],
    ["€2,281.93", "4.82", "€10,998.90", "282", "€8.09"],
    ["€4,136.17", "2.22", "€9,182.30", "319", "€12.97"],
    ["€5,463.39", "2.19", "€11,964.82", "413", "€13.23"],
    ["€7,903.41", "2.20", "€17,387.50", "526", "€15.03"],
    ["€8,836.16", "2.01", "€17,773.67", "620", "€14.25"],
  ],
  total: ["€32,651.34", "2.27", "€74,118.54", "2,404", "€13.58"],
};

export const RESULTS_TABLE_B = {
  title: "Another brand, same playbook",
  caption: "Early campaigns compounding into a blended ROAS above eight.",
  columns: ["Amount spent", "Status", "Purchase ROAS", "Conversion value"],
  rows: [
    ["€221.93", "Ongoing", "11.53", "€2,558.85"],
    ["€221.53", "Ongoing", "7.06", "€1,564.00"],
    ["€224.29", "Ongoing", "6.03", "€1,352.47"],
    ["€690.03", "Ongoing", "8.22", "€5,672.05"],
  ],
  total: ["€1,357.78", "", "8.21", "€11,147.37"],
};

// Form select options for the growth audit request.
export const FORM_OPTIONS = {
  spend: ["Under 5k", "5k to 20k", "20k to 50k", "50k plus"],
  revenue: ["Under 25k", "25k to 100k", "100k to 500k", "500k plus"],
  goal: [
    "Scale paid ads",
    "Improve ROAS",
    "Creative production",
    "Email and retention",
    "Full stack growth",
  ],
};

// Avatars use an initials monogram for now. Drop a real photo in later by
// adding a `photo` path to a member and rendering it in the team card.
export const TEAM = [
  {
    name: "Aronas Antanaitis",
    role: "Co founder",
    initials: "AA",
    tint: "orange",
    bio: "Aronas leads growth strategy and media buying. He has spent years turning ad spend into real profit for eCommerce brands and owns the number on every account he touches.",
  },
  {
    name: "Nikas Kazlauskas",
    role: "Co founder",
    initials: "NK",
    tint: "ink",
    bio: "Nikas runs performance and operations. He keeps strategy, media, and creative moving as one tight team so nothing falls through the cracks between plan and execution.",
  },
  {
    name: "Ignas Zakalskis",
    role: "Head of creatives",
    initials: "IZ",
    tint: "cream",
    bio: "Ignas leads the creative engine. Concepts, scripts, and edits that stop the scroll and earn their spend, produced in house at the volume scaling demands.",
  },
];

// 37 real ad creatives served from /public/scroller. Displayed at a fixed row
// height with natural width inside the marquee. Distributed across three rows.
export const CREATIVES = Array.from({ length: 37 }, (_, i) => ({
  id: i + 1,
  src: `/scroller/${i + 1}.webp`,
}));

// Three balanced rows for the marquee (13, 12, 12).
export const CREATIVE_ROWS = [
  CREATIVES.slice(0, 13),
  CREATIVES.slice(13, 25),
  CREATIVES.slice(25, 37),
];

// What we do, services grid.
export const SERVICES = [
  {
    title: "Paid social",
    body: "Meta and TikTok buying that scales spend while protecting the margin. Daily optimization, not set and forget.",
  },
  {
    title: "Creative production",
    body: "Concepts, scripts, and edits produced in house. Volume and quality, tested fast so winners surface early.",
  },
  {
    title: "Email and retention",
    body: "Flows and campaigns that turn first orders into repeat revenue. The unglamorous engine behind real growth.",
  },
  {
    title: "Landing pages",
    body: "Conversion focused pages built to match the ad and close the sale. Speed, clarity, and proof in every fold.",
  },
  {
    title: "Growth strategy",
    body: "One lead who owns the number and connects every channel. You always know what is working and what is next.",
  },
  {
    title: "Analytics and tracking",
    body: "Clean measurement so decisions follow data. Server side tracking and reporting you can actually trust.",
  },
];

// Why Monday, differentiators.
export const DIFFERENTIATORS = [
  {
    title: "We scaled our own brands first",
    body: "Before we ever touched your account we built and grew our own. We run yours with the same skin in the game.",
  },
  {
    title: "Creative and media under one roof",
    body: "No briefing a separate agency. Buyers and creatives sit together, so feedback loops are measured in hours.",
  },
  {
    title: "Senior people, no handoffs",
    body: "You work with the people doing the work. No junior account manager passing messages along.",
  },
  {
    title: "Built on numbers, not vibes",
    body: "Every concept earns its spend and every decision ties back to ROAS and contribution margin.",
  },
];

// Trust strip stats.
export const TRUST_STATS = [
  { v: "8.21", l: "peak average ROAS", num: { value: 8.21, decimals: 2 } },
  { v: "74k+", l: "extra revenue generated", num: { value: 74, suffix: "k+" } },
  { v: "2,404", l: "tracked purchases", num: { value: 2404, group: true } },
  { v: "100%", l: "senior team, no handoffs", num: { value: 100, suffix: "%" } },
];

// Testimonial / case highlight.
export const TESTIMONIAL = {
  quote:
    "Monday felt like an in house team from day one. Spend tripled and the margin held. The creative pipeline alone changed how fast we move.",
  name: "Founder",
  role: "Scaling DTC apparel brand",
};

// FAQ.
export const FAQS = [
  {
    q: "Who do you work best with?",
    a: "Established eCommerce DTC brands doing meaningful revenue who want to scale paid social without losing control of margin. If you are pre revenue we are likely too early for you.",
  },
  {
    q: "How is Monday different from a typical agency?",
    a: "Media buying and creative live under one roof, you work directly with senior people, and we built our own brands first. Decisions are driven by numbers, not vibes.",
  },
  {
    q: "How quickly will we see results?",
    a: "Most brands see meaningful signal within the first weeks as we test creative and tighten the account. Compounding growth follows as winners scale.",
  },
  {
    q: "What does the free growth audit include?",
    a: "We review your account, creative, and funnel, then show you exactly where the opportunity is and how we would scale it. No commitment and no pressure.",
  },
  {
    q: "Where are you based?",
    a: "We are based in Vilnius and work with brands across Europe and beyond, fully remote.",
  },
];

// About page values.
export const VALUES = [
  {
    title: "Own the number",
    body: "We measure ourselves by your growth, not by hours logged or decks shipped.",
  },
  {
    title: "Move fast, stay sharp",
    body: "Tight loops between creative and media mean we learn and adjust in days, not months.",
  },
  {
    title: "Honest by default",
    body: "If something is not working we say so. You always get the real picture.",
  },
  {
    title: "Quality compounds",
    body: "Great creative and clean tracking pay off again and again. We build for the long run.",
  },
];
