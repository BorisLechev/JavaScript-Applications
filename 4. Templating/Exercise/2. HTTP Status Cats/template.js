$(() => {
    renderCatTemplate();

    function renderCatTemplate() {
        let templateSource = $.get("catTemplate.hbs")
            .then((res) => {
                let templateCompile = Handlebars.compile(res);

                $("#allCats").html(templateCompile({cats}));

                $("button")
                    .each((index, button) => $(button).click(showAndHideInfo));
                // Array
                //     .from($("button"))
                //     .forEach((button) => $(button).click(showAndHideInfo));

                function showAndHideInfo() {
                    const button = $(this);

                    if (button.text() === "Show status code") {
                        button.next().css("display", "block");
                        button.text("Hide status code");
                    } else {
                        button.next().css("display", "none");
                        button.text("Show status code");
                    }
                }
            });
    }
});
