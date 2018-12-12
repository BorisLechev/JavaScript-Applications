function showHideLinks() {
    hideAllLinks();

    if (sessionStorage.getItem("authToken")) {  // иаме потребител
        $("#linkFlights").show();
        $("#divLogout").show();
    } else {
        $("#linkLogin").show();
        $("#linkRegister").show();
    }
}

function hideAllViews() {
    $("#container > section").hide();
}

async function showHomeView() {          // т.к. getPublicFlight() в kinveyRequester.js e async
    $("#divLogout span").text(`Welcome ${sessionStorage.getItem("username")}!`);
    hideAllViews();

    $("#viewCatalog > div > a").remove();  // да се изтрият хардкоднатните картинки (полети) в home

    if (sessionStorage.getItem("username")) {     // да не се показва error при стартиране на проекта потр. трябва да е логнат
        $("#viewCatalog").show();
        let flights = await kinveyRequester.getAllPublicFlight();
        renderHomeView(flights);
    } else {
        $("#viewCatalog > a").hide(); // скрий butona addFlight ако потребителят не е логнат
    }

}

function hideAllLinks() {
    $("#linkFlights").hide();
    $("#linkLogin").hide();
    $("#linkRegister").hide();
    $("#divLogout").hide();
}

function attachLinkEvents() {
    $("#linkHome").on("click", function () {
        hideAllViews();

        $("#viewCatalog").show();
    });
    $("#linkFlights").on("click", async function () {
        hideAllViews();

        let flights = await kinveyRequester.getMyFlights();

        renderMyFlights(flights);
        $("#viewMyFlights").show();
    });
    $("#linkLogin").on("click", function () {
        hideAllViews();

        $("#viewLogin").show();
    });
    $("#linkRegister").on("click", function () {
        hideAllViews();

        $("#viewRegister").show();
    });
    $("#viewCatalog > a").on("click", function () {
        hideAllViews();

        $("#viewAddFlight").show();
    });
}