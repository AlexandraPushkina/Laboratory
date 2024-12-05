import './App.css';
import React, { useState, useEffect } from 'react';
import DishCards from './dishCards/dishCards';

function App() {
  const [jsonData, setJsonData] = useState(null);
  const [mealType, setMealType] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const mealTypes = ['Breakfast', 'Lunch', 'Dinner', 'Teatime'];

  const handleSubmit = async () => {
    if (mealType) { // Запрос только если mealType не пустой
      setLoading(true);
      setError(null);
      try {
        const baseUrl = 'https://api.edamam.com/api';
        const idRecipe = 'd48672a8';
        const keyRecipe = 'e7d7b3410a7e1f38145f03ff2f29eb78';
        const url = `${baseUrl}/recipes/v2?type=public&app_id=${idRecipe}&app_key=${keyRecipe}&mealType=${mealType}&field=uri&field=label&field=image&field=images&field=url&field=shareAs&field=healthLabels&field=calories&field=cuisineType&field=mealType&random=true`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setJsonData(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleMealTypeChange = (event) => {   
    setMealType(event.target.value);
    handleSubmit(); 
  };

  useEffect(() => {
    // Вызов handleSubmit один раз при загрузке компонента
    handleSubmit();
  }, [mealType]); // Зависимость от mealType

  return (
    <>
      <div>
        <form>
          <label id="sidebar">
            Meal Type:
            {mealTypes.map((type) => (
              <label key={type}>
                <input
                  type="radio"
                  value={type}
                  checked={mealType === type}
                  onChange={handleMealTypeChange}
                />
                {type}
            </label>
          ))}
        </label>    
        </form>
        </div>
        <div id="dishes">
          {loading && <p>Loading...</p>}
          {jsonData && <DishCards jsonData={jsonData} />}
        </div>
      
    </>
  );
}

export default App;