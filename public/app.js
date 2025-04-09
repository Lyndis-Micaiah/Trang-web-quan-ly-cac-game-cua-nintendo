// app.js (Chạy trong client-side, trình duyệt)
if (typeof document !== 'undefined') {  // Đảm bảo chỉ sử dụng trong trình duyệt
    let token = localStorage.getItem('token');
    console.log(token);

    // Sử dụng document trong trình duyệt để thay đổi DOM
    document.querySelector('.close').onclick = function() {
        document.getElementById('auth-modal').style.display = 'none';
    };

    window.onclick = function(event) {
        if (event.target == document.getElementById('auth-modal')) {
            document.getElementById('auth-modal').style.display = 'none';
        }
    };

    // Tải games khi trang web tải
    fetchGames();

    // Thêm sự kiện cho các button filter platform
    document.querySelectorAll('.platform-filter button').forEach(button => {
        button.addEventListener('click', (e) => {
            const platform = e.target.textContent;
            fetchGames(platform);
        });
    });
}

// Các hàm khác không thay đổi
async function fetchGames(platform = '') {
    const response = await fetch(`/api/games${platform ? `?platform=${platform}` : ''}`);
    const games = await response.json();
    
    const container = document.getElementById('games-container');
    container.innerHTML = games.map(game => `
        <div class="game-card">
            <img src="${game.imageUrl}" alt="${game.title}">
            <h3>${game.title}</h3>
            <p>${game.platform}</p>
            <p>$${game.price}</p>
            <button onclick="buyGame('${game._id}')">Buy Now</button>
        </div>
    `).join('');
}

function filterGames(platform) {
    fetchGames(platform);
}

function showLoginForm() {
    document.getElementById('auth-modal').style.display = 'block';
    document.getElementById('login-form').style.display = 'block';
    document.getElementById('register-form').style.display = 'none';
}

function showRegisterForm() {
    document.getElementById('auth-modal').style.display = 'block';
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('register-form').style.display = 'block';
}

async function login() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();
        if (data.token) {
            localStorage.setItem('token', data.token);
            token = data.token;
            document.getElementById('auth-modal').style.display = 'none';
        }
    } catch (error) {
        console.error('Login error:', error);
    }
}

async function register() {
    const username = document.getElementById('register-username').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;

    try {
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password })
        });

        if (response.ok) {
            showLoginForm();
        }
    } catch (error) {
        console.error('Registration error:', error);
    }
}
