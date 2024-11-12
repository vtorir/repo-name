// Получение ссылок на элементы
var modal = document.getElementById("myModal");
var btn = document.getElementById("openModalBtn");
var span = document.getElementsByClassName("close")[0];

// Открытие модального окна при клике на кнопку
btn.onclick = function() {
    modal.style.display = "block";
}

// Закрытие модального окна при клике на крестик
span.onclick = function() {
    modal.style.display = "none";
}

// Закрытие модального окна при клике вне его
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


