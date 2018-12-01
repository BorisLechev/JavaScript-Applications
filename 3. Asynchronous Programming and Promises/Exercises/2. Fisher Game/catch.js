function attachEvents() {
    const host = "https://baas.kinvey.com/appdata/kid_BJtujW207/biggestCatches/";
    const kinveyUsername = "Boris";
    const kinveyPassword = 123;
    const base64Auth = btoa(`${kinveyUsername}:${kinveyPassword}`);
    const authHeaders = {
        "Authorization": "Basic " + base64Auth,
        "Content-type": "application/json"
    };

    $("#aside").find(".load").click(listAllCatches);
    $("#addForm").find(".add").click(createNewCatch);

    function request(method, endPoint, data) {
        return $.ajax({
            method: method,
            url: host + endPoint,
            headers: authHeaders,
            data: JSON.stringify(data)
        });
    }

    function displayAllCatches(data) {
        let catchesDiv = $("#catches");

        catchesDiv.empty();

        data.forEach((el) => {
            catchesDiv.append($(`<div class="catch" data-id="${el._id}">`)
                .append($("<label>Angler</label>"))
                .append($(`<input type="text" class="angler" value="${el.angler}"/>`))
                .append($("<label>Weight</label>"))
                .append($(`<input type="number" class="weight" value="${el.weight}"/>`))
                .append($("<label>Species</label>"))
                .append($(`<input type="text" class="species" value="${el.species}"/>`))
                .append($("<label>Location</label>"))
                .append($(`<input type="text" class="location" value="${el.location}"/>`))
                .append($("<label>Bait</label>"))
                .append($(`<input type="text" class="bait" value="${el.bait}"/>`))
                .append($("<label>Capture Time</label>"))
                .append($(`<input type="number" class="captureTime" value="${el.captureTime}"/>`))
                .append($('<button class="update">Update</button>').click(updateCatch))
                .append($('<button class="delete">Delete</button>').click(deleteCatch)))
        });
    }

    function createNewCatch(event) {
        event.preventDefault();
        event.stopPropagation();

        let catchItem = $(this).parent();
        let newCatchObj = getCatchObj(catchItem);

        request("POST", "", newCatchObj)
            .then(listAllCatches)
            .then(handleError);
    }

    function updateCatch(event) {
        event.preventDefault();
        event.stopPropagation();

        let catchItem = $(this).parent();

        let update = getCatchObj(catchItem);

        request("PUT", `${catchItem.attr("data-id")}`, update)
            .then(listAllCatches)
            .catch(handleError);
    }

    function deleteCatch(event) {
        event.preventDefault();
        event.stopPropagation();

        let catchId = $(this).parent().attr("data-id");

        request("DELETE", `${catchId}`)
            .then(listAllCatches)
            .catch(handleError);
    }

    function listAllCatches() {
        request("GET", "")
            .then(displayAllCatches)
            .catch(handleError);
    }

    function getCatchObj(catchItem) {
        return {
            angler: catchItem.find('.angler').val(),
            weight: Number(catchItem.find('.weight').val()),
            species: catchItem.find('.species').val(),
            location: catchItem.find('.location').val(),
            bait: catchItem.find('.bait').val(),
            captureTime: Number(catchItem.find('.captureTime').val())
        };
    }

    function handleError(error) {
        $("#catches").text(`Error: ${error.status} (${error.statusText})`);
    }
}