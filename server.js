const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Initialize app
const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Route to handle form submission
app.post('/submit-form', (req, res) => {
    const { name, email, message } = req.body;

    if (name && email && message) {
        // For now, log the data (later you can save it to a database)
        console.log('Form Submission:', { name, email, message });

        // Send success response
        res.status(200).json({ message: 'Form submitted successfully!' });
    } else {
        // Send error response
        res.status(400).json({ message: 'All fields are required.' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});




document.getElementById('contact-form').addEventListener('submit', async function (e) {
    e.preventDefault();

    // Collect form data
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    // Send data to backend
    try {
        const response = await fetch('http://localhost:5000/submit-form', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, message }),
        });

        const result = await response.json();

        // Display success or error message
        const formStatus = document.getElementById('form-status');
        if (response.ok) {
            formStatus.textContent = result.message;
            formStatus.style.color = 'green';

            // Clear form fields
            document.getElementById('contact-form').reset();
        } else {
            formStatus.textContent = result.message;
            formStatus.style.color = 'red';
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('form-status').textContent = 'Something went wrong. Please try again.';
    }
});


