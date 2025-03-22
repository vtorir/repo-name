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

let currentSlide = 0; 
  
function moveSlide(direction) { 
    const slides = document.querySelectorAll('.carousel-image'); 
    const totalSlides = slides.length; 

    currentSlide += direction; 

    if (currentSlide < 0) { 
        currentSlide = totalSlides - 1; 
    } else if (currentSlide >= totalSlides) { 
        currentSlide = 0; 
    } 

    const offset = -currentSlide * 100; 
    document.querySelector('.carousel-images').style.transform = `translateX(${offset}%)`; 
} 

let currentIndex = 0;
const carouselInner = document.querySelector('.carousel-inner');
const items = document.querySelectorAll('.carousel-item');
const totalItems = items.length;

// Функция для перелистывания
function showNextItem() {
    currentIndex = (currentIndex + 1) % totalItems; // Переход к следующему элементу
    const offset = -currentIndex * 100;
    carouselInner.style.transform = `translateX(${offset}%)`;
}

// Автоматическое перелистывание каждые 10 секунд
setInterval(showNextItem, 10000);

// Ручное перелистывание
document.querySelector('.carousel-control.next').addEventListener('click', showNextItem);

document.querySelector('.carousel-control.prev').addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + totalItems) % totalItems; // Переход к предыдущему элементу
    const offset = -currentIndex * 100;
    carouselInner.style.transform = `translateX(${offset}%)`;
});

