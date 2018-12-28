let entriesService = (() => {

    function getAllByReceiptId(receiptId) {
        const endPoint = `entries?query={"receiptId":"${receiptId}"}`;  // from page 3 (Get Entries by Receipt ID)

        return remote.get("appdata", endPoint, "kinvey");
    }

    function create(type, quantity, price, receiptId) {  // from page 3 (Add Entry)
        const data = {type, quantity, price, receiptId};

        return remote.post("appdata", "entries", "kinvey", data);
    }

    function remove(entryId) {                 // from page 4 (DELETE Entry)
        const endPoint = `entries/${entryId}`;

        return remote.remove("appdata", endPoint, "kinvey");
    }

    return {
        getAllByReceiptId,
        create,
        remove
    };
})();