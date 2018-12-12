function attachButtonEvents() {  // регистрация на потребител
    $("#formRegister").on("submit", function (event) {
        event.preventDefault();
        event.stopPropagation();

        let username = $("#formRegister > input[name=username]").val();
        let password = $("#formRegister > input[name=pass]").val();
        let checkPassword = $("#formRegister > input[name=checkPass]").val();

        if (typeof username === "string" && username.length > 4 && password && password === checkPassword) {
            kinveyRequester.registerUser(username, password);
        } else if (typeof username !== "string") {
            showError("Username must be string!");
        } else if (username.length < 5) {
            showError("Username must be at least 5 characters in length!");
        } else if (password !== checkPassword) {
            showError("Passwords does not match!");
        } else {
            showError("Username and password fields can not be empty!");
        }
    });

    $("#formLogin").on("submit", function (event) {
        event.preventDefault();
        event.stopPropagation();

        let username = $("#formLogin > input[name=username]").val();
        let password = $("#formLogin > input[name=pass]").val();

        if (typeof username === "string" && username.length > 4 && password) {
            kinveyRequester.loginUser(username, password);
        } else if (typeof username !== "string") {
            showError("Username must be string!");
        } else if (username.length < 5) {
            showError("Username must be at least 5 characters in length!");
        } else {
            showError("Username and password fields can not be empty!");
        }
    });

    $("#divLogout > a").on("click", function () {  // to logout
        kinveyRequester.logoutUser();
    });

    $("#formAddFlight").on("submit", function (event) {
        event.preventDefault();
        event.stopPropagation();

        let destination = $("#formAddFlight input[name=destination]").val();
        let origin = $("#formAddFlight input[name=origin]").val();
        let departureDate = $("#formAddFlight input[name=departureDate]").val();
        let departureTime = $("#formAddFlight input[name=departureTime]").val();
        let seats = $("#formAddFlight input[name=seats]").val();
        let cost = $("#formAddFlight input[name=cost]").val();
        let imgUrl = $("#formAddFlight input[name=img]").val();
        let isPublic = $("#formAddFlight input[type='checkbox']").is(":checked");

        if (destination && origin && seats > 0 && cost > 0 && departureDate && departureTime) {
            kinveyRequester.postFlight(destination, origin, departureDate, departureTime, seats, cost, imgUrl, isPublic);
        } else {
            showError("Please, fill all fields.")
        }
    });

    $("#formEditFlight").on("submit", function (event) {
        event.preventDefault();
        event.stopPropagation();

        let id = $("#viewEditFlight").attr("flightId");  // от renderData.js
        let destination = $("#formEditFlight input[name=destination]").val();
        let origin = $("#formEditFlight input[name=origin]").val();
        let departureDate = $("#formEditFlight input[name=departureDate]").val();
        let departureTime = $("#formEditFlight input[name=departureTime]").val();
        let seats = $("#formEditFlight input[name=seats]").val();
        let cost = $("#formEditFlight input[name=cost]").val();
        let img = $("#formEditFlight input[name=img]").val();
        let isPublic = $("#formEditFlight input[type=checkbox]").is(":checked");

        kinveyRequester.editFlight(id, destination, origin, departureDate, departureTime, seats, cost, img, isPublic);
    });
}