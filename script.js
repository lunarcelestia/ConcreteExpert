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

// Переключение темы
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
    themeIcon.textContent = theme === 'light' ? '☾' : '☼';
}

// UI элементы
const sidePanel = document.getElementById('sidePanel');
const overlay = document.getElementById('overlay');
const closePanelBtn = document.getElementById('closePanel');
const testBtn = document.getElementById('testBtn');


const concreteData = {
    'B10': { class: 'B10', mark: 'М150', strength: '9.8-13.4', waterproof: 'W2-W4', frost: 'F50-F75', description: 'Подготовительные работы, подбетонка...' },
    'B12.5': { class: 'B12.5', mark: 'М150', strength: '16.1', waterproof: 'W2-W4', frost: 'F50-F75', description: 'Стяжки полов, дорожки, бордюры...' },
    'B15': { class: 'B15', mark: 'М200', strength: '19.6-22.5', waterproof: 'W4', frost: 'F100', description: 'Фундаменты малоэтажных зданий, отмостки...' },
    'B20': { class: 'B20', mark: 'М250', strength: '26.2', waterproof: 'W4-W6', frost: 'F100-F150', description: 'Ленточные фундаменты, плиты перекрытий...' },
    'B22.5': { class: 'B22.5', mark: 'М300', strength: '29.4', waterproof: 'W6', frost: 'F150-F200', description: 'Монолитные стены, фундаменты под коттеджи...' },
    'B25': { class: 'B25', mark: 'М350', strength: '32.7', waterproof: 'W6-W8', frost: 'F200', description: 'Многоэтажное жилое строительство, колонны...' },
    'B27.5': { class: 'B27.5', mark: 'М350', strength: '36.0', waterproof: 'W8', frost: 'F200-F250', description: 'Несущие конструкции повышенной нагрузки...' },
    'B30': { class: 'B30', mark: 'М400', strength: '39.3', waterproof: 'W8-W10', frost: 'F200-F300', description: 'Фундаменты многоэтажек, промышленные объекты...' },
    'B35': { class: 'B35', mark: 'М450', strength: '45.8', waterproof: 'W8-W14', frost: 'F200-F300', description: 'Мосты, эстакады, ответственные конструкции...' },
    'B40': { class: 'B40', mark: 'М550', strength: '52.4', waterproof: 'W10-W16', frost: 'F200-F300', description: 'Гидротехнические сооружения, специальные объекты...' },
    'B45': { class: 'B45', mark: 'М600', strength: '58.9', waterproof: 'W12-W20', frost: 'F100-F300', description: 'Высотное строительство, уникальные конструкции...' },
    'B50': { class: 'B50', mark: 'М650', strength: '65.5', waterproof: 'W12-W20', frost: 'F100-F300', description: 'Специальные военные и защитные сооружения...' },
    'B55': { class: 'B55', mark: 'М700', strength: '72.0', waterproof: 'W12-W20', frost: 'F100-F300', description: 'Критически важные объекты повышенной безопасности...' },
    'B60': { class: 'B60', mark: 'М800', strength: '78.0', waterproof: 'W12-W20', frost: 'F100-F300', description: 'Особо ответственные конструкции (АЭС, дамбы)...' },
    'B65': { class: 'B65', mark: 'М850', strength: '85.5', waterproof: 'W14-W20', frost: 'F200-F400', description: 'Специальное применение в экстремальных условиях.' },
    'B70': { class: 'B70', mark: 'М900', strength: '93.0', waterproof: 'W16-W20', frost: 'F300-F500', description: 'Уникальные инженерные сооружения.' },
    'B75': { class: 'B75', mark: 'М950', strength: '100.5', waterproof: 'W16-W20', frost: 'F300-F500', description: 'Специальные научные и исследовательские объекты.' },
    'B80': { class: 'B80', mark: 'М1000', strength: '108.0', waterproof: 'W18-W20', frost: 'F400-F600', description: 'Экспериментальные и аэрокосмические конструкции.' },
    'B85': { class: 'B85', mark: 'М1050', strength: '115.5', waterproof: 'W18-W20', frost: 'F500-F700', description: 'Высокотехнологичные специальные применения.' },
    'B90': { class: 'B90', mark: 'М1100', strength: '123.0', waterproof: 'W20', frost: 'F600-F800', description: 'Футуристические и экспериментальные материалы.' }
};

// пикчи теста
const cubeImages = {
    whole: 'https://storage.yandexcloud.net/fotora.ru/ed4df1e11e5b088b.png',
    cracked: 'https://storage.yandexcloud.net/fotora.ru/e6a4ba3e81c775eb.png',
    destroyed: 'https://storage.yandexcloud.net/fotora.ru/3a3cd27b1e1b8abe.png'
};


const testVisualization = document.getElementById('testVisualization');
const currentStrengthEl = document.getElementById('currentStrength');
const progressFill = document.getElementById('progressFill');
const progressPercent = document.getElementById('progressPercent');
const maxStrengthEl = document.getElementById('maxStrength');
const cubeImage = document.getElementById('cubeImage');
const testResultMessage = document.getElementById('testResultMessage');
const compareBtn = document.getElementById('compareBtn');
const comparisonSection = document.getElementById('comparisonSection');
const compConcrete = document.getElementById('compConcrete');
const compCars = document.getElementById('compCars');
const compSea = document.getElementById('compSea');
const comparisonText = document.getElementById('comparisonText');
const comparisonDivider = document.getElementById('comparisonDivider');
const comparisonTextSecondary = document.getElementById('comparisonTextSecondary');
const comparisonTitle = document.querySelector('.comparison-title');

let testInterval = null;
let currentTestValue = 0;
let maxStrengthNumeric = 0;
let isTesting = false;
let currentConcreteClass = null;
let comparisonTimeouts = [];

const comparisonDataByClass = {
    B10: {
        strengthText: '9.8 МПа',
        title: 'Как выглядит прочность B10 в реальном мире',
        blocks: {
            concrete: { value: 'B10', sub: 'Прочность ~9.8 МПа' },
            cars: { value: '10 велосипедов', sub: 'Нагрузка на площади ладони' },
            sea: { value: 'Озеро Селигер', sub: 'Давление на глубине 97 метров' }
        },
        textHtml: `
            Давление 9.8 МПа, распределённое на площади ладони (~100 см²), эквивалентно весу 10 городских велосипедов.
            <br><br>
            Прочность B10 также соответствует давлению на глубине около 97 метров в пресноводном озере. Это примерно высота 32-этажного дома, полностью погружённого под воду.
            <ul>
                <li>9.8 МПа ≈ 98 атмосфер ≈ 100 кг/см²</li>
                <li>Давление в пресной воде растёт на 1 атм. каждые 10 метров</li>
            </ul>`,
        afterDividerText: 'Такая прочность сравнима с качественной кирпичной кладкой. Используется для подготовительных работ, где не требуется высокая несущая способность.'
    },
    B12_5: {
        strengthText: '16.1 МПа',
        title: 'Как выглядит прочность B12.5 в реальном мире',
        blocks: {
            concrete: { value: 'B12.5', sub: 'Прочность ~16.1 МПа' },
            cars: { value: '1,5 тонны', sub: 'Вес легкового авто на ладони' },
            sea: { value: 'Озеро Байкал', sub: 'Давление на глубине 160 метров' }
        },
        textHtml: `
            Давление 16.1 МПа эквивалентно весу легкового автомобиля (1.5 тонны), сконцентрированному на площади одной ладони.
            <br><br>
            Эта прочность также соответствует гидростатическому давлению на глубине 161 метр. Это глубже, чем средняя глубина многих известных озер.
            <ul>
                <li>16.1 МПа ≈ 161 атмосфера ≈ 164 кг/см²</li>
                <li>Глубина 161 м — это высота 50-этажного небоскреба</li>
            </ul>`,
        afterDividerText: 'Прочности B12.5 достаточно для создания стяжек полов, садовых дорожек и установки бордюров, где важна устойчивость к умеренным нагрузкам.'
    },
    B15: {
        strengthText: '19.6 МПа',
        title: 'Как выглядит прочность B15 в реальном мире',
        blocks: {
            concrete: { value: 'B15', sub: 'Прочность ~19.6 МПа' },
            cars: { value: '2 тонны', sub: 'Вес внедорожника на ладони' },
            sea: { value: 'Красное море', sub: 'Давление на глубине 196 метров' }
        },
        textHtml: `
            Давление 19.6 МПа сравнимо с весом большого внедорожника (2 тонны), приложенным к площади вашей ладони.
            <br><br>
            Такое же давление вы бы испытали на глубине 196 метров под водой. Это глубина, на которой работают профессиональные водолазы.
            <ul>
                <li>19.6 МПа ≈ 196 атмосфер ≈ 200 кг/см²</li>
            </ul>`,
        afterDividerText: 'Это популярный класс бетона для фундаментов малоэтажных зданий, отмосток и бетонных площадок, обеспечивающий надежность и долговечность.'
    },
    B20: {
        strengthText: '26.2 МПа',
        title: 'Как выглядит прочность B20 в реальном мире',
        blocks: {
            concrete: { value: 'B20', sub: 'Прочность ~26.2 МПа' },
            cars: { value: '2.5 тонны', sub: 'Вес слона на ладони' },
            sea: { value: 'Средиземное море', sub: 'Давление на глубине 260 метров' }
        },
        textHtml: `
            Давление 26.2 МПа эквивалентно весу небольшого слона, сосредоточенному на площади ладони.
            <br><br>
            В водной среде это соответствует давлению на глубине 262 метра — глубже, чем высота большинства небоскребов.
            <ul>
                <li>26.2 МПа ≈ 262 атмосферы ≈ 267 кг/см²</li>
            </ul>`,
        afterDividerText: 'B20 — универсальный конструкционный бетон, применяемый для ленточных фундаментов, плит перекрытий и несущих балок в частном домостроении.'
    },
    B22_5: {
        strengthText: '29.4 МПа',
        title: 'Как выглядит прочность B22.5 в реальном мире',
        blocks: {
            concrete: { value: 'B22.5', sub: 'Прочность ~29.4 МПа' },
            cars: { value: '3 тонны', sub: 'Вес грузовика-пикапа на ладони' },
            sea: { value: 'Эгейское море', sub: 'Давление на глубине 290 метров' }
        },
        textHtml: `
            Давление 29.4 МПа сравнимо с весом тяжелого пикапа Ford F-150, приложенным к площади ладони.
            <br><br>
            Такое же давление действует на глубине 294 метра под водой.
            <ul>
                <li>29.4 МПа ≈ 294 атмосферы ≈ 300 кг/см²</li>
            </ul>`,
        afterDividerText: 'Используется для монолитных стен, фундаментов под коттеджи и других конструкций, требующих повышенной прочности и надежности.'
    },
    B25: {
        strengthText: '32.7 МПа',
        title: 'Как выглядит прочность B25 в реальном мире',
        blocks: {
            concrete: { value: 'B25', sub: 'Прочность ~32.7 МПа' },
            cars: { value: '3 авто', sub: '3 легковых автомобиля на ладони' },
            sea: { value: 'Балтийское море', sub: 'Давление на глубине 320 метров' }
        },
        textHtml: `
            Давление 32.7 МПа, распределённое на площади человеческой ладони (~100 см²), эквивалентно весу трёх легковых автомобилей.
            <br><br>
            Прочность B25 соответствует давлению на глубине около 327 метров под водой. Это на ~80 метров ниже, чем находится известный затонувший корабль «Гогланд» в Финском заливе.
            <ul>
                <li>32.7 МПа ≈ 327 атмосфер ≈ 333 кг/см²</li>
                <li>На глубине 327 м давление ≈ 32.7 МПа</li>
            </ul>`,
        afterDividerText: 'Такая прочность позволяет бетонной плите толщиной 20 см выдержать собственный вес, умноженный примерно в 7 раз. Это стандарт для многоэтажного строительства.'
    },
    B27_5: {
        strengthText: '36.0 МПа',
        title: 'Как выглядит прочность B27.5 в реальном мире',
        blocks: {
            concrete: { value: 'B27.5', sub: 'Прочность ~36.0 МПа' },
            cars: { value: 'Городской автобус', sub: 'Часть веса автобуса на ладони' },
            sea: { value: 'Чёрное море', sub: 'Давление на глубине 360 метров' }
        },
        textHtml: `
            Давление 36.0 МПа — это как если бы на вашей ладони стоял небольшой городской автобус.
            <br><br>
            Такое давление встречается на глубине 360 метров. Это почти максимальная глубина Балтийского моря.
            <ul>
                <li>36.0 МПа ≈ 360 атмосфер ≈ 367 кг/см²</li>
            </ul>`,
        afterDividerText: 'Применяется для несущих конструкций с повышенной нагрузкой: колонн, балок и ригелей в жилых и коммерческих зданиях.'
    },
    B30: {
        strengthText: '39.3 МПа',
        title: 'Как выглядит прочность B30 в реальном мире',
        blocks: {
            concrete: { value: 'B30', sub: 'Прочность ~39.3 МПа' },
            cars: { value: 'Танк Т-34', sub: 'Часть веса танка на ладони' },
            sea: { value: 'Каспийское море', sub: 'Давление на глубине 390 метров' }
        },
        textHtml: `
            Прочность 39.3 МПа сравнима с давлением, которое оказал бы на вашу ладонь вес легендарного танка Т-34.
            <br><br>
            Под водой такое давление можно найти на глубине 393 метра.
            <ul>
                <li>39.3 МПа ≈ 393 атмосферы ≈ 400 кг/см²</li>
            </ul>`,
        afterDividerText: 'Это бетон для серьезных задач: фундаменты многоэтажных зданий, промышленные полы, опоры мостов и другие ответственные сооружения.'
    },
    B35: {
        strengthText: '45.8 МПа',
        title: 'Как выглядит прочность B35 в реальном мире',
        blocks: {
            concrete: { value: 'B35', sub: 'Прочность ~45.8 МПа' },
            cars: { value: 'Синий кит', sub: 'Часть веса кита на ладони' },
            sea: { value: 'Охотское море', sub: 'Давление на глубине 450 метров' }
        },
        textHtml: `
            Давление 45.8 МПа — это как если бы на вашей ладони уместилась часть самого большого животного на планете — синего кита.
            <br><br>
            Такое давление действует на глубине 458 метров, что сопоставимо с глубинами крупных морей.
            <ul>
                <li>45.8 МПа ≈ 458 атмосфер ≈ 467 кг/см²</li>
            </ul>`,
        afterDividerText: 'Критически важный материал для мостов, эстакад, гидротехнических сооружений и банковских хранилищ, где требуется максимальная надежность.'
    },
    B40: {
        strengthText: '52.4 МПа',
        title: 'Как выглядит прочность B40 в реальном мире',
        blocks: {
            concrete: { value: 'B40', sub: 'Прочность ~52.4 МПа' },
            cars: { value: 'Boeing 737', sub: 'Часть веса самолета на ладони' },
            sea: { value: 'Марианская впадина', sub: 'Давление на 520 м (начало)' }
        },
        textHtml: `
            Прочность 52.4 МПа сравнима с давлением от части взлетного веса пассажирского самолета Boeing 737, сконцентрированного на площади ладони.
            <br><br>
            Это давление на глубине 524 метра под водой. На таких глубинах начинается зона вечной темноты в океане.
            <ul>
                <li>52.4 МПа ≈ 524 атмосферы ≈ 534 кг/см²</li>
            </ul>`,
        afterDividerText: 'Высокопрочный бетон для специальных объектов: гидротехнические сооружения (плотины, шлюзы), тоннели метро, военные бункеры.'
    },
    B45: {
        strengthText: '58.9 МПа',
        title: 'Как выглядит прочность B45 в реальном мире',
        blocks: {
            concrete: { value: 'B45', sub: 'Прочность ~58.9 МПа' },
            cars: { value: 'Статуя Свободы', sub: 'Часть веса статуи на ладони' },
            sea: { value: 'Океан', sub: 'Давление на глубине 590 метров' }
        },
        textHtml: `
            Давление 58.9 МПа — это как если бы на вашей ладони стояла часть металлического каркаса Статуи Свободы.
            <br><br>
            В океане такое давление можно встретить на глубине почти 600 метров.
            <ul>
                <li>58.9 МПа ≈ 589 атмосфер ≈ 600 кг/см²</li>
            </ul>`,
        afterDividerText: 'Используется в высотном строительстве, для уникальных конструкций со сложной геометрией и особо нагруженных элементов.'
    },
    B50: {
        strengthText: '65.5 МПа',
        title: 'Как выглядит прочность B50 в реальном мире',
        blocks: {
            concrete: { value: 'B50', sub: 'Прочность ~65.5 МПа' },
            cars: { value: 'МКС', sub: 'Часть веса МКС на ладони' },
            sea: { value: 'Глубокий океан', sub: 'Давление на глубине 650 метров' }
        },
        textHtml: `
            Прочность 65.5 МПа сравнима с давлением от части массы Международной космической станции, приложенной к площади ладони.
            <br><br>
            Это давление на глубине 655 метров. Туда не проникает солнечный свет, и обитают лишь глубоководные существа.
            <ul>
                <li>65.5 МПа ≈ 655 атмосфер ≈ 668 кг/см²</li>
            </ul>`,
        afterDividerText: 'Специальный бетон для военных и защитных сооружений, конструкций атомных электростанций и объектов, требующих экстремальной прочности.'
    },
    B55: {
        strengthText: '72.0 МПа',
        title: 'Как выглядит прочность B55 в реальном мире',
        blocks: {
            concrete: { value: 'B55', sub: 'Прочность ~72.0 МПа' },
            cars: { value: 'Шаттл "Индевор"', sub: 'Часть веса на ладони' },
            sea: { value: 'Глубина 720 м', sub: 'Давление в глубоком океане' }
        },
        textHtml: `
            Давление 72.0 МПа сравнимо с тем, как если бы на вашей ладони уместилась часть веса космического шаттла "Индевор".
            <br><br>
            Такое давление встречается на глубине 720 метров. Это зона, куда не проникает солнечный свет и где обитают только приспособленные к экстремальным условиям существа.
            <ul>
                <li>72.0 МПа ≈ 720 атмосфер ≈ 734 кг/см²</li>
            </ul>`,
        afterDividerText: 'Применяется для особо ответственных конструкций, работающих в агрессивных средах, например, для опор сверхвысоких небоскребов.'
    },
    B60: {
        strengthText: '78.0 МПа',
        title: 'Как выглядит прочность B60 в реальном мире',
        blocks: {
            concrete: { value: 'B60', sub: 'Прочность ~78.0 МПа' },
            cars: { value: 'Эйфелева башня', sub: 'Часть веса башни на ладони' },
            sea: { value: 'Бездна', sub: 'Давление на глубине 780 метров' }
        },
        textHtml: `
            Давление 78.0 МПа — это как если бы на вашей ладони стояла часть металлоконструкций Эйфелевой башни.
            <br><br>
            Такое давление встречается на глубине 780 метров — в зоне "бездны", где царит абсолютная темнота и огромное давление.
            <ul>
                <li>78.0 МПа ≈ 780 атмосфер ≈ 795 кг/см²</li>
            </ul>`,
        afterDividerText: 'Сверхпрочный бетон для уникальных инженерных задач: опоры сверхвысоких небоскребов, конструкции для работы в агрессивных средах (АЭС, дамбы).'
    },
    B65: {
        strengthText: '85.5 МПа',
        title: 'Как выглядит прочность B65 в реальном мире',
        blocks: {
            concrete: { value: 'B65', sub: 'Прочность ~85.5 МПа' },
            cars: { value: 'Маневровый тепловоз', sub: 'Часть веса на ладони' },
            sea: { value: 'Глубина 850 м', sub: 'Давление в сумеречной зоне' }
        },
        textHtml: `
            Прочность 85.5 МПа можно сравнить с давлением от части веса маневрового тепловоза, сконцентрированного на площади ладони.
            <br><br>
            Это давление на глубине 855 метров. В океане эта зона называется "сумеречной", здесь почти нет света.
            <ul>
                <li>85.5 МПа ≈ 855 атмосфер ≈ 872 кг/см²</li>
            </ul>`,
        afterDividerText: 'Используется для специальных применений в экстремальных условиях, для строительства объектов с повышенными требованиями к безопасности.'
    },
    B70: {
        strengthText: '93.0 МПа',
        title: 'Как выглядит прочность B70 в реальном мире',
        blocks: {
            concrete: { value: 'B70', sub: 'Прочность ~93.0 МПа' },
            cars: { value: 'Гидравлический пресс', sub: 'Промышленное давление' },
            sea: { value: '1 километр', sub: 'Давление на глубине 930 м' }
        },
        textHtml: `
            Прочность 93.0 МПа выходит за рамки бытовых сравнений и сопоставима с давлением в промышленных гидравлических прессах.
            <br><br>
            Под водой такое давление можно найти на глубине 930 метров — почти один километр!
            <ul>
                <li>93.0 МПа ≈ 930 атмосфер ≈ 948 кг/см²</li>
            </ul>`,
        afterDividerText: 'Элита в мире бетонов. Используется для уникальных инженерных сооружений, где прочность является абсолютным приоритетом.'
    },
    B75: {
        strengthText: '100.5 МПа',
        title: 'Как выглядит прочность B75 в реальном мире',
        blocks: {
            concrete: { value: 'B75', sub: 'Прочность ~100.5 МПа' },
            cars: { value: 'Основание небоскреба', sub: 'Давление в фундаменте' },
            sea: { value: '1 километр', sub: 'Давление на километровой глубине' }
        },
        textHtml: `
            Давление в 100.5 МПа сопоставимо с давлением в основании самых высоких небоскребов мира, где фундамент выдерживает колоссальные нагрузки.
            <br><br>
            Под водой такое давление можно найти на глубине более 1000 метров.
            <ul>
                <li>100.5 МПа ≈ 1005 атмосфер ≈ 1025 кг/см²</li>
            </ul>`,
        afterDividerText: 'Эксклюзивный материал для специальных научных и исследовательских объектов, а также для защитных сооружений высочайшего класса.'
    },
    B80: {
        strengthText: '108.0 МПа',
        title: 'Как выглядит прочность B80 в реальном мире',
        blocks: {
            concrete: { value: 'B80', sub: 'Прочность ~108.0 МПа' },
            cars: { value: 'Научный эксперимент', sub: 'Давление в лабораториях' },
            sea: { value: 'Титаник', sub: 'Давление в 3 раза меньше' }
        },
        textHtml: `
            Давление 108.0 МПа — это мир высоких технологий. Такое давление создается в лабораторных условиях для научных экспериментов.
            <br><br>
            Это давление на глубине 1080 метров. Для сравнения, обломки "Титаника" лежат на глубине 3800 м, где давление в 3.5 раза выше.
            <ul>
                <li>108.0 МПа ≈ 1080 атмосфер</li>
            </ul>`,
        afterDividerText: 'Экспериментальные и аэрокосмические конструкции, защитные купола для реакторов, специальные научные объекты.'
    },
    B85: {
        strengthText: '115.5 МПа',
        title: 'Как выглядит прочность B85 в реальном мире',
        blocks: {
            concrete: { value: 'B85', sub: 'Прочность ~115.5 МПа' },
            cars: { value: 'Взрыв', sub: 'Давление ударной волны' },
            sea: { value: 'Глубоководный аппарат', sub: 'Запас прочности' }
        },
        textHtml: `
            Прочность 115.5 МПа — это величина, сравнимая с пиковым давлением при некоторых типах промышленных взрывов.
            <br><br>
            Корпуса глубоководных аппаратов проектируются, чтобы выдерживать подобное давление на глубинах свыше 1100 метров.
            <ul>
                <li>115.5 МПа ≈ 1155 атмосфер</li>
            </ul>`,
        afterDividerText: 'Высокотехнологичные специальные применения, где требуется устойчивость к экстремальным динамическим и статическим нагрузкам.'
    },
    B90: {
        strengthText: '123.0 МПа',
        title: 'Как выглядит прочность B90 в реальном мире',
        blocks: {
            concrete: { value: 'B90', sub: 'Прочность ~123.0 МПа' },
            cars: { value: 'Сверхпрочность', sub: 'Материалы будущего' },
            sea: { value: 'Марианская впадина', sub: 'Давление в 10 раз меньше' }
        },
        textHtml: `
            Прочность 123.0 МПа — это территория сверхпрочных материалов, которые определяют технологии будущего.
            <br><br>
            Такое давление достигается на глубине 1230 метров. Это лишь десятая часть давления на дне Марианской впадины.
            <ul>
                <li>123.0 МПа ≈ 1230 атмосфер</li>
            </ul>`,
        afterDividerText: 'Футуристические и экспериментальные материалы, защитные сооружения от экстремальных воздействий, компоненты для космической отрасли.'
    }
};


function openPanel(concreteClass) {
    const data = concreteData[concreteClass];
    if (!data) return;

    resetTestState();
    currentConcreteClass = concreteClass;

    document.getElementById('panelTitle').textContent = `Класс ${data.class}`;
    document.getElementById('panelClass').textContent = data.class;
    document.getElementById('panelMark').textContent = data.mark;
    document.getElementById('panelStrength').textContent = `${data.strength} МПа`;
    document.getElementById('panelWaterproof').textContent = data.waterproof;
    document.getElementById('panelFrost').textContent = data.frost;
    document.getElementById('panelDescription').textContent = data.description;

    if (testBtn) {
        testBtn.disabled = false;
        testBtn.textContent = 'Протестировать прочность';
        if (testVisualization) {
            testVisualization.parentNode.insertBefore(testBtn, testVisualization);
        }
    }

    sidePanel.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closePanelFunc() {
    resetTestState();
    sidePanel.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
}

closePanelBtn.addEventListener('click', closePanelFunc);
overlay.addEventListener('click', closePanelFunc);
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sidePanel.classList.contains('active')) {
        closePanelFunc();
    }
});


function parseStrengthValue(strengthStr) {
    if (!strengthStr) return 0;
    const normalized = String(strengthStr).replace(',', '.').replace('МПа', '').trim();
    const rangeMatch = normalized.match(/([\d.]+)\s*-\s*([\d.]+)/);
    if (rangeMatch) {
        return parseFloat(rangeMatch[2]);
    }
    const singleMatch = normalized.match(/([\d.]+)/);
    return singleMatch ? parseFloat(singleMatch[1]) : 0;
}

function applyComparisonContent(concreteClass) {
    const comparisonKey = concreteClass.replace('.', '_');
    const data = comparisonDataByClass[comparisonKey];
    if (!data) {
        console.error(`No comparison data for class: ${concreteClass} (key: ${comparisonKey})`);
        return;
    }

    if (comparisonTitle) comparisonTitle.textContent = data.title;

    if (compConcrete) {
        const value = compConcrete.querySelector('.comparison-value');
        const sub = compConcrete.querySelector('.comparison-sub');
        if (value) value.textContent = data.blocks.concrete.value;
        if (sub) sub.textContent = data.blocks.concrete.sub;
    }

    if (compCars) {
        const value = compCars.querySelector('.comparison-value');
        const sub = compCars.querySelector('.comparison-sub');
        if (value) value.textContent = data.blocks.cars.value;
        if (sub) sub.textContent = data.blocks.cars.sub;
    }

    if (compSea) {
        const value = compSea.querySelector('.comparison-value');
        const sub = compSea.querySelector('.comparison-sub');
        if (value) value.textContent = data.blocks.sea.value;
        if (sub) sub.textContent = data.blocks.sea.sub;
    }

    if (comparisonText) comparisonText.innerHTML = data.textHtml;
    if (comparisonTextSecondary) comparisonTextSecondary.innerHTML = data.afterDividerText;
}


function changeCubeImage(state) {
    if (!cubeImage || !cubeImages[state]) return;
    const newSrc = cubeImages[state];
    if (cubeImage.src === newSrc) return;

    cubeImage.style.opacity = 0;
    cubeImage.style.transform = 'scale(0.97)';
    setTimeout(() => {
        cubeImage.src = newSrc;
        cubeImage.onload = () => {
            requestAnimationFrame(() => {
                cubeImage.style.opacity = 1;
                cubeImage.style.transform = 'scale(1)';
            });
            cubeImage.onload = null;
        };
    }, 160);
}

function resetComparison() {
    if (comparisonTimeouts.length) {
        comparisonTimeouts.forEach(t => clearTimeout(t));
        comparisonTimeouts = [];
    }
    if (comparisonSection) {
        comparisonSection.style.display = 'none';
        comparisonSection.classList.remove('active');
    }
    [compConcrete, compCars, compSea].forEach(el => {
        if (el) el.classList.remove('visible');
    });
    if (comparisonText) comparisonText.classList.remove('visible');
    if (comparisonDivider) comparisonDivider.classList.remove('visible');
    if (comparisonTextSecondary) comparisonTextSecondary.classList.remove('visible');
}

function resetTestState() {
    if (testInterval) {
        clearInterval(testInterval);
        testInterval = null;
    }
    isTesting = false;
    currentTestValue = 0;
    maxStrengthNumeric = 0;

    if (testVisualization) testVisualization.style.display = 'none';
    if (testBtn) {
        testBtn.style.display = 'block';
        testBtn.disabled = false;
        testBtn.textContent = 'Протестировать прочность';
        if (testVisualization) {
            testVisualization.parentNode.insertBefore(testBtn, testVisualization);
        }
    }

    if (cubeImage) {
        cubeImage.src = cubeImages.whole;
        cubeImage.style.opacity = 1;
    }
    if (progressFill) progressFill.style.width = '0%';
    if (progressPercent) progressPercent.textContent = '0%';
    if (currentStrengthEl) currentStrengthEl.textContent = '0.0';
    if (maxStrengthEl) maxStrengthEl.textContent = '100%';
    if (testResultMessage) testResultMessage.textContent = '';
    if (compareBtn) {
        compareBtn.style.display = 'none';
        compareBtn.disabled = false;
    }
    resetComparison();
}

function startTest() {
    if (!testBtn || !testVisualization || isTesting) return;

    const panelStrengthEl = document.getElementById('panelStrength');
    const panelClassEl = document.getElementById('panelClass');
    const strengthText = panelStrengthEl ? panelStrengthEl.textContent : '';
    const concreteClass = panelClassEl ? panelClassEl.textContent : '';

    const numericStrength = parseStrengthValue(strengthText);
    if (!numericStrength) return;

    currentConcreteClass = concreteClass || null;
    maxStrengthNumeric = numericStrength;

    testVisualization.style.display = 'block';
    testBtn.style.display = 'none';

    setTimeout(() => {
        testVisualization.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 80);

    currentTestValue = 0;
    isTesting = true;
    changeCubeImage('whole');
    if (progressFill) progressFill.style.width = '0%';
    if (progressPercent) progressPercent.textContent = '0%';
    if (currentStrengthEl) currentStrengthEl.textContent = '0.0';
    if (maxStrengthEl) maxStrengthEl.textContent = `${maxStrengthNumeric.toFixed(1)} МПа`;
    if (testResultMessage) testResultMessage.textContent = '';
    if (compareBtn) {
        compareBtn.style.display = 'none';
        compareBtn.disabled = false;
    }
    resetComparison();

    const incrementPerSecond = maxStrengthNumeric / 6;
    const incrementPerInterval = incrementPerSecond / 10;

    testInterval = setInterval(() => {
        currentTestValue += incrementPerInterval;
        if (currentTestValue >= maxStrengthNumeric) {
            currentTestValue = maxStrengthNumeric;
            updateTestVisualization();
            stopTest();
            return;
        }
        updateTestVisualization();
    }, 100);
}

function updateTestVisualization() {
    if (!maxStrengthNumeric || !progressFill) return;
    if (currentStrengthEl) {
        currentStrengthEl.textContent = currentTestValue.toFixed(1);
    }

    const percent = (currentTestValue / maxStrengthNumeric) * 100;
    if (progressPercent) progressPercent.textContent = `${Math.round(percent)}%`;
    progressFill.style.width = `${Math.min(percent, 100)}%`;

    let color;
    if (percent < 60) {
        color = '#48bb78';
        changeCubeImage('whole');
    } else if (percent < 90) {
        color = '#f6e05e';
        changeCubeImage('cracked');
    } else {
        color = '#e53e3e';
        changeCubeImage('destroyed');
    }
    progressFill.style.background = color;
}

function stopTest() {
    if (testInterval) {
        clearInterval(testInterval);
        testInterval = null;
    }
    isTesting = false;

    if (testBtn) {
        testBtn.style.display = 'block';
        testBtn.textContent = 'Протестировать прочность ещё раз';
    }

    const panelClassEl = document.getElementById('panelClass');
    const classLabel = panelClassEl ? panelClassEl.textContent : '';
    const comparisonKey = classLabel.replace('.', '_');

    if (testResultMessage && maxStrengthNumeric) {
        const message = `Прочность ${classLabel} составляет ${maxStrengthNumeric.toFixed(1)} МПа.`;
        testResultMessage.textContent = message;
        if (classLabel && comparisonDataByClass[comparisonKey]) {
            if (compareBtn) compareBtn.style.display = 'block';
        }
    }

    if (testBtn && testResultMessage) {
        const parent = testBtn.parentNode;
        parent.appendChild(testResultMessage);
        parent.appendChild(testBtn);
        if (compareBtn && compareBtn.style.display !== 'none') {
            parent.appendChild(compareBtn);
        }
    }

    /* Прокрутка панели вниз, чтобы были видны обе кнопки: "Протестировать ещё раз" и "Сравнить" */
    const scrollTarget = compareBtn && compareBtn.style.display !== 'none' ? compareBtn : testBtn;
    if (scrollTarget) {
        setTimeout(() => {
            scrollTarget.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }, 150);
    }
}


function handleCompareClick() {
    const comparisonKey = currentConcreteClass ? currentConcreteClass.replace('.', '_') : null;
    if (!comparisonSection || !currentConcreteClass || !comparisonDataByClass[comparisonKey]) return;

    resetComparison();
    applyComparisonContent(currentConcreteClass);
    comparisonSection.style.display = 'block';

    comparisonTimeouts.push(setTimeout(() => {
        comparisonSection.classList.add('active');
    }, 20));
    comparisonTimeouts.push(setTimeout(() => {
        if (compConcrete) compConcrete.classList.add('visible');
    }, 200));
    comparisonTimeouts.push(setTimeout(() => {
        if (compCars) compCars.classList.add('visible');
    }, 600));
    comparisonTimeouts.push(setTimeout(() => {
        if (compSea) compSea.classList.add('visible');
    }, 1000));
    comparisonTimeouts.push(setTimeout(() => {
        if (comparisonText) comparisonText.classList.add('visible');
        if (comparisonDivider) comparisonDivider.classList.add('visible');
        if (comparisonTextSecondary) comparisonTextSecondary.classList.add('visible');
    }, 1500));

    setTimeout(() => {
        comparisonSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 80);
}

if (testBtn) {
    testBtn.addEventListener('click', startTest);
}

if (compareBtn) {
    compareBtn.addEventListener('click', handleCompareClick);
}

// карусель
const carouselSlides = document.getElementById('carouselSlides');
const carouselPrev = document.getElementById('carouselPrev');
const carouselNext = document.getElementById('carouselNext');
const carouselIndicators = document.getElementById('carouselIndicators');

if (carouselSlides) {
    const totalSlides = document.querySelectorAll('.carousel-slide').length;
    let currentCarouselSlide = 0;

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
        indicators.forEach((ind, i) => ind.classList.toggle('active', i === currentCarouselSlide));
    }

    function goToSlide(index) { currentCarouselSlide = index; updateCarousel(); }
    function nextSlide() { currentCarouselSlide = (currentCarouselSlide + 1) % totalSlides; updateCarousel(); }
    function prevSlide() { currentCarouselSlide = (currentCarouselSlide - 1 + totalSlides) % totalSlides; updateCarousel(); }

    carouselPrev.addEventListener('click', prevSlide);
    carouselNext.addEventListener('click', nextSlide);
}


// инициализация
function initialize() {
    const rows = document.querySelectorAll('.concrete-table tbody tr');
    rows.forEach(row => {
        row.addEventListener('click', () => {
            openPanel(row.getAttribute('data-class'));
        });
    });
}

// анимации
function initializeCompositionAnimation() {
    const grid = document.getElementById('compositionGrid');
    if (!grid) return;

    const cards = Array.from(grid.querySelectorAll('.composition-card'));
    if (!cards.length) return;

    const collage = document.getElementById('compositionCollage');
    const collageItems = collage ? Array.from(collage.querySelectorAll('.composition-collage-item')) : [];

    cards.forEach(c => c.classList.remove('is-visible'));
    collageItems.forEach(i => i.classList.remove('is-visible'));

    const show = () => {
        collageItems.forEach((item, idx) => {
            setTimeout(() => item.classList.add('is-visible'), 120 + idx * 90);
        });

        const firstWave = cards.filter(c => ['1', '3'].includes(c.getAttribute('data-seq')));
        const secondWave = cards.filter(c => ['2', '4'].includes(c.getAttribute('data-seq')));
        const cardsStartDelay = collageItems.length ? (120 + collageItems.length * 90 + 220) : 0;

        setTimeout(() => {
            firstWave.forEach(c => c.classList.add('is-visible'));
            setTimeout(() => {
                secondWave.forEach(c => c.classList.add('is-visible'));
            }, 260);
        }, cardsStartDelay);
    };

    if (!('IntersectionObserver' in window)) {
        show();
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                show();
                observer.disconnect();
            }
        });
    }, { threshold: 0.22 });

    observer.observe(grid);
}

document.addEventListener('DOMContentLoaded', () => {
    initialize();
    initializeCompositionAnimation();
});
