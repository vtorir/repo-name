document.addEventListener("DOMContentLoaded", function() {
    // Фильтрация вин
    const filterButtons = document.querySelectorAll('.wine-filters .filter-btn');
    const wines = document.querySelectorAll('.wine-container .wine');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Удаляем активный класс у всех кнопок
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Добавляем активный класс текущей кнопке
            button.classList.add('active');
            
            const category = button.dataset.category;
            
            // Фильтруем вина
            wines.forEach(wine => {
                if (category === 'all' || wine.dataset.category === category) {
                    wine.style.display = 'block';
                } else {
                    wine.style.display = 'none';
                }
            });
        });
    });
});