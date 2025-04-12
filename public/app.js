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

async function fetchGames(platform = '') {
    const token = localStorage.getItem('token');
    
    const response = await fetch(`/api/games${platform ? `?platform=${platform}` : ''}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
    
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

document.getElementById('login-form-id').addEventListener('submit', async function (event) {
    event.preventDefault();  // Ngừng gửi form mặc định

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
            localStorage.setItem('username', username);  // Lưu tên người dùng
            updateUI();
            document.getElementById('auth-modal').style.display = 'none';
            fetchGames();
        } else {
            console.log('Invalid credentials');
        }
    } catch (error) {
        console.error('Login error:', error);
    }
});

document.getElementById('register-form-id').addEventListener('submit', async function (event) {
    event.preventDefault();

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
});

function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    updateUI();  // Cập nhật lại giao diện
    fetchGames();  // Lấy lại danh sách game không có token
}

function updateUI() {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    const userInfo = document.getElementById('user-info');
    const authLinks = document.getElementById('auth-links');

    if (token) {
        // Hiển thị tên người dùng và nút Logout
        userInfo.style.display = 'block';
        authLinks.style.display = 'none';
        document.getElementById('username-display').textContent = `Hello, ${username}`;
    } else {
        // Hiển thị các nút Login và Register
        userInfo.style.display = 'none';
        authLinks.style.display = 'flex';
    }
}

// Gọi hàm updateUI khi trang tải
updateUI();
