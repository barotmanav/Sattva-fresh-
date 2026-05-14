const fs = require('fs');
const path = require('path');

const appPath = path.join(__dirname, 'src', 'App.jsx');
let content = fs.readFileSync(appPath, 'utf8');

// Replace all instances of old image paths with the new generated ones
content = content.replace(/\/assets\/real-salad-group\.png/g, '/assets/sattva_salad_bowl.png');
content = content.replace(/\/assets\/real-salad-close\.png/g, '/assets/sattva_rice_bowl.png');
content = content.replace(/\/assets\/real-salad-mix\.png/g, '/assets/sattva_pasta_bowl.png');
content = content.replace(/\/assets\/real-salad-covered\.png/g, '/assets/sattva_salad_bowl.png');
content = content.replace(/\/assets\/real-cut-vegetables-2\.png/g, '/assets/sattva_fresh_ingredients.png');
content = content.replace(/\/assets\/premium-hero\.png/g, '/assets/sattva_smoothie.png');
content = content.replace(/\/assets\/real-salad-packed\.png/g, '/assets/sattva_sandwich.png');
content = content.replace(/\/assets\/real-cut-vegetables\.png/g, '/assets/sattva_fresh_ingredients.png');

// Also update the video paths in ProductExperience and Salad Section if they exist, 
// replacing them with static images since we generated static images.
content = content.replace(/<video src="\/assets\/cut-vegetables\.mp4"[\s\S]*?<\/div>/, 
  `<img className="media-backdrop" src="/assets/sattva_fresh_ingredients.png" alt="Fresh ingredients" />
          <img src="/assets/sattva_fresh_ingredients.png" style={{width: "100%", height: "100%", objectFit: "cover"}} alt="Fresh ingredients" />
          <div className="video-overlay">
            <span>Fresh Ingredients</span>
            <strong>Premium, clean, and healthy</strong>
          </div>`);
          
content = content.replace(/<video src="\/assets\/salad-motion\.mp4"[\s\S]*?<\/div>/, 
  `<img src="/assets/sattva_salad_bowl.png" style={{width: "100%", height: "100%", objectFit: "cover"}} alt="Fresh salad bowl" />
            <div className="salad-badge">Fresh bowl studio</div>`);

fs.writeFileSync(appPath, content, 'utf8');
console.log('Images replaced successfully');
