function attachEvents() {
    const host = "https://judgetests.firebaseio.com/";

    const symbols = {
        "Sunny": "&#x2600;",
        "Partly sunny": "&#x26C5;",
        "Overcast": "&#x2601;",
        "Rain": "&#x2614;",
        "Degrees": "&#176;"
    };

    $("#submit").click(getWeather);

    async function getWeather() {
        let locationName = $("#location").val();
        let codes = [];

        try {
            codes = await $.get(host + "locations.json");
        } catch (error) {
            handleError(error);
        }

        let code = undefined;

        for (let element of codes) {
            if (element.name === locationName) {
                code = element.code;
                break;
            }
        }

        let [today, upcoming] = [{}, {}];

        try {
            [today, upcoming] = await Promise
                .all([
                    $.get(`${host}forecast/today/${code}.json `),
                    $.get(`${host}forecast/upcoming/${code}.json `)
                ]);

            if (today == null || upcoming == null) throw new Error("Invalid data");
        } catch (error) {
            handleError(error);
        }

        const todayDiv = $("#current");
        const upcomingDiv = $("#upcoming");

        const symbol = symbols[today.forecast.condition];

        const htmlSymbol = `<span class="condition symbol">${symbol}</span>`;
        const htmlContent = `
        <span class="condition">
        <span class="forecast-data">${today.name}</span>
        <span class="forecast-data">${today.forecast.high}&#176; / ${today.forecast.low}&#176;</span>
        <span class="forecast-data">${today.forecast.condition}</span>
        </span>`;

        todayDiv
            .empty()
            .append('<div class="label">Current conditions</div>')
            .append(htmlSymbol)
            .append(htmlContent);

        upcomingDiv
            .empty()
            .append('<div class="label">Three-day forecast</div>');

        upcoming.forecast.forEach((currentDay) => {
            upcomingDiv.append(renderUpcoming(currentDay));
        });

        $("#forecast").show();
    }

    function renderUpcoming(data) {
        const symbol = symbols[data.condition];

        return `<span class="upcoming">
        <span class="condition symbol">${symbol}</span>
        <span class="forecast-data">${data.high}&#176; / ${data.low}&#176;</span>
        <span class="forecast-data">${data.condition}</span>
        </span>`;
    }

    function handleError(error) {
        $("#forecast").text("Error");
    }
}