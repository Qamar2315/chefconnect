// seeds/recipes.js

const mongoose = require('mongoose');
const Recipe = require('./models/recepie');

mongoose.connect('mongodb://localhost:27017/cheff_connect_database', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

const recipes = [
  {
    title: 'Spaghetti Carbonara',
    description: 'A classic Italian pasta dish made with eggs, cheese, pancetta, and black pepper.',
    ingredients: ['Spaghetti', 'Eggs', 'Pancetta', 'Parmesan cheese', 'Black pepper'],
    instructions: ['Cook spaghetti according to package instructions.', 'Cook pancetta until crispy.', 'Combine eggs, Parmesan cheese, and black pepper in a bowl.', 'Mix cooked spaghetti with the egg mixture.', 'Add cooked pancetta.', 'Serve hot.'],
    cookingTime: 20,
    servings: 4,
    author: 'ItalianChef123',
    category: 'Main Course',
    tags: ['Italian', 'Pasta', 'Quick'],
  },
  {
    title: 'Chocolate Chip Cookies',
    description: 'Classic homemade cookies loaded with chocolate chips.',
    ingredients: ['All-purpose flour', 'Butter', 'Brown sugar', 'Granulated sugar', 'Egg', 'Vanilla extract', 'Baking soda', 'Salt', 'Chocolate chips'],
    instructions: ['Preheat oven to 350°F (175°C).', 'Cream together butter, brown sugar, and granulated sugar.', 'Add egg and vanilla extract, mix until well combined.', 'In a separate bowl, whisk together flour, baking soda, and salt.', 'Gradually add dry ingredients to the wet mixture.', 'Fold in chocolate chips.', 'Scoop dough onto baking sheets.', 'Bake for 10-12 minutes, until golden brown.', 'Let cool before serving.'],
    cookingTime: 30,
    servings: 24,
    author: 'BakingQueen99',
    category: 'Dessert',
    tags: ['Cookies', 'Chocolate', 'Baking'],
  },
  {
    title: 'Chicken Tikka Masala',
    description: 'A popular Indian dish consisting of marinated chicken in a spiced curry sauce.',
    ingredients: ['Chicken thighs', 'Yogurt', 'Garam masala', 'Ginger', 'Garlic', 'Tomato sauce', 'Heavy cream', 'Onion', 'Rice'],
    instructions: ['Marinate chicken thighs in yogurt, garam masala, ginger, and garlic.', 'Grill or bake marinated chicken until cooked through.', 'In a separate pan, sauté onions until soft.', 'Add tomato sauce and simmer.', 'Stir in heavy cream.', 'Add cooked chicken to the sauce.', 'Serve with rice.'],
    cookingTime: 45,
    servings: 6,
    author: 'CurryKing77',
    category: 'Main Course',
    tags: ['Indian', 'Curry', 'Chicken'],
  },
  {
    title: 'Caprese Salad',
    description: 'A simple Italian salad made with fresh tomatoes, mozzarella cheese, basil, olive oil, and balsamic vinegar.',
    ingredients: ['Tomatoes', 'Fresh mozzarella cheese', 'Fresh basil leaves', 'Extra virgin olive oil', 'Balsamic vinegar', 'Salt', 'Pepper'],
    instructions: ['Slice tomatoes and fresh mozzarella cheese.', 'Arrange tomato slices and mozzarella slices on a plate, alternating them.', 'Layer fresh basil leaves on top.', 'Drizzle with extra virgin olive oil and balsamic vinegar.', 'Season with salt and pepper to taste.'],
    cookingTime: 10,
    servings: 4,
    author: 'FreshAndSimple',
    category: 'Appetizer',
    tags: ['Italian', 'Salad', 'Vegetarian'],
  },
  {
    title: 'Beef Stroganoff',
    description: 'A Russian dish made with sautéed beef in a creamy sauce, served over egg noodles.',
    ingredients: ['Beef sirloin', 'Onion', 'Garlic', 'Mushrooms', 'Beef broth', 'Sour cream', 'Dijon mustard', 'Egg noodles'],
    instructions: ['Slice beef sirloin thinly.', 'Sauté beef, onion, and garlic until beef is browned.', 'Add mushrooms and cook until softened.', 'Stir in beef broth, sour cream, and Dijon mustard.', 'Simmer until sauce thickens.', 'Serve over cooked egg noodles.'],
    cookingTime: 40,
    servings: 6,
    author: 'RussianCuisineMaster',
    category: 'Main Course',
    tags: ['Russian', 'Beef', 'Comfort Food'],
  },
  {
    title: 'Caesar Salad',
    description: 'A classic salad made with romaine lettuce, croutons, Parmesan cheese, and Caesar dressing.',
    ingredients: ['Romaine lettuce', 'Croutons', 'Parmesan cheese', 'Caesar dressing'],
    instructions: ['Wash and chop romaine lettuce.', 'Toss lettuce with croutons, Parmesan cheese, and Caesar dressing until well coated.', 'Serve immediately.'],
    cookingTime: 15,
    servings: 4,
    author: 'SaladFanatic',
    category: 'Salad',
    tags: ['Salad', 'Vegetarian', 'Quick'],
  },
  {
    title: 'Beef Tacos',
    description: 'Mexican street-style tacos made with seasoned beef, salsa, and fresh toppings.',
    ingredients: ['Ground beef', 'Taco seasoning', 'Tortillas', 'Salsa', 'Lettuce', 'Tomato', 'Onion', 'Cheese', 'Sour cream'],
    instructions: ['Cook ground beef with taco seasoning until browned and cooked through.', 'Warm tortillas in a skillet or microwave.', 'Assemble tacos with cooked beef, salsa, lettuce, tomato, onion, cheese, and sour cream.', 'Serve immediately.'],
    cookingTime: 25,
    servings: 8,
    author: 'TacoTuesday',
    category: 'Main Course',
    tags: ['Mexican', 'Tacos', 'Street Food'],
  },
  {
    title: 'Mushroom Risotto',
    description: 'Creamy Italian rice dish made with Arborio rice, mushrooms, onions, and Parmesan cheese.',
    ingredients: ['Arborio rice', 'Mushrooms', 'Onion', 'Garlic', 'White wine', 'Vegetable broth', 'Parmesan cheese', 'Butter'],
    instructions: ['Sauté mushrooms, onions, and garlic until softened.', 'Add Arborio rice and cook until translucent.', 'Deglaze with white wine and cook until absorbed.', 'Gradually add vegetable broth, stirring constantly until absorbed.', 'Stir in Parmesan cheese and butter until creamy.', 'Serve hot.'],
    cookingTime: 35,
    servings: 6,
    author: 'RisottoMaster',
    category: 'Main Course',
    tags: ['Italian', 'Risotto', 'Vegetarian'],
  },
  {
    title: 'Gazpacho',
    description: 'A refreshing Spanish cold soup made with ripe tomatoes, cucumbers, bell peppers, onions, garlic, and olive oil.',
    ingredients: ['Tomatoes', 'Cucumber', 'Bell pepper', 'Onion', 'Garlic', 'Olive oil', 'Red wine vinegar', 'Bread', 'Salt', 'Pepper'],
    instructions: ['Combine tomatoes, cucumber, bell pepper, onion, and garlic in a blender.', 'Blend until smooth.', 'Add olive oil, red wine vinegar, and torn bread pieces.', 'Season with salt and pepper.', 'Chill in the refrigerator for at least 2 hours before serving.', 'Garnish with diced vegetables before serving.'],
    cookingTime: 10,
    servings: 6,
    author: 'SpanishCuisine',
    category: 'Soup',
    tags: ['Spanish', 'Soup', 'Cold'],
  },
  {
    title: 'Pancakes',
    description: 'Classic breakfast pancakes made with flour, milk, eggs, sugar, baking powder, and butter.',
    ingredients: ['All-purpose flour', 'Milk', 'Eggs', 'Sugar', 'Baking powder', 'Butter', 'Maple syrup'],
    instructions: ['In a bowl, whisk together flour, sugar, baking powder, and a pinch of salt.', 'In another bowl, beat eggs, then add milk and melted butter.', 'Combine wet and dry ingredients, mixing until just combined.', 'Heat a lightly greased skillet over medium heat.', 'Pour batter onto skillet, cooking until bubbles form on the surface.', 'Flip and cook until golden brown.', 'Serve hot with maple syrup.'],
    cookingTime: 20,
    servings: 4,
    author: 'BreakfastLover',
    category: 'Breakfast',
    tags: ['Breakfast', 'Pancakes', 'Classic'],
  },
];

async function seedDB() {
  try {
    await Recipe.deleteMany({});
    console.log('Old data removed, seeding new data...');
    await Recipe.insertMany(recipes);
    console.log('Seed data inserted successfully!');
  } catch (err) {
    console.error('Error seeding data:', err);
  } finally {
    mongoose.disconnect();
  }
}

seedDB();
