// Reveal Body
document.body.classList.add('loaded');

// Initialize Lenis
if (typeof Lenis !== 'undefined') {
    const lenis = new Lenis();
    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
}

// Custom Cursor
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

if (cursorDot && cursorOutline) {
    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;
        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
    });

    document.querySelectorAll('a, button, .bento-item, .menu-toggle').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursorOutline.style.backgroundColor = 'rgba(108, 92, 231, 0.1)';
            cursorOutline.style.borderColor = 'transparent';
        });
        el.addEventListener('mouseleave', () => {
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorOutline.style.backgroundColor = 'transparent';
            cursorOutline.style.borderColor = 'var(--primary-color)';
        });
    });
}

// Magnetic Buttons
if (typeof gsap !== 'undefined') {
    const magnets = document.querySelectorAll('.search-btn, .book-btn, .cta-button, .menu-toggle, .season-btn');
    magnets.forEach(magnet => {
        magnet.addEventListener('mousemove', (e) => {
            const rect = magnet.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            gsap.to(magnet, {
                x: x * 0.3,
                y: y * 0.3,
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        magnet.addEventListener('mouseleave', () => {
            gsap.to(magnet, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: 'elastic.out(1, 0.3)'
            });
        });
    });
}

// Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const overlayMenu = document.querySelector('.overlay-menu');
const menuLinks = document.querySelectorAll('.menu-content a');

if (menuToggle && overlayMenu) {
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        overlayMenu.classList.toggle('active');
    });

    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            overlayMenu.classList.remove('active');
        });
    });
}

// Destinations Data (Enhanced)
const destinations = [
    {
        id: 'turkey',
        name: 'Туреччина',
        season: 'Травень - Жовтень',
        image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=2071&auto=format&fit=crop',
        desc: 'Країна, де схід зустрічається із заходом. Ідеальні пляжі Анталії, величний Стамбул та неймовірні повітряні кулі Каппадокії.',
        highlights: ['Все включено', 'Історичні пам\'ятки', 'Шопінг', 'Сімейний відпочинок'],
        gridClass: 'large',
        tags: ['Море', 'Європа'],
        guide: {
            buy: 'Турецькі солодощі, килими, шкіряні вироби, спеції.',
            eat: 'Кебаб, пахлава, турецька кава, мезе.',
            tip: 'Торгуйтеся на базарах! Це частина культури.'
        },
        hotels: [
            { name: 'Rixos Premium', price: 'від 1500$', img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop' },
            { name: 'Maxx Royal', price: 'від 2000$', img: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=2025&auto=format&fit=crop' }
        ]
    },
    {
        id: 'egypt',
        name: 'Єгипет',
        season: 'Жовтень - Травень',
        image: 'https://images.unsplash.com/photo-1572252009286-268acec5ca0a?q=80&w=2070&auto=format&fit=crop',
        desc: 'Колиска цивілізації. Червоне море з найкращим дайвінгом у світі, піраміди Гізи та вічне сонце.',
        highlights: ['Дайвінг та снорклінг', 'Піраміди', 'Пустельні сафарі', 'Доступні ціни'],
        gridClass: 'tall',
        tags: ['Море', 'Екзотика'],
        guide: {
            buy: 'Папірус, ароматичні масла, бавовна.',
            eat: 'Морепродукти, манго, фалафель.',
            tip: 'Пийте тільки бутильовану воду.'
        },
        hotels: [
            { name: 'Rixos Sharm', price: 'від 1200$', img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop' }
        ]
    },
    {
        id: 'bukovel',
        name: 'Буковель',
        season: 'Грудень - Березень',
        image: 'https://images.unsplash.com/photo-1546593064-053d21199be1?q=80&w=2075&auto=format&fit=crop',
        desc: 'Серце Карпат. Найкращий гірськолижний курорт України. Снігові траси, SPA-комплекси та гуцульський колорит.',
        highlights: ['Лижі та сноуборд', 'VODA club', 'Гуцульська кухня', 'Гори'],
        gridClass: 'wide',
        tags: ['Гори', 'Європа'],
        guide: {
            buy: 'Карпатський чай, мед, вироби з вовни, гриби.',
            eat: 'Банош, бограч, грибна юшка.',
            tip: 'Бронюйте скі-паси заздалегідь онлайн.'
        },
        hotels: [
            { name: 'Radisson Blu', price: 'від 200$', img: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=2025&auto=format&fit=crop' }
        ]
    },
    {
        id: 'amsterdam',
        name: 'Амстердам',
        season: 'Цілий рік',
        image: 'https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?q=80&w=2070&auto=format&fit=crop',
        desc: 'Місто свободи та каналів. Неймовірна архітектура, музеї світового рівня та незабутня атмосфера свята.',
        highlights: ['Канали', 'Музей Ван Гога', 'Велопрогулянки', 'Нічне життя'],
        gridClass: '',
        tags: ['Європа'],
        guide: {
            buy: 'Сир, тюльпани (цибулини), кломпи.',
            eat: 'Оселедець, вафлі, сир.',
            tip: 'Орендуйте велосипед, щоб відчути себе місцевим.'
        },
        hotels: []
    },
    {
        id: 'montenegro',
        name: 'Чорногорія',
        season: 'Червень - Вересень',
        image: 'https://images.unsplash.com/photo-1565627704559-b1c662704017?q=80&w=1974&auto=format&fit=crop',
        desc: 'Перлина Адріатики. Неймовірні гори, що спускаються прямо в море, та старовинні міста Которської затоки.',
        highlights: ['Неймовірна природа', 'Адріатичне море', 'Старі міста', 'Екскурсії'],
        gridClass: 'wide',
        tags: ['Море', 'Гори', 'Європа'],
        guide: {
            buy: 'Пршут, вино Vranac, оливкова олія.',
            eat: 'Морепродукти, чорне різотто.',
            tip: 'Обов\'язково відвідайте Которську затоку на кораблі.'
        },
        hotels: []
    },
    {
        id: 'dominican',
        name: 'Домінікана',
        season: 'Цілий рік',
        image: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=2076&auto=format&fit=crop',
        desc: 'Рай на землі. Білосніжний пісок, кокосові пальми та ритми бачати. Справжня екзотика Карибського басейну.',
        highlights: ['Карибське море', 'Білий пісок', 'Екзотика', 'Все включено'],
        gridClass: 'wide',
        tags: ['Море', 'Екзотика'],
        guide: {
            buy: 'Ром, сигари, кава, ларімар (камінь).',
            eat: 'Лобстери, тропічні фрукти.',
            tip: 'Сонце дуже активне, беріть крем SPF 50+.'
        },
        hotels: []
    }
];

// Render Destinations
const grid = document.getElementById('destinations-grid');

function renderDestinations(filter = '') {
    if (!grid) return;
    grid.innerHTML = '';

    // Filter logic: Check name OR tags
    const filtered = destinations.filter(d => {
        const matchName = d.name.toLowerCase().includes(filter.toLowerCase());
        const matchTag = d.tags && d.tags.some(t => t.toLowerCase().includes(filter.toLowerCase()));
        return matchName || matchTag;
    });

    filtered.forEach(dest => {
        const item = document.createElement('div');
        item.className = `bento-item ${dest.gridClass}`;
        item.innerHTML = `
            <div class="bento-bg" style="background-image: url('${dest.image}')"></div>
            <div class="bento-content">
                <div class="bento-title">${dest.name}</div>
                <div class="bento-subtitle">${dest.season}</div>
            </div>
        `;
        item.addEventListener('click', () => openModal(dest));
        grid.appendChild(item);
    });
}

renderDestinations();

// Search Logic
const searchInput = document.getElementById('destination-search');
const searchBtn = document.querySelector('.search-btn');

// Global function for promo buttons
window.filterByTag = function (tag) {
    if (searchInput) searchInput.value = tag;
    renderDestinations(tag);
    document.getElementById('destinations').scrollIntoView({ behavior: 'smooth' });
}

if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        renderDestinations(e.target.value);
    });
}

if (searchBtn) {
    searchBtn.addEventListener('click', () => {
        renderDestinations(searchInput.value);
        document.getElementById('destinations').scrollIntoView({ behavior: 'smooth' });
    });
}

// Tag Click Logic
document.querySelectorAll('.search-tags span').forEach(tag => {
    tag.addEventListener('click', () => {
        const val = tag.getAttribute('data-tag');
        filterByTag(val);
    });
});

// Modal Logic & Tabs
const modal = document.getElementById('destination-modal');
const closeModalBtn = document.querySelector('.close-modal');
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

function openModal(data) {
    // Populate Basic Info
    document.getElementById('modal-title').innerText = data.name;
    document.getElementById('modal-season-text').innerText = data.season;
    document.querySelector('.modal-image').style.backgroundImage = `url('${data.image}')`;

    // Overview Tab
    document.getElementById('modal-desc').innerText = data.desc;
    const list = document.getElementById('modal-highlights');
    list.innerHTML = '';
    data.highlights.forEach(item => {
        const li = document.createElement('li');
        li.innerText = item;
        list.appendChild(li);
    });

    // Guide Tab
    if (data.guide) {
        document.getElementById('guide-buy').innerText = data.guide.buy;
        document.getElementById('guide-eat').innerText = data.guide.eat;
        document.getElementById('guide-tip').innerText = data.guide.tip;
    }

    // Hotels Tab
    const hotelsGrid = document.getElementById('modal-hotels');
    hotelsGrid.innerHTML = '';
    if (data.hotels && data.hotels.length > 0) {
        data.hotels.forEach(h => {
            const hCard = document.createElement('div');
            hCard.className = 'mini-hotel-card';
            hCard.innerHTML = `
                <div class="mini-hotel-img" style="background-image: url('${h.img}')"></div>
                <div class="mini-hotel-info">
                    <div class="mini-hotel-name">${h.name}</div>
                    <div class="mini-hotel-price">${h.price}</div>
                </div>
            `;
            hotelsGrid.appendChild(hCard);
        });
    } else {
        hotelsGrid.innerHTML = '<p>Готелі уточнюються...</p>';
    }

    // Reset Tabs
    tabBtns.forEach(b => b.classList.remove('active'));
    tabContents.forEach(c => c.classList.remove('active'));
    tabBtns[0].classList.add('active');
    tabContents[0].classList.add('active');

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
if (modal) {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
}

// Tab Switching
tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const target = btn.getAttribute('data-tab');

        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));

        btn.classList.add('active');
        document.getElementById(`tab-${target}`).classList.add('active');
    });
});

// Season Switcher & Particles
const seasonToggle = document.getElementById('season-toggle');
const body = document.body;
const heroBg = document.querySelector('.hero-bg');
const seasonIcon = document.querySelector('.season-icon');
let isWinter = false;

const canvas = document.getElementById('season-particles');
const ctx = canvas.getContext('2d');
let width, height;
let particles = [];

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

class Particle {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * (isWinter ? 3 : 2);
        this.speedY = Math.random() * 1 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.5 + 0.2;
    }

    update() {
        this.y += this.speedY;
        this.x += this.speedX;

        if (this.y > height) {
            this.y = 0;
            this.x = Math.random() * width;
        }
    }

    draw() {
        ctx.fillStyle = isWinter ? `rgba(255, 255, 255, ${this.opacity})` : `rgba(255, 204, 0, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    particles = [];
    for (let i = 0; i < 100; i++) {
        particles.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

if (seasonToggle) {
    seasonToggle.addEventListener('click', () => {
        isWinter = !isWinter;
        body.classList.toggle('winter-theme');

        if (isWinter) {
            seasonIcon.innerText = '❄️';
            heroBg.style.backgroundImage = "url('https://images.unsplash.com/photo-1517299321609-52687d1bc55a?q=80&w=2070&auto=format&fit=crop')"; // Winter Image (Snowy Mountains)
        } else {
            seasonIcon.innerText = '☀️';
            heroBg.style.backgroundImage = "url('https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop')"; // Summer Image
        }

        initParticles(); // Reset particles color
    });
}

// GSAP Animations
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from('.fade-in', {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        delay: 0.5
    });

    gsap.utils.toArray('.bento-item').forEach((item, i) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 90%',
            },
            scale: 0.9,
            opacity: 0,
            duration: 0.8,
            delay: i * 0.1,
            ease: 'power2.out'
        });
    });
}
