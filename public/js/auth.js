// document.addEventListener('DOMContentLoaded', () => {
//     const registerForm = document.getElementById('register');
//     const loginForm = document.getElementById('login');
//     // const contactSection = document.getElementById('contact-section');

//     const fetchContacts = async () => {
//         const token = localStorage.getItem('token');
//         const response = await fetch('/api/contacts', {
//             headers: { 'Authorization': `Bearer ${token}` }
//         });
//         if (response.ok) {
//             const contacts = await response.json();
//             displayContacts(contacts);
//         }
//     };

//     const displayContacts = (contacts) => {
//         const contactsList = document.getElementById('contacts-list');
//         contactsList.innerHTML = '';
//         contacts.forEach(contact => {
//             const contactDiv = document.createElement('div');
//             contactDiv.classList.add('contact');
//             contactDiv.innerHTML = `
//                 <div>
//                     <strong>${contact.name}</strong><br>
//                     ${contact.email}<br>
//                     ${contact.phone}
//                 </div>
//                 <div>
//                     <button onclick="editContact('${contact._id}')">Edit</button>
//                     <button onclick="deleteContact('${contact._id}')">Delete</button>
//                 </div>
//             `;
//             contactsList.appendChild(contactDiv);
//         });
//     };

//     registerForm.addEventListener('submit', async (e) => {
//         e.preventDefault();
//         const username = document.getElementById('register-username').value;
//         const email = document.getElementById('register-email').value;
//         const password = document.getElementById('register-password').value;

//         const response = await fetch('/api/users/register', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ username, email, password })
//         });

//         if (response.ok) {
//             console.log(token);
//             alert('Registration successful! Please login.');

//         } else {
//             alert('Registration failed.');
//         }
//     });

//     loginForm.addEventListener('submit', async (e) => {
//         e.preventDefault();
//         const email = document.getElementById('login-email').value;
//         const password = document.getElementById('login-password').value;

//         const response = await fetch('/api/users/login', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ email, password })
//         });

//         if (response.ok) {
//             const { accessToken } = await response.json();
//             localStorage.setItem('token', accessToken);
//             // token = localStorage.setItem('token', accessToken);
//             document.getElementById('auth-section').style.display = 'none';
//             document.getElementById('contact-section').style.display = 'block';
//             fetchContacts();
//         } else {
//             alert('Login failed.');
//         }
//     });

//     const logoutButton = document.getElementById('logout');
//     const handleLogout = () => {
//         localStorage.removeItem('token');
//         document.getElementById('auth-section').style.display = 'block';
//         document.getElementById('contact-section').style.display = 'none';
//     };

//     logoutButton.addEventListener('click', handleLogout);

//     // Call fetchContacts if token exists on page load
//     const token = localStorage.getItem('token');
//     if (token) {
//         document.getElementById('auth-section').style.display = 'none';
//         document.getElementById('contact-section').style.display = 'block';
//         fetchContacts();
//     }
// });

//------------------------------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('register');
    const loginForm = document.getElementById('login');
    const logoutButton = document.getElementById('logout');

    const fetchContacts = async () => {
        const token = localStorage.getItem('token');
        const response = await fetch('/api/contacts', {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.ok) {
            const contacts = await response.json();
            displayContacts(contacts);
        } else if (response.status === 401) {
            alert('Unauthorized. Please log in again.');
            handleLogout();
        }
    };

    const displayContacts = (contacts) => {
        const contactsList = document.getElementById('contacts-list');
        contactsList.innerHTML = '';
        contacts.forEach(contact => {
            const contactDiv = document.createElement('div');
            contactDiv.classList.add('contact');
            contactDiv.innerHTML = `
                <div>
                    <strong>${contact.name}</strong><br>
                    ${contact.email}<br>
                    ${contact.phone}
                </div>
                <div>
                    <button onclick="editContact('${contact._id}')">Edit</button>
                    <button onclick="deleteContact('${contact._id}')">Delete</button>
                </div>
            `;
            contactsList.appendChild(contactDiv);
        });
    };

    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('register-username').value;
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;

        const response = await fetch('/api/users/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password })
        });

        if (response.ok) {
            alert('Registration successful! Please login.');
        } else {
            alert('Registration failed.');
        }
    });

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        const response = await fetch('/api/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        if (response.ok) {
            const { accessToken } = await response.json();
            localStorage.setItem('token', accessToken);
            document.getElementById('auth-section').style.display = 'none';
            document.getElementById('contact-section').style.display = 'block';
            fetchContacts();
        } else {
            alert('Login failed.');
        }
    });

    const handleLogout = () => {
        localStorage.removeItem('token');
        document.getElementById('auth-section').style.display = 'block';
        document.getElementById('contact-section').style.display = 'none';
    };

    logoutButton.addEventListener('click', handleLogout);

    // Check token and fetch contacts if exists
    const token = localStorage.getItem('token');
    if (token) {
        document.getElementById('auth-section').style.display = 'none';
        document.getElementById('contact-section').style.display = 'block';
        fetchContacts();
    }
});
