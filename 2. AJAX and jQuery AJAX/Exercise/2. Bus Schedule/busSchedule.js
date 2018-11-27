function solve() {
    let currentId = "depot";
    let currentStopName;

    function depart() {
        $("#depart").attr("disabled", true);

        $.get(`https://judgetests.firebaseio.com/schedule/${currentId}.json `)
            .then(nextBusStop)
            .catch(displayError);
    }

    function arrive() {
        $("#arrive").attr("disabled", true);
        $("#depart").removeAttr("disabled");

        $(".info").text(`Arriving at ${currentStopName}`);
    }

    function nextBusStop(resource) {
        currentStopName = resource.name;
        currentId = resource.next;
        $(".info").text(`Next stop ${currentStopName}`);

        $("#arrive").removeAttr("disabled");
    }

    function displayError() {
        $(".info").text("Error");
        $("#depart").attr("disabled", true);
        $("#arrive").attr("disabled", true);
    }

    return {
        depart,
        arrive
    };
}

let result = solve();