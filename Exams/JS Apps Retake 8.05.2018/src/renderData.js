function renderHomeView(flights) {
    for (let flight of flights) {
        let a = $(`<a href="#" class="added-flight">`).on("click", function () {  // като се кликне на снимката
            renderDetailsView(flight);
        });

        a.append(`<img src="${flight.img}" alt="" class="picture-added-flight">`);
        a.append(`<h3>${flight.destination}</h3>`);
        a.append(`<span>from ${flight.origin}</span><span>${flight.departureDate}</span>`);

        $("#viewCatalog > div").append(a);
    }
}

function renderDetailsView(flight) {
    hideAllViews();

    let parentFunction = $("#viewFlightDetails");
    parentFunction.show();
    $("#viewFlightDetails > div").empty();

    let mainDiv = $(`<div class="ticket-area"></div>`);
    mainDiv.append(`<div class="ticket-area-left"><img src="${flight.img}" alt=""></div>`);

    let innerDiv = $(`<div class="ticket-area-right"></div>`);
    innerDiv.append($(`<h3>${flight.destination}</h3><div>from ${flight.origin}</div>`));

    let mostInnerDiv = $(`<div class="data-and-time">${flight.departureDate} ${flight.departureTime}</div>`);

    if (sessionStorage.getItem("userId") === flight._acl.creator) {
        mostInnerDiv.append($(`<a href="#" class="edit-flight-detail"></a>`)).on("click", function () {
            renderEditView(flight);
        });
    }

    innerDiv.append(mostInnerDiv);
    innerDiv.append($(`<div>${flight.seats} Seats (${flight.cost} per seat)</div>`));
    mainDiv.append(innerDiv);
    parentFunction.append(mainDiv);
}


function renderEditView(flight) {
    hideAllViews();
    $("#viewEditFlight").show();
    $("#viewEditFlight").attr("flightId", flight._id);  // за submitEvents.js трябва ни id, за да редактираме полета

    $("#formEditFlight input[name=destination]").val(flight.description);
    $("#formEditFlight input[name=origin]").val(flight.origin);
    $("#formEditFlight input[name=departureDate]").val(flight.departureDate);
    $("#formEditFlight input[name=departureTime]").val(flight.departureTime);
    $("#formEditFlight input[name=seats]").val(flight.seats);
    $("#formEditFlight input[name=cost]").val(flight.cost);
    $("#formEditFlight input[name=img]").val(flight.img);
    $("#formEditFlight input[type=checkbox]").is(flight.isPublic);
}

function renderMyFlights(flights) {
    $("#viewMyFlights > div").remove();

    for (let flight of flights) {
        let mainDiv = $(`<div class="flight-ticket">`);
        mainDiv.append($(`<div class="flight-left"><img src="${flight.img}" alt=""></div>`));

        let innerDiv = $(`<div class="flight-right">`);
        innerDiv.append($(`<div><h3>${flight.destination}</h3><span>${flight.departureDate}</span></div><div>from ${flight.origin} <span>${flight.departureTime}</span></div><p>${flight.seats} Seats (${flight.cost}$ per seat) </p>`));
        innerDiv.append($(`<a href="#" class="remove">REMOVE</a>`).on("click", function () {
            kinveyRequester.removeFlight(flight._id);
        }));
        innerDiv.append($(`<a href="#" class="details">Details</a>`).on("click", function () {
            renderDetailsView(flight);
        }));

        mainDiv.append(innerDiv);
        $("#viewMyFlights").append(mainDiv);
    }
}