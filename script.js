// Управление темой
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('.theme-icon');
const html = document.documentElement;

// Загрузка сохраненной темы
const savedTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

// Переключение темы
themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    themeIcon.textContent = theme === 'light' ? '🌙' : '☀️';
}

// Управление выдвижной панелью
const sidePanel = document.getElementById('sidePanel');
const overlay = document.getElementById('overlay');
const closePanel = document.getElementById('closePanel');
const tableRows = document.querySelectorAll('.concrete-table tbody tr');

// Данные для классов бетона
const concreteData = {
    'B10': {
        class: 'B10',
        mark: 'М150',
        strength: 9.8,
        description: 'Фундаменты малоэтажных зданий, подготовительные работы. Используется для создания подбетонки, подготовки оснований под фундаменты, устройства стяжек в нежилых помещениях.'
    },
    'B15': {
        class: 'B15',
        mark: 'М200',
        strength: 19.6,
        description: 'Стяжки пола, лестницы, дорожки. Применяется для устройства стяжек пола в жилых и общественных зданиях, изготовления лестничных маршей, тротуарных плиток и садовых дорожек.'
    },
    'B20': {
        class: 'B20',
        mark: 'М250',
        strength: 26.2,
        description: 'Ленточные фундаменты, отмостки. Используется для устройства ленточных фундаментов малоэтажных зданий, отмосток вокруг зданий, подпорных стенок небольшой высоты.'
    },
    'B25': {
        class: 'B25',
        mark: 'М350',
        strength: 32.7,
        description: 'Монолитные стены, перекрытия. Применяется для возведения монолитных стен и перекрытий в жилых и общественных зданиях, устройства фундаментов повышенной прочности.'
    },
    'B30': {
        class: 'B30',
        mark: 'М400',
        strength: 39.3,
        description: 'Фундаменты многоэтажных зданий. Используется для устройства фундаментов многоэтажных зданий, несущих колонн, балок и других ответственных конструкций.'
    },
    'B35': {
        class: 'B35',
        mark: 'М450',
        strength: 45.8,
        description: 'Колонны, несущие конструкции. Применяется для изготовления колонн, ригелей, балок перекрытий в многоэтажных зданиях, мостовых конструкций.'
    },
    'B40': {
        class: 'B40',
        mark: 'М550',
        strength: 52.4,
        description: 'Мосты, гидротехнические сооружения. Используется для строительства мостов, гидротехнических сооружений, резервуаров, конструкций, работающих в агрессивных средах.'
    },
    'B45': {
        class: 'B45',
        mark: 'М600',
        strength: 58.9,
        description: 'Специальные конструкции повышенной прочности. Применяется для изготовления предварительно напряженных конструкций, высоконагруженных элементов зданий и сооружений.'
    },
    'B50': {
        class: 'B50',
        mark: 'М650',
        strength: 65.5,
        description: 'Банковские хранилища, особо прочные конструкции. Используется для строительства банковских хранилищ, бункеров, защитных сооружений, конструкций с повышенными требованиями к прочности.'
    },
    'B55': {
        class: 'B55',
        mark: 'М700',
        strength: 72.0,
        description: 'Специальное применение. Высокопрочный бетон для особо ответственных конструкций, работающих в экстремальных условиях эксплуатации.'
    },
    'B60': {
        class: 'B60',
        mark: 'М800',
        strength: 78.0,
        description: 'Специальное применение. Сверхпрочный бетон для уникальных инженерных сооружений, требующих максимальной прочности и долговечности.'
    }
};

// Открытие панели при клике на строку
tableRows.forEach(row => {
    row.addEventListener('click', () => {
        const concreteClass = row.getAttribute('data-class');
        openPanel(concreteClass);
    });
});

function openPanel(concreteClass) {
    const data = concreteData[concreteClass];
    
    if (!data) return;
    
    // Заполнение данных в панели
    document.getElementById('panelTitle').textContent = `Класс ${data.class}`;
    document.getElementById('panelClass').textContent = data.class;
    document.getElementById('panelMark').textContent = data.mark;
    document.getElementById('panelStrength').textContent = `${data.strength} МПа`;
    document.getElementById('panelDescription').textContent = data.description;
    
    // Сброс визуализации теста
    resetTest();
    
    // Открытие панели
    sidePanel.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Закрытие панели
function closePanelFunc() {
    sidePanel.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
    resetTest();
}

closePanel.addEventListener('click', closePanelFunc);
overlay.addEventListener('click', closePanelFunc);

// Закрытие по Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sidePanel.classList.contains('active')) {
        closePanelFunc();
    }
});

// Виртуальное испытание прочности
const testBtn = document.getElementById('testBtn');
const resetBtn = document.getElementById('resetBtn');
const testVisualization = document.getElementById('testVisualization');
const currentStrengthEl = document.getElementById('currentStrength');
const progressFill = document.getElementById('progressFill');
const progressPercent = document.getElementById('progressPercent');
const concreteCube = document.getElementById('concreteCube');
const maxStrengthEl = document.getElementById('maxStrength');

let testInterval = null;
let currentTestValue = 0;
let maxStrength = 0;
let isTesting = false;

testBtn.addEventListener('click', startTest);
resetBtn.addEventListener('click', resetTest);

function startTest() {
    if (isTesting) return;
    
    // Получаем максимальную прочность из панели
    const strengthText = document.getElementById('panelStrength').textContent;
    maxStrength = parseFloat(strengthText);
    
    if (!maxStrength) return;
    
    // Показываем визуализацию
    testVisualization.style.display = 'block';
    testBtn.style.display = 'none';
    resetBtn.style.display = 'none';
    
    // Сброс состояния
    currentTestValue = 0;
    isTesting = true;
    concreteCube.className = 'cube';
    progressFill.style.width = '0%';
    progressPercent.textContent = '0%';
    currentStrengthEl.textContent = '0.0';
    maxStrengthEl.textContent = `${maxStrength} МПа`;
    
    // Скорость увеличения: 0.7 МПа в секунду
    const incrementPerSecond = 0.7;
    const incrementPerInterval = incrementPerSecond / 10; // Обновление каждые 100мс
    
    testInterval = setInterval(() => {
        currentTestValue += incrementPerInterval;
        
        if (currentTestValue >= maxStrength) {
            currentTestValue = maxStrength;
            stopTest();
        }
        
        updateTestVisualization();
    }, 100);
}

function updateTestVisualization() {
    // Обновление числового значения
    currentStrengthEl.textContent = currentTestValue.toFixed(1);
    
    // Расчет процента
    const percent = (currentTestValue / maxStrength) * 100;
    progressPercent.textContent = `${Math.round(percent)}%`;
    progressFill.style.width = `${percent}%`;
    
    // Изменение цвета прогресс-бара
    let color;
    if (percent < 60) {
        color = '#48bb78'; // Зеленый
    } else if (percent < 90) {
        color = '#f6e05e'; // Желтый
    } else {
        color = '#e53e3e'; // Красный
    }
    progressFill.style.background = color;
    
    // Обновление состояния куба
    if (percent < 60) {
        concreteCube.className = 'cube';
    } else if (percent < 90) {
        concreteCube.className = 'cube cracked';
    } else {
        concreteCube.className = 'cube destroyed';
    }
}

function stopTest() {
    if (testInterval) {
        clearInterval(testInterval);
        testInterval = null;
    }
    isTesting = false;
    resetBtn.style.display = 'block';
}

function resetTest() {
    stopTest();
    currentTestValue = 0;
    testVisualization.style.display = 'none';
    testBtn.style.display = 'block';
    resetBtn.style.display = 'none';
    concreteCube.className = 'cube';
    progressFill.style.width = '0%';
    progressPercent.textContent = '0%';
    currentStrengthEl.textContent = '0.0';
}

// Добавление data-label для мобильной версии
if (window.innerWidth <= 768) {
    const headers = ['Класс бетона', 'Марка', 'Прочность на сжатие (МПа)', 'Область применения'];
    const cells = document.querySelectorAll('.concrete-table tbody td');
    
    cells.forEach((cell, index) => {
        const rowIndex = Math.floor(index / 4);
        const colIndex = index % 4;
        cell.setAttribute('data-label', headers[colIndex]);
    });
}

// Обработка изменения размера окна
window.addEventListener('resize', () => {
    if (window.innerWidth <= 768) {
        const headers = ['Класс бетона', 'Марка', 'Прочность на сжатие (МПа)', 'Область применения'];
        const cells = document.querySelectorAll('.concrete-table tbody td');
        
        cells.forEach((cell, index) => {
            const colIndex = index % 4;
            cell.setAttribute('data-label', headers[colIndex]);
        });
    }
});

