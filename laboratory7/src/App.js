import './App.css';
import React, { useState, useEffect } from 'react';
import DishCards from './dishCards/dishCards';


document.getElementById("button1").onclick = DataForCard;
function GetResponseText(){
  
  const [mealType, setmealType] = useState(null); // Тип блюда (завтрак, обед, ужин и т.д.)
  const [cuisineType, setcuisinType] = useState(null); // Кухня (американская, русская и т.д.)
  //const [isForVegan, setisForVegan] = useState(false); // Подходит ли веганам

  const baseUrl = 'https://api.edamam.com/api'; // Замените на ваш Endpoint 1
  const idRecipe = 'd48672a8';
  const keyRecipe = 'e7d7b3410a7e1f38145f03ff2f29eb78';
  setmealType(document.querySelector("input[name='mealType']:checked"));
  setcuisinType(document.querySelector("input[name='cuisineType']:checked"));
  const isMealtypeNull = (mealType == "");
  const query = mealType + isMealtypeNull?"":"," + cuisineType;
  const url = baseUrl + `/recipes/v2?type=public&q=${query}&app_id=${idRecipe}&app_key=${keyRecipe}&field=uri&field=label&field=image&field=images&field=url&field=shareAs&field=dietLabels&field=healthLabels&field=ingredients&field=calories&field=totalTime&field=cuisineType&field=mealType&field=dishType` ;

  DataForCard(url);
}
//Получаем данные для карт, делаем запрос
async function DataForCard(url){
  const [jsonData, setJsonData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try{
        let response = await fetch(url);
        const data = await response.json();
        setJsonData(data);
        } catch (error){
          console.error("Ошибка при получении данных: ", error);
      }
    };
  fetchData();
  }, []);

  return (
    <div>
        {jsonData && <DishCards jsonData={jsonData} />} 
        <button onclick={GetResponseText}>
          start
        </button>
    </div>
  );
}

export default DataForCard;


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

