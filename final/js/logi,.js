document.addEventListener('DOMContentLoaded', function() {
    // Load saved data from localStorage if 'Save Me' was checked
    var savedDataList = JSON.parse(localStorage.getItem('savedDataList')) || [];

    savedDataList.forEach(function(savedData) {
        var emailInput = document.getElementById('email');
        var passwordInput = document.getElementById('password');
        var saveMeCheckbox = document.getElementById('saveMe');

        if (savedData.email === emailInput.value && savedData.password === passwordInput.value) {
            emailInput.value = savedData.email || '';
            passwordInput.value = savedData.password || '';
            saveMeCheckbox.checked = savedData.saveMe || false;
        }
    });
});

function checkLogin() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var saveMe = document.getElementById('saveMe').checked;

    // Validate input fields
    if (!email || !password) {
        alert('Please fill in both email and password.');
        return;
    }

    // Perform login logic (for demonstration purposes, using localStorage)
    var users = JSON.parse(localStorage.getItem('registrationProcesses')) || [];
    var user = users.find(u => u.email === email && u.password === password);

    if (user) {
        alert('Login successful! Redirecting to user dashboard.');
        window.location.href = 'home.html';

        // Save data if 'Save Me' is checked
        if (saveMe) {
            var savedDataList = JSON.parse(localStorage.getItem('savedDataList')) || [];

            // Add new data
            savedDataList.push({ email, password });
            localStorage.setItem('savedDataList', JSON.stringify(savedDataList));

            // Display the new entry
            alert('Email: ' + email + '\nPassword: ' + password + '\nSaved for future logins.');
        }
    } else {
        alert('Invalid email or password. Please try again.');
    }
}
