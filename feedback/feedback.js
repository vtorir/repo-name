document.addEventListener('DOMContentLoaded', function() {
    // Обработка рейтинга звездами
    const stars = document.querySelectorAll('.stars i');
    
    stars.forEach(star => {
        star.addEventListener('click', function() {
            const rating = this.getAttribute('data-rating');
            
            // Обновляем отображение звезд
            stars.forEach((s, index) => {
                if (index < rating) {
                    s.classList.remove('far');
                    s.classList.add('fas', 'active');
                } else {
                    s.classList.remove('fas', 'active');
                    s.classList.add('far');
                }
            });
            
            // Здесь можно добавить скрытое поле для формы
        });
    });
    
    // Обработка отправки формы
    const form = document.querySelector('.feedback-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Спасибо за ваш отзыв! После модерации он появится на сайте.');
            form.reset();
            
            // Сброс звезд
            stars.forEach(star => {
                star.classList.remove('fas', 'active');
                star.classList.add('far');
            });
        });
    }
});