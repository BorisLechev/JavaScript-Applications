const handlers = {};

$(() => {
    // Define routes here using Sammy.js
    const app = Sammy("#container", function () {
        this.use("Handlebars", "hbs");

        // call them from auth-handlers.js
        this.get("index.html", handlers.getWelcomePage); // from auth-handler.js  context send to handler
        this.get("#/home", handlers.getWelcomePage);

        this.post("#/register", handlers.registerUser); // #/register is the action in registerForm.hbs
        this.post("#/login", handlers.loginUser);
        this.get("#/logout", handlers.logout);
        this.get("#/editor", handlers.getEditor);

        this.post("#/entry/create", handlers.createEntry);
        this.post("#/entry/delete", handlers.deleteEntry);
        this.post("#/checkout", handlers.checkout);

        this.get('#/overview', handlers.getMyReceipts);
        this.get('#/receipt/details/:id', handlers.getReceiptDetails);
    });

    app.run();
});