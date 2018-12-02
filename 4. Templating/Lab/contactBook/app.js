$(() => {
    let details;
    let dataFromJSON;

    async function loadTemplates() {
        const contacts = await $.get("templates/contacts.hbs");
        const compileContacts = Handlebars.compile(contacts);

        details = await $.get("templates/details.hbs");
        dataFromJSON = await $.get("data.json");

        let object = {
            contacts: dataFromJSON
        };

        let table = compileContacts(object);
        $("#list").append(table);

        attachEvents();
    }

    loadTemplates();

    function loadDetails(index) {
        $("#details").empty();

        let compileDetails = Handlebars.compile(details);
        let html = compileDetails(dataFromJSON[index]);
        $("#details").append(html);
    }

    function attachEvents() {
        $(".contact").click(function () {
             loadDetails($(this).attr("data-id"));
            $(".active").removeClass("active");
            $(this).addClass("active");
        });
    }
});