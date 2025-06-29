import React, { useState } from 'react';

const App: React.FC = () => {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [suggestedIngredients, setSuggestedIngredients] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState('home');
  const [isLoading, setIsLoading] = useState(false);
  const [shoppingList] = useState([
    { id: 1, name: 'Pasta', price: 2.99, quantity: 1, unit: 'pack' },
    { id: 2, name: 'Garlic', price: 0.99, quantity: 2, unit: 'bulb' },
    { id: 3, name: 'Heavy Cream', price: 3.49, quantity: 1, unit: 'pint' },
    { id: 4, name: 'Parmesan Cheese', price: 4.99, quantity: 1, unit: 'block' },
    { id: 5, name: 'Olive Oil', price: 6.99, quantity: 1, unit: 'bottle' },
    { id: 6, name: 'Black Pepper', price: 2.49, quantity: 1, unit: 'jar' }
  ]);

  const allIngredients = [
    'Chicken', 'Eggs', 'Milk', 'Flour', 'Sugar', 'Salt', 'Pepper', 'Onion',
    'Garlic', 'Tomato', 'Potato', 'Carrot', 'Broccoli', 'Rice', 'Pasta',
    'Cheese', 'Butter', 'Olive oil', 'Lemon', 'Beef', 'Pork', 'Fish'
  ];

  const [recipes] = useState([
    {
      id: 1,
      name: 'Creamy Garlic Pasta',
      image: 'https://readdy.ai/api/search-image?query=Creamy%20garlic%20pasta%20dish%20with%20parmesan%20cheese...',
      time: '25 min',
      matchPercentage: 95,
      missingIngredients: 1,
      isSaved: false
    },
    {
      id: 2,
      name: 'Vegetable Stir Fry',
      image: 'https://readdy.ai/api/search-image?query=Colorful%20vegetable%20stir%20fry...',
      time: '20 min',
      matchPercentage: 88,
      missingIngredients: 2,
      isSaved: false
    },
    {
      id: 3,
      name: 'Fluffy Pancakes',
      image: 'https://readdy.ai/api/search-image?query=Stack%20of%20fluffy%20golden%20pancakes...',
      time: '15 min',
      matchPercentage: 100,
      missingIngredients: 0,
      isSaved: false // ✅ Added missing property
    },
    {
      id: 4,
      name: 'Chicken Curry',
      image: 'https://readdy.ai/api/search-image?query=Rich%20and%20aromatic%20chicken%20curry...',
      time: '40 min',
      matchPercentage: 75,
      missingIngredients: 3,
      isSaved: false
    }
  ]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    if (value.trim()) {
      const filtered = allIngredients.filter(item =>
        item.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestedIngredients(filtered);
    } else {
      setSuggestedIngredients([]);
    }
  };

  const addIngredient = (ingredient: string) => {
    if (ingredient.trim() && !ingredients.includes(ingredient)) {
      setIngredients([...ingredients, ingredient]);
      setInputValue('');
      setSuggestedIngredients([]);
    }
  };

  const removeIngredient = (ingredient: string) => {
    setIngredients(ingredients.filter(item => item !== ingredient));
  };

  const handleSearch = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1500);
  };

  const handleVoiceInput = () => {
    alert('Voice input activated!');
  };

  const handleCameraInput = () => {
    alert('Camera scanning activated!');
  };

  return (
    <div style={{ padding: '1rem', fontFamily: 'Arial' }}>
      <h1>Recipe Finder</h1>

      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Type an ingredient"
      />
      <button onClick={handleSearch}>Search</button>
      <button onClick={handleVoiceInput}>🎤</button>
      <button onClick={handleCameraInput}>📷</button>

      <h2>Suggestions</h2>
      <ul>
        {suggestedIngredients.map((item, i) => (
          <li key={i} onClick={() => addIngredient(item)} style={{ cursor: 'pointer' }}>
            {item}
          </li>
        ))}
      </ul>

      <h2>My Ingredients</h2>
      <ul>
        {ingredients.map((item, i) => (
          <li key={i}>
            {item} <button onClick={() => removeIngredient(item)}>Remove</button>
          </li>
        ))}
      </ul>

      <h2>Recipes</h2>
      {isLoading ? (
        <p>Loading recipes...</p>
      ) : (
        <ul>
          {recipes.map(recipe => (
            <li key={recipe.id} style={{ marginBottom: '1rem' }}>
              <img src={recipe.image} alt={recipe.name} width={150} height={150} />
              <h3>{recipe.name}</h3>
              <p>Time: {recipe.time}</p>
              <p>Match: {recipe.matchPercentage}%</p>
              <p>Missing: {recipe.missingIngredients}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default App;
import React, { useState } from 'react';

const App: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [suggestedIngredients, setSuggestedIngredients] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('home');

  const categories = [
    { name: 'Vegetables', icon: 'fa-carrot' },
    { name: 'Fruits', icon: 'fa-apple-whole' },
    { name: 'Proteins', icon: 'fa-drumstick-bite' },
    { name: 'Dairy', icon: 'fa-cheese' },
    { name: 'Grains', icon: 'fa-wheat-awn' },
  ];

  const recipes = [
    {
      id: 1,
      name: 'Creamy Garlic Pasta',
      image: 'https://via.placeholder.com/150',
      time: '25 min',
      matchPercentage: 95,
      missingIngredients: 1,
    },
    {
      id: 2,
      name: 'Vegetable Stir Fry',
      image: 'https://via.placeholder.com/150',
      time: '20 min',
      matchPercentage: 88,
      missingIngredients: 2,
    },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setSuggestedIngredients(
      value
        ? ['Eggs', 'Milk', 'Chicken'].filter((item) =>
            item.toLowerCase().includes(value.toLowerCase())
          )
        : []
    );
  };

  const addIngredient = (ingredient: string) => {
    if (!ingredients.includes(ingredient)) {
      setIngredients([...ingredients, ingredient]);
      setInputValue('');
      setSuggestedIngredients([]);
    }
  };

  const removeIngredient = (ingredient: string) => {
    setIngredients(ingredients.filter((item) => item !== ingredient));
  };

  const handleSearch = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1500);
  };

  const handleVoiceInput = () => alert('Voice input activated!');
  const handleCameraInput = () => alert('Camera input activated!');
  const handleCategorySelect = (categoryName: string) => {
    alert(`Filter by ${categoryName}`);
  };
  const handleRecipeSelect = (recipeId: number) => {
    alert(`View recipe with ID: ${recipeId}`);
  };

  return (
    <div className="p-4">
      <main>
        <>
          {/* All your existing JSX goes here (from your previous message)... */}
          {/* I can reintegrate the cleaned JSX if you'd like in full again. */}
        </>
      </main>

      {/* Floating Button */}
      <button className="fixed right-4 bottom-20 bg-[#FF9EAF] text-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center cursor-pointer">
        <i className="fas fa-shopping-cart text-lg"></i>
      </button>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 w-full bg-white border-t border-gray-200 flex justify-around items-center py-2 px-4 z-10">
        {['home', 'saved', 'shopping', 'profile'].map((tab) => (
          <button
            key={tab}
            className={`flex flex-col items-center py-1 px-3 cursor-pointer ${
              activeTab === tab ? 'text-[#FF9EAF]' : 'text-gray-500'
            }`}
            onClick={() => setActiveTab(tab)}
          >
            <i className={`fas fa-${tab === 'home' ? 'home' : tab} text-xl mb-1`}></i>
            <span className="text-xs">{tab.charAt(0).toUpperCase() + tab.slice(1)}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default App;
