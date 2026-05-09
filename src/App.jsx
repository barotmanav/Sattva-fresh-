import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Bell,
  CalendarDays,
  Check,
  ChefHat,
  ChevronRight,
  Clock3,
  Dumbbell,
  Flame,
  HeartPulse,
  Home,
  Leaf,
  Menu,
  MessageCircle,
  Moon,
  PackageCheck,
  PauseCircle,
  Phone,
  RefreshCcw,
  Salad,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Sun,
  TimerReset,
  Truck,
  Users,
  X,
} from "lucide-react";

const phoneNumber = "918160048752";
const displayPhone = "8160048752";

const navItems = [
  { label: "Lifestyle", href: "#lifestyle" },
  { label: "Plans", href: "#plans" },
  { label: "Ready to Cook", href: "#ready" },
  { label: "Salad Sutra", href: "#salads" },
  { label: "Smart Care", href: "smart-view" },
];

const categories = [
  {
    title: "Student Life",
    icon: Home,
    tag: "PG friendly",
    copy: "Budget packs, simple cooking cuts, and salad days that make healthy eating realistic.",
  },
  {
    title: "Gym Fuel",
    icon: Dumbbell,
    tag: "Protein routine",
    copy: "Paneer bowls, sprouts, broccoli, salad subscriptions, and goal-led weekly refills.",
  },
  {
    title: "Office Health",
    icon: HeartPulse,
    tag: "Desk lunch",
    copy: "Fresh salad bowls and cut vegetables that save time before and after work.",
  },
  {
    title: "Family Fresh",
    icon: Users,
    tag: "Home rhythm",
    copy: "Weekly vegetables, hygienic cuts, and predictable delivery for everyday kitchens.",
  },
];

const plans = [
  {
    name: "Student Smart",
    audience: "PG residents and bachelors",
    weekly: 299,
    monthly: 999,
    badge: "Budget hero",
    image: "/assets/real-salad-packed.png",
    gallery: ["/assets/real-salad-packed.png", "/assets/real-cut-vegetables.png", "/assets/real-salad-close.png"],
    description:
      "A low-friction healthy plan for students and PG residents who need simple vegetables, easy bowls, and quick refill reminders without managing daily grocery stress.",
    services: ["Weekly vegetable refill", "2 Salad Sutra bowls", "Quick-cook cut pack", "WhatsApp refill reminder"],
    bestFor: ["PG students", "Bachelors", "Budget healthy eating"],
    features: ["Weekly veg kit", "2 Salad Sutra bowls", "Quick-cook cuts", "WhatsApp reminders"],
  },
  {
    name: "Daily Fresh",
    audience: "Busy homes",
    weekly: 449,
    monthly: 1699,
    badge: "Most balanced",
    featured: true,
    image: "/assets/real-cut-vegetables.png",
    gallery: ["/assets/real-cut-vegetables.png", "/assets/real-cut-vegetables-2.png", "/assets/real-salad-group.png"],
    description:
      "A balanced family and working-person routine with fresh produce, hygienic cuts, predictable refills, and flexible pause controls.",
    services: ["Fresh vegetable basket", "Cut vegetable packs", "Free Vadodara delivery", "Pause or resume plan"],
    bestFor: ["Busy homes", "Office workers", "Weekly meal planning"],
    features: ["Fresh vegetables", "Cut vegetable packs", "Free Vadodara delivery", "Pause anytime"],
  },
  {
    name: "Gym Pro",
    audience: "Fitness routines",
    weekly: 599,
    monthly: 2199,
    badge: "Protein focused",
    image: "/assets/real-salad-close.png",
    gallery: ["/assets/real-salad-close.png", "/assets/real-salad-mix.png", "/assets/real-salad-covered.png"],
    description:
      "A fitness-led Salad Sutra routine for people who want protein bowls, sprouts, paneer, greens, and health streak motivation.",
    services: ["Protein salad menu", "Sprouts and paneer add-ons", "Calorie-aware bowls", "Healthy streak rewards"],
    bestFor: ["Gym users", "Weight goals", "High-protein lunch"],
    features: ["Protein salad menu", "Sprouts and paneer add-ons", "Calorie-aware bowls", "Streak rewards"],
  },
  {
    name: "Family Fresh",
    audience: "Weekly household planning",
    weekly: 799,
    monthly: 2899,
    badge: "High value",
    image: "/assets/real-salad-group.png",
    gallery: ["/assets/real-salad-group.png", "/assets/real-cut-vegetables.png", "/assets/real-salad-mix.png"],
    description:
      "A higher-volume family plan for weekly vegetable planning, everyday cut options, weekend salad add-ons, and priority support.",
    services: ["Family vegetable basket", "Daily cut options", "Weekend salad add-on", "Priority WhatsApp support"],
    bestFor: ["Families", "Weekly cooking", "High value refills"],
    features: ["Family veg basket", "Daily cut options", "Weekend salad add-on", "Priority support"],
  },
];

const productCategories = ["All", "Fresh", "Cut", "Ready Packs", "Salads"];

const products = [
  {
    name: "Fresh Vegetable Basket",
    category: "Fresh",
    time: "Same day",
    stat: "12+ items",
    image: "/assets/real-cut-vegetables-2.png",
    copy: "Seasonal produce selected for daily cooking and weekly home planning.",
  },
  {
    name: "Hygienic Cut Vegetables",
    category: "Cut",
    time: "Ready now",
    stat: "Washed and packed",
    image: "/assets/real-cut-vegetables.png",
    copy: "Onion, capsicum, beans, carrot, beetroot, and everyday cuts for stress-free cooking.",
  },
  {
    name: "10 Minute Meal Kit",
    category: "Ready Packs",
    time: "10 min prep",
    stat: "Recipe card",
    image: "/assets/real-salad-mix.png",
    copy: "Pre-cut ingredients, spice guidance, and cooking flow for PG and office routines.",
  },
  {
    name: "Salad Sutra Bowl",
    category: "Salads",
    time: "Lunch ready",
    stat: "Fresh bowl",
    image: "/assets/real-salad-group.png",
    copy: "Colorful, filling salads with corn, paneer, sprouts, olives, greens, and seasonal toppings.",
  },
  {
    name: "Gym Protein Salad",
    category: "Salads",
    time: "Post workout",
    stat: "Protein add-ons",
    image: "/assets/real-salad-close.png",
    copy: "Paneer, sprouts, broccoli, cucumber, and crunchy fresh layers for fitness users.",
  },
  {
    name: "PG Survival Pack",
    category: "Ready Packs",
    time: "Weekly refill",
    stat: "Low effort",
    image: "/assets/real-salad-packed.png",
    copy: "A compact mix of vegetables, cuts, and easy bowls made for shared kitchens.",
  },
];

const bowlOptions = {
  base: ["Lettuce", "Cucumber", "Corn", "Sprouts"],
  protein: ["Paneer", "Chana", "Moong", "Cheese cubes"],
  extras: ["Olives", "Tomato", "Carrot", "Mint"],
};

const defaultSmartState = {
  selectedPlan: null,
  cadence: "monthly",
  recentItems: [],
  customBowl: null,
  planPaused: false,
};

function readStoredSmartState() {
  if (typeof window === "undefined") return defaultSmartState;

  try {
    return { ...defaultSmartState, ...JSON.parse(window.localStorage.getItem("ek-smart-state") || "{}") };
  } catch {
    return defaultSmartState;
  }
}

function readStoredTheme() {
  if (typeof window === "undefined") return "light";
  return window.localStorage.getItem("ek-theme") || "light";
}

function whatsappUrl(message) {
  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
}

function openWhatsApp(message) {
  window.open(whatsappUrl(message), "_blank", "noopener,noreferrer");
}

function scrollToSection(href) {
  const target = document.querySelector(href);
  if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
}

function MotionSection({ id, eyebrow, title, copy, children, className = "" }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.section
      id={id}
      className={`section ${className}`}
      initial={reduceMotion ? false : { opacity: 0, y: 42 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
    >
      {(eyebrow || title || copy) && (
        <div className="section-heading">
          {eyebrow && <span className="eyebrow">{eyebrow}</span>}
          {title && <h2>{title}</h2>}
          {copy && <p>{copy}</p>}
        </div>
      )}
      {children}
    </motion.section>
  );
}

function PrimaryButton({ children, tone = "primary", icon: Icon = ArrowRight, onClick, href }) {
  const className = `button button-${tone}`;
  const content = (
    <>
      <span>{children}</span>
      {Icon && <Icon size={18} aria-hidden="true" />}
    </>
  );

  if (href) {
    return (
      <a className={className} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
        {content}
      </a>
    );
  }

  return (
    <button className={className} type="button" onClick={onClick}>
      {content}
    </button>
  );
}

function GlassCard({ children, className = "" }) {
  return <div className={`glass-card ${className}`}>{children}</div>;
}

function FloatingIngredientLayer() {
  const ingredients = ["leaf", "tomato", "corn", "cucumber", "carrot", "onion", "pulse", "basil"];
  return (
    <div className="floating-layer" aria-hidden="true">
      {ingredients.map((item, index) => (
        <span key={item} className={`float-item float-${index + 1}`}>
          {item}
        </span>
      ))}
    </div>
  );
}

function Header({ onSmartCare, onHome, theme, onToggleTheme }) {
  const [open, setOpen] = useState(false);

  const handleNav = (href) => {
    if (href === "smart-view") {
      onSmartCare();
      setOpen(false);
      return;
    }
    scrollToSection(href);
    setOpen(false);
  };

  const ThemeIcon = theme === "dark" ? Sun : Moon;

  return (
    <header className="site-header">
      <a
        className="brand-mark"
        href="#top"
        onClick={(event) => {
          event.preventDefault();
          if (onHome) {
            onHome();
            setOpen(false);
            return;
          }
          scrollToSection("#top");
          setOpen(false);
        }}
      >
        <span className="brand-icon">
          <Leaf size={20} />
        </span>
        <span>
          <strong>E Kitchens</strong>
          <small>by Salad Sutra</small>
        </span>
      </a>

      <nav className="desktop-nav" aria-label="Primary navigation">
        {navItems.map((item) => (
          <button key={item.href} type="button" onClick={() => handleNav(item.href)}>
            {item.label}
          </button>
        ))}
      </nav>

      <div className="header-actions">
        <button className="icon-button theme-toggle" type="button" onClick={onToggleTheme} aria-label="Toggle dark mode">
          <ThemeIcon size={18} />
        </button>
        <a className="icon-button" href={`tel:${displayPhone}`} aria-label="Call E Kitchens">
          <Phone size={18} />
        </a>
        <PrimaryButton
          onClick={() => openWhatsApp("Hi E Kitchens, I want to order fresh vegetables or Salad Sutra bowls today.")}
          icon={MessageCircle}
        >
          Order Today
        </PrimaryButton>
        <button className="menu-button" type="button" aria-label="Open menu" onClick={() => setOpen(true)}>
          <Menu size={22} />
        </button>
      </div>

      {open && (
        <div className="mobile-menu">
          <div className="mobile-menu-panel">
            <div className="mobile-menu-top">
              <strong>E Kitchens</strong>
              <button type="button" aria-label="Close menu" onClick={() => setOpen(false)}>
                <X size={22} />
              </button>
            </div>
            {navItems.map((item) => (
              <button key={item.href} type="button" onClick={() => handleNav(item.href)}>
                {item.label}
                <ChevronRight size={18} />
              </button>
            ))}
            <button type="button" onClick={onToggleTheme}>
              {theme === "dark" ? "Light mode" : "Dark mode"}
              <ThemeIcon size={18} />
            </button>
            <PrimaryButton
              tone="dark"
              onClick={() => openWhatsApp("Hi E Kitchens, please share today's menu and subscription plans.")}
              icon={MessageCircle}
            >
              WhatsApp Menu
            </PrimaryButton>
          </div>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="hero">
      <FloatingIngredientLayer />
      <div className="hero-content">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="hero-copy"
        >
          <span className="status-pill">
            <ShieldCheck size={16} /> Hygienic cuts, fresh bowls, free Vadodara delivery
          </span>
          <h1>Healthy Living Delivered Daily.</h1>
          <p>
            E Kitchens brings fresh vegetables, cut packs, ready-to-cook bowls, and Salad Sutra subscriptions into one
            premium health-food routine.
          </p>
          <div className="hero-actions">
            <PrimaryButton onClick={() => scrollToSection("#plans")}>Explore Plans</PrimaryButton>
            <PrimaryButton
              tone="light"
              icon={MessageCircle}
              onClick={() => openWhatsApp("Hi E Kitchens, I want to order today. Please share fresh vegetables, cut packs, and Salad Sutra options.")}
            >
              Order Today
            </PrimaryButton>
          </div>
          <div className="hero-proof">
            <span>Fresh vegetables</span>
            <span>Cut vegetables</span>
            <span>Ready-to-cook</span>
            <span>Salad Sutra</span>
          </div>
        </motion.div>

        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="halo-ring" />
          <img src="/assets/premium-hero.png" alt="Futuristic E Kitchens healthy food platform visual" />
          <GlassCard className="hero-brand-plate">
            <span>E Kitchens</span>
            <strong>Fresh-cut health platform</strong>
            <small>Vadodara daily delivery</small>
          </GlassCard>
          <GlassCard className="nutrition-widget">
            <span>Today's bowl</span>
            <strong>520 cal</strong>
            <div className="progress-ring">82%</div>
          </GlassCard>
          <GlassCard className="delivery-widget">
            <Truck size={18} />
            <div>
              <span>Next delivery</span>
              <strong>25 min</strong>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}

function LifestyleCard({ item }) {
  const Icon = item.icon;
  return (
    <GlassCard className="lifestyle-card">
      <div className="card-icon">
        <Icon size={24} />
      </div>
      <span>{item.tag}</span>
      <h3>{item.title}</h3>
      <p>{item.copy}</p>
    </GlassCard>
  );
}

function PlanCard({ plan, cadence, selected, onSelect }) {
  const price = cadence === "monthly" ? plan.monthly : plan.weekly;

  return (
    <article className={`plan-card ${plan.featured ? "featured-plan" : ""} ${selected === plan.name ? "selected-plan" : ""}`}>
      <div className="plan-top">
        <span>{plan.badge}</span>
        {plan.featured && <Sparkles size={18} />}
      </div>
      <div className="plan-card-image">
        <img src={plan.image} alt={`${plan.name} service preview`} loading="lazy" />
      </div>
      <h3>{plan.name}</h3>
      <p>{plan.audience}</p>
      <div className="price">
        <strong>Rs {price}</strong>
        <span>/{cadence === "monthly" ? "month" : "week"}</span>
      </div>
      <ul>
        {plan.features.map((feature) => (
          <li key={feature}>
            <Check size={16} />
            {feature}
          </li>
        ))}
      </ul>
      <PrimaryButton
        tone={plan.featured ? "primary" : "dark"}
        onClick={() => {
          onSelect(plan.name, plan);
        }}
      >
        View Details
      </PrimaryButton>
    </article>
  );
}

function ProductCard({ item, onOrder }) {
  return (
    <article className="product-card">
      <div className="product-image">
        <img src={item.image} alt={`${item.name} visual`} loading="lazy" />
        <span>{item.category}</span>
      </div>
      <div className="product-meta">
        <span>{item.category}</span>
        <strong>{item.stat}</strong>
      </div>
      <h3>{item.name}</h3>
      <p>{item.copy}</p>
      <div className="product-footer">
        <span>
          <Clock3 size={15} />
          {item.time}
        </span>
        <button
          type="button"
          onClick={() => onOrder(item)}
          aria-label={`Order ${item.name} on WhatsApp`}
        >
          <MessageCircle size={17} />
        </button>
      </div>
    </article>
  );
}

function PlansSection({ onPlanChoose, onSmartCare, onPlanDetails }) {
  const [cadence, setCadence] = useState("monthly");
  const [selected, setSelected] = useState("Daily Fresh");
  const [detailPlan, setDetailPlan] = useState(plans[1]);

  const choosePlan = (planName, plan) => {
    setSelected(planName);
    setDetailPlan(plan);
    onPlanChoose(plan, cadence);
    onPlanDetails(plan, cadence);
  };

  return (
    <MotionSection
      id="plans"
      className="plans-section"
      eyebrow="Smart subscription system"
      title="Recurring healthy routines, packaged like a modern SaaS plan."
      copy="Plans are built around real user lives: students, gyms, offices, families, and weekly refill behavior."
    >
      <div className="toggle-row" role="group" aria-label="Plan cadence">
        <button className={cadence === "weekly" ? "active" : ""} type="button" onClick={() => setCadence("weekly")}>
          Weekly
        </button>
        <button className={cadence === "monthly" ? "active" : ""} type="button" onClick={() => setCadence("monthly")}>
          Monthly
        </button>
      </div>
      <div className="plans-grid">
        {plans.map((plan) => (
          <PlanCard key={plan.name} plan={plan} cadence={cadence} selected={selected} onSelect={choosePlan} />
        ))}
      </div>
      {detailPlan && (
        <motion.div
          className="plan-detail"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <div>
            <span>Selected plan</span>
            <h3>{detailPlan.name}</h3>
            <p>
              {detailPlan.audience}. Includes {detailPlan.features.join(", ").toLowerCase()}.
            </p>
          </div>
          <div className="plan-detail-actions">
            <PrimaryButton
              icon={MessageCircle}
              onClick={() => onPlanDetails(detailPlan, cadence)}
            >
              Open Details
            </PrimaryButton>
            <PrimaryButton tone="light" icon={TimerReset} onClick={onSmartCare}>
              View Smart Care
            </PrimaryButton>
          </div>
        </motion.div>
      )}
    </MotionSection>
  );
}

function ProductExperience({ onProductOrder }) {
  const [filter, setFilter] = useState("All");
  const filteredProducts = useMemo(
    () => (filter === "All" ? products : products.filter((item) => item.category === filter)),
    [filter],
  );

  return (
    <MotionSection
      id="ready"
      eyebrow="Ready-to-cook experience"
      title="A food system for people who want health without daily friction."
      copy="The product surface stays visual, fast, and decision-light: ingredients, prep time, delivery rhythm, and WhatsApp action."
    >
      <div className="experience-shell">
        <div className="video-panel">
          <img className="media-backdrop" src="/assets/dark-ingredient-core.png" alt="Fresh vegetables and cut vegetables" />
          <video src="/assets/cut-vegetables.mp4" autoPlay muted loop playsInline poster="/assets/dark-ingredient-core.png" />
          <div className="video-overlay">
            <span>Cut vegetables by E Kitchens</span>
            <strong>Washed, cut, packed, delivered</strong>
          </div>
        </div>
        <div className="products-panel">
          <div className="filter-row">
            {productCategories.map((category) => (
              <button
                key={category}
                className={filter === category ? "active" : ""}
                type="button"
                onClick={() => setFilter(category)}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="products-grid">
            {filteredProducts.map((product) => (
              <ProductCard key={product.name} item={product} onOrder={onProductOrder} />
            ))}
          </div>
        </div>
      </div>
    </MotionSection>
  );
}

function BowlBuilder({ onBowlBuilt }) {
  const [selection, setSelection] = useState({
    base: "Lettuce",
    protein: "Paneer",
    extras: "Olives",
  });
  const [pulse, setPulse] = useState(0);

  const message = `Hi Salad Sutra, I want a custom bowl with ${selection.base}, ${selection.protein}, and ${selection.extras}.`;

  return (
    <div className="builder">
      <div className="builder-preview">
        <motion.div
          key={pulse}
          className="real-bowl-preview"
          initial={{ scale: 0.96, rotate: -2 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <img src="/assets/premium-hero.png" alt="Custom Salad Sutra bowl preview" />
          <span className="ingredient-dot dot-a">{selection.base}</span>
          <span className="ingredient-dot dot-b">{selection.protein}</span>
          <span className="ingredient-dot dot-c">{selection.extras}</span>
        </motion.div>
        <h3>Your custom bowl</h3>
        <p>
          {selection.base}, {selection.protein}, {selection.extras}
        </p>
      </div>
      <div className="builder-controls">
        {Object.entries(bowlOptions).map(([group, options]) => (
          <div key={group}>
            <span>{group}</span>
            <div className="chip-row">
              {options.map((option) => (
                <button
                  key={option}
                  className={selection[group] === option ? "active" : ""}
                  type="button"
                  onClick={() => {
                    setSelection((current) => ({ ...current, [group]: option }));
                    setPulse((current) => current + 1);
                  }}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        ))}
        <PrimaryButton
          icon={MessageCircle}
          onClick={() => {
            onBowlBuilt(selection, message);
            openWhatsApp(message);
          }}
        >
          Build on WhatsApp
        </PrimaryButton>
      </div>
    </div>
  );
}

function DailyRoutine() {
  const moments = [
    {
      time: "Morning",
      title: "Vegetables are already planned",
      icon: CalendarDays,
      image: "/assets/real-cut-vegetables-2.png",
      copy: "Weekly refills remove the daily question of what to cook.",
    },
    {
      time: "Afternoon",
      title: "A Salad Sutra bowl keeps lunch clean",
      icon: Salad,
      image: "/assets/real-salad-group.png",
      copy: "Office users get colorful bowls without relying on random snacks.",
    },
    {
      time: "Evening",
      title: "Ready-to-cook packs reduce stress",
      icon: ChefHat,
      image: "/assets/real-cut-vegetables.png",
      copy: "Cut ingredients turn tired evenings into 10 minute cooking sessions.",
    },
  ];

  return (
    <MotionSection
      id="routine"
      eyebrow="Daily routine storytelling"
      title="The site sells a calmer day, not just vegetables."
      copy="Every section helps visitors imagine the service inside their real morning, lunch, and evening rhythm."
    >
      <div className="routine-grid">
        {moments.map((moment, index) => {
          const Icon = moment.icon;
          return (
            <article key={moment.time} className="routine-card" style={{ "--routine-image": `url(${moment.image})` }}>
              <span className="routine-number">0{index + 1}</span>
              <Icon size={30} />
              <span>{moment.time}</span>
              <h3>{moment.title}</h3>
              <p>{moment.copy}</p>
            </article>
          );
        })}
      </div>
    </MotionSection>
  );
}

function DashboardPreview({ onSmartCare, smartData }) {
  const recentCount = smartData.recentItems.length;

  return (
    <div className="dashboard-preview">
      <div className="dashboard-phone">
        <div className="phone-top">
          <span>Hello, Vadodara</span>
          <Bell size={18} />
        </div>
        <div className="delivery-status">
          <PackageCheck size={24} />
          <div>
            <span>Next delivery</span>
            <strong>Tomorrow, 8:30 AM</strong>
          </div>
        </div>
        <div className="progress-line">
          <span className="done" />
          <span className="done" />
          <span className="active" />
          <span />
        </div>
        <div className="dashboard-metrics">
          <div>
            <strong>{recentCount || 7}</strong>
            <span>{recentCount ? "recent items" : "day streak"}</span>
          </div>
          <div>
            <strong>{smartData.customBowl ? 1 : 3}</strong>
            <span>{smartData.customBowl ? "custom bowl" : "bowls left"}</span>
          </div>
        </div>
        <button type="button" onClick={onSmartCare}>
          <TimerReset size={17} />
          Open Smart Care
        </button>
      </div>
      <div className="reminder-stack">
        <GlassCard>
          <TimerReset size={22} />
          <strong>Smart refill reminder</strong>
          <p>Your weekly veggie stock may be ending soon.</p>
        </GlassCard>
        <GlassCard>
          <Flame size={22} />
          <strong>Healthy streak</strong>
          <p>Complete 30 salad days and unlock a reward bowl.</p>
        </GlassCard>
      </div>
    </div>
  );
}

function SmartCarePage({ smartData, theme, onToggleTheme, onBack, onPauseToggle, onReorder, onSupport }) {
  const selectedPlan = smartData.selectedPlan || { name: "Daily Fresh", audience: "Suggested healthy routine" };
  const recentItems = smartData.recentItems.length
    ? smartData.recentItems
    : [{ name: "Fresh Vegetable Basket", category: "Fresh", stat: "Starter refill" }];

  return (
    <main className="smart-page">
      <Header onSmartCare={() => {}} onHome={onBack} theme={theme} onToggleTheme={onToggleTheme} />
      <section className="smart-hero">
        <div>
          <span className="eyebrow">Smart Care dashboard</span>
          <h1>Your healthy routine, remembered.</h1>
          <p>
            E Kitchens can track the plans, bowls, and packs users choose, then turn that history into refill prompts,
            pause controls, and fast reorders.
          </p>
          <div className="hero-actions">
            <PrimaryButton icon={ArrowRight} onClick={onBack}>
              Back to website
            </PrimaryButton>
            <PrimaryButton tone="light" icon={MessageCircle} onClick={onSupport}>
              WhatsApp support
            </PrimaryButton>
          </div>
        </div>
      </section>
      <section className="smart-board">
        <article className="smart-card active-plan-card">
          <span>Active plan</span>
          <h2>{selectedPlan.name}</h2>
          <p>{selectedPlan.audience || "Healthy delivery plan"}</p>
          <strong>{smartData.cadence === "weekly" ? "Weekly" : "Monthly"} rhythm</strong>
          <button type="button" onClick={onPauseToggle}>
            <PauseCircle size={18} />
            {smartData.planPaused ? "Resume plan" : "Pause plan"}
          </button>
        </article>
        <article className="smart-card alert-card">
          <Bell size={26} />
          <span>Smart alert</span>
          <h3>Your weekly veggie stock may be ending soon.</h3>
          <p>Based on your past used items, E Kitchens can remind you before your fridge goes empty.</p>
          <PrimaryButton icon={RefreshCcw} onClick={onReorder}>
            Reorder refill
          </PrimaryButton>
        </article>
        <article className="smart-card">
          <span>Past used items</span>
          <div className="recent-list">
            {recentItems.slice(0, 5).map((item, index) => (
              <div key={`${item.name}-${index}`} className="recent-item">
                <strong>{item.name}</strong>
                <small>{item.category || item.stat || "Saved item"}</small>
              </div>
            ))}
          </div>
        </article>
        <article className="smart-card">
          <span>Custom bowl</span>
          {smartData.customBowl ? (
            <>
              <h3>{smartData.customBowl.base}, {smartData.customBowl.protein}, {smartData.customBowl.extras}</h3>
              <p>Your last Salad Sutra custom bowl is ready for a one-tap reorder.</p>
            </>
          ) : (
            <>
              <h3>No custom bowl saved yet.</h3>
              <p>Build one from the Salad Sutra section and it will appear here.</p>
            </>
          )}
        </article>
      </section>
    </main>
  );
}

function PlanDetailsPage({ plan, cadence, theme, onToggleTheme, onBack, onBookNow, onSmartCare }) {
  const price = cadence === "monthly" ? plan.monthly : plan.weekly;

  return (
    <main className="detail-page">
      <Header onSmartCare={onSmartCare} onHome={onBack} theme={theme} onToggleTheme={onToggleTheme} />
      <section className="detail-hero">
        <div className="detail-copy">
          <span className="eyebrow">{plan.badge}</span>
          <h1>{plan.name}</h1>
          <p>{plan.description}</p>
          <div className="detail-price">
            <strong>Rs {price}</strong>
            <span>/{cadence === "monthly" ? "month" : "week"}</span>
          </div>
          <div className="hero-actions">
            <PrimaryButton icon={MessageCircle} onClick={() => onBookNow(plan, cadence)}>
              Book Now
            </PrimaryButton>
            <PrimaryButton tone="light" icon={TimerReset} onClick={onSmartCare}>
              Connect Smart Care
            </PrimaryButton>
          </div>
        </div>
        <div className="detail-main-image">
          <img src={plan.image} alt={`${plan.name} E Kitchens plan`} />
          <GlassCard className="detail-floating-card">
            <span>Includes</span>
            <strong>{plan.services[0]}</strong>
            <small>Free Vadodara delivery support</small>
          </GlassCard>
        </div>
      </section>

      <section className="detail-section">
        <div className="section-heading">
          <span className="eyebrow">Real service visuals</span>
          <h2>What this plan looks like in daily life.</h2>
        </div>
        <div className="detail-gallery">
          {plan.gallery.map((image, index) => (
            <article key={image} className="gallery-card">
              <img src={image} alt={`${plan.name} service image ${index + 1}`} />
              <span>{index === 0 ? "Plan hero" : index === 1 ? "Prep support" : "Salad add-on"}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="detail-section detail-service-grid">
        <article>
          <span className="eyebrow">Services</span>
          <h2>Everything included.</h2>
          <div className="service-list">
            {plan.services.map((service) => (
              <div key={service}>
                <Check size={18} />
                <strong>{service}</strong>
              </div>
            ))}
          </div>
        </article>
        <article>
          <span className="eyebrow">Best for</span>
          <h2>Who should book this?</h2>
          <div className="service-list">
            {plan.bestFor.map((item) => (
              <div key={item}>
                <Leaf size={18} />
                <strong>{item}</strong>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="detail-booking">
        <div>
          <span className="eyebrow">Connect and book</span>
          <h2>Book this plan on WhatsApp and keep it connected to Smart Care.</h2>
        </div>
        <div className="final-actions">
          <PrimaryButton icon={MessageCircle} onClick={() => onBookNow(plan, cadence)}>
            Book Now
          </PrimaryButton>
          <PrimaryButton tone="light" icon={ArrowRight} onClick={onBack}>
            Back to plans
          </PrimaryButton>
        </div>
      </section>
    </main>
  );
}

function App() {
  const [theme, setTheme] = useState(readStoredTheme);
  const [view, setView] = useState("home");
  const [activePlanDetail, setActivePlanDetail] = useState({ plan: plans[1], cadence: "monthly" });
  const [smartData, setSmartData] = useState(readStoredSmartState);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("ek-theme", theme);
  }, [theme]);

  useEffect(() => {
    window.localStorage.setItem("ek-smart-state", JSON.stringify(smartData));
  }, [smartData]);

  useEffect(() => {
    const toggle = () => setTheme((current) => (current === "dark" ? "light" : "dark"));
    document.addEventListener("ek-toggle-theme", toggle);
    return () => document.removeEventListener("ek-toggle-theme", toggle);
  }, []);

  const addRecentItem = (item) => {
    setSmartData((current) => ({
      ...current,
      recentItems: [item, ...current.recentItems.filter((saved) => saved.name !== item.name)].slice(0, 8),
    }));
  };

  const handlePlanChoose = (plan, cadence) => {
    setSmartData((current) => ({ ...current, selectedPlan: plan, cadence, planPaused: false }));
  };

  const openPlanDetails = (plan, cadence) => {
    handlePlanChoose(plan, cadence);
    setActivePlanDetail({ plan, cadence });
    setView("plan-detail");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const bookPlan = (plan, cadence) => {
    handlePlanChoose(plan, cadence);
    openWhatsApp(`Hi E Kitchens, I want to book the ${plan.name} ${cadence} plan. Please connect me and share next steps.`);
  };

  const handleProductOrder = (product) => {
    addRecentItem(product);
    openWhatsApp(`Hi E Kitchens, I want details for ${product.name}.`);
  };

  const handleBowlBuilt = (selection) => {
    const bowlItem = { name: `Custom bowl: ${selection.base}, ${selection.protein}, ${selection.extras}`, category: "Salad Sutra" };
    setSmartData((current) => ({
      ...current,
      customBowl: selection,
      recentItems: [bowlItem, ...current.recentItems].slice(0, 8),
    }));
  };

  const togglePause = () => {
    setSmartData((current) => ({ ...current, planPaused: !current.planPaused }));
  };

  const reorderMessage = () => {
    const items = smartData.recentItems.map((item) => item.name).slice(0, 3).join(", ") || "weekly healthy refill";
    openWhatsApp(`Hi E Kitchens, please reorder my ${items}.`);
  };

  if (view === "smart") {
    return (
      <SmartCarePage
        smartData={smartData}
        theme={theme}
        onToggleTheme={() => setTheme((current) => (current === "dark" ? "light" : "dark"))}
        onBack={() => setView("home")}
        onPauseToggle={togglePause}
        onReorder={reorderMessage}
        onSupport={() => openWhatsApp("Hi E Kitchens, I need help with my Smart Care delivery plan.")}
      />
    );
  }

  if (view === "plan-detail") {
    return (
      <PlanDetailsPage
        plan={activePlanDetail.plan}
        cadence={activePlanDetail.cadence}
        theme={theme}
        onToggleTheme={() => setTheme((current) => (current === "dark" ? "light" : "dark"))}
        onBack={() => setView("home")}
        onSmartCare={() => setView("smart")}
        onBookNow={bookPlan}
      />
    );
  }

  return (
    <main>
      <Header
        theme={theme}
        onToggleTheme={() => setTheme((current) => (current === "dark" ? "light" : "dark"))}
        onSmartCare={() => setView("smart")}
      />
      <Hero />

      <MotionSection
        id="lifestyle"
        eyebrow="Made for modern Indian routines"
        title="Every user sees a version of themselves."
        copy="The homepage moves beyond grocery browsing and frames E Kitchens as a lifestyle system for consistency, time saving, and healthy convenience."
      >
        <div className="lifestyle-grid">
          {categories.map((item) => (
            <LifestyleCard key={item.title} item={item} />
          ))}
        </div>
      </MotionSection>

      <PlansSection onPlanChoose={handlePlanChoose} onSmartCare={() => setView("smart")} onPlanDetails={openPlanDetails} />
      <ProductExperience onProductOrder={handleProductOrder} />
      <DailyRoutine />

      <MotionSection
        id="salads"
        className="salad-section"
        eyebrow="Salad Sutra inside E Kitchens"
        title="Premium bowls that make healthy food feel exciting."
        copy="Salad Sutra becomes the colorful, craving-friendly face of subscriptions: weekly menus, protein bowls, calorie-aware options, and custom bowl ordering."
      >
        <div className="salad-layout">
          <div className="salad-media">
            <video src="/assets/salad-motion.mp4" autoPlay muted loop playsInline poster="/assets/floating-vegetables.png" />
            <div className="salad-badge">Fresh bowl studio</div>
          </div>
          <div className="salad-content">
            <div className="salad-stats">
              <GlassCard>
                <strong>4K+</strong>
                <span>local followers</span>
              </GlassCard>
              <GlassCard>
                <strong>Weekly</strong>
                <span>salad menu</span>
              </GlassCard>
              <GlassCard>
                <strong>Free</strong>
                <span>home delivery</span>
              </GlassCard>
            </div>
            <BowlBuilder onBowlBuilt={handleBowlBuilt} />
          </div>
        </div>
      </MotionSection>

      <MotionSection
        id="smart"
        className="smart-section"
        eyebrow="Retention system"
        title="A startup-style dashboard preview for recurring income."
        copy="Even in frontend MVP form, users can understand pause, reminders, next delivery, and streaks. That makes subscriptions feel flexible instead of risky."
      >
        <DashboardPreview smartData={smartData} onSmartCare={() => setView("smart")} />
      </MotionSection>

      <MotionSection
        id="trust"
        eyebrow="Trust and local conversion"
        title="Practical enough for Vadodara, premium enough to feel new."
      >
        <div className="trust-grid">
          {[
            ["Hygienic prep", "Washed, cut, packed, and shown transparently.", ShieldCheck],
            ["Free delivery", "Local delivery flow built around WhatsApp habits.", Truck],
            ["Freshness proof", "Real visuals, reels, and daily menu behavior.", Leaf],
            ["Easy ordering", "Call, WhatsApp, subscribe, pause, and reorder.", ShoppingBag],
          ].map(([title, copy, Icon]) => (
            <article key={title}>
              <Icon size={28} />
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </MotionSection>

      <section className="final-cta">
        <div>
          <span className="eyebrow">Ready for the weekly healthy refill?</span>
          <h2>Start with one order. Stay for the routine.</h2>
        </div>
        <div className="final-actions">
          <PrimaryButton
            icon={MessageCircle}
            onClick={() => openWhatsApp("Hi E Kitchens, please help me start a healthy delivery plan.")}
          >
            Start on WhatsApp
          </PrimaryButton>
          <PrimaryButton tone="light" icon={Phone} href={`tel:${displayPhone}`}>
            Call {displayPhone}
          </PrimaryButton>
        </div>
      </section>

      <footer>
        <div className="brand-mark">
          <span className="brand-icon">
            <Leaf size={18} />
          </span>
          <span>
            <strong>E Kitchens</strong>
            <small>Fresh produce, cut vegetables, Salad Sutra bowls</small>
          </span>
        </div>
        <p>Vadodara focused frontend MVP. Ordering actions open WhatsApp or phone contact.</p>
      </footer>

      <MobileStickyCTA />
    </main>
  );
}

function MobileStickyCTA() {
  return (
    <div className="mobile-sticky-cta">
      <button type="button" onClick={() => scrollToSection("#plans")}>
        <CalendarDays size={18} />
        Plans
      </button>
      <button type="button" onClick={() => openWhatsApp("Hi E Kitchens, I want today's menu and delivery options.")}>
        <MessageCircle size={18} />
        WhatsApp
      </button>
    </div>
  );
}

export default App;
