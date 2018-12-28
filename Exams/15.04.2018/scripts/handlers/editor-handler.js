handlers.getEditor = async function (context) {
    try {
        const userId = sessionStorage.getItem("userId");
        let [receipt] = await receiptService.getActive(userId);

        if (!receipt) {
            receipt = await receiptService.create();
        }

        let entries = await entriesService.getAllByReceiptId(receipt._id);

        if (entries.length > 0) {
            entries.forEach((e) => {
                e.subtotal = (e.quantity * e.price).toFixed(2);
            });

            context.productsCount = entries.length;
            context.total = entries
                .map(e => +e.subtotal)
                .reduce((a, b) => a + b)
                .toFixed(2);
        } else {
            context.total = 0;
            context.productsCount = 0;
        }

        context.entries = entries;
        context.receiptId = receipt._id;
        context.username = sessionStorage.getItem("username");

        context.loadPartials({
            header: './templates/common/header.hbs',
            footer: './templates/common/footer.hbs',
            checkoutForm: './templates/forms/checkout.hbs',
            entryForm: './templates/forms/entry-form.hbs',
            entry: './templates/editor/entry.hbs'
        }).then(function () {
            this.partial('./templates/editor/editor-page.hbs');
        });

    } catch (error) {
        notify.showError(error);
    }
};

handlers.createEntry = function (context) {
    const receiptId = context.params.receiptId;
    const type = context.params.type;                // from entry-form.hbs
    const quantity = context.params.quantity;
    const price = context.params.price;

    if (type.length === 0) {
        notify.showError('Product name must be non-empty string!');
    } else if (isNaN(+quantity) || quantity.length === 0) {
        notify.showError('Quantity must be a number!');
    } else if (isNaN(+price) || price.length === 0) {
        notify.showError('Price must be a number!');
    } else {
        entriesService.create(type, quantity, price, receiptId)
            .then(() => {
                notify.showInfo('Entry added!');
                context.redirect('#/editor');
            })
            .catch(notify.handleError);
    }
};

handlers.deleteEntry = function (context) {
    const entryId = context.params.entryId;

    entriesService.remove(entryId)
        .then(() => {
            notify.showInfo('Entry deleted.');
            context.redirect('#/editor');
        })
        .catch(notify.handleError);
};

handlers.checkout = function (context) {
    const receiptId = context.params.receiptId;
    const productsCount = +context.params.productsCount;
    const total = +context.params.total;

    if (productsCount === 0) {
        notify.showError('Cannot checkout without any products!');
    } else {
        receiptService.checkout(receiptId, productsCount, total)
            .then(() => {
                notify.showInfo('Receipt checked out!');
                context.redirect('#/editor');
            })
            .catch(notify.handleError);
    }
};