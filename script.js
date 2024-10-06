const mainButton = document.getElementById('main_button');
const changeButton = document.getElementById('change_button');

changeButton.addEventListener('click', () => {
    changeButton.classList.toggle('changed'); // Добавление/удаление класса
});