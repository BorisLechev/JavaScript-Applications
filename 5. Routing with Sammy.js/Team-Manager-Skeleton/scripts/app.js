$(() => {
    const app = Sammy('#main', function () {
        this.use("Handlebars", "hbs");

        // Home page
        this.get("/index.html", displayHome);
        this.get("#/home", displayHome);

        // About page
        this.get("#/about", function () {
            this.loggedIn = sessionStorage.getItem("authtoken") !== null; // logic from header.hbs for "Welcome..."
            this.username = sessionStorage.getItem("username");

            this.loadPartials({
                header: "./templates/common/header.hbs",
                footer: "./templates/common/footer.hbs"
            }).then(function () {
                this.partial("./templates/about/about.hbs");
            });
        });

        // Login page
        this.get("#/login", function () {
            this.loadPartials({
                header: "./templates/common/header.hbs",
                footer: "./templates/common/footer.hbs",
                loginForm: "./templates/login/loginForm.hbs"
            }).then(function () {
                this.partial("./templates/login/loginPage.hbs");
            });
        });

        this.post("#/login", function (context) {
            let username = this.params.username;
            let password = this.params.password;

            auth.login(username, password)
                .then(function (userInfo) {
                    auth.saveSession(userInfo);
                    auth.showInfo("Successfully logged in!");
                    displayHome(context);
                })
                .catch(auth.handleError);
        });

        // Register page
        this.get("#/register", function () {
            this.loadPartials({
                header: "./templates/common/header.hbs",
                footer: "./templates/common/footer.hbs",
                registerForm: "./templates/register/registerForm.hbs"
            }).then(function () {
                this.partial("./templates/register/registerPage.hbs");
            });
        });

        this.post("#/register", function (context) {
            let username = this.params.username;
            let password = this.params.password;
            let repeatPassword = this.params.repeatPassword;

            if (password !== repeatPassword) {
                auth.showError("The passwords do not match.");
            } else {
                auth.register(username, password, repeatPassword)
                    .then(function (userInfo) {
                        auth.saveSession(userInfo);
                        auth.showInfo("Successfully registered.");
                        displayHome(context);
                    })
                    .catch(auth.handleError);
            }
        });

        // Logout
        this.get("#/logout", function (context) {
            auth.logout()
                .then(function () {
                    sessionStorage.clear();
                    auth.showInfo("Successfully logged out.");
                    displayHome(context);
                })
                .catch(auth.handleError);
        });

        this.get("#/catalog", displayCatalog);

        // Create team
        this.get("#/create", function () {
            this.loggedIn = sessionStorage.getItem("authtoken") !== null;
            this.username = sessionStorage.getItem("username");

            this.loadPartials({
                header: "./templates/common/header.hbs",
                footer: "./templates/common/footer.hbs",
                createForm: "./templates/create/createForm.hbs"
            }).then(function () {
                this.partial("./templates/create/createPage.hbs");
            });
        });

        this.post("#/create", function (context) {
            let teamName = context.params.name;
            let teamComment = context.params.comment;

            teamsService.createTeam(teamName, teamComment)
                .then(function (data) {
                    teamsService.joinTeam(data._id)
                        .then(function (response) {
                            auth.saveSession(response);
                            auth.showInfo(`Team ${teamName} created!`);
                            displayCatalog(context);
                        }).catch(auth.handleError);
                }).catch(auth.handleError);
        });

        // Team details page
        this.get("#/catalog/:id", function (context) {
            let teamId = context.params.id.substring(1);

            teamsService.loadTeamDetails(teamId)
                .then(function (teamInfo) {
                    context.loggedIn = sessionStorage.getItem("authtoken") !== null;
                    context.username = sessionStorage.getItem("username");
                    context.teamId = teamInfo._id;
                    context.name = teamInfo.name;
                    context.comment = teamInfo.comment;
                    context.members = teamInfo.members;
                    context.isOnTeam = teamInfo._id === sessionStorage.getItem('teamId');
                    context.isAuthor = teamInfo._acl.creator === sessionStorage.getItem('userId');
                    context.loadPartials({
                        header: "./templates/common/header.hbs",
                        footer: "./templates/common/footer.hbs",
                        teamMember: "./templates/catalog/teamMember.hbs",
                        teamControls: "./templates/catalog/teamControls.hbs"
                    }).then(function () {
                        this.partial("./templates/catalog/details.hbs");
                    }).catch(auth.handleError);
                })
        });

        // Join team by id
        this.get("#/join/:id", function (context) {
            let teamId = this.params.id.substring(1);

            teamsService.joinTeam(teamId)
                .then(function (response) {
                    auth.saveSession(response);
                    auth.showInfo(`Joined team!`);
                    displayCatalog(context);
                }).catch(auth.handleError);
        });

        // Leave team
        this.get('#/leave', function (context) {
            teamsService.leaveTeam()
                .then(function (response) {
                    auth.saveSession(response);
                    auth.showInfo('Left the team!');
                    displayCatalog(context);
                }).catch(auth.handleError);
        });

        // Edit team
        this.get('#/edit/:id', function (context) {
            context.loggedIn = sessionStorage.getItem('authtoken') !== null;
            context.username = sessionStorage.getItem('username');
            context.teamId = this.params.id.substring(1);

            teamsService.loadTeamDetails(context.teamId)
                .then(function (teamInfo) {
                    context.name = teamInfo.name;
                    context.comment = teamInfo.comment;
                    context.loadPartials({
                        header: './templates/common/header.hbs',
                        footer: './templates/common/footer.hbs',
                        editForm: './templates/edit/editForm.hbs'
                    }).then(function () {
                        this.partial('./templates/edit/editPage.hbs');
                    })
                }).catch(auth.handleError);
        });

        this.post('#/edit/:id', function (context) {
            let teamId = context.params.id.substring(1);
            let teamName = context.params.name;
            let teamComment = context.params.comment;

            teamsService.edit(teamId, teamName, teamComment)
                .then(function () {
                    auth.showInfo(`Team ${teamName} edited!`);
                    displayCatalog(context);
                }).catch(auth.handleError);
        });


        function displayHome(context) {
            context.loggedIn = sessionStorage.getItem("authtoken") !== null; //home.hbs in #if we check is
                                                                             // true (show Welcome) or false
            context.username = sessionStorage.getItem("username");
            context.teamId = sessionStorage.getItem("teamId") !== "undefined"
                || sessionStorage.getItem("teamId") !== null;

            context.loadPartials({
                header: "./templates/common/header.hbs",
                footer: "./templates/common/footer.hbs"
            }).then(function () {
                this.partial("./templates/home/home.hbs"); // after header && footer load home.hbs
            });
        }

        function displayCatalog(context) {
            teamsService.loadTeams()
                .then(function (data) {
                    context.loggedIn = sessionStorage.getItem("authtoken") !== null;
                    context.username = sessionStorage.getItem("username");
                    context.hasTeam = sessionStorage.getItem('teamId') !== null;
                    context.hasNoTeam = sessionStorage.getItem("teamId") === "undefined"
                        || sessionStorage.getItem("teamId") === null;
                    context.teams = data;

                    context.loadPartials({
                        header: "./templates/common/header.hbs",
                        footer: "./templates/common/footer.hbs",
                        team: "./templates/catalog/team.hbs"
                    })
                        .then(function () {
                            this.partial("./templates/catalog/teamCatalog.hbs");
                        });
                });
        }
    });

    app.run();
});