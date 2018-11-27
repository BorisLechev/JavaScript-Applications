function attachEvents() {
    $("#btnLoad").on("click", () => {
        $.get(`https://phonebook-nakov.firebaseio.com/phonebook.json`)
            .then(displayContacts);
    });

    $("#btnCreate").on("click", () => {
        let contact = {
            person: $("#person").val(),
            phone: $("#phone").val()
        };

        $("#person").val("");
        $("#phone").val("");

        $.post(`https://phonebook-nakov.firebaseio.com/phonebook.json`, JSON.stringify(contact)).then(loadContact);
    });

    function loadContact() {
        $.get(`https://phonebook-nakov.firebaseio.com/phonebook.json`)
            .then(displayContacts);
    }

    function displayContacts(resources) {
        $("#phonebook").empty();  //???

        Object.keys(resources)
            .forEach(contact => {
                let li = $("<li>")
                    .text(`${resources[contact].person}: ${resources[contact].phone}`)
                    .append($(`<button>[Delete]</button>`).on("click", () => {
                        $.ajax({
                            method: "DELETE",
                            url: `https://phonebook-nakov.firebaseio.com/phonebook/${contact}.json`
                        })
                            .then(() => $("li").remove());
                    }));

                $("#phonebook").append(li);
            });
    }
}