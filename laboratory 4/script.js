const apiUrl = 'https://api.edamam.com/api/recipes/v2'; // Замените на ваш Endpoint 1
const dataTable = document.getElementById('dataTable');

function fetchData() {
    fetch(apiUrl)
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

document.getElementById('button').addEventListener('click', () => fetchData(apiUrl));

