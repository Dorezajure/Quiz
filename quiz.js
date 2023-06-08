// Поиск всех карточек
const cards = document.querySelectorAll(".plate");

// Добавление класса hidden
cards.forEach(function(card) { card.classList.add("none")
})

// Индекс для карточек стартуем с 0 (Для перемещения)
let currentIndex = 0;

let currentCard = 1; // Для прогресс бара

// Скрыть кнопку назад на 1 карточке
cards[0].querySelector('[data-nav="prev"]').remove();

// Отображаем первую карточку
cards[currentIndex].classList.remove("none");
cards[currentIndex].classList.add("visible");

// Функция прогресс бара, запущенная на старте 
updateProgressBar();

window.addEventListener("click", function(event) {

    // движение вперед
    if(event.target.closest('[data-nav="next"]')) {

        const result = checkOnAnswer(cards[currentIndex]);
        // Получение дата атрибуда относительно индекса карточки
        const answerWrapper = cards[currentIndex].querySelector("[data-answers]");

        if (result) {
            // Прогресс бар 
            updateProgressBar('next');

            // Перемещение 
            setTimeout(function() {

                // Скрываю текущую карточку
                cards[currentIndex].classList.remove("visible");

                // По ходу удаление карточки со страницы для перехода к следующей делаем задержку в 500 мс
                setTimeout(function(){
                    cards[currentIndex].classList.add("none");

                    // Показываем следующую карточку, готовим к анимации
                    // С продвижением на 1 карточку вперед добавляем к значению индекса 1
                    currentIndex = currentIndex + 1;

                    cards[currentIndex].classList.remove("none");

                    // Задержка в 100 мс для более плавного появления
                    setTimeout(function(){
                    // Показываем новую карточку
                    cards[currentIndex].classList.add("visible");
                    }, 100)
                }, 500)
                // Удаление красной рамки так как ответ на текст был получен
                answerWrapper.classList.remove("required");
            }, 500)
        } else {
            // Получение класса required для активной карточки в случае отсутствия ответа
            answerWrapper.classList.add("required");
        }
        // Избавление от бага по случаю не существующей кнопки  
        if(currentIndex === cards.length - 1) return;
    }

    if(event.target.closest('[data-nav="prev"]')) {
        // Прогресс бар
        updateProgressBar('prev');

        setTimeout(function() {
            // Перемещение карточек
            // Избавление от бага по случаю не существующей кнопки 
            if (currentIndex === 0) return;

            // Скрываю предыдущую карточку
            cards[currentIndex].classList.remove("visible");

            setTimeout(function(){
                cards[currentIndex].classList.add("none");

                // Определяем prev card и готовим ее к анимации 
                // С продвижением на 1 карточку вперед добавляем к значению индекса 1
                currentIndex = currentIndex - 1;
                // Показываем новую карточку
                cards[currentIndex].classList.remove("none");

                // Отображаем предыдущую уже с анимацией
                setTimeout(function(){
                    cards[currentIndex].classList.add("visible");
                }, 100)
            }, 500)
        }, 500)
    }
})

// Функция проверки выбран ли ответ 
function checkOnAnswer(card) {
    // Проверка на радиокнопки
    const radioBtns = card.querySelectorAll("input[type='radio']");
    // Цикл на срабатывание радио кнопки (выбран 1 верный отвеn возвращает true)
    if (radioBtns.length > 0) {
        for (let radio of radioBtns) if (radio.checked) return true; 
    }

    // Проверка на четбоксы 
    const checkBoxes = card.querySelectorAll("input[type='checkbox']");
    if (checkBoxes.length > 0) {
        for (let checkbox of checkBoxes) if(checkbox.checked) return true;
    }
}

// Сколько карточек пройдено и вывод % прогресс бара 
function updateProgressBar(direction = 'start') {
    // Старт для увеличения прогресс бара 
    if(direction === 'next') {
        currentCard = currentCard + 1;
    } else if(direction = 'prev') {
        currentCard = currentCard - 1; //Обратное условие, в случае возврата назад
    }

    // Получаем элементы
    const progressValue = document.querySelectorAll(".progress__label strong");
    const progressLineBar = document.querySelectorAll(".progress__line-bar");
    const countableCards = document.querySelectorAll("[data-progress]").length;

    // Формула для вычисления процента пройденных карточек
    const progress = Math.round((currentCard * 100) / countableCards);

    // Запись процентов для числового значения
    progressValue.forEach(function(item){
        item.innerText = progress + "%";
    })

    // Запись длинны шкалы относительно процента 
    progressLineBar.forEach(function(item){
        item.style.width = progress + "%";
    })
}

// Функция mask для плагина номера телефон
mask('#tel');

// Находим кнопку и + на последней карточке
const submitForm = document.querySelector("#submitForm");
const telInput = document.querySelector("#tel");

submitForm.onclick = function() {
    // Условие если в строке только + или меньше 6 символов, то выводим пустую строку
    if(telInput.value === '+' || telInput.value.length < 6) {
        telInput.value = ''
    }
}

// Работаем с фокусом по чатбоксу
const checkBoxPolicy =  document.querySelector("#policy");

checkBoxPolicy.addEventListener('focus', function(){
    this.closest("label").classList.add("hovered");
})

checkBoxPolicy.addEventListener('blur', function(){
    this.closest("label").classList.remove("hovered");
})
