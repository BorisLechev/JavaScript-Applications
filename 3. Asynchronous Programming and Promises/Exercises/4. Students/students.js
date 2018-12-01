(function () {
    const host = "https://baas.kinvey.com/appdata/kid_BJXTsSi-e/students/";
    const kinveyUsername = "guest";
    const kinveyPassword = "guest";
    const base64Auth = btoa(`${kinveyUsername}:${kinveyPassword}`);
    const authHeaders = {
        "Authorization": "Basic " + base64Auth,
        "Content-Type": "application/json"
    };

    $("#btnCreate").click(createStudent);

    function request(method, endPoint, data) {
        return $.ajax({
            method: method,
            url: host + endPoint,
            headers: authHeaders,
            data: JSON.stringify(data)
        });
    }

    function createStudent(event) {
        event.preventDefault();
        event.stopPropagation();

        let form = $(this).parent();

        let studentId = +form.find('#studentId').val();
        console.log(studentId);
        let firstName = form.find('#firstName').val();
        let lastName = form.find('#lastName').val();
        let facultyNumber = form.find('#facultyNumber').val();
        let grade = +form.find('#grade').val();

        let createStudentData = {
            ID: studentId,
            FirstName: firstName,
            LastName: lastName,
            FacultyNumber: facultyNumber,
            Grade: grade
        };

        request('POST', '', createStudentData)
            .then(listAllStudents)
            .catch(handleError);
    }

    function listAllStudents() {
        request("GET", "")
            .then(displayStudents)
            .catch(handleError);
    }

    function displayStudents(students) {
        let orderedStudentsByAsc = students.sort((a, b) => a.ID - b.ID);
        let table = $("#results");

        orderedStudentsByAsc.forEach((student) => {
            table.append($("<tr>")
                .append($(`<th>${student.ID}</th>`))
                .append($(`<th>${student.FirstName}</th>`))
                .append($(`<th>${student.LastName}</th>`))
                .append($(`<th>${student.FacultyNumber}</th>`))
                .append($(`<th>${student.Grade}</th>`)));
        });
    }

    function handleError(error) {
        $("#results").append($("<tr>").text(`Error: ${error.status} (${error.statusText})`));
    }

    listAllStudents();
})();