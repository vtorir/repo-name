document.addEventListener("DOMContentLoaded", function() {
    // Фильтрация меню
    const filterButtons = document.querySelectorAll('.filter-btn');
    const dishes = document.querySelectorAll('.dish');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Удаляем активный класс у всех кнопок
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Добавляем активный класс текущей кнопке
            button.classList.add('active');
            
            const category = button.dataset.category;
            
            // Фильтруем блюда
            dishes.forEach(dish => {
                if (category === 'all' || dish.dataset.category === category) {
                    dish.style.display = 'flex';
                } else {
                    dish.style.display = 'none';
                }
            });
        });
    });
});