function showHideLinks() {
    hideAllLinks();

    if (sessionStorage.getItem("authToken")) {
        $("#allListingsLink").show();
        $("#myListingsLink").show();
        $("#createListingLink").show();
        $("#profile").show();
    } else {
        hideAllLinks();
        $('#main').show();
    }
}

function hideAllLinks() {
    $("#allListingsLink").hide();
    $("#myListingsLink").hide();
    $("#createListingLink").hide();
    $("#profile").hide();
}

function hideAllViews() {
    $('#main').hide();
    $("#login").hide();
    $("#register").hide();
    $("#car-listings").hide();
    $("#create-listing").hide();
    $("#edit-listing").hide();
    $("#myCarListings").hide();
    $("#listDetails").hide();
}

async function showHomeView() {
    showHideLinks();
    hideAllViews();

    $("#welcomeMessage").text(`Welcome ${sessionStorage.getItem("username")}`);

    $("#car-listings").show();
    $("#listings").empty();

    if (sessionStorage.getItem("username")) {     // да не се показва error при стартиране на проекта потр. трябва да е логнат
        $("#listings").show();
        let cars = await kinveyRequester.getAllPublicCars();
        renderHomeView(cars);
    } else {
        $("#listings > div").hide(); // скрий butona addFlight ако потребителят не е логнат
    }
}

function attachLinkEvents() {
    // $("#homeLink").on("click", function () {
    //     hideAllViews();
    //
    //     showHomeView();
    // });

    $("#registerButton").on("click", function () {
        hideAllViews();

        $("#register").show();
    });

    $("#loginButton").on("click", function () {
        hideAllViews();

        $("#login").show();
    });

    $("#createListingLink").on("click", function () {
        hideAllViews();

        $("#create-listing").show();
    });

    $("#allListingsLink").on("click", function () {
        hideAllViews();

        $("#car-listings").show();
    });

    $("#myListingsLink").on("click", async function () {
        hideAllViews();

        let cars = await kinveyRequester.getMyCars();

        renderMyCars(cars);
        $("#myCarListings").show();
    });

    $("#signUpLink").on("click", function () {
        hideAllViews();

        $("#register").show();
    });

    $("#signInLink").on("click", function () {
        hideAllViews();

        $("#login").show();
    });
}