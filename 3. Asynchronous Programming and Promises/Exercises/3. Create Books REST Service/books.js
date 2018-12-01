function attachEvents() {
    const host = "https://baas.kinvey.com/appdata/kid_Bk_LLWTRX/books/";
    const kinveyUsername = "Boris";
    const kinveyPassword = "boris";
    const base64Auth = btoa(`${kinveyUsername}:${kinveyPassword}`);
    const authHeaders = {
        "Authorization": "Basic " + base64Auth,
        "Content-Type": "application/json"
    };

    $(".load").click(listAllBooks);
    $(".create").click(createBook);

    function request(method, endPoint, data) {
        return $.ajax({
            method: method,
            url: host + endPoint,
            headers: authHeaders,
            data: JSON.stringify(data)
        });
    }

    function listAllBooks() {
        request("GET", "")
            .then(displayAllBooks)
            .catch(handleError);
    }

    function displayAllBooks(books) {
        let booksDiv = $("#books");

        booksDiv.empty();

        books.forEach((book) => {
            booksDiv.append($(`<div class="book" data-id="${book._id}">`)
                .append($("<label>Title</label>"))
                .append($(`<input type="text" class="title" value="${book.title}" />`))
                .append($("<label>Author</label>"))
                .append($(`<input type="text" class="author" value="${book.author}" />`))
                .append($("<label>Isbn</label>"))
                .append($(`<input type="text" class="isbn" value="${book.isbn}" />`))
                .append($('<button>[Edit]</button>').click(editBook))
                .append($('<button>[Delete]</button>').click(deleteBook)))
        });
    }

    function editBook() {
        event.preventDefault();
        event.stopPropagation();

        let book = $(this).parent();

        let editBookData = {
            title: book.find(".title").val(),
            author: book.find(".author").val(),
            isbn: +book.find(".isbn").val()
        };

        request("PUT", `${book.attr("data-id")}`, editBookData)
            .then(listAllBooks)
            .catch(handleError);
    }

    function deleteBook(event) {
        event.preventDefault();
        event.stopPropagation();

        let bookId = $(this).parent().attr("data-id");

        request("DELETE", `${bookId}`)
            .then(listAllBooks)
            .catch(handleError);
    }

    function createBook(event) {
        event.preventDefault();
        event.stopPropagation();

        let title = $("#title");
        let author = $("#author");
        let isbn = $("#isbn");

        let createBookData = {
            title: title.val(),
            author: author.val(),
            isbn: +isbn.val()
        };

        request("POST", "", createBookData)
            .then(listAllBooks)
            .catch(handleError);

        const addForm = $("#addForm");

        addForm.find("#title").val("");
        addForm.find("#author").val("");
        addForm.find("#isbn").val("");
    }

    function handleError(error) {
        $("#books").text(`Error: ${error.status} (${error.statusText})`);
    }
}