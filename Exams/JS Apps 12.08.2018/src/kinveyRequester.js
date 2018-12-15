const kinveyRequester = (function () {
    const BASE_URL = 'https://baas.kinvey.com/';
    const APP_KEY = 'kid_BJH0rSggV';
    const APP_SECRET = 'bba0bb7c29bf4a849f6b9e4f4a505e78';
    const AUTH_HEADERS = {'Authorization': "Basic " + btoa(APP_KEY + ":" + APP_SECRET)};

    function registerUser(username, password) {
        $.ajax({
            method: "POST",
            url: BASE_URL + 'user/' + APP_KEY + '/',
            headers: AUTH_HEADERS,
            data: {username, password}
        }).then(function (res) {
            signInUser(res, 'User registration successful.');
            $('#formRegister').trigger('reset'); // ресетва полетата
        }).catch(handleError);
    }

    function loginUser(username, password) {
        $.ajax({
            method: 'POST',
            url: BASE_URL + 'user/' + APP_KEY + '/login',
            headers: AUTH_HEADERS,
            data: {username, password}
        }).then(function (res) {
            signInUser(res, 'Login successful.');
            $('#formLogin').trigger('reset');  // ресетва полетата
        }).catch(handleError);
    }

    function logoutUser() {
        $.ajax({
            method: 'POST',
            url: BASE_URL + 'user/' + APP_KEY + '/_logout',
            headers: {Authorization: 'Kinvey ' + sessionStorage.getItem('authToken')}
        }).catch(function (err) {
            console.log(err);
        });

        sessionStorage.clear();
        showInfo("Logout successful");  // добавено
        showHomeView();
        showHideLinks()
    }

    function createCar(brand, description, fuel, imageUrl, isAuthor,
                       model, price, seller, title, year) {
        $.ajax({
            method: 'POST',
            url: BASE_URL + 'appdata/' + APP_KEY + '/cars',
            headers: {Authorization: 'Kinvey ' + sessionStorage.getItem('authToken')},
            data: {
                brand, description, fuel, imageUrl, isAuthor,
                model, price, seller, title, year
            }
        }).then(function () {
            showHomeView();
            showInfo("Created car.");
            $('#create-listing').trigger("reset");
        }).catch(handleError);
    }


    async function getAllPublicCars() {  // не са в шаблона
        return await $.ajax({
            method: 'GET',
            url: BASE_URL + 'appdata/' + APP_KEY + '/cars?query={}&sort={"_kmd.ect": -1}',
            headers: {Authorization: 'Kinvey ' + sessionStorage.getItem('authToken')},
        }).then(function (res) {
            return res;
        }).catch(handleError);
    }

    async function getMyCars() { // не са в шаблона
        return await $.ajax({
            method: 'GET',
            url: BASE_URL + 'appdata/' + APP_KEY + `/cars?query={"seller":"${sessionStorage.getItem('username')}"}&sort={"_kmd.ect": -1}`,
            headers: {Authorization: 'Kinvey ' + sessionStorage.getItem('authToken')},
        }).then(function (res) {
            return res;
        }).catch(handleError);
    }

    function removeCar(id) {
        $.ajax({
            method: 'DELETE',
            url: BASE_URL + 'appdata/' + APP_KEY + '/cars/' + id,
            headers: {Authorization: 'Kinvey ' + sessionStorage.getItem('authToken')},
        }).then(function () {
            showInfo("Car deleted.");
            $("#allListingsLink").trigger('click');
        }).catch(handleError);
    }

    function editCar(brand, description, fuel, imageUrl, isAuthor,
                     model, price, seller, title, year,id) {
        $.ajax({
            method: 'PUT',
            url: BASE_URL + 'appdata/' + APP_KEY + '/cars/' + id,
            headers: {Authorization: 'Kinvey ' + sessionStorage.getItem('authToken')},
            data: {
                brand, description, fuel, imageUrl, isAuthor,
                model, price, seller, title, year,id
            }
        }).then(function (res) {
            showInfo("Successfully edited car.");
            renderEditView(res);
        }).catch(handleError);
    }

    function signInUser(res, message) {  // поправено
        saveUserSession(res);
        $("#welcomeMessage").text(`Welcome ${res.username}!`);  // съобщение в navbar
        showInfo(message); // от notifications.js
        showHomeView();  // след успешна регистрация
    }

    function saveUserSession(userInfo) {
        sessionStorage.setItem('authToken', userInfo._kmd.authtoken);
        sessionStorage.setItem('username', userInfo.username);
        sessionStorage.setItem('userId', userInfo._id);
    }

    function handleError(err) {
        showError(err.message);
    }

    return {
        registerUser, loginUser, logoutUser, createCar, getAllPublicCars,
        editCar, getMyCars, removeCar
    };
}());