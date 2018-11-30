function attachEvents() {
    const kinveyAppKey = "kid_BJwBtAt07";
    const serviceUrl = "https://baas.kinvey.com/appdata/" + kinveyAppKey;
    const kinveyUsername = "Ignat";
    const kinveyPassword = 123;
    const base64auth = btoa(kinveyUsername + ":" + kinveyPassword);
    const authHeaders = {
        "Authorization": "Basic " + base64auth
    };

    $("#btnLoadPosts").click(loadPostClicked);
    $("#btnViewPost").click(viewPostClicked);

    function loadPostClicked() {
        $.ajax({
            method: "GET",
            url: serviceUrl + "/posts",
            headers: authHeaders
        }).then(displayPosts)
            .catch(displayError);
    }

    function viewPostClicked() {
        let selectedPostId = $("#posts").val();

        let postRequest = $.ajax({
            url: serviceUrl + "/posts/" + selectedPostId,
            headers: authHeaders
        });

        let commentsRequest = $.ajax({
            url: serviceUrl + `/comments/?query={"post_id":"${selectedPostId}"}`,
            headers: authHeaders
        });

        Promise.all([postRequest, commentsRequest])
            .then(displayPostWithComments)
            .catch()
    }

    function displayPostWithComments([post, comments]) {
        $("#post-title").text(post.title);
        $("#post-body").text(post.body);

        $("#post-comments").empty();
        comments.forEach((comment) => {
            $("<li>").text(comment.text)
                .appendTo($("#post-comments"));
        });
    }

    function displayPosts(posts) {
        $('#posts').empty();

        posts.forEach((post) => {
            let option = $("<option>");
            option.text(post.title);
            option.val(post._id);

            $("#posts").append(option);
        });
    }

    function displayError(error) {
        let errorDiv = $("<div>").text("Error: " + error.status + "(" + error.statusText + ")");

        $(document.body).prepend(errorDiv);

        setTimeout(() => {
            errorDiv.fadeOut(function () {
                errorDiv.remove()
            });
        }, 2000);
    }
}