const form = document.getElementById('loginForm');
form.addEventListener('submit', (event) => {
    event.preventDefault();

    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body:
            'email=' +
            encodeURIComponent(email) +
            '&password=' +
            encodeURIComponent(password),
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.token) {
                localStorage.setItem('token', data.token);
                fetch("/api/user", {
                    method: 'GET',
                    headers: {
                        // 'Content-Type': 'text/html',
                        'Content-Type': 'application/json',
                        authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                })
                    .then((response) => {                        
                        return response.text();
                    })
                    .then((data) => {
                        window.location.href = "/user";
                        document.body.innerHTML = data;
                    });
            } else if (data.message === "user not found") {
                console.log(data.message);
            }
        })
        .catch((err) => console.log(err));
    document.getElementById("loginForm").reset();
});
