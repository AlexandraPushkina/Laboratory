const baseUrl = 'https://api.edamam.com/api'; // Замените на ваш Endpoint 1
const idRecipe = 'd48672a8';
const keyRecipe = 'e7d7b3410a7e1f38145f03ff2f29eb78';
const dataTable = document.getElementById('dataTable');


async function takeData(query){
  const url = baseUrl + `/recipes/v2?type=public&q=${query}&app_id=${idRecipe}&app_key=${keyRecipe}` ;
  let response = fetch(url).then(response => response.json());
  return response;
}


async function createTableWithData(query){
  const header = document.getElementById("headName");
  header.innerText = query;
  const table = document.createElement('table');
  table.classList.add('table', 'table-hover');

  //get data
  let jsonData = await takeData(query);

  const thead = document.createElement('thead');
  const theadRow = document.createElement('tr');
  Object.getOwnPropertyNames(jsonData.hits[0].recipe).forEach(element => {
    const th = document.createElement('th');
    th.innerText = element;
    theadRow.appendChild(th);
    
  });
  thead.append(theadRow);
  table.append(thead);
  

  //add data in table
 // for (let i=0; i < jsonData.hits.length; i++){
 //   const tr = documnent.createElement("tr");
 //   
 // }
  
  return table;
}

const tablePlace = document.getElementById("tablePlace");
let table = createTableWithData("potato").then(result => tablePlace.appendChild(result));


