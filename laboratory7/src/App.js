import './App.css';
import getDataForCard from './components/dishCard/dataForDishCard';
import React, { useState, useEffect } from 'react';

const baseUrl = 'https://api.edamam.com/api'; // Замените на ваш Endpoint 1
const idRecipe = 'd48672a8';
const keyRecipe = 'e7d7b3410a7e1f38145f03ff2f29eb78';


  // const breakfastCheckbox = document.getElementById('checkBreakfast');
  // const lunchCheckbox = document.getElementById('checkLunch');
  // const dinnerCheckbox = document.getElementById('checkDinner');
  // const dessertCheckbox = document.getElementById('checkDessert');
  // const americanCheckbox = document.getElementById('checkAmerican'); 
  // const italianCheckbox = document.getElementById('checkItalian'); 
  // const chineseCheckbox = document.getElementById('checkChinese'); 
  // const russianCheckbox = document.getElementById('checkRushian'); 
  // const veganCheckbox = document.getElementById('checkIsForVegan');

  // const selected = [];

  // if (breakfastCheckbox.checked)
  //   selected.push(breakfastCheckbox.innerText);
  // else if (lunchCheckbox.checked)
  //   selected.push(lunchCheckbox.innerText);
  // else if (dinnerCheckbox.checked)
  //   selected.push(dinnerCheckbox.innerText);
  // else if (dessertCheckbox.checked)
  //   selected.push(dessertCheckbox.innerText);
  // else
  //   selected.push("");

  // if (americanCheckbox.checked)
  //   selected.push(americanCheckbox.innerText);
  // else if (italianCheckbox.checked)
  //   selected.push(italianCheckbox.innerText);
  // else if (chineseCheckbox.checked)
  //   selected.push(chineseCheckbox.innerText);
  // else if (russianCheckbox.checked)
  //   selected.push(dessertCheckbox.innerText);
  // else
  //   selected.push("");

  //   if (veganCheckbox.checked)
  //     selected.push(veganCheckbox.checked);

//Получаем данные для карт, делаем запрос
async function dataForCard(){
  const mealTypeSelected = document.querySelector("input[name='mealType']:checked");
  const cuisineTypeSelected = document.querySelector("input[name='cuisineType']:checked");
  const isMealtypeNull = (mealTypeSelected == "");

  const query = mealTypeSelected + isMealtypeNull?"":"," + cuisineTypeSelected;

  const url = baseUrl + `/recipes/v2?type=public&q=${query}&app_id=${idRecipe}&app_key=${keyRecipe}&field=uri&field=label&field=image&field=images&field=url&field=shareAs&field=dietLabels&field=healthLabels&field=ingredients&field=calories&field=totalTime&field=cuisineType&field=mealType&field=dishType` ;
  let response = fetch(url).then(response => response.json());
  return response;
}

async function addCards(){
  const dishesArea = document.getElementById('dishes');
  if (dishesArea) {
    dishesArea.remove();
  } 

  let jsonData = await dataForCard(query);

  let cards = getDataForCard(jsonData);
}


async function createTableWithData(query){

  const existingTable = document.getElementById('existingTable');
  if (existingTable) {
    existingTable.remove();
  } 

  const header = document.getElementById("headName");
  header.innerText = query;
  const table = document.createElement('table');
  table.classList.add('table', 'table-hover');
  table.id = 'existingTable';

  //get data
  let jsonData = await takeData(query);

  const thead = document.createElement('thead');
  const theadRow = document.createElement('tr');
  Object.getOwnPropertyNames(jsonData.hits[0].recipe).forEach(element => {
    if (element !== "digest" && element !== "tags" && element !== "image"){   //excluding big results
      const th = document.createElement('th');
      th.innerText = element;
      theadRow.appendChild(th);
    }
    
  });
  thead.append(theadRow);
  table.append(thead);
  
  const tbody = document.createElement('tbody');
  table.appendChild(tbody);
  
  //add data in table
  for (let i=0; i < jsonData.hits.length; i++){
    const tr = document.createElement('tr');
    Object.getOwnPropertyNames(jsonData.hits[0].recipe).forEach(element => {
      if (element !== "digest" && element !== "tags" && element !== "image"){
        const td = document.createElement("td");
        td.innerText = jsonData.hits[i].recipe[element];
        tr.appendChild(td);
      }
      
    });
    tbody.appendChild(tr);
    
  }
  
  return table;
}

const tablePlace = document.getElementById("tablePlace");

document.getElementById('Potato').addEventListener('click', () => createTableWithData('Potato').then(result => tablePlace.appendChild(result)));
document.getElementById('Chicken').addEventListener('click', () => createTableWithData('Chicken').then(result => tablePlace.appendChild(result)));
document.getElementById('Pear').addEventListener('click', () => createTableWithData('Pear').then(result => tablePlace.appendChild(result)));

function App() {
  //const [images, setImages] = useState([]);
  const [dishesType, setdishesType] = useState(null); // Тип блюда (завтрак, обед, ужин и т.д.)
  const [cuisinType, setcuisinType] = useState(null); // Кухня (американская, русская и т.д.)
  const [isForVegan, setisForVegan] = useState(false); // Подходит ли веганам

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('/api/images'); // Запрос к API
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setImages(data);
      } catch (error) {
        console.error('Ошибка при загрузке изображений:', error);
      }
    };
    fetchImages();
  }, []);

  const filteredImages = selectedCategory
    ? images.filter(image => image.category === selectedCategory)
    : images;

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };
  return (
    <div>
      <div>
        {/* Выпадающий список категорий */}
        <select onChange={(e) => handleCategoryChange(e.target.value)}>
          <option value={null}>Все категории</option>
          {/* Добавьте сюда опции для каждой уникальной категории */}
          {
              [...new Set(images.map(image => image.category))].map(category => (
                <option key={category} value={category}>{category}</option>
              ))
          }
        </select>
      </div>
      <ul>
        {filteredImages.map(image => (
          <li key={image.id}>
            <img src={image.image} alt={image.name} />
            <p>{image.name}</p>
            <p>Категория: {image.category}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

