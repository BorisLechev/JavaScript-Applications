handlers.getMyReceipts = function (context) {
    const userId = sessionStorage.getItem('userId');
    receiptService.getMyReceipts(userId)
        .then((allReceipts) => {
            allReceipts.forEach(e => {
                e.date = new Date(e._kmd.ect)
                    .toDateString();
            });
            context.username = sessionStorage.getItem('username');
            context.receipts = allReceipts;
            context.total = allReceipts
                .map(e => +e.total)
                .reduce((a, b) => a + b);

            context.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                receipt: './templates/receipt/receipt.hbs'
            }).then(function () {
                this.partial('./templates/receipt/all-receipts.hbs')
            })
        })
        .catch(notify.handleError);

    function calcTime(dateIsoFormat) {
        let diff = new Date - (new Date(dateIsoFormat));
        diff = Math.floor(diff / 60000);
        if (diff < 1) return 'less than a minute';
        if (diff < 60) return diff + ' minute' + pluralize(diff);
        diff = Math.floor(diff / 60);
        if (diff < 24) return diff + ' hour' + pluralize(diff);
        diff = Math.floor(diff / 24);
        if (diff < 30) return diff + ' day' + pluralize(diff);
        diff = Math.floor(diff / 30);
        if (diff < 12) return diff + ' month' + pluralize(diff);
        diff = Math.floor(diff / 12);

        return diff + ' year' + pluralize(diff);

        function pluralize(value) {
            if (value !== 1) return 's';
            else return '';
        }
    }
};

handlers.getReceiptDetails = function (context) {
    const receiptId = context.params.id;
    entriesService.getAllByReceiptId(receiptId)
        .then((entries) => {
            entries.forEach(e => {
                e.subtotal = (e.price * e.quantity).toFixed(2)
            });

            context.username = sessionStorage.getItem('username');
            context.entries = entries;

            context.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                entry: './templates/receipt/entry.hbs'
            }).then(function () {
                this.partial('./templates/receipt/receipt-details.hbs');
            })
        })
        .catch(notify.handleError);

};