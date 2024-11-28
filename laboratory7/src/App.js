import './App.css';
import React, { useState } from 'react';
import DishCards from './dishCards/dishCards';

function App() {
  const [jsonData, setJsonData] = useState(null);
  const [mealType, setMealType] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const mealTypes = ['Breakfast', 'Lunch', 'Dinner', 'Teatime'];

  const handleMealTypeChange = (event) => {   
    setMealType(event.target.value);
    console.log(mealType); //почему-то в первый раз ничего не меняет и запрос получается с ошибкой
    handleSubmit(); 
  };

  const handleSubmit = async () => {
    console.log(mealType);
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
  };

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

// export default DataForCard;


// async function addCards(){
//   const dishesArea = document.getElementById('dishes');
//   if (dishesArea) {
//     dishesArea.remove();
//   } 

//   let jsonData = await dataForCard(query);

//   let cards = getDataForCard(jsonData);
// }


// async function createTableWithData(query){

//   const existingTable = document.getElementById('existingTable');
//   if (existingTable) {
//     existingTable.remove();
//   } 

//   const header = document.getElementById("headName");
//   header.innerText = query;
//   const table = document.createElement('table');
//   table.classList.add('table', 'table-hover');
//   table.id = 'existingTable';

//   //get data
//   let jsonData = await takeData(query);

//   const thead = document.createElement('thead');
//   const theadRow = document.createElement('tr');
//   Object.getOwnPropertyNames(jsonData.hits[0].recipe).forEach(element => {
//     if (element !== "digest" && element !== "tags" && element !== "image"){   //excluding big results
//       const th = document.createElement('th');
//       th.innerText = element;
//       theadRow.appendChild(th);
//     }
    
//   });
//   thead.append(theadRow);
//   table.append(thead);
  
//   const tbody = document.createElement('tbody');
//   table.appendChild(tbody);
  
//   //add data in table
//   for (let i=0; i < jsonData.hits.length; i++){
//     const tr = document.createElement('tr');
//     Object.getOwnPropertyNames(jsonData.hits[0].recipe).forEach(element => {
//       if (element !== "digest" && element !== "tags" && element !== "image"){
//         const td = document.createElement("td");
//         td.innerText = jsonData.hits[i].recipe[element];
//         tr.appendChild(td);
//       }
      
//     });
//     tbody.appendChild(tr);
    
//   }
  
//   return table;
// }

// const tablePlace = document.getElementById("tablePlace");

// document.getElementById('Potato').addEventListener('click', () => createTableWithData('Potato').then(result => tablePlace.appendChild(result)));
// document.getElementById('Chicken').addEventListener('click', () => createTableWithData('Chicken').then(result => tablePlace.appendChild(result)));
// document.getElementById('Pear').addEventListener('click', () => createTableWithData('Pear').then(result => tablePlace.appendChild(result)));

// function App() {
//   //const [images, setImages] = useState([]);

//   useEffect(() => {
//     const fetchImages = async () => {
//       try {
//         const response = await fetch('/api/images'); // Запрос к API
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const data = await response.json();
//         setImages(data);
//       } catch (error) {
//         console.error('Ошибка при загрузке изображений:', error);
//       }
//     };
//     fetchImages();
//   }, []);

//   const filteredImages = selectedCategory
//     ? images.filter(image => image.category === selectedCategory)
//     : images;

//   const handleCategoryChange = (category) => {
//     setSelectedCategory(category);
//   };
//   return (
//     <div>
//       <div>
//         {/* Выпадающий список категорий */}
//         <select onChange={(e) => handleCategoryChange(e.target.value)}>
//           <option value={null}>Все категории</option>
//           {/* Добавьте сюда опции для каждой уникальной категории */}
//           {
//               [...new Set(images.map(image => image.category))].map(category => (
//                 <option key={category} value={category}>{category}</option>
//               ))
//           }
//         </select>
//       </div>
//       <ul>
//         {filteredImages.map(image => (
//           <li key={image.id}>
//             <img src={image.image} alt={image.name} />
//             <p>{image.name}</p>
//             <p>Категория: {image.category}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default App;

