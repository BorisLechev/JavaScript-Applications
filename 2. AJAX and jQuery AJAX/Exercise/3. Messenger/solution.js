function attachEvents() {
    $("#submit").on("click", createMessage);
    $("#refresh").on("click", loadMessage);

    function createMessage() {
        let data = {
            author: $("#author").val(),
            content: $("#content").val(),
            timestamp: Date.now()
        };

        $.post(`https://messenger-6001a.firebaseio.com/messenger.json`, JSON.stringify(data))
            .then(loadMessage);
    }

    function loadMessage() {
        $.get(`https://messenger-6001a.firebaseio.com/messenger.json`)
            .then(displayMessage);
    }

    function displayMessage(resource) {
        $("#messages").empty();
        let orderedMessage = {};

        resource = Object.keys(resource)
            .sort((a, b) => a.timestamp - b.timestamp)
            .forEach(m => orderedMessage[m] = resource[m]);

        for (let message of Object.keys(orderedMessage)) {
            $("#messages").append(`${orderedMessage[message].author}: ${orderedMessage[message].content}\n`);
        }
    }

    loadMessage();
}