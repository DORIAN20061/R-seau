// src/js/main.js

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (validateForm(username, password)) {
            submitForm(username, password);
        }
    });

    function validateForm(username, password) {
        if (username === '' || password === '') {
            alert('Please fill in all fields.');
            return false;
        }
        return true;
    }

    function submitForm(username, password) {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', '../php/login.php', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        xhr.onload = function() {
            if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                if (response.success) {
                    alert('Login successful!');
                    // Redirect or perform further actions
                } else {
                    alert('Login failed: ' + response.message);
                }
            }
        };

        xhr.send('username=' + encodeURIComponent(username) + '&password=' + encodeURIComponent(password));
    }
});