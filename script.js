// скролл
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');

        if (targetId === '#top' || targetId === '#') {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        } else {
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});


const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('.theme-icon');
const html = document.documentElement;


const savedTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    themeIcon.textContent = theme === 'light' ? '?' : '?';
}


const sidePanel = document.getElementById('sidePanel');
const overlay = document.getElementById('overlay');
const closePanel = document.getElementById('closePanel');


const concreteData = {
    'B10': {
        class: 'B10',
        mark: 'М150',
        strength: '9.8-13.4',
        waterproof: 'W2-W4',
        frost: 'F50-F75',
        description: 'Подготовительные работы, подбетонка. Используется для создания подбетонки, подготовки оснований под фундаменты, устройства стяжек в нежилых помещениях.'
    },
    'B12.5': {
        class: 'B12.5',
        mark: 'М150',
        strength: '16.1',
        waterproof: 'W2-W4',
        frost: 'F50-F75',
        description: 'Стяжки полов, дорожки, бордюры. Применяется для устройства стяжек пола в жилых и общественных зданиях, изготовления лестничных маршей, тротуарных плиток и садовых дорожек.'
    },
    'B15': {
        class: 'B15',
        mark: 'М200',
        strength: '19.6-22.5',
        waterproof: 'W4',
        frost: 'F100',
        description: 'Фундаменты малоэтажных зданий, отмостки. Используется для устройства ленточных фундаментов малоэтажных зданий, отмосток вокруг зданий, подпорных стенок небольшой высоты.'
    },
    'B20': {
        class: 'B20',
        mark: 'М250',
        strength: '26.2',
        waterproof: 'W4-W6',
        frost: 'F100-F150',
        description: 'Ленточные фундаменты, плиты перекрытий. Применяется для устройства ленточных фундаментов малоэтажных зданий, плит перекрытий в жилых домах.'
    },
    'B22.5': {
        class: 'B22.5',
        mark: 'М300',
        strength: '29.4',
        waterproof: 'W6',
        frost: 'F150-F200',
        description: 'Монолитные стены, фундаменты под коттеджи. Используется для возведения монолитных стен и фундаментов повышенной прочности в индивидуальном строительстве.'
    },
    'B25': {
        class: 'B25',
        mark: 'М350',
        strength: '32.7',
        waterproof: 'W6-W8',
        frost: 'F200',
        description: 'Многоэтажное жилое строительство, колонны. Применяется для возведения монолитных стен и перекрытий в жилых и общественных зданиях, устройства фундаментов повышенной прочности.'
    },
    'B27.5': {
        class: 'B27.5',
        mark: 'М350',
        strength: '36.0',
        waterproof: 'W8',
        frost: 'F200-F250',
        description: 'Несущие конструкции повышенной нагрузки. Используется для изготовления несущих конструкций, работающих в условиях повышенных нагрузок.'
    },
    'B30': {
        class: 'B30',
        mark: 'М400',
        strength: '39.3',
        waterproof: 'W8-W10',
        frost: 'F200-F300',
        description: 'Фундаменты многоэтажек, промышленные объекты. Используется для устройства фундаментов многоэтажных зданий, несущих колонн, балок и других ответственных конструкций.'
    },
    'B35': {
        class: 'B35',
        mark: 'М450',
        strength: '45.8',
        waterproof: 'W8-W14',
        frost: 'F200-F300',
        description: 'Мосты, эстакады, ответственные конструкции. Применяется для изготовления колонн, ригелей, балок перекрытий в многоэтажных зданиях, мостовых конструкций.'
    },
    'B40': {
        class: 'B40',
        mark: 'М550',
        strength: '52.4',
        waterproof: 'W10-W16',
        frost: 'F200-F300',
        description: 'Гидротехнические сооружения, специальные объекты. Используется для строительства мостов, гидротехнических сооружений, резервуаров, конструкций, работающих в агрессивных средах.'
    },
    'B45': {
        class: 'B45',
        mark: 'М600',
        strength: '58.9',
        waterproof: 'W12-W20',
        frost: 'F100-F300',
        description: 'Высотное строительство, уникальные конструкции. Применяется для изготовления предварительно напряженных конструкций, высоконагруженных элементов зданий и сооружений.'
    },
    'B50': {
        class: 'B50',
        mark: 'М650',
        strength: '65.5',
        waterproof: 'W12-W20',
        frost: 'F100-F300',
        description: 'Специальные военные и защитные сооружения. Используется для строительства банковских хранилищ, бункеров, защитных сооружений, конструкций с повышенными требованиями к прочности.'
    },
    'B55': {
        class: 'B55',
        mark: 'М700',
        strength: '72.0',
        waterproof: 'W12-W20',
        frost: 'F100-F300',
        description: 'Критически важные объекты повышенной безопасности. Высокопрочный бетон для особо ответственных конструкций, работающих в экстремальных условиях эксплуатации.'
    },
    'B60': {
        class: 'B60',
        mark: 'М800',
        strength: '78.0',
        waterproof: 'W12-W20',
        frost: 'F100-F300',
        description: 'Особо ответственные конструкции (АЭС, дамбы). Сверхпрочный бетон для уникальных инженерных сооружений, требующих максимальной прочности и долговечности.'
    },
    'B65': {
        class: 'B65',
        mark: 'М850',
        strength: '85.5',
        waterproof: 'W14-W20',
        frost: 'F200-F400',
        description: 'Специальное применение в экстремальных условиях. Бетон для объектов, работающих в агрессивных средах и экстремальных условиях эксплуатации.'
    },
    'B70': {
        class: 'B70',
        mark: 'М900',
        strength: '93.0',
        waterproof: 'W16-W20',
        frost: 'F300-F500',
        description: 'Уникальные инженерные сооружения. Применяется для строительства особо ответственных конструкций, требующих максимальных показателей прочности и долговечности.'
    },
    'B75': {
        class: 'B75',
        mark: 'М950',
        strength: '100.5',
        waterproof: 'W16-W20',
        frost: 'F300-F500',
        description: 'Специальные научные и исследовательские объекты. Высокотехнологичный бетон для научных лабораторий и исследовательских центров.'
    },
    'B80': {
        class: 'B80',
        mark: 'М1000',
        strength: '108.0',
        waterproof: 'W18-W20',
        frost: 'F400-F600',
        description: 'Экспериментальные и аэрокосмические конструкции. Специальный бетон для экспериментальных конструкций и объектов аэрокосмической отрасли.'
    },
    'B85': {
        class: 'B85',
        mark: 'М1050',
        strength: '115.5',
        waterproof: 'W18-W20',
        frost: 'F500-F700',
        description: 'Высокотехнологичные специальные применения. Бетон для высокотехнологичных объектов, требующих максимальных характеристик.'
    },
    'B90': {
        class: 'B90',
        mark: 'М1100',
        strength: '123.0',
        waterproof: 'W20',
        frost: 'F600-F800',
        description: 'Футуристические и экспериментальные материалы. Сверхвысокопрочный бетон для футуристических и экспериментальных конструкций.'
    }
};



function openPanel(concreteClass) {
    const data = concreteData[concreteClass];

    if (!data) return;

    document.getElementById('panelTitle').textContent = `Класс ${data.class}`;
    document.getElementById('panelClass').textContent = data.class;
    document.getElementById('panelMark').textContent = data.mark;
    document.getElementById('panelStrength').textContent = `${data.strength} МПа`;
    document.getElementById('panelWaterproof').textContent = data.waterproof;
    document.getElementById('panelFrost').textContent = data.frost;
    document.getElementById('panelDescription').textContent = data.description;


    sidePanel.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}


function closePanelFunc() {
    sidePanel.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
}

closePanel.addEventListener('click', closePanelFunc);
overlay.addEventListener('click', closePanelFunc);

// закрыть на esc
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sidePanel.classList.contains('active')) {
        closePanelFunc();
    }
});

// кнопка теста прочности - заглушка
const testBtn = document.getElementById('testBtn');
if (testBtn) {
    testBtn.addEventListener('click', () => {
        alert('Функция тестирования прочности будет реализована в будущем');
    });
}

//карусель
const carouselSlides = document.getElementById('carouselSlides');
const carouselPrev = document.getElementById('carouselPrev');
const carouselNext = document.getElementById('carouselNext');
const carouselIndicators = document.getElementById('carouselIndicators');

let currentCarouselSlide = 0;
const totalSlides = 6;


for (let i = 0; i < totalSlides; i++) {
    const indicator = document.createElement('button');
    indicator.className = 'carousel-indicator';
    if (i === 0) indicator.classList.add('active');
    indicator.setAttribute('aria-label', `Перейти к слайду ${i + 1}`);
    indicator.addEventListener('click', () => goToSlide(i));
    carouselIndicators.appendChild(indicator);
}

const indicators = document.querySelectorAll('.carousel-indicator');


function updateCarousel() {
    const translateX = -currentCarouselSlide * (100 / totalSlides);
    carouselSlides.style.transform = `translateX(${translateX}%)`;

    indicators.forEach((indicator, index) => {
        if (index === currentCarouselSlide) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
}

function goToSlide(index) {
    currentCarouselSlide = index;
    updateCarousel();
}

function nextSlide() {
    currentCarouselSlide = (currentCarouselSlide + 1) % totalSlides;
    updateCarousel();
}

function prevSlide() {
    currentCarouselSlide = (currentCarouselSlide - 1 + totalSlides) % totalSlides;
    updateCarousel();
}

carouselPrev.addEventListener('click', prevSlide);
carouselNext.addEventListener('click', nextSlide);


let touchStartX = 0;
let touchEndX = 0;

carouselSlides.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

carouselSlides.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, { passive: true });

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            nextSlide();
        } else {
            prevSlide();
        }
    }
}

// автоплей
let autoplayInterval = null;

function startAutoplay() {
    autoplayInterval = setInterval(() => {
        nextSlide();
    }, 5000);
}

function stopAutoplay() {
    if (autoplayInterval) {
        clearInterval(autoplayInterval);
        autoplayInterval = null;
    }
}

// остановка автоплея
carouselSlides.addEventListener('mouseenter', stopAutoplay);
carouselSlides.addEventListener('mouseleave', startAutoplay);
carouselPrev.addEventListener('mouseenter', stopAutoplay);
carouselNext.addEventListener('mouseenter', stopAutoplay);

function updateTableRows() {
    const rows = document.querySelectorAll('.concrete-table tbody tr');
    rows.forEach(row => {
        row.addEventListener('click', () => {
            const concreteClass = row.getAttribute('data-class');
            openPanel(concreteClass);
        });
    });
}

// для мобилки
if (window.innerWidth <= 768) {
    const headers = ['Класс бетона', 'Прочность на сжатие (МПа)', 'Область применения'];
    const cells = document.querySelectorAll('.concrete-table tbody td');

    cells.forEach((cell, index) => {
        const colIndex = index % 3;
        cell.setAttribute('data-label', headers[colIndex]);
    });
}


window.addEventListener('resize', () => {
    if (window.innerWidth <= 768) {
        const headers = ['Класс бетона', 'Прочность на сжатие (МПа)', 'Область применения'];
        const cells = document.querySelectorAll('.concrete-table tbody td');

        cells.forEach((cell, index) => {
            const colIndex = index % 3;
            cell.setAttribute('data-label', headers[colIndex]);
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    updateTableRows();
});

