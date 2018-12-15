function renderHomeView(cars) {
    showHideLinks();

    let parentDiv = $("#listings");
    parentDiv.empty();

    if (cars.length === 0) {
        parentDiv.append(`<p class="no-cars">No cars in database.</p>`);
    } else {
        for (let car of cars) {
            let mainDiv = $('<div class="listing">');

            mainDiv
                .append(`<p>${car.title}</p>`)
                .append(`<img src="${car.imageUrl}">`)
                .append(`<h2>Brand: ${car.brand}</h2>`);

            let divInfo = $(`<div class="info"></div>`);

            let divData = $(`<div id="data-info">`);

            divData
                .append(`<h3>Seller: ${car.seller}</h3>`)
                .append(`<h3>Fuel: ${car.fuel}</h3>`)
                .append(`<h3>Year: ${car.year}</h3>`)
                .append(`<h3>Price: ${car.price} $</h3>`);

            let divButtons = $(`<div id="data-buttons">`);
            let ul = $('<ul>');
            let liDetails = $('<li class="action">');
            let aDetails = $('<a href="#" class="button-carDetails">Details</a>').on("click", function () {
                renderDetailsView(car);
            });

            liDetails.append(aDetails);
            ul.append(liDetails);
            divButtons.append(ul);

            if (sessionStorage.getItem("userId") === car._acl.creator) {
                let liEdit = $(`<li class="action">`);
                let aEdit = $(`<a href="#" class="button-carDetails">edit</a>`).on("click", function () {
                    renderEditView(car);
                });

                liEdit.append(aEdit);
                ul.append(liEdit);

                let liDelete = $(`<li class="action">`);
                let aDelete = $(`<a href="#" class="button-carDetails">delete</a>`).on("click", function () {
                    renderDelete(car);
                });

                liDelete.append(aDelete);
                ul.append(liDelete);
                divButtons.append(ul);
            }

            divInfo
                .append(divData)
                .append(divButtons);

            mainDiv.append(divInfo);
            parentDiv.append(mainDiv)
        }
    }
}

function renderDetailsView(car) {
    hideAllViews();

    let parentDiv = $("#listDetails");
    let myListingDetailsDiv = $(".my-listing-details");

    parentDiv.show();
    myListingDetailsDiv.empty();

    myListingDetailsDiv
        .append(`<p id="auto-title">${car.title}</p>`)
        .append(`<img src="${car.imageUrl}">`);

    let divData = $(`<div class="listing-props">`)
        .append(`<h2>Brand: ${car.brand}</h2>`)
        .append(`<h3>Model: ${car.model}</h3>`)
        .append(`<h3>Year: ${car.year}</h3>`)
        .append(`<h3>Fuel: ${car.fuel}</h3>`)
        .append(`<h3>Price: ${car.price}</h3>`);

    if (sessionStorage.getItem('userId') === car._acl.creator) {
        let divButtons = $(`<div class="listings-buttons">`)
            .append($(`<a href="#" class="button-list">Edit</a>`).on("click", function () {
                renderEditView(car);
            }))
            .append($(`<a href="#" class="button-list">Delete</a>`).on("click", function () {
                renderDelete(car);
            }));

        myListingDetailsDiv
            .append(divData)
            .append(divButtons)
            .append(`<p id="description-title">Description:</p>`)
            .append(`<p id="description-para">${car.description}</p>`);
    } else {
        myListingDetailsDiv
            .append(divData)
            .append(`<p id="description-title">Description:</p>`)
            .append(`<p id="description-para">${car.description}</p>`);
    }


    parentDiv.append(myListingDetailsDiv);
}

function renderEditView(car) {
    hideAllViews();

    let edit = $("#edit-listing");
    edit.show();
    edit.attr("carId", car._id);

    $("#edit-listing input[name=title]").val(car.title);
    $("#edit-listing input[name=description]").val(car.description);
    $("#edit-listing input[name=brand]").val(car.brand);
    $("#edit-listing input[name=model]").val(car.model);
    $("#edit-listing input[name=year]").val(car.year);
    $("#edit-listing input[name=imageUrl]").val(car.imageUrl);
    $("#edit-listing input[name=fuelType]").val(car.fuel);
    $("#edit-listing input[name=price]").val(car.price);
}

function renderDelete(car) {
    kinveyRequester.removeCar(car._id);
}

function renderMyCars(cars) {
    let mainDiv = $("#myCars");

    mainDiv.empty();

    if (cars.length === 0) {
        mainDiv.append($('<p class="no-cars">').text(" No cars in database."))
    } else {
        for (let car of cars) {
            let divMyListing = $(`<div class="my-listing">`);

            divMyListing
                .append(`<p id="listing-title">${car.title}</p>`)
                .append(`<img src="${car.imageUrl}">`);

            let divData = $(`<div class="listing-props">`);

            divData
                .append(`<h2>Brand: ${car.brand}</h2>`)
                .append(`<h3>Model: ${car.model}</h3>`)
                .append(`<h3>Year: ${car.year}</h3>`)
                .append(`<h3>Price: ${car.price}$</h3>`);

            divMyListing.append(divData);

            let divButtons = $(`<div class="my-listing-buttons">`);

            divButtons
                .append($(`<a href="#" class="my-button-list">Details</a>`).on("click", function () {
                    renderDetailsView(car);
                }))
                .append($(`<a href="#" class="my-button-list">Edit</a>`).on("click", function () {
                    renderEditView(car);
                }))
                .append($(`<a href="#" class="my-button-list">Delete</a>`).on("click", function () {
                    renderDelete(car);
                }));

            divMyListing.append(divButtons);
            mainDiv.append(divMyListing);
        }
    }

    mainDiv.show();
}