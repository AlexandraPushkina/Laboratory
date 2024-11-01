const baseUrl = 'https://api.edamam.com/api'; // Замените на ваш Endpoint 1
const idRecipe = 'd48672a8';
const keyRecipe = 'e7d7b3410a7e1f38145f03ff2f29eb78';
//const baseUrl = 'https://api.balldontlie.io/v1'; // Замените на ваш Endpoint 1
const dataTable = document.getElementById('dataTable');

function fetchData() {
    fetch(baseUrl)
        .then(response =>    {
            if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          // Display data in an HTML element
          outputElement.textContent = JSON.stringify(data, null, 2);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }

document.getElementById('button').addEventListener('click', () => fetchData(baseUrl));


async function fetchData2() {
  const url = baseUrl+ `/recipes/v2?type=public&app_id=${idRecipe}&app_key=${keyRecipe}` ;
  let response = await fetch(url);
  console.log(response.json());
  }

fetchData2();
//document.getElementById('button').addEventListener('click', () => fetchData(baseUrl));


