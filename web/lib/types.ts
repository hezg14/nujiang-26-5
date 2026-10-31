/** Every shape the dictionaries are allowed to take. */

export interface NavItem {
  label: string;
  /** "#coffee" scrolls inside the home page; "/journal" is a route. */
  href: string;
}

export interface SpecRow {
  label: string;
  value: string;
}

/** Labels for the drawn cross-section used when no photo exists. */
export interface TerrainProfile {
  peak: string;
  summit: string;
  pass: string;
  passLabel: string;
  lakes: string;
  scaleLabel: string;
  axisLabel: string;
}

export interface LandscapeItem {
  name: string;
  /** Empty only when the card renders `profile` instead of a photograph. */
  image: string;
  caption: string;
  body: string;
  profile?: TerrainProfile;
}

export interface RouteItem {
  name: string;
  distance: string;
  time: string;
  difficulty: string;
  note: string;
}

export interface DishItem {
  name: string;
  /** Same dish in the other script — set in mono, under the title. */
  alt: string;
  desc: string;
  note?: string;
}

export interface Dict {
  brand: { name: string; project: string; chinese: string; tagline: string };
  nav: NavItem[];
  meta: { title: string; description: string };
  hero: {
    origin: string;
    title: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    imageAlt: string;
    imageTag: string;
  };
  theme: {
    eyebrow: string;
    brandZh: string;
    brandEn: string;
    sloganZh: string;
    sloganEn: string;
    lead: string;
    routesTitle: string;
    routes: { zh: string; en: string; note: string }[];
    chips: string[];
  };
  coffee: {
    eyebrow: string;
    title: string;
    lead: string;
    statement: string;
    statementNote: string;
    imageCaption: string;
    bandLine: string;
    bandCaption: string;
    bandAlt: string;
    tourismTitle: string;
    tourismLead: string;
    tourism: { name: string; where: string; body: string }[];
    specs: SpecRow[];
    varietalsTitle: string;
    varietals: string[];
    industry: { value: string; label: string }[];
    industryNote: string;
    processTitle: string;
    process: { step: string; desc: string }[];
  };
  journal: {
    eyebrow: string;
    title: string;
    lead: string;
    back: string;
    backHome: string;
    sourcesLabel: string;
  };
  landscape: {
    eyebrow: string;
    title: string;
    lead: string;
    creditNote: string;
    /** Stamped on the drawn card so it never reads as a broken photo. */
    plateTag: string;
    items: LandscapeItem[];
  };
  trek: {
    eyebrow: string;
    title: string;
    lead: string;
    routes: RouteItem[];
    safety: string;
  };
  food: {
    eyebrow: string;
    title: string;
    lead: string;
    dishes: DishItem[];
    allergy: string;
    marksNote: string;
  };
  visit: {
    eyebrow: string;
    title: string;
    lead: string;
    season: string;
    permits: string;
    transport: string;
    labels: { season: string; permits: string; access: string };
    formTitle: string;
    formNote: string;
    name: string;
    email: string;
    message: string;
    submit: string;
    sending: string;
    replyNote: string;
    success: string;
    successTitle: string;
    again: string;
    demoNote: string;
    error: string;
  };
  about: {
    eyebrow: string;
    title: string;
    lead: string;
    problem: { title: string; body: string };
    approach: { title: string; body: string };
    imageRule: { title: string; body: string };
    stack: { title: string; items: string[] };
    result: { title: string; items: string[] };
    cta: string;
    ctaTitle: string;
    ctaNote: string;
    ctaHref: string;
  };
  footer: {
    tagline: string;
    project: string;
    builtWith: string;
    builtBy: string;
    rights: string;
    credits: string;
    sourcesTitle: string;
    sources: { label: string; href: string }[];
    disclaimer: string;
  };
}
