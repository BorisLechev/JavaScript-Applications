function getInfo() {
    let stopId = $("#stopId").val();
    $("#buses").empty();

    $.get(`https://judgetests.firebaseio.com/businfo/${stopId}.json`)
        .then((result) => {
            $("#stopName").text(result.name);

            for (let bus in result.buses) {
                $("#buses")
                    .append(`<li>Bus ${bus} arrives in ${result.buses[bus]} minutes</li>`);
            }
        }).catch((err) => {
        $("#stopName").text("Error");
    });
}