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

