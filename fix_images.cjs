const fs = require('fs');
const path = require('path');

const appPath = path.join(__dirname, 'src', 'App.jsx');
let content = fs.readFileSync(appPath, 'utf8');

// Fix Plan Images
content = content.replace(
  /const plans = \[[\s\S]*?\];/g,
  `const plans = [
  {
    name: "Single Order",
    audience: "Craving a healthy meal",
    weekly: 249,
    monthly: 249,
    badge: "Try us out",
    image: "/assets/real-salad-packed.png",
    gallery: ["/assets/real-salad-packed.png", "/assets/real-salad-mix.png", "/assets/real-salad-group.png"],
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
    image: "/assets/real-salad-mix.png",
    gallery: ["/assets/real-salad-mix.png", "/assets/real-salad-close.png", "/assets/real-salad-group.png"],
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
    image: "/assets/real-salad-group.png",
    gallery: ["/assets/real-salad-group.png", "/assets/real-salad-packed.png", "/assets/real-salad-covered.png"],
    description:
      "A complete healthy eating routine for those committed to their wellness goals, with priority support and streak rewards.",
    services: ["Goal-oriented meals", "Custom bowl options", "Calorie-aware planning", "Healthy streak rewards"],
    bestFor: ["Gym users", "Weight goals", "Consistency"],
    features: ["Goal-oriented meals", "Custom bowl options", "Calorie-aware planning", "Streak rewards"],
  }
];`
);

// Fix Product Images & Captions
content = content.replace(
  /const products = \[[\s\S]*?\];/,
  `const products = [
  {
    name: "Spinach Rice Bowl",
    category: "Rice Bowls",
    time: "Lunch ready",
    stat: "Green goodness",
    image: "/assets/real-salad-group.png",
    copy: "Vibrant spinach rice, bell peppers, broccoli, corn, tomatoes, baby corn, lettuce, and paneer with our signature herb dressing.",
  },
  {
    name: "Brown Rice Bowl",
    category: "Rice Bowls",
    time: "Lunch ready",
    stat: "High fiber",
    image: "/assets/real-salad-close.png",
    copy: "Nutritious brown rice paired with fresh crunchy vegetables, roasted protein, and a zesty drizzle.",
  },
  {
    name: "Italian Pasta Bowl",
    category: "Salad Bowls",
    time: "15 min prep",
    stat: "Fusion taste",
    image: "/assets/real-salad-mix.png",
    copy: "Guilt-free pasta bowl tossed in extra virgin olive oil, fresh veggies, and authentic Italian herbs.",
  },
  {
    name: "Falafel Bowl",
    category: "Salad Bowls",
    time: "Lunch ready",
    stat: "Protein rich",
    image: "/assets/real-salad-covered.png",
    copy: "Crispy baked falafels with creamy hummus, fresh greens, olives, and Mediterranean toppings.",
  },
  {
    name: "Pesto Vegetable Sandwich",
    category: "Sandwiches",
    time: "Quick bite",
    stat: "Whole wheat",
    image: "/assets/real-cut-vegetables-2.png",
    copy: "Crisp fresh veggies and premium basil pesto sauce layered inside toasted whole wheat artisan bread.",
  },
  {
    name: "Blueberry Banana Smoothie",
    category: "Smoothies",
    time: "Instant energy",
    stat: "Sugar-free",
    image: "/assets/premium-hero.png",
    copy: "A delicious, completely sugar-free thick blend of antioxidant-rich blueberries and fresh banana.",
  },
];`
);

// Fix Daily Routine Copy
content = content.replace(
  /const moments = \[[\s\S]*?\];/,
  `const moments = [
    {
      time: "Morning",
      title: "Start your day light & energized",
      icon: CalendarDays,
      image: "/assets/real-cut-vegetables-2.png",
      copy: "Our sugar-free smoothies give you the perfect morning boost without the crash.",
    },
    {
      time: "Afternoon",
      title: "A Sattva Fresh bowl keeps lunch clean",
      icon: Salad,
      image: "/assets/real-salad-group.png",
      copy: "Office users get colorful, filling bowls without relying on oily canteen food.",
    },
    {
      time: "Evening",
      title: "Healthy dinners made completely effortless",
      icon: ChefHat,
      image: "/assets/real-cut-vegetables.png",
      copy: "Light salads and sandwiches turn tired evenings into nutritious, guilt-free dinners.",
    },
  ];`
);

// Add unique values to the Trust section
content = content.replace(
  /\[\s*\["Hygienic prep"[\s\S]*?\],\s*\["Free delivery"[\s\S]*?\],\s*\["Freshness proof"[\s\S]*?\],\s*\["Easy ordering"[\s\S]*?\]\s*\]/,
  `[
            ["Premium Ingredients", "100% whole wheat, pure olive oil, and no refined sugar. Every bite counts.", ShieldCheck],
            ["Flexible Subscriptions", "Pause, resume, or change your meal plans anytime via WhatsApp.", Truck],
            ["Chef-Crafted Taste", "Healthy doesn't mean boring. Our fusion bowls are addictive and satisfying.", Leaf],
            ["Goal-Oriented Meals", "Whether weight loss, high protein, or light dinners—we have a bowl for you.", ShoppingBag],
          ]`
);

fs.writeFileSync(appPath, content, 'utf8');
console.log('App.jsx fixed successfully');
