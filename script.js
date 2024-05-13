document.addEventListener("DOMContentLoaded", function() {
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");
  const reviewsContainer = document.querySelector(".reviews-container");
  const reviews = document.querySelectorAll(".review");
  const reviewWidth = reviews[0].offsetWidth;

  let currentIndex = 0;

  // Функция для перемещения карусели влево
  function slideLeft() {
    if (currentIndex > 0) {
      currentIndex--;
      const newPosition = -currentIndex * reviewWidth;
      reviewsContainer.style.transform = `translateX(${newPosition}px)`;
    }
  }

  // Функция для перемещения карусели вправо
  function slideRight() {
    if (currentIndex < reviews.length - 1) {
      currentIndex++;
      const newPosition = -currentIndex * reviewWidth;
      reviewsContainer.style.transform = `translateX(${newPosition}px)`;
    }
  }

  // Обработчики событий для кнопок "Предыдущий" и "Следующий"
  prevBtn.addEventListener("click", slideLeft);
  nextBtn.addEventListener("click", slideRight);
});




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

