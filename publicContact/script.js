document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    const contactsList = document.getElementById('contacts-list');
    const contactIdField = document.getElementById('contact-id');

    const apiUrl = 'http://localhost:5001/api/contacts';

    const fetchContacts = async () => {
        const response = await fetch(apiUrl);
        const contacts = await response.json();
        displayContacts(contacts);
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

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const contactId = contactIdField.value;

        // Regex validation
        const emailRegex = /^[^\s@]+@(gmail\.com|yahoo\.com|hotmail\.com)$/;
        const nameRegex = /^[a-zA-Z\s]{3,}$/;
        const phoneRegex = /^\d{10}$/;

        if (!nameRegex.test(name)) {
            alert('Invalid name. Name must contain atleast 3 letter or spaces.');
            return;
        }

        if (!emailRegex.test(email)) {
            alert('Invalid email address.');
            return;
        }

        if (!phoneRegex.test(phone)) {
            alert('Invalid phone number. Phone number should be 10 digits.');
            return;
        }

        if (contactId) {
            await fetch(`${apiUrl}/${contactId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, phone })
            });
            contactIdField.value = '';
        } else {
            await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, phone })
            });
        }

        contactForm.reset();
        fetchContacts();
    });

    window.editContact = async (id) => {
        const response = await fetch(`${apiUrl}/${id}`);
        const contact = await response.json();
        document.getElementById('name').value = contact.name;
        document.getElementById('email').value = contact.email;
        document.getElementById('phone').value = contact.phone;
        contactIdField.value = contact._id;
    };

    window.deleteContact = async (id) => {
        await fetch(`${apiUrl}/${id}`, {
            method: 'DELETE'
        });
        fetchContacts();
    };

    fetchContacts();
});
