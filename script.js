document.addEventListener("DOMContentLoaded", function() {
  // 1. Карусель в секции "О нас"
  const aboutCarouselInner = document.querySelector('.carousel-section .carousel-inner');
  const aboutSlides = document.querySelectorAll('.carousel-section .carousel-item');
  const aboutPrevBtn = document.querySelector('.carousel-section .prev');
  const aboutNextBtn = document.querySelector('.carousel-section .next');
  
  if (aboutSlides.length > 0 && aboutCarouselInner) {
    let aboutCurrentIndex = 0;
    const aboutSlideCount = aboutSlides.length;
    
    function moveAboutCarousel() {
      aboutCarouselInner.style.transform = `translateX(-${aboutCurrentIndex * 100}%)`;
    }
    
    if (aboutPrevBtn) {
      aboutPrevBtn.addEventListener('click', function() {
        aboutCurrentIndex = (aboutCurrentIndex - 1 + aboutSlideCount) % aboutSlideCount;
        moveAboutCarousel();
      });
    }
    
    if (aboutNextBtn) {
      aboutNextBtn.addEventListener('click', function() {
        aboutCurrentIndex = (aboutCurrentIndex + 1) % aboutSlideCount;
        moveAboutCarousel();
      });
    }
    
    moveAboutCarousel();
  }

  // 2. Галерея-карусель
  const galleryTrack = document.querySelector('.gallery-carousel .carousel-track');
  const gallerySlides = document.querySelectorAll('.gallery-carousel .carousel-slide');
  const galleryPrevBtn = document.querySelector('.gallery-carousel .carousel-prev');
  const galleryNextBtn = document.querySelector('.gallery-carousel .carousel-next');
  const galleryDotsContainer = document.querySelector('.gallery-carousel .carousel-dots');
  
  if (gallerySlides.length > 0 && galleryTrack) {
    let currentGalleryIndex = 0;
    const gallerySlideCount = gallerySlides.length;
    
    if (galleryDotsContainer) {
      galleryDotsContainer.innerHTML = '';
      gallerySlides.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.classList.add('carousel-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
          currentGalleryIndex = index;
          moveGalleryCarousel();
          updateDots();
        });
        galleryDotsContainer.appendChild(dot);
      });
    }
    
    function moveGalleryCarousel() {
      galleryTrack.style.transform = `translateX(-${currentGalleryIndex * 100}%)`;
    }
    
    function updateDots() {
      document.querySelectorAll('.gallery-carousel .carousel-dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === currentGalleryIndex);
      });
    }
    
    if (galleryPrevBtn) {
      galleryPrevBtn.addEventListener('click', function() {
        currentGalleryIndex = (currentGalleryIndex - 1 + gallerySlideCount) % gallerySlideCount;
        moveGalleryCarousel();
        updateDots();
      });
    }
    
    if (galleryNextBtn) {
      galleryNextBtn.addEventListener('click', function() {
        currentGalleryIndex = (currentGalleryIndex + 1) % gallerySlideCount;
        moveGalleryCarousel();
        updateDots();
      });
    }
    
    let galleryInterval = setInterval(() => {
      currentGalleryIndex = (currentGalleryIndex + 1) % gallerySlideCount;
      moveGalleryCarousel();
      updateDots();
    }, 5000);
    
    const galleryCarousel = document.querySelector('.gallery-carousel');
    if (galleryCarousel) {
      galleryCarousel.addEventListener('mouseenter', () => clearInterval(galleryInterval));
      galleryCarousel.addEventListener('mouseleave', () => {
        galleryInterval = setInterval(() => {
          currentGalleryIndex = (currentGalleryIndex + 1) % gallerySlideCount;
          moveGalleryCarousel();
          updateDots();
        }, 5000);
      });
    }
    
    moveGalleryCarousel();
    updateDots();
  }

  // 3. Модальное окно бронирования
  const modal = document.getElementById("myModal");
  const modalBtn = document.getElementById("openModalBtn");
  const modalClose = document.querySelector(".close");
  const form = document.getElementById("bookingForm");
  const steps = document.querySelectorAll(".form-step");
  const btnNext = document.querySelector(".btn-next");
  const btnPrev = document.querySelector(".btn-prev");
  let currentStep = 0;
  
  if (steps.length > 0) steps[0].classList.add("active");
  
  if (modalBtn) modalBtn.addEventListener("click", openModal);
  if (modalClose) modalClose.addEventListener("click", closeModal);
  window.addEventListener("click", (e) => e.target === modal && closeModal());
  
  if (btnNext) btnNext.addEventListener("click", nextStep);
  if (btnPrev) btnPrev.addEventListener("click", prevStep);
  
  function openModal() {
    if (modal) {
      modal.style.display = "block";
      document.body.style.overflow = "hidden";
      currentStep = 0;
      showStep(currentStep);
    }
  }
  
  function closeModal() {
    if (modal) {
      modal.style.display = "none";
      document.body.style.overflow = "";
    }
  }
  
  function showStep(step) {
    steps.forEach((s, i) => {
      s.classList.toggle("active", i === step);
    });
  }
  
  function nextStep() {
    if (validateStep(currentStep)) {
      currentStep++;
      showStep(currentStep);
      if (currentStep === 1) renderSeatMap();
    }
  }
  
  function prevStep() {
    currentStep--;
    showStep(currentStep);
  }
  
  function validateStep(step) {
    if (step === 0) {
      const date = document.getElementById("date");
      const time = document.getElementById("time");
      if (!date.value || !time.value) {
        alert("Пожалуйста, укажите дату и время");
        return false;
      }
    }
    return true;
  }
  
  function renderSeatMap() {
    const container = document.querySelector(".seats-container");
    if (!container) return;
    
    // Очищаем предыдущую схему
    const existingMap = container.querySelector('.seat-map');
    if (existingMap) existingMap.remove();
    
    let html = '<div class="seat-map">';
    for (let i = 1; i <= 10; i++) {
      html += `<div class="seat free" data-seat="${i}">${i}</div>`;
    }
    html += '</div>';
    
    container.insertAdjacentHTML('afterbegin', html);
    
    document.querySelectorAll('.seat.free').forEach(seat => {
      seat.addEventListener('click', function() {
        document.querySelectorAll('.seat').forEach(s => {
          s.classList.remove('selected');
        });
        this.classList.add('selected');
      });
    });
  }
  
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const selectedSeat = document.querySelector('.seat.selected');
      if (!selectedSeat && currentStep === 1) {
        alert("Пожалуйста, выберите столик");
        return;
      }
      
      const booking = {
        date: this.date.value,
        time: this.time.value,
        guests: this.guests.value,
        seat: selectedSeat?.dataset.seat || '',
        preferences: this.preferences.value
      };
      
      console.log("Бронирование:", booking); // Для отладки
      alert('Столик успешно забронирован!');
      closeModal();
      this.reset();
      
      // Сброс шагов
      currentStep = 0;
      showStep(currentStep);
    });
  }
});