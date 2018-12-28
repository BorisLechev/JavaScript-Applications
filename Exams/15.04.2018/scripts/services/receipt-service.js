let receiptService = (() => {
    function getActive(userId) {         // from page 3 (Get Active Receipt)
        const endPoint = `receipts?query={"_acl.creator":"${userId}","active":"true"}`;

        return remote.get("appdata", endPoint, "kinvey");
    }

    function create() {  // from page 3 (Create Receipt)
        const data = {
            active: true,
            productCount: 0,
            total: 0
        };

        return remote.post("appdata", "receipts", "kinvey", data);
    }

    function getMyReceipts(userId) {      // from page 4
        const endPoint = `receipts?query={"_acl.creator":"${userId}","active":"false"}`;

        return remote.get("appdata", endPoint, "kinvey");
    }

    function receiptDetails(receiptId) {   // from page 4
        const endPoint = `receipts/${receiptId}`;

        return remote.get("appdata", endPoint, "kinvey");
    }

    async function checkout(receiptId, productCount, total) {   // from page 4 (Commit Receipt
        const endPoint = `receipts/${receiptId}`;
        let receipt = await receiptDetails(receiptId);

        receipt["active"] = false;
        receipt["productsCount"] = productCount;
        receipt["total"] = total;

        return remote.update("appdata", endPoint, "kinvey", receipt);
    }

    return {
        getActive,
        create,
        getMyReceipts,
        receiptDetails,
        checkout
    };
})();