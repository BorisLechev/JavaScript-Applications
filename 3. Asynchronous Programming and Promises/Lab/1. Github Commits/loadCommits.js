function loadCommits() {
    let username = $("#username").val();
    let repository = $("#repo").val();
    let commits = $("#commits");

    $.get(`https://api.github.com/repos/${username}/${repository}/commits`)
        .then((resources) => {
            commits.empty();

            resources.forEach((commitObj) => {
                commits.append($(`<li>${commitObj.commit.author.name}: ${commitObj.commit.message}</li>`));
            });
        })
        .catch((error) => {
            commits.empty();
            commits.append($(`<li>Error: ${error.status} (${error.statusText})</li>`));
        });
}