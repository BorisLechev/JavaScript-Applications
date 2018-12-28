handlers.getWelcomePage = function (context) {  // handlers from app.js
    context.loadPartials({
        loginForm: "./templates/forms/loginForm.hbs", // от снимката на стр. 5 трябва да има sign in, register, footer
        registerForm: "./templates/forms/registerForm.hbs", // load partial templates
        footer: "./templates/common/footer.hbs"
    }).then(function () {
        this.partial("./templates/welcome.hbs"); // load main partial
    })
};

handlers.registerUser = function (context) {
    const username = context.params.username; // .username is name="username" from registerForm.hbs
    const password = context.params.password;
    const passwordCheck = context.params.passwordCheck;

    if (username.length < 5) {
        notify.showError("Username must be at least 5 symbols.");
    } else if (password.length !== 3) {
        notify.showError("Password must be at least 3 characters in length.");
    } else if (password !== passwordCheck) {
        notify.showError("Passwords must match.");
    } else {
        auth.register(username, password)  // from auth-service.js in function register and returns promise => then
            .then((userData) => {  // accept the data that Kinvey return
                auth.saveSession(userData);  // from auth-service.js in function saveSession
                notify.showInfo("User registration successful");
                context.redirect("#/editor");
            }).catch(notify.handleError);
    }
};

handlers.loginUser = function (context) {
    const username = context.params.username;
    const password = context.params.password;

    if (username.length < 5) {
        notify.showError("Username must be at least 5 symbols.");
    } else if (password.length !== 3) {
        notify.showError("Password must be at least 3 characters in length.");
    } else {
        auth.login(username, password)
            .then((userData) => {
                auth.saveSession(userData);
                notify.showInfo("Login successful.");
                context.redirect("#/editor");
            }).catch(notify.handleError);
    }
};

handlers.logout=function (context) {
    auth.logout()
        .then(()=>{
            sessionStorage.clear();
            notify.showInfo("Logout successful.");
            context.redirect("#/home");
        });
};