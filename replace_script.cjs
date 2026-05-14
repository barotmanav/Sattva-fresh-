const fs = require('fs');
const path = require('path');

const appPath = path.join(__dirname, 'src', 'App.jsx');
let content = fs.readFileSync(appPath, 'utf8');

// Global replaces
content = content.replace(/E Kitchens/g, 'Sattva Fresh');
content = content.replace(/Salad Sutra/g, 'Sattva Fresh');
content = content.replace(/Vadodara/g, 'Ahmedabad');
content = content.replace(/918160048752/g, '919724555880');
content = content.replace(/8160048752/g, '9724555880');

// Component specific replaces
content = content.replace(
  /const navItems = \[[\s\S]*?\];/,
  `const navItems = [
  { label: "Goals", href: "#lifestyle" },
  { label: "Subscriptions", href: "#plans" },
  { label: "Menu", href: "#ready" },
  { label: "Smart Care", href: "smart-view" },
];`
);

content = content.replace(
  /const categories = \[[\s\S]*?\];/,
  `const categories = [
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
];`
);

content = content.replace(
  /const plans = \[[\s\S]*?\];/g,
  `const plans = [
  {
    name: "Single Order",
    audience: "Craving a healthy meal",
    weekly: 249,
    monthly: 249,
    badge: "Try us out",
    image: "/assets/all_bowls_subscription.png",
    gallery: ["/assets/all_bowls_subscription.png", "/assets/monday_pasta.png", "/assets/wednesday_rice_bowl.png"],
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
    image: "/assets/monday_pasta.png",
    gallery: ["/assets/monday_pasta.png", "/assets/tuesday_noodles.png", "/assets/wednesday_rice_bowl.png"],
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
    image: "/assets/wednesday_rice_bowl.png",
    gallery: ["/assets/wednesday_rice_bowl.png", "/assets/all_bowls_subscription.png", "/assets/tuesday_noodles.png"],
    description:
      "A complete healthy eating routine for those committed to their wellness goals, with priority support and streak rewards.",
    services: ["Goal-oriented meals", "Custom bowl options", "Calorie-aware planning", "Healthy streak rewards"],
    bestFor: ["Gym users", "Weight goals", "Consistency"],
    features: ["Goal-oriented meals", "Custom bowl options", "Calorie-aware planning", "Streak rewards"],
  }
];`
);

content = content.replace(
  /const productCategories = \[[\s\S]*?\];/,
  `const productCategories = ["All", "Salad Bowls", "Rice Bowls", "Sandwiches", "Smoothies"];`
);

content = content.replace(
  /const products = \[[\s\S]*?\];/,
  `const products = [
  {
    name: "Spinach Rice Bowl",
    category: "Rice Bowls",
    time: "Lunch ready",
    stat: "Green goodness",
    image: "/assets/wednesday_rice_bowl.png",
    copy: "White rice, bell peppers, broccoli, corn, tomatoes, onions, baby corn, lettuce, iceberg, paneer with dressing.",
  },
  {
    name: "Brown Rice Bowl",
    category: "Rice Bowls",
    time: "Lunch ready",
    stat: "High fiber",
    image: "/assets/brown-rice-bowl.png",
    copy: "Nutritious brown rice paired with fresh vegetables and protein.",
  },
  {
    name: "Italian Pasta Bowl",
    category: "Salad Bowls",
    time: "15 min prep",
    stat: "Fusion taste",
    image: "/assets/monday_pasta.png",
    copy: "Healthy pasta bowl with olive oil, fresh veggies, and authentic Italian herbs.",
  },
  {
    name: "Falafel Bowl",
    category: "Salad Bowls",
    time: "Lunch ready",
    stat: "Protein rich",
    image: "/assets/falafel-bowl.png",
    copy: "Crispy baked falafels with hummus, fresh greens, and Mediterranean toppings.",
  },
  {
    name: "Pesto Vegetable Sandwich",
    category: "Sandwiches",
    time: "Quick bite",
    stat: "Whole wheat",
    image: "/assets/pesto-sandwich.png",
    copy: "Fresh veggies and premium pesto sauce in whole wheat bread.",
  },
  {
    name: "Blueberry Banana Smoothie",
    category: "Smoothies",
    time: "Instant energy",
    stat: "Sugar-free",
    image: "/assets/blueberry-smoothie.png",
    copy: "A delicious, sugar-free blend of blueberries and banana.",
  },
];`
);

content = content.replace(
  /const bowlOptions = \{[\s\S]*?\};/,
  `const bowlOptions = {
  base: ["Brown Rice", "White Rice", "Pasta", "Lettuce"],
  protein: ["Paneer", "Chickpeas", "Falafel", "Sprouts"],
  extras: ["Olives", "Broccoli", "Bell Peppers", "Mushroom"],
};`
);

fs.writeFileSync(appPath, content, 'utf8');
console.log('App.jsx updated successfully');
