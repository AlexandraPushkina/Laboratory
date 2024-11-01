const baseUrl = 'https://api.edamam.com/api'; // Замените на ваш Endpoint 1
const idRecipe = 'd48672a8';
const keyRecipe = 'e7d7b3410a7e1f38145f03ff2f29eb78';
const dataTable = document.getElementById('dataTable');

document.getElementById('button').addEventListener('click', () => fetchData(baseUrl));

async function fetchData() {
  const q = 'q=chicken';
  const url = baseUrl+ `/recipes/v2?type=public&${q}&app_id=${idRecipe}&app_key=${keyRecipe}` ;
  let response = await fetch(url).then(response => response.json());
  console.log(response);
  }

fetchData();
//document.getElementById('button').addEventListener('click', () => fetchData(baseUrl));


