$(document).ajaxStart(function () {  // да се покаже loading
    $("#loadingBox").show();
});

$(document).ajaxStop(function () {  // да се скрие
    $("#loadingBox").hide();
});

function showInfo(message) {
    $("#infoBox span").text(message);
    $("#infoBox").show();

    setTimeout(function () {
        $("#infoBox").hide();
    }, 3000);

    $("#infoBox").on("click", function () {
        $(this).hide();
    });
}

function attachBoxesEvents() {
    $("#infoBox").on("click", function () {
        $(this).hide();
    });

    $("#errorBox").on("click", function () {
        $(this).hide();
    });
}

function showError(message) {
    $("#errorBox span").text(message);
    $("#errorBox").show();

    setTimeout(function () {
        $("#errorBox").hide();
    }, 3000);
}