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

const phoneNumber = "919724555880";
const displayPhone = "9724555880";

const navItems = [
  { label: "Goals", href: "#lifestyle" },
  { label: "Subscriptions", href: "#plans" },
  { label: "Menu", href: "#ready" },
  { label: "Smart Care", href: "smart-view" },
];

const categories = [
  {
    title: "Weight Management",
    icon: Dumbbell,
    tag: "Calorie friendly",
    copy: "Clean ingredients, sugar-free smoothies, and calorie-aware bowls that keep you on track.",
  },
  {
    title: "Office Lunch",
    icon: HeartPulse,
    tag: "Desk lunch",
    copy: "Fresh salad bowls and healthy sandwiches that save time and keep you energetic at work.",
  },
  {
    title: "Light Dinner",
    icon: Moon,
    tag: "Easy evenings",
    copy: "Digestible, nutritious bowls for a guilt-free end to your day.",
  },
  {
    title: "Protein-Friendly",
    icon: Flame,
    tag: "High protein",
    copy: "Paneer, chickpeas, and protein-packed bowls for your post-workout recovery.",
  },
];

const plans = [
  {
    name: "Single Order",
    audience: "Craving a healthy meal",
    weekly: 249,
    monthly: 249,
    badge: "Try us out",
    image: "/assets/sattva_sandwich.png",
    gallery: ["/assets/sattva_sandwich.png", "/assets/sattva_pasta_bowl.png", "/assets/sattva_salad_bowl.png"],
    description:
      "A great way to experience Sattva Fresh. Order any of our fresh salad bowls, sandwiches, or smoothies on demand.",
    services: ["Fresh bowl delivery", "Healthy sandwiches", "Sugar-free smoothies", "WhatsApp ordering"],
    bestFor: ["First timers", "Office lunch", "Healthy cravings"],
    features: ["Fresh bowl delivery", "Healthy sandwiches", "Sugar-free smoothies", "WhatsApp ordering"],
  },
  {
    name: "Weekly Plan",
    audience: "Busy professionals",
    weekly: 1499,
    monthly: 5999,
    badge: "Most popular",
    featured: true,
    image: "/assets/sattva_pasta_bowl.png",
    gallery: ["/assets/sattva_pasta_bowl.png", "/assets/sattva_rice_bowl.png", "/assets/sattva_salad_bowl.png"],
    description:
      "A balanced weekly routine with fresh bowls, predictable refills, and flexible pause controls for your busy lifestyle.",
    services: ["Daily fresh bowl", "Variety of cuisines", "Free Ahmedabad delivery", "Pause or resume plan"],
    bestFor: ["Busy professionals", "Office workers", "Weekly meal planning"],
    features: ["Daily fresh bowl", "Variety of cuisines", "Free Ahmedabad delivery", "Pause anytime"],
  },
  {
    name: "Monthly Subscription",
    audience: "Health enthusiasts",
    weekly: 4999,
    monthly: 19999,
    badge: "Best value",
    image: "/assets/sattva_salad_bowl.png",
    gallery: ["/assets/sattva_salad_bowl.png", "/assets/sattva_sandwich.png", "/assets/sattva_salad_bowl.png"],
    description:
      "A complete healthy eating routine for those committed to their wellness goals, with priority support and streak rewards.",
    services: ["Goal-oriented meals", "Custom bowl options", "Calorie-aware planning", "Healthy streak rewards"],
    bestFor: ["Gym users", "Weight goals", "Consistency"],
    features: ["Goal-oriented meals", "Custom bowl options", "Calorie-aware planning", "Streak rewards"],
  }
];

const productCategories = ["All", "Salad Bowls", "Rice Bowls", "Sandwiches", "Smoothies"];

const products = [
  {
    name: "Spinach Rice Bowl",
    category: "Rice Bowls",
    time: "Lunch ready",
    stat: "Green goodness",
    image: "/assets/sattva_salad_bowl.png",
    copy: "Vibrant spinach rice, bell peppers, broccoli, corn, tomatoes, baby corn, lettuce, and paneer with our signature herb dressing.",
  },
  {
    name: "Brown Rice Bowl",
    category: "Rice Bowls",
    time: "Lunch ready",
    stat: "High fiber",
    image: "/assets/sattva_rice_bowl.png",
    copy: "Nutritious brown rice paired with fresh crunchy vegetables, roasted protein, and a zesty drizzle.",
  },
  {
    name: "Italian Pasta Bowl",
    category: "Salad Bowls",
    time: "15 min prep",
    stat: "Fusion taste",
    image: "/assets/sattva_pasta_bowl.png",
    copy: "Guilt-free pasta bowl tossed in extra virgin olive oil, fresh veggies, and authentic Italian herbs.",
  },
  {
    name: "Falafel Bowl",
    category: "Salad Bowls",
    time: "Lunch ready",
    stat: "Protein rich",
    image: "/assets/sattva_salad_bowl.png",
    copy: "Crispy baked falafels with creamy hummus, fresh greens, olives, and Mediterranean toppings.",
  },
  {
    name: "Pesto Vegetable Sandwich",
    category: "Sandwiches",
    time: "Quick bite",
    stat: "Whole wheat",
    image: "/assets/sattva_fresh_ingredients.png",
    copy: "Crisp fresh veggies and premium basil pesto sauce layered inside toasted whole wheat artisan bread.",
  },
  {
    name: "Blueberry Banana Smoothie",
    category: "Smoothies",
    time: "Instant energy",
    stat: "Sugar-free",
    image: "/assets/sattva_smoothie.png",
    copy: "A delicious, completely sugar-free thick blend of antioxidant-rich blueberries and fresh banana.",
  },
];

const bowlOptions = {
  base: ["Brown Rice", "White Rice", "Pasta", "Lettuce"],
  protein: ["Paneer", "Chickpeas", "Falafel", "Sprouts"],
  extras: ["Olives", "Broccoli", "Bell Peppers", "Mushroom"],
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
          <strong>Sattva Fresh</strong>
          <small>by Sattva Fresh</small>
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
        <a className="icon-button" href={`tel:${displayPhone}`} aria-label="Call Sattva Fresh">
          <Phone size={18} />
        </a>
        <PrimaryButton
          onClick={() => openWhatsApp("Hi Sattva Fresh, I want to order fresh vegetables or Sattva Fresh bowls today.")}
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
              <strong>Sattva Fresh</strong>
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
              onClick={() => openWhatsApp("Hi Sattva Fresh, please share today's menu and subscription plans.")}
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
            <ShieldCheck size={16} /> Fresh bowls, clean ingredients, free Ahmedabad delivery
          </span>
          <h1>Healthy Living Delivered Daily.</h1>
          <p>
            Sattva Fresh brings healthy salad bowls, rice bowls, sandwiches, smoothies, and flexible subscriptions into one premium health-food routine.
          </p>
          <div className="hero-actions">
            <PrimaryButton onClick={() => scrollToSection("#plans")}>Explore Plans</PrimaryButton>
            <PrimaryButton
              tone="light"
              icon={MessageCircle}
              onClick={() => openWhatsApp("Hi Sattva Fresh, I want to order today. Please share the menu.")}
            >
              Order Today
            </PrimaryButton>
          </div>
          <div className="hero-proof">
            <span>Salad bowls</span>
            <span>Rice bowls</span>
            <span>Smoothies</span>
            <span>Sandwiches</span>
          </div>
        </motion.div>

        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="halo-ring" />
          <img src="/assets/sattva_smoothie.png" alt="Futuristic Sattva Fresh healthy food platform visual" />
          <GlassCard className="hero-brand-plate">
            <span>Sattva Fresh</span>
            <strong>Fresh-cut health platform</strong>
            <small>Ahmedabad daily delivery</small>
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
        <span>{plan.name === "Single Order" ? "/order" : `/${cadence === "monthly" ? "month" : "week"}`}</span>
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
          <img className="media-backdrop" src="/assets/sattva_fresh_ingredients.png" alt="Fresh ingredients" />
          <img src="/assets/sattva_fresh_ingredients.png" style={{width: "100%", height: "100%", objectFit: "cover"}} alt="Fresh ingredients" />
          <div className="video-overlay">
            <span>Fresh Ingredients</span>
            <strong>Premium, clean, and healthy</strong>
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

  const getBowlImage = (base) => {
    if (base.includes("Rice")) return "/assets/sattva_rice_bowl.png";
    if (base === "Pasta") return "/assets/sattva_pasta_bowl.png";
    return "/assets/sattva_salad_bowl.png";
  };

  const message = `Hi Sattva Fresh, I want a custom bowl with ${selection.base}, ${selection.protein}, and ${selection.extras}.`;

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
          <img src={getBowlImage(selection.base)} alt="Custom Sattva Fresh bowl preview" />
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
      title: "Start your day light & energized",
      icon: CalendarDays,
      image: "/assets/sattva_fresh_ingredients.png",
      copy: "Our sugar-free smoothies give you the perfect morning boost without the crash.",
    },
    {
      time: "Afternoon",
      title: "A Sattva Fresh bowl keeps lunch clean",
      icon: Salad,
      image: "/assets/sattva_salad_bowl.png",
      copy: "Office users get colorful, filling bowls without relying on oily canteen food.",
    },
    {
      time: "Evening",
      title: "Healthy dinners made completely effortless",
      icon: ChefHat,
      image: "/assets/sattva_fresh_ingredients.png",
      copy: "Light salads and sandwiches turn tired evenings into nutritious, guilt-free dinners.",
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
          <span>Hello, Ahmedabad</span>
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
            Sattva Fresh can track the plans, bowls, and packs users choose, then turn that history into refill prompts,
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
          <p>Based on your past used items, Sattva Fresh can remind you before your fridge goes empty.</p>
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
              <p>Your last Sattva Fresh custom bowl is ready for a one-tap reorder.</p>
            </>
          ) : (
            <>
              <h3>No custom bowl saved yet.</h3>
              <p>Build one from the Sattva Fresh section and it will appear here.</p>
            </>
          )}
        </article>
      </section>
    </main>
  );
}

function PlanDetailsPage({ plan, cadence, theme, onToggleTheme, onBack, onBookNow, onSmartCare }) {
  const price = cadence === "monthly" ? plan.monthly : plan.weekly;
  const reduceMotion = useReducedMotion();

  return (
    <motion.main 
      className="detail-page"
      initial={reduceMotion ? false : { opacity: 0 }}
      animate={reduceMotion ? false : { opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Header onSmartCare={onSmartCare} onHome={onBack} theme={theme} onToggleTheme={onToggleTheme} />
      <section className="detail-hero">
        <motion.div 
          className="detail-copy"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="eyebrow">{plan.badge}</span>
          <h1>{plan.name}</h1>
          <p>{plan.description}</p>
          <div className="detail-price">
            <strong>Rs {price}</strong>
            <span>/{cadence === "monthly" ? "month" : "week"}</span>
          </div>
          <div className="hero-actions" style={{ flexWrap: "wrap" }}>
            <PrimaryButton tone="light" icon={ArrowRight} onClick={onBack}>
              Back to plans
            </PrimaryButton>
            <PrimaryButton icon={MessageCircle} onClick={() => onBookNow(plan, cadence)}>
              Book Now
            </PrimaryButton>
            <PrimaryButton tone="light" icon={TimerReset} onClick={onSmartCare}>
              Connect Smart Care
            </PrimaryButton>
          </div>
        </motion.div>
        <motion.div 
          className="detail-main-image"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <img src={plan.image} alt={`${plan.name} Sattva Fresh plan`} />
          <GlassCard className="detail-floating-card">
            <span>Includes</span>
            <strong>{plan.services[0]}</strong>
            <small>Free Ahmedabad delivery support</small>
          </GlassCard>
        </motion.div>
      </section>

      <MotionSection id="detail-visuals" className="detail-section">
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
      </MotionSection>

      <MotionSection id="detail-services" className="detail-section detail-service-grid">
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
      </MotionSection>

      <MotionSection id="detail-booking" className="detail-booking">
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
      </MotionSection>
    </motion.main>
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
    openWhatsApp(`Hi Sattva Fresh, I want to book the ${plan.name} ${cadence} plan. Please connect me and share next steps.`);
  };

  const handleProductOrder = (product) => {
    addRecentItem(product);
    openWhatsApp(`Hi Sattva Fresh, I want details for ${product.name}.`);
  };

  const handleBowlBuilt = (selection) => {
    const bowlItem = { name: `Custom bowl: ${selection.base}, ${selection.protein}, ${selection.extras}`, category: "Sattva Fresh" };
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
    openWhatsApp(`Hi Sattva Fresh, please reorder my ${items}.`);
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
        onSupport={() => openWhatsApp("Hi Sattva Fresh, I need help with my Smart Care delivery plan.")}
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
        copy="The homepage moves beyond grocery browsing and frames Sattva Fresh as a lifestyle system for consistency, time saving, and healthy convenience."
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
        eyebrow="Sattva Fresh inside Sattva Fresh"
        title="Premium bowls that make healthy food feel exciting."
        copy="Sattva Fresh becomes the colorful, craving-friendly face of subscriptions: weekly menus, protein bowls, calorie-aware options, and custom bowl ordering."
      >
        <div className="salad-layout">
          <div className="salad-media">
            <img src="/assets/sattva_salad_bowl.png" style={{width: "100%", height: "100%", objectFit: "cover"}} alt="Fresh salad bowl" />
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
        title="Practical enough for Ahmedabad, premium enough to feel new."
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
            onClick={() => openWhatsApp("Hi Sattva Fresh, please help me start a healthy delivery plan.")}
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
            <strong>Sattva Fresh</strong>
            <small>Fresh produce, cut vegetables, Sattva Fresh bowls</small>
          </span>
        </div>
        <p>Ahmedabad focused frontend MVP. Ordering actions open WhatsApp or phone contact.</p>
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
      <button type="button" onClick={() => openWhatsApp("Hi Sattva Fresh, I want today's menu and delivery options.")}>
        <MessageCircle size={18} />
        WhatsApp
      </button>
    </div>
  );
}

export default App;
