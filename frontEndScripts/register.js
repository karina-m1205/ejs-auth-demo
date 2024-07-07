
const form = document.getElementById('registerForm');
form.addEventListener('submit', (event) => {
    event.preventDefault();

    let username = document.getElementById('username').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    let user = {
        username: username,
        email: email,
        password: password,
    }

    fetch('/api/registration', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    })
        .then((response) => response.json())
        .then((data) => {
            if (data && data.message === 'user successfuly added') {
                window.location.href = '/login';
            } else if (data.message === 'user already exist' || data.message === "enter all data") {
                console.log(data.message);
            }
        })
        .catch((err) => console.log(err));
    document.getElementById("registerForm").reset();
});
