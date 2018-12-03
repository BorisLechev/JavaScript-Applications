function attachEvents() {
    $("#btnLoadTowns").click(loadTowns);

    function loadTowns() {
        let townsData = $("#towns").val()
            .split(", ")
            .reduce((acc, cur) => {
                acc.towns.push({"town": cur});   // acc -> obj(towns) with array; cur -> values

                return acc;
            }, {"towns": []});  // acc -> {"towns": []}

        renderTowns(townsData);
    }

    async function renderTowns(towns) {
        let template = await $.get("template.hbs");
        let compileTemplate = Handlebars.compile(template);

        $("#root").html(compileTemplate(towns));
        $("#towns").val("");


        // $.get("template.hbs")
        // .then((res)=>{
        //     let compileTemplate = Handlebars.compile(res);
        //
        //     $("#root").html(compileTemplate(towns));
        //     $("#towns").val("");
        // })
        // .catch((error)=>$("#root").text(`${error.statusCode} (${error.statusText})`));
    }
}