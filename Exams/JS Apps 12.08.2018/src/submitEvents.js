function attachButtonEvents() {
    $("#formRegister").on("submit", function (event) {
        event.preventDefault();
        event.stopPropagation();

        let username = $("#register input[name=username]").val();
        let password = $("#register input[name=password]").val();
        let repeatPassword = $("#register input[name=repeatPass]").val();

        let usernamePattern = /^[a-zA-Z]{3,}$/;
        let passwordPattern = /^[a-zA-Z\d]{6,}$/;

        if (!usernamePattern.test(username)) {
            showError("Username must be at least 3 symbols in length and should contain only english alphabet letters.");
        } else if (!passwordPattern.test(password)) {
            showError("Password must be at least 6 symbols in length and should contain only english alphabet letters and digits.");
        } else if (password !== repeatPassword) {
            showError("Passwords must mach.");
        } else {
            kinveyRequester.registerUser(username, password);
        }
    });

    $("#formLogin").on("submit", function (event) {
        event.preventDefault();
        event.stopPropagation();

        let username = $("#login input[name=username]").val();
        let password = $("#login input[name=password]").val();

        let usernamePattern = /^[a-zA-Z]{3,}$/;
        let passwordPattern = /^[a-zA-Z\d]{6,}$/;

        if (!usernamePattern.test(username)) {
            showError("Username must be at least 3 symbols in length and should contain only english alphabet letters.");
        } else if (!passwordPattern.test(password)) {
            showError("Password must be at least 6 symbols in length and should contain only english alphabet letters and digits.");
        } else {
            kinveyRequester.loginUser(username, password);
        }
    });

    $("#logoutLink").on("click", function () {
        kinveyRequester.logoutUser();
    });

    $("#create-listing").on("submit", function (event) {
        event.preventDefault();
        event.stopPropagation();

        let seller = sessionStorage.getItem("username");
        let title = $("#create-listing input[name=title]").val();
        let description = $("#create-listing input[name=description]").val();
        let carBrand = $("#create-listing input[name=brand]").val();
        let model = $("#create-listing input[name=model]").val();
        let year = +$("#create-listing input[name=year]").val();
        let imageUrl = $("#create-listing input[name=imageUrl]").val();
        let fuelType = $("#create-listing input[name=fuelType]").val();
        let price = +$("#create-listing input[name=price]").val();

        if (title.length > 33) {
            showError("Title should not be more than 33 characters in length.");
        } else if (description.length < 30) {
            showError("Description must be at least 30 characters in length.");
        } else if (description.length > 450) {
            showError("Description should not be more than 450 characters in length.");
        } else if (model.length < 4) {
            showError("Model must be at least 4 characters in length.");
        } else if (carBrand.length > 10 && fuelType.length > 10 && model.length > 10) {
            showError("Car brand , fuel type, model should not be more than 10 characters in length.");
        } else if (price > 1000000) {
            showError("The maximum price is $1000000.");
        } else if (!imageUrl.startsWith("http")) {
            showError("Wrong protocol (should begin with http or https) in image URL.");
        } else if (title === '' || description === '' || carBrand === '' || model === '' ||
            year === '' || imageUrl === '' || fuelType === '' || price === '') {
            showError("All fields have to be filled!")
        } else {
            kinveyRequester.createCar(carBrand, description, fuelType, imageUrl, seller, model, price, seller, title, year);
        }
    });

    $("#edit-listing").on("submit", function (event) {
        event.preventDefault();
        event.stopPropagation();

        let seller = sessionStorage.getItem("username");
        let id = $("#edit-listing").attr("carId");
        let title = $("#edit-listing input[name=title]").val();
        let description = $("#edit-listing input[name=description]").val();
        let carBrand = $("#edit-listing input[name=brand]").val();
        let model = $("#edit-listing input[name=model]").val();
        let year = +$("#edit-listing input[name=year]").val();
        let imageUrl = $("#edit-listing input[name=imageUrl]").val();
        let fuelType = $("#edit-listing input[name=fuelType]").val();
        let price = +$("#edit-listing input[name=price]").val();

        if (title.length > 33) {
            showError("Title should not be more than 33 characters in length.");
        } else if (description.length < 30) {
            showError("Description must be at least 30 characters in length.");
        } else if (description.length > 450) {
            showError("Description should not be more than 450 characters in length.");
        } else if (model.length < 4) {
            showError("Model must be at least 4 characters in length.");
        } else if (carBrand.length > 10 && fuelType.length > 10 && model.length > 10) {
            showError("Car brand , fuel type, model should not be more than 10 characters in length.");
        } else if (price > 1000000) {
            showError("The maximum price is $1000000.");
        } else if (!imageUrl.startsWith("http")) {
            showError("Wrong protocol (should begin with http or https) in image URL.");
        } else if (title === '' || description === '' || carBrand === '' || model === '' ||
            year === '' || imageUrl === '' || fuelType === '' || price === '') {
            showError("All fields have to be filled!")
        } else {
            kinveyRequester.editCar(carBrand, description, fuelType, imageUrl, seller, model, price, seller, title, year, id);
        }
    });
}