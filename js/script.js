


//Бургер меню

$(document).ready(function () {
	$('.header__burger').click(function (event) {
		$('.header__burger,.header__menu').toggleClass('active');
		$('body').toggleClass('lock')
	});
	$('.header__menu a').click(function () {
		$('.header__burger,.header__menu').removeClass('active');
		$('body').removeClass('lock');
	});
});

// Из фото в БГ
function ibg() {

	let ibg = document.querySelectorAll(".ibg");
	for (var i = 0; i < ibg.length; i++) {
		if (ibg[i].querySelector('img')) {
			ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
		}
	}
}

ibg();


// Галерея 



document.addEventListener("DOMContentLoaded", () => {
	const grid = document.querySelector(".grid"); // Галерея
	const filterButtons = document.querySelectorAll(".filter-btn"); // Кнопки фильтров
	const loadMoreBtn = document.getElementById("load-more"); // Кнопка "More"
	const leftArrow = document.querySelector(".left-arrow"); // Левая стрелка
	const rightArrow = document.querySelector(".right-arrow"); // Правая стрелка

	const allItems = Array.from(document.querySelectorAll(".grid-item")); // Все элементы галереи
	let currentFilter = "all"; // Активный фильтр
	let visibleCount = 5; // Количество отображаемых элементов
	const filters = Array.from(filterButtons).map(btn => btn.getAttribute("data-filter")); // Список фильтров
	let currentFilterIndex = filters.indexOf(currentFilter); // Индекс текущего фильтра

	// Функция для определения количества отображаемых элементов на основе ширины экрана
	function getVisibleCount() {
		return window.innerWidth <= 424 ? 3 : 5;
	}

	// Функция для отображения фотографий
	function renderGallery() {
		const filteredItems = currentFilter === "all"
			? allItems
			: allItems.filter(item => item.classList.contains(currentFilter));

		// Ограничить количество отображаемых элементов
		const maxVisibleCount = Math.min(visibleCount, filteredItems.length);

		// Скрыть все элементы сначала
		allItems.forEach(item => item.style.display = "none");

		// Показать только первые maxVisibleCount элементов
		filteredItems.slice(0, maxVisibleCount).forEach(item => {
			item.style.display = "block";
		});

		// Скрыть кнопку "More", если больше нечего показывать
		loadMoreBtn.style.display = (visibleCount >= filteredItems.length) ? "none" : "block";

		// Обновить активную кнопку фильтра
		filterButtons.forEach(btn => btn.classList.remove("active"));
		document.querySelector(`.filter-btn[data-filter="${currentFilter}"]`).classList.add("active");
	}

	// Обработчик для фильтров
	filterButtons.forEach(button => {
		button.addEventListener("click", () => {
			currentFilter = button.getAttribute("data-filter"); // Получить фильтр
			currentFilterIndex = filters.indexOf(currentFilter); // Обновить индекс фильтра
			visibleCount = getVisibleCount(); // Установить начальное значение visibleCount
			renderGallery(); // Перерисовать галерею
		});
	});

	// Обработчик для кнопки "More"
	loadMoreBtn.addEventListener("click", () => {
		const increment = getVisibleCount(); // Увеличение зависит от ширины экрана
		visibleCount += increment; // Увеличить количество отображаемых элементов
		renderGallery(); // Перерисовать галерею
	});

	// Обработчик для стрелочек
	leftArrow.addEventListener("click", () => {
		currentFilterIndex = (currentFilterIndex - 1 + filters.length) % filters.length; // Переключить на предыдущий фильтр
		currentFilter = filters[currentFilterIndex];
		visibleCount = getVisibleCount(); // Сбросить видимые элементы
		renderGallery();
	});

	rightArrow.addEventListener("click", () => {
		currentFilterIndex = (currentFilterIndex + 1) % filters.length; // Переключить на следующий фильтр
		currentFilter = filters[currentFilterIndex];
		visibleCount = getVisibleCount(); // Сбросить видимые элементы
		renderGallery();
	});

	// Обработчик изменения размера экрана
	window.addEventListener("resize", () => {
		const newVisibleCount = getVisibleCount();
		if (newVisibleCount !== visibleCount) {
			visibleCount = newVisibleCount; // Обновить visibleCount при изменении ширины экрана
			renderGallery();
		}
	});

	// Инициализация: отображение галереи с фильтром "all"
	visibleCount = getVisibleCount();
	renderGallery();
});



// СЛАЙДЕР 


document.addEventListener("DOMContentLoaded", () => {
	const slider = document.querySelector(".slider");
	const slides = document.querySelectorAll(".slide");
	const dotsContainer = document.querySelector(".dots");

	let currentIndex = 0;
	let autoSlideInterval;

	// Создаем точки
	slides.forEach((_, index) => {
		const dot = document.createElement("button");
		dot.classList.add("dot");
		if (index === 0) dot.classList.add("active");
		dot.setAttribute("data-index", index);
		dotsContainer.appendChild(dot);

		// Добавляем обработчик события для точек
		dot.addEventListener("click", () => {
			currentIndex = index;
			updateSlider();
			restartAutoSlide(); // Сбросить таймер при клике на точку
		});
	});

	const dots = document.querySelectorAll(".dot");

	function updateSlider() {
		const offset = -currentIndex * 100; // Смещение слайдера
		slider.style.transform = `translateX(${offset}%)`;

		// Обновление активной точки
		dots.forEach(dot => dot.classList.remove("active"));
		dots[currentIndex].classList.add("active");
	}

	// Функция для автоматического переключения
	function autoSlide() {
		currentIndex = (currentIndex + 1) % slides.length; // Переключиться на следующий слайд
		updateSlider();
	}

	// Запуск автоматического переключения
	function startAutoSlide() {
		autoSlideInterval = setInterval(autoSlide, 5000); // Смена слайдов каждые 5 секунд
	}

	// Остановка автоматического переключения
	function stopAutoSlide() {
		clearInterval(autoSlideInterval);
	}

	// Перезапуск таймера
	function restartAutoSlide() {
		stopAutoSlide();
		startAutoSlide();
	}

	// Запускаем таймер при загрузке
	startAutoSlide();

	// Наведение мыши: остановить автоматическую смену слайдов
	slider.addEventListener("mouseenter", stopAutoSlide);

	// Убираем мышь: возобновить автоматическую смену слайдов
	slider.addEventListener("mouseleave", startAutoSlide);

	// Инициализация
	updateSlider();
});
