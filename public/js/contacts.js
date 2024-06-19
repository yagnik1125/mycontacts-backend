// document.addEventListener('DOMContentLoaded', () => {
//     const contactForm = document.getElementById('contact-form');
//     const contactsList = document.getElementById('contacts-list');
//     const token = localStorage.getItem('token');

//     const fetchContacts = async () => {
//         const response = await fetch('/api/contacts', {
//             headers: { 'Authorization': `Bearer ${token}` }
//         });
//         if (response.ok) {
//             const contacts = await response.json();
//             displayContacts(contacts);
//         }
//     };

//     const displayContacts = (contacts) => {
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

//     if (token) {
//         fetchContacts();
//     }

//     contactForm.addEventListener('submit', async (e) => {
//         e.preventDefault();
//         const contactId = document.getElementById('contact-id').value;
//         const name = document.getElementById('name').value;
//         const email = document.getElementById('email').value;
//         const phone = document.getElementById('phone').value;

//         if (contactId) {
//             // Update existing contact
//             const response = await fetch(`/api/contacts/${contactId}`, {
//                 method: 'PUT',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${token}`
//                 },
//                 body: JSON.stringify({ name, email, phone })
//             });

//             if (response.ok) {
//                 fetchContacts();
//                 contactForm.reset();
//                 document.getElementById('contact-id').value = ''; // Clear the contact ID field
//             } else {
//                 alert('Failed to update contact.');
//             }
//         } else {
//             // Create new contact
//             const response = await fetch('/api/contacts', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${token}`
//                 },
//                 body: JSON.stringify({ name, email, phone })
//             });

//             if (response.ok) {
//                 fetchContacts();
//                 contactForm.reset();
//             } else {
//                 alert('Failed to create contact.');
//             }
//         }
//     });

//     window.editContact = async (id) => {
//         const response = await fetch(`/api/contacts/${id}`, {
//             headers: { 'Authorization': `Bearer ${token}` }
//         });
//         if (response.ok) {
//             const contact = await response.json();
//             document.getElementById('contact-id').value = contact._id; // Set the contact ID
//             document.getElementById('name').value = contact.name;
//             document.getElementById('email').value = contact.email;
//             document.getElementById('phone').value = contact.phone;
//         }
//     };

//     window.deleteContact = async (id) => {
//         const response = await fetch(`/api/contacts/${id}`, {
//             method: 'DELETE',
//             headers: { 'Authorization': `Bearer ${token}` }
//         });
//         if (response.ok) {
//             fetchContacts();
//         } else {
//             alert('Failed to delete contact.');
//         }
//     };
// });

//--------------------------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    const contactsList = document.getElementById('contacts-list');

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

    if (localStorage.getItem('token')) {
        fetchContacts();
    }

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const contactId = document.getElementById('contact-id').value;
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const token = localStorage.getItem('token');

        if (contactId) {
            // Update existing contact
            const response = await fetch(`/api/contacts/${contactId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ name, email, phone })
            });

            if (response.ok) {
                fetchContacts();
                contactForm.reset();
                document.getElementById('contact-id').value = ''; // Clear the contact ID field
            } else {
                alert('Failed to update contact.');
            }
        } else {
            // Create new contact
            const response = await fetch('/api/contacts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ name, email, phone })
            });

            if (response.ok) {
                fetchContacts();
                contactForm.reset();
            } else {
                alert('Failed to create contact.');
            }
        }
    });

    window.editContact = async (id) => {
        const token = localStorage.getItem('token');
        const response = await fetch(`/api/contacts/${id}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.ok) {
            const contact = await response.json();
            document.getElementById('contact-id').value = contact._id; // Set the contact ID
            document.getElementById('name').value = contact.name;
            document.getElementById('email').value = contact.email;
            document.getElementById('phone').value = contact.phone;
        } else if (response.status === 401) {
            alert('Unauthorized. Please log in again.');
            handleLogout();
        }
    };

    window.deleteContact = async (id) => {
        const token = localStorage.getItem('token');
        const response = await fetch(`/api/contacts/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.ok) {
            fetchContacts();
        } else if (response.status === 401) {
            alert('Unauthorized. Please log in again.');
            handleLogout();
        } else {
            alert('Failed to delete contact.');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        document.getElementById('auth-section').style.display = 'block';
        document.getElementById('contact-section').style.display = 'none';
    };
});
