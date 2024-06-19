document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('register-form');
    const loginForm = document.getElementById('login-form');
    const currentUserButton = document.getElementById('current-user-button');
    const currentUserInfo = document.getElementById('current-user-info');

    const apiUrl = 'http://localhost:5001/api/users/';

    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('register-username').value;
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;

        const response = await fetch(`${apiUrl}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password }),
        });

        const data = await response.json();
        alert(response.ok ? 'Registration successful' : `Error: ${data.message}`);
    });

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        const response = await fetch(`${apiUrl}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        if (response.ok) {
            alert('Login successful');
            localStorage.setItem('accessToken', data.accessToken);
        } else {
            alert(`Error: ${data.message}`);
        }
    });

    currentUserButton.addEventListener('click', async () => {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            alert('Please log in first');
            return;
        }

        const response = await fetch(`${apiUrl}/current`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        const data = await response.json();
        if (response.ok) {
            currentUserInfo.innerHTML = `
                <p><strong>Username:</strong> ${data.username}</p>
                <p><strong>Email:</strong> ${data.email}</p>
            `;
        } else {
            alert(`Error: ${data.message}`);
        }
    });
});
