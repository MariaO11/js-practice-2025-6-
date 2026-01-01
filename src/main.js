// Знаходимо елементи
const themeBtn = document.getElementById('theme-toggle');
const body = document.body;
const skillsList = document.getElementById('skills-list');

// Дані для навичок
const skillsData = [
  'HTML5 / Semantic Layout',
  'CSS3 / Flexbox & Grid',
  'JavaScript (ES6+)',
  'Git / GitHub',
  'Vite / Webpack',
  'Responsive Design',
  'REST API',
  'C++ / OOP',     
  'SQL / Databases' 
];

// Логіка перемикання теми
// Перевіряємо, що збережено в пам'яті браузера
const currentTheme = localStorage.getItem('site_theme');

// Якщо збережено "dark", вмикаємо темну тему одразу при завантаженні
if (currentTheme === 'dark') {
    body.classList.add('dark-mode');
    themeBtn.textContent = 'Light Mode';
}

themeBtn.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    
    // Перевіряємо, чи активний клас dark-mode
    if (body.classList.contains('dark-mode')) {
        themeBtn.textContent = 'Light Mode';
        localStorage.setItem('site_theme', 'dark'); // ЗАПИСУЄМО В ПАМ'ЯТЬ
    } else {
        themeBtn.textContent = 'Dark Mode';
        localStorage.setItem('site_theme', 'light'); // ЗАПИСУЄМО В ПАМ'ЯТЬ
    }
});

// Функція створення списку навичок
const renderSkills = () => {
  // Перевіряємо, чи існує елемент списку, щоб не було помилок
  if (skillsList) {
    skillsList.innerHTML = ''; // Очищаємо список перед додаванням
    skillsData.forEach(skill => {
      const li = document.createElement('li');
      li.className = 'skill-item';
      li.textContent = skill;
      skillsList.appendChild(li);
    });
  } else {
    console.error('Елемент #skills-list не знайдено в HTML!');
  }
};

// Запускаємо рендер
renderSkills();


// --- КНОПКА ВГОРУ ---
const scrollBtn = document.getElementById('scrollToTopBtn');

// Слухаємо подію скролу (прокрутки)
window.addEventListener('scroll', () => {
  // Якщо прокрутили вниз більше ніж на 300px
  if (window.scrollY > 300) {
    scrollBtn.classList.add('show'); // Показуємо кнопку
  } else {
    scrollBtn.classList.remove('show'); // Ховаємо кнопку
  }
});

// Слухаємо клік по кнопці
scrollBtn.addEventListener('click', () => {
  // Плавно крутимо вгору
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});


// --- СЕКЦІЯ ПРОЄКТІВ ---
const projectsContainer = document.getElementById('projects-container');
const countElement = document.getElementById('project-count');

// Додаємо категорію (category) до даних
const projectsData = [
  {
    title: 'Student Database',
    description: 'Система обліку студентів з використанням ООП.',
    tech: 'C++, OOP, File I/O',
    category: 'db' // database
  },
  {
    title: 'Shop Inventory',
    description: 'База даних для магазину. SQL-запити.',
    tech: 'SQL, MySQL',
    category: 'db' // database
  },
  {
    title: 'Portfolio Website',
    description: 'Адаптивний веб-сайт з темною темою.',
    tech: 'HTML, CSS, JS',
    category: 'web' // web
  }
];

// Функція відображення (приймає масив проєктів)
const renderProjects = (items) => {
  projectsContainer.innerHTML = '';

  // Використання MAP (замість forEach) для створення HTML
  const cardsHTML = items.map(project => `
    <div class="project-card">
      <h3>${project.title}</h3>
      <p>${project.description}</p>
      <div class="tech-stack">${project.tech}</div>
    </div>
  `).join(''); // з'єднуємо в один рядок
  
  projectsContainer.innerHTML = cardsHTML;

  // Використання REDUCE (рахуємо кількість)
  const total = items.reduce((acc) => acc + 1, 0);
  countElement.textContent = `Відображено проєктів: ${total}`;
};

// Використання FILTER (глобальна функція для кнопок)
window.filterProjects = (category) => {
  if (category === 'all') {
    renderProjects(projectsData);
  } else {
    // Фільтруємо масив
    const filtered = projectsData.filter(item => item.category === category);
    renderProjects(filtered);
  }
};

// Запуск при старті
renderProjects(projectsData);


// --- ОБРОБКА ФОРМИ (ВАЛІДАЦІЯ) ---
const contactForm = document.getElementById('contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Зупиняємо стандартну відправку (перезавантаження)

    // Отримуємо значення полів
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Проста валідація
    if (name && email && message) {
      // Якщо все заповнено
      alert(`Дякую, ${name}! Ваше повідомлення надіслано.`);
      contactForm.reset(); // Очистити поля
    } else {
      // Якщо щось порожнє (хоча атрибут required в HTML теж це контролює)
      alert('Будь ласка, заповніть всі поля!');
    }
  });
}


// ЗАПИТ ДО ЛОКАЛЬНОГО API (JSON)
const btnLoad = document.getElementById('load-joke-btn');

if (btnLoad) {
  btnLoad.addEventListener('click', () => {
    
    // ВИКОНУЄМО РЕАЛЬНИЙ ЗАПИТ
    // Ми звертаємось до файлу, який лежить на сервері (у папці public)
    axios.get('/jokes.json')
      .then(response => {
        // Axios отримав дані з файлу
        const jokes = response.data;
        
        // ОБИРАЄМО ВИПАДКОВИЙ ЖАРТ
        const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];

        // ВІДОБРАЖАЄМО НА ЕКРАНІ
        document.getElementById('joke-setup').textContent = randomJoke.setup;
        document.getElementById('joke-punchline').textContent = randomJoke.punchline;
      })
      .catch(error => {
        console.error("Помилка:", error);
        document.getElementById('joke-setup').textContent = 'Не вдалося завантажити файл жартів.';
      });
  });
}


// ВЗАЄМОДІЯ З ЗОВНІШНІМИ API (GITHUB) 
const searchBtn = document.getElementById('gh-search-btn');
const searchInput = document.getElementById('gh-username');
// Відновлюємо останній введений логін, якщо він є
const savedUsername = localStorage.getItem('gh_last_username');
if (savedUsername) {
    searchInput.value = savedUsername;
}

// Елементи для керування станами
const loader = document.getElementById('gh-loader');
const resultBlock = document.getElementById('gh-result');
const errorBlock = document.getElementById('gh-error');
const reposListBlock = document.getElementById('repos-list'); // <-- Місце для списку

// ЗМІННІ СТАНУ ДЛЯ ПАГІНАЦІЇ
let currentPage = 1;
const reposPerPage = 5;
let currentUsername = ''; // Зберігаємо нікнейм, щоб пагінація знала, кого гортати

// Елементи пагінації
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const pageIndicator = document.getElementById('page-indicator');
const paginationBlock = document.getElementById('pagination-controls');

// Слухачі подій для кнопок пагінації
if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => changePage(-1));
    nextBtn.addEventListener('click', () => changePage(1));
}

// ОСНОВНА ЛОГІКА ПОШУКУ 
if (searchBtn) {
  searchBtn.addEventListener('click', () => {
    const username = searchInput.value.trim();
    if (!username) return;

    // Скидаємо налаштування для нового пошуку
    currentUsername = username;
    currentPage = 1; 

    // СТАН ЗАВАНТАЖЕННЯ
    loader.classList.remove('d-none');
    resultBlock.classList.add('d-none');
    errorBlock.classList.add('d-none');
    paginationBlock.classList.add('d-none'); // Ховаємо кнопки поки шукаємо

    // ОТРИМАННЯ ПРОФІЛЮ
    axios.get(`https://api.github.com/users/${username}`)
      .then(response => {
        const user = response.data;
        // ЗБЕРІГАЄМО НІКНЕЙМ В LOCALSTORAGE
        localStorage.setItem('gh_last_username', username);
        
        // Заповнюємо профіль
        document.getElementById('gh-avatar').src = user.avatar_url;
        document.getElementById('gh-name').textContent = user.name || user.login;
        document.getElementById('gh-bio').textContent = user.bio || 'Опис відсутній';
        document.getElementById('gh-followers').textContent = user.followers;
        document.getElementById('gh-link').href = user.html_url;

        // Показуємо загальну кількість репозиторіїв
        document.getElementById('gh-repos').textContent = user.public_repos;

        // ВИКЛИКАЄМО ПАГІНАЦІЮ (замість старого запиту)
        getRepos(username);

        // Показуємо результат
        loader.classList.add('d-none');
        resultBlock.classList.remove('d-none');
      })
      .catch(error => {
        loader.classList.add('d-none');
        resultBlock.classList.add('d-none');
        errorBlock.classList.remove('d-none');

        if (error.response && error.response.status === 404) {
            errorBlock.textContent = 'Користувача не знайдено!';
            errorBlock.className = 'alert alert-danger'; 
        } else {
            errorBlock.textContent = 'Перевірте з’єднання з інтернетом!';
            errorBlock.className = 'alert alert-warning';
        }
      });
  });
}


// ФУНКЦІЯ ОТРИМАННЯ РЕПОЗИТОРІЇВ (З ПАГІНАЦІЄЮ)
function getRepos(username) {
    const url = `https://api.github.com/users/${username}/repos?page=${currentPage}&per_page=${reposPerPage}`;
 
    // Очищаємо список і пишемо "Завантаження..."
    if (reposListBlock) reposListBlock.innerHTML = '<div class="text-center text-muted">Завантаження...</div>';

    axios.get(url)
        .then(response => {

            const repos = response.data;
            
            // ВІДОБРАЖАЄМО СПИСОК (ТУТ БУЛА ПОМИЛКА - ТЕПЕР Є ФУНКЦІЯ)
            renderRepos(repos); 

            // ОНОВЛЕННЯ КНОПОК
            paginationBlock.classList.remove('d-none');
            pageIndicator.textContent = currentPage;
            prevBtn.disabled = (currentPage === 1);
            nextBtn.disabled = (repos.length < reposPerPage);
        })
        .catch(console.error);
}

// ФУНКЦІЯ РЕНДЕРУ (Створення HTML списку)
function renderRepos(repos) {
    if (!reposListBlock) return;
    reposListBlock.innerHTML = ''; // Очистити старе

    if (repos.length === 0) {
        reposListBlock.innerHTML = '<p class="text-muted">Репозиторіїв немає.</p>';
        return;
    }

    // Створюємо картку для кожного репозиторія
    repos.forEach(repo => {
        const repoItem = document.createElement('div');
        repoItem.className = 'card mb-2 shadow-sm';
        repoItem.innerHTML = `
            <div class="card-body p-2 d-flex justify-content-between align-items-center">
                <div>
                    <a href="${repo.html_url}" target="_blank" class="fw-bold text-decoration-none">${repo.name}</a>
                    <div class="small text-muted">${repo.description || 'Без опису'}</div>
                </div>
                <span class="badge bg-secondary">${repo.language || 'Code'}</span>
            </div>
        `;
        reposListBlock.appendChild(repoItem);
    });
}

// ЗМІНА СТОРІНКИ 
function changePage(step) {
    currentPage += step;
    getRepos(currentUsername);
}